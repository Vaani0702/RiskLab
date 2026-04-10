"""
RiskLab Backend — FastAPI
All endpoints:
  GET  /                           → health check
  POST /api/auth/register          → create account
  POST /api/auth/login             → login, get token
  GET  /api/auth/me                → get current user from token
  POST /api/simulations            → save a simulation result
  GET  /api/simulations/{email}    → get all simulations for a user
  GET  /api/simulation/{stockId}   → historical crash data
  POST /api/montecarlo             → Monte Carlo simulation
  POST /api/debrief                → AI personalized debrief
  POST /api/sip                    → SIP calculator
  GET  /api/assets                 → list all assets
"""

import os
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import anthropic
from dotenv import load_dotenv
from datetime import datetime

from database import get_db, init_db
from auth import hash_password, verify_password, create_token, verify_token, get_join_date
from market_data import SIMULATION_DATA, ASSET_PARAMS
from monte_carlo import run_monte_carlo, calculate_sip_returns

load_dotenv()

app = FastAPI(title="RiskLab API", version="2.0.0")

# Initialize DB on startup
@app.on_event("startup")
def startup():
    init_db()

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── REQUEST MODELS ────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class SaveSimRequest(BaseModel):
    userEmail: str
    stockId: str
    profile: Optional[str] = None
    decision: str
    investment: Optional[float] = None
    finalValue: Optional[float] = None
    pnl: Optional[float] = None
    returnPct: Optional[float] = None
    simDate: str

class MonteCarloRequest(BaseModel):
    stockId: str
    investment: float = 10000
    years: int = 5
    scenarios: int = 1000

class DebriefRequest(BaseModel):
    profile: str
    stockId: str
    decision: str
    investment: float
    finalValue: float
    pnl: float
    returnPct: float
    userName: Optional[str] = None

class SIPRequest(BaseModel):
    monthlyAmount: float
    annualReturn: float = 0.12
    years: int = 20


# ─── HEALTH ────────────────────────────────────────────────────────────

@app.get("/")
def health():
    return {"status": "RiskLab API running", "version": "2.0.0"}


# ─── AUTH ROUTES ───────────────────────────────────────────────────────

