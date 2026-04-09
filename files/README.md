# RiskLab 🚀
### The Flight Simulator for Investing

> "RiskLab doesn't show you the numbers. It makes you live through a crash safely."

Built for **Finvasia Innovation Hackathon 2026** · Problem Statement: PS3 — Investing Fear

---

## What is RiskLab?

Most young Indians want to invest but don't. Not because they lack money — because they're scared.

RiskLab is a **risk simulation sandbox** that lets you experience real historical market crashes week-by-week before risking a single rupee. You discover your investor personality, simulate crashes, make real decisions with fake consequences, and get AI-powered personalized feedback.

**We are not an education platform. We are a flight simulator for investing.**

---

## Key Features

- **3-Path Entry** — Different journeys for beginners, scared investors, and experienced ones
- **Ground Zero Mode** — Teaches investing from scratch using local analogies (chhole bhature, dosa stalls)
- **Fear Quiz** — 5 questions that identify your investor personality (Panic Seller / Cautious Holder / Calculated Risk-Taker)
- **Profile-Based Warnings** — AI cross-references your personality with your stock pick before simulation
- **Time Machine Simulator** — Week-by-week animation of real historical crashes (Netflix 2022, Nifty COVID 2020)
- **The Sell or Hold Moment** — Simulation pauses at your exact panic point and forces a real decision
- **Loss Probability Meter** — Monte Carlo simulation (1,000 scenarios) with Green/Yellow/Red zones
- **AI Portfolio Explainer** — Personalized debrief based on your profile + simulation result

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Charts | Recharts |
| Animations | Framer Motion, CSS |
| AI/ML | Anthropic Claude API (debrief), Monte Carlo (Python/JS) |
| Backend | Python + FastAPI |
| Data | Historical CSV data — Nifty 50, Netflix, Gold |

---

## Installation & Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Frontend

```bash
# Clone the repo
git clone https://github.com/<your-team>/risklab.git
cd risklab

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

App will be live at `http://localhost:5173`

### Backend (coming Day 2)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
```

API will be live at `http://localhost:8000`

---

## Project Structure

```
risklab/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx      # Entry + 3-path selection
│   │   ├── GroundZeroPage.jsx   # Beginner education chapters
│   │   ├── FearQuizPage.jsx     # 5-question personality quiz
│   │   ├── StockPickerPage.jsx  # Asset selection + warnings
│   │   ├── SimulatorPage.jsx    # Time Machine crash simulator
│   │   ├── LossMeterPage.jsx    # Monte Carlo probability meter
│   │   └── DebriefPage.jsx      # AI personalized debrief
│   ├── data/
│   │   └── marketData.js        # Historical crash data + profiles
│   ├── App.jsx                  # Main router
│   ├── main.jsx                 # Entry point
│   └── index.css                # Design system
├── index.html
├── vite.config.js
└── package.json
```

---

## Team

Built by **[Your Team Name]** for Finvasia Innovation Hackathon 2026
- Chitkara University · CSE (AI) Department

---

## Contact

evolveai@chitkara.edu.in · Goyam Jain: 97815-31234

⚠️ *This is a simulation tool for financial education. Not financial advice.*