@app.post("/api/auth/register")
def register(req: RegisterRequest):
    """Create a new user account."""
    if len(req.name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Name must be at least 2 characters")
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    if "@" not in req.email:
        raise HTTPException(status_code=400, detail="Invalid email address")

    conn = get_db()
    try:
        # Check if email already exists
        existing = conn.execute(
            "SELECT id FROM users WHERE email = ?", (req.email.lower(),)
        ).fetchone()

        if existing:
            raise HTTPException(status_code=409, detail="Email already registered")

        # Hash password and create user
        hashed = hash_password(req.password)
        join_date = get_join_date()

        conn.execute(
            "INSERT INTO users (name, email, password, join_date) VALUES (?, ?, ?, ?)",
            (req.name.strip(), req.email.lower(), hashed, join_date)
        )
        conn.commit()

        # Generate token
        token = create_token(req.email.lower(), req.name.strip())

        return {
            "success": True,
            "token": token,
            "user": {
                "name": req.name.strip(),
                "email": req.email.lower(),
                "joinDate": join_date,
            }
        }
    finally:
        conn.close()


@app.post("/api/auth/login")
def login(req: LoginRequest):
    """Login and receive a token."""
    conn = get_db()
    try:
        user = conn.execute(
            "SELECT name, email, password, join_date FROM users WHERE email = ?",
            (req.email.lower(),)
        ).fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not verify_password(req.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_token(user["email"], user["name"])

        return {
            "success": True,
            "token": token,
            "user": {
                "name": user["name"],
                "email": user["email"],
                "joinDate": user["join_date"],
            }
        }
    finally:
        conn.close()


@app.get("/api/auth/me")
def get_me(authorization: Optional[str] = Header(None)):
    """Get current user info from token."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No token provided")

    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    conn = get_db()
    try:
        user = conn.execute(
            "SELECT name, email, join_date FROM users WHERE email = ?",
            (payload["email"],)
        ).fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "name": user["name"],
            "email": user["email"],
            "joinDate": user["join_date"],
        }
    finally:
        conn.close()


# ─── SIMULATION HISTORY ROUTES ─────────────────────────────────────────

@app.post("/api/simulations")
def save_simulation(req: SaveSimRequest):
    """Save a simulation result to the database."""
    conn = get_db()
    try:
        conn.execute('''
            INSERT INTO simulations
            (user_email, stock_id, profile, decision, investment, final_value, pnl, return_pct, sim_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            req.userEmail.lower(),
            req.stockId,
            req.profile,
            req.decision,
            req.investment,
            req.finalValue,
            req.pnl,
            req.returnPct,
            req.simDate,
        ))
        conn.commit()
        return {"success": True, "message": "Simulation saved"}
    finally:
        conn.close()


@app.get("/api/simulations/{email}")
def get_simulations(email: str):
    """Get all simulations for a user."""
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT stock_id, profile, decision, investment, final_value,
                   pnl, return_pct, sim_date, created_at
            FROM simulations
            WHERE user_email = ?
            ORDER BY created_at DESC
        ''', (email.lower(),)).fetchall()

        return {
            "email": email,
            "count": len(rows),
            "simulations": [
                {
                    "stockId":    row["stock_id"],
                    "profile":    row["profile"],
                    "decision":   row["decision"],
                    "investment": row["investment"],
                    "finalValue": row["final_value"],
                    "pnl":        row["pnl"],
                    "returnPct":  row["return_pct"],
                    "date":       row["sim_date"],
                }
                for row in rows
            ]
        }
    finally:
        conn.close()


# ─── MARKET DATA ───────────────────────────────────────────────────────

@app.get("/api/simulation/{stock_id}")
def get_simulation(stock_id: str):
    if stock_id not in SIMULATION_DATA:
        raise HTTPException(status_code=404, detail=f"Stock '{stock_id}' not found")
    return SIMULATION_DATA[stock_id]


@app.get("/api/assets")
def list_assets():
    return [
        {
            "id": sid,
            "name": data["name"],
            "label": data["label"],
            "startDate": data["startDate"],
            "endDate": data["endDate"],
            "weekCount": len(data["weeks"]),
        }
        for sid, data in SIMULATION_DATA.items()
    ]


# ─── MONTE CARLO ───────────────────────────────────────────────────────

@app.post("/api/montecarlo")
def monte_carlo(req: MonteCarloRequest):
    if req.stockId not in ASSET_PARAMS:
        raise HTTPException(status_code=400, detail=f"Unknown stock: {req.stockId}")
    params = ASSET_PARAMS[req.stockId]
    result = run_monte_carlo(
        investment=req.investment,
        annual_mean=params["mean"],
        annual_std=params["std"],
        years=req.years,
        scenarios=req.scenarios,
    )
    result["assetLabel"] = params["label"]
    return result


# ─── AI DEBRIEF ────────────────────────────────────────────────────────

@app.post("/api/debrief")
def get_debrief(req: DebriefRequest):
    api_key = os.getenv("ANTHROPIC_API_KEY")

    profiles = {
        "panic":      "Panic Seller — strong emotional reaction to losses, likely to sell during drops",
        "cautious":   "Cautious Holder — patient but hesitant to start, prone to analysis paralysis",
        "calculated": "Calculated Risk-Taker — good instincts but risk of overconfidence",
    }
    stocks = {
        "nifty":   "Nifty 50 Index (India's top 50 companies, COVID crash 2020)",
        "netflix": "Netflix stock (2022 crash — fell 76% before recovering)",
        "gold":    "Gold ETF (COVID period 2020)",
    }

    profile_desc = profiles.get(req.profile, req.profile)
    stock_desc = stocks.get(req.stockId, req.stockId)
    action = "SOLD during the crash" if req.decision == "sell" else "HELD through the crash"
    pnl_str = f"₹{abs(round(req.pnl)):,} {'profit' if req.pnl >= 0 else 'loss'}"
    ret_str = f"{'+' if req.returnPct >= 0 else ''}{req.returnPct:.1f}%"

    if api_key:
        try:
            client = anthropic.Anthropic(api_key=api_key)
            prompt = f"""You are RiskLab's AI investing coach. Give a personalized debrief to a young Indian investor.

INVESTOR PROFILE: {profile_desc}
ASSET SIMULATED: {stock_desc}
DECISION MADE: {action}
STARTING INVESTMENT: ₹{req.investment:,.0f}
FINAL VALUE: ₹{req.finalValue:,.0f}
P&L: {pnl_str} ({ret_str})
{'Investor name: ' + req.userName if req.userName else ''}

Write a debrief in this exact JSON format (return ONLY valid JSON, no markdown):
{{
  "headline": "One powerful sentence about what their decision reveals (max 15 words)",
  "summary": "2-3 sentences in plain conversational language. Reference their specific numbers. No jargon.",
  "insights": [
    {{"icon": "emoji", "title": "Short title", "text": "2-3 sentence insight relevant to their profile and decision"}},
    {{"icon": "emoji", "title": "Short title", "text": "2-3 sentence insight"}},
    {{"icon": "emoji", "title": "Short title", "text": "2-3 sentence insight"}}
  ],
  "actionItems": ["Action step 1", "Action step 2", "Action step 3"],
  "sipSuggestion": "One sentence suggesting a specific SIP amount and fund."
}}

Be direct, warm, specific. Use Indian context (rupees, SIPs, Nifty 50, Zerodha). Never generic advice."""

            message = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            import json
            text = message.content[0].text.strip()
            if text.startswith("```"):
                text = text.split("```")[1]
                if text.startswith("json"):
                    text = text[4:]
            result = json.loads(text.strip())
            result["source"] = "ai"
            return result

        except Exception as e:
            print(f"AI debrief failed: {e}, using static fallback")

    return _static_debrief(req.profile, req.decision, req.pnl, req.returnPct, req.investment, req.finalValue)


def _static_debrief(profile, decision, pnl, return_pct, investment, final_value):
    debriefs = {
        ("panic", "sell"): {
            "headline": "Your emotions cost you more than the crash did.",
            "summary": f"You sold and locked in a loss of ₹{abs(round(pnl)):,}. The market didn't cause this — the decision to sell did. Every crash in Indian market history has fully recovered.",
            "insights": [
                {"icon": "🧠", "title": "What happened", "text": "A completely normal fear response. Humans feel losses 2x more intensely than gains. Your brain did what evolution designed — but that instinct is wrong in markets."},
                {"icon": "📉", "title": "The real cost", "text": f"By selling, you locked in {return_pct:.1f}% loss permanently. If you had held, the asset recovered fully. The loss became permanent the moment you sold, not when the crash started."},
                {"icon": "🛡️", "title": "Action plan", "text": "Start a Nifty 50 SIP of ₹500/month. Delete the app from your home screen. Review every 6 months only. Time heals volatility — panic makes it permanent."}
            ],
            "actionItems": ["Start ₹500/month Nifty 50 SIP today", "Delete investing app from home screen", "Set 6-month portfolio review reminder"],
            "sipSuggestion": "₹500/month in UTI Nifty 50 Index Fund — 0.1% fees, automatic diversification, no decisions required.",
            "source": "static"
        },
        ("panic", "hold"): {
            "headline": "You beat your own psychology. That's rarer than it sounds.",
            "summary": f"As a Panic Seller, holding through that crash took real discipline. Your ₹{round(investment):,} became ₹{round(final_value):,}. That decision is worth more than any stock tip.",
            "insights": [
                {"icon": "🏆", "title": "What you did right", "text": "You sat with discomfort and did nothing. Every successful long-term investor has had to do exactly this."},
                {"icon": "💡", "title": "The lesson", "text": "The best strategy is the one you can actually stick to through a crash. You just proved you can hold."},
                {"icon": "🚀", "title": "Next step", "text": "Now do it with real money. Start small — ₹500/month — so amounts don't trigger panic. Build the habit first."}
            ],
            "actionItems": ["Start ₹500/month Nifty 50 SIP this week", "Set 6-month review reminder", "Share your result — help someone else overcome fear"],
            "sipSuggestion": "You're ready for ₹1,000/month in Nifty 50. Your behavior in this simulation proves it.",
            "source": "static"
        },
        ("cautious", "sell"): {
            "headline": "Analysis paralysis met panic selling — a dangerous combination.",
            "summary": f"Slow to enter, fast to exit. That's the worst combination. The ₹{abs(round(pnl)):,} loss was locked in by the sell decision, not the market.",
            "insights": [
                {"icon": "⏳", "title": "Real cost of waiting", "text": "Every month you delay investing costs compound interest. Time in market beats timing always."},
                {"icon": "🎯", "title": "Your pattern", "text": "You need set-and-forget. SIPs automate the entry so you never have to decide to invest each month."},
                {"icon": "📖", "title": "Action plan", "text": "Stop researching. Start with ₹500/month today. You don't need more information — you need one decision."}
            ],
            "actionItems": ["Open Groww or Zerodha today", "Start ₹500 Nifty 50 SIP immediately", "Stop researching. Start doing."],
            "sipSuggestion": "₹500/month in HDFC Index Fund Nifty 50. Expense ratio 0.1%. No decisions after setup.",
            "source": "static"
        },
        ("cautious", "hold"): {
            "headline": "Patience is your superpower. Don't waste it by never starting.",
            "summary": f"You held when it got hard — that's your biggest strength. Your ₹{round(investment):,} became ₹{round(final_value):,}. The only trap for your profile is never starting.",
            "insights": [
                {"icon": "✅", "title": "What you did right", "text": "You didn't panic. More valuable than any stock pick."},
                {"icon": "⚠️", "title": "Your warning", "text": "'I need to learn more' cannot be a permanent excuse. You know enough. Start."},
                {"icon": "💰", "title": "The math", "text": "₹500/month for 20 years at 12% = ₹5 lakh. Every year you wait loses compounding that can never come back."}
            ],
            "actionItems": ["Start investing within 48 hours — set a hard deadline", "₹500/month minimum to build the habit", "Automate it — remove the decision completely"],
            "sipSuggestion": "₹1,000/month in UTI Nifty 50. Your patience means you won't panic-sell. You're ready.",
            "source": "static"
        },
        ("calculated", "sell"): {
            "headline": "You know the theory but panicked in practice. Gap worth closing.",
            "summary": f"You understand crashes recover — but sold anyway. The gap between intellectual knowledge and emotional response cost ₹{abs(round(pnl)):,}.",
            "insights": [
                {"icon": "🔍", "title": "What this reveals", "text": "Confident in theory but not battle-hardened. Real crashes feel different. This simulation gave you that experience without the real loss."},
                {"icon": "⚖️", "title": "Diversification", "text": "Overconcentration amplifies panic. If you had 5 assets, a 70% drop in one is only 14% portfolio impact — much easier to hold."},
                {"icon": "📐", "title": "Your rule", "text": "Never more than 10% in one stock. 70% index fund core. 10% cash reserved specifically for buying during crashes."}
            ],
            "actionItems": ["Cap individual stocks at 10% of portfolio", "Build 70% index fund core first", "Keep 10% cash for crash opportunities"],
            "sipSuggestion": "₹3,000/month: ₹2,000 Nifty 50 + ₹1,000 Nifty Next 50. Diversified and low-cost.",
            "source": "static"
        },
        ("calculated", "hold"): {
            "headline": "Textbook response. Now scale it up responsibly.",
            "summary": f"You held through the crash and watched recovery. Your ₹{round(investment):,} became ₹{round(final_value):,}. Next challenge: overconfidence.",
            "insights": [
                {"icon": "🧮", "title": "What you got right", "text": "Trusted historical patterns over real-time fear. Most experienced investors still panic-sell during real crashes."},
                {"icon": "⚠️", "title": "Your blind spot", "text": "Overconfidence. Every 'this time is different' has humbled smart investors. Diversification is your hedge against your own certainty."},
                {"icon": "🎯", "title": "Next level", "text": "60% index funds, 30% sector/mid-cap, 10% individual stocks. Rebalance annually. This is how wealth is actually built."}
            ],
            "actionItems": ["Build: 60% Nifty 50, 30% sector funds, 10% stocks", "Annual rebalancing reminder every January", "Read: The Psychology of Money by Morgan Housel"],
            "sipSuggestion": "₹5,000/month: ₹3,000 Nifty 50 + ₹1,500 Nifty Next 50 + ₹500 in one sector you understand.",
            "source": "static"
        },
    }

    key = (profile, decision)
    if key in debriefs:
        return debriefs[key]

    return {
        "headline": "Every simulation teaches you something about yourself.",
        "summary": f"Your ₹{round(investment):,} ended at ₹{round(final_value):,} — a return of {return_pct:.1f}%. The most important lesson is understanding why you made the decisions you did.",
        "insights": [
            {"icon": "📊", "title": "The data", "text": "Nifty 50 has never given negative returns over any 10-year period in history. Time is your most powerful tool."},
            {"icon": "🧠", "title": "The psychology", "text": "Most investing mistakes are emotional, not analytical. This simulation helped you understand your own reactions."},
            {"icon": "🚀", "title": "The action", "text": "Start a SIP today. ₹500/month for 20 years grows to ₹5 lakh. The math works — the only variable is whether you start."}
        ],
        "actionItems": ["Start ₹500/month Nifty 50 SIP today", "Review portfolio every 6 months only", "Never invest money you need within 2 years"],
        "sipSuggestion": "₹500/month in UTI Nifty 50 Index Fund. Increase by ₹500 every year.",
        "source": "static"
    }


# ─── SIP CALCULATOR ────────────────────────────────────────────────────

@app.post("/api/sip")
def sip_calculator(req: SIPRequest):
    results = []
    for years in [5, 10, 15, 20, 25, 30]:
        result = calculate_sip_returns(req.monthlyAmount, req.annualReturn, years)
        results.append(result)
    return {"monthlyAmount": req.monthlyAmount, "annualReturn": req.annualReturn, "projections": results}
