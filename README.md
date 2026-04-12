# RiskLab — The Flight Simulator for Investing

> "RiskLab doesn't show you the numbers. It makes you live through a crash safely."

**Built for Finvasia Innovation Hackathon 2026 · Problem Statement: PS3 — Investing Fear**  
**Team: Bold Rupee · Chitkara University, CSE (AI)**

---

## What is RiskLab?

Most young Indians want to invest but don't. Not because they lack money — because they're scared.

RiskLab is a **risk simulation sandbox** that lets you experience real historical market crashes week-by-week before risking a single rupee. You discover your investor personality, simulate crashes with virtual money, make real decisions with fake consequences, and get an AI-powered personalized debrief.

**We are not an education platform. We are a flight simulator for investing.**

---

## Live Demo

- **Frontend:** https://risklab.vercel.app
- **Backend API:** https://risklab-backend.onrender.com
- **API Docs:** https://risklab-backend.onrender.com/docs

---

## Key Features

| Feature | Description |
|---------|-------------|
| **3-Path Entry** | Separate journeys for beginners, scared investors, and experienced ones |
| **Ground Zero Mode** | GFG-style beginner guide — 6 chapters, quizzes after each, term links to dictionary |
| **Fear Quiz** | 5 questions identifying your investor personality (Panic Seller / Cautious Holder / Calculated Risk-Taker) |
| **Time Machine Simulator** | Week-by-week replay of real crashes with virtual money (Netflix 2022 −76%, Nifty COVID −40%) |
| **Sell or Hold Moment** | Simulation pauses at your panic point and forces a real decision |
| **Monte Carlo Loss Meter** | 1,000 Python/NumPy scenarios — Green/Yellow/Red zones, percentiles, FD comparison |
| **AI Portfolio Debrief** | Claude AI generates personalized coaching based on your exact numbers and behavior |
| **History Page** | 422-year investing timeline — Amsterdam 1602 to India 2024 |
| **Dark / Light Mode** | Full theme switching |
| **Real Auth + Database** | SQLite with hashed passwords and JWT session tokens |
| **P&L Tracking** | Every simulation saved with profit/loss, decision, and timeline in profile |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Recharts | Charts and data visualization |
| CSS Variables | Dark/light theme system |

### Backend
| Technology | Purpose |
|-----------|---------|
| Python 3.11 | Backend language |
| FastAPI | REST API framework |
| NumPy | Monte Carlo simulation (1,000 scenarios) |
| SQLite | User auth and simulation history database |
| Anthropic Claude API | AI-powered personalized debrief |
| JWT | Session token authentication |

---

## Project Structure

```
RiskLab/
├── src/                          # React frontend
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation with auth + theme toggle
│   │   └── AuthModal.jsx         # Login/signup modal
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state (backend + localStorage fallback)
│   │   └── ThemeContext.jsx      # Dark/light mode
│   ├── pages/
│   │   ├── LandingPage.jsx       # Home with 3-path entry
│   │   ├── GroundZeroPage.jsx    # GFG-style beginner guide
│   │   ├── FearQuizPage.jsx      # Investor personality quiz
│   │   ├── StockPickerPage.jsx   # Asset selection with profile warnings
│   │   ├── SimulatorPage.jsx     # Time Machine crash simulator
│   │   ├── LossMeterPage.jsx     # Monte Carlo loss probability meter
│   │   ├── DebriefPage.jsx       # AI personalized coaching
│   │   ├── LearnPage.jsx         # Dictionary, strategies, SIP guide
│   │   ├── MarketsPage.jsx       # Markets overview with crash log
│   │   ├── HistoryPage.jsx       # 422-year investing history timeline
│   │   └── ProfilePage.jsx       # P&L history, achievements, simulation timeline
│   ├── data/
│   │   └── marketData.js         # Historical crash data + fear profiles
│   ├── api.js                    # Frontend API service
│   ├── App.jsx                   # Main router
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Design system with dark/light variables
│
├── backend/                      # Python FastAPI backend
│   ├── main.py                   # All API routes
│   ├── monte_carlo.py            # NumPy Monte Carlo engine
│   ├── market_data.py            # Historical price data
│   ├── database.py               # SQLite setup
│   ├── auth.py                   # Password hashing + JWT
│   ├── requirements.txt          # Python dependencies
│   └── .env.example              # Environment variable template
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Running Locally

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Vaani0702/RiskLab.git
cd RiskLab
```

### 2. Set up the backend

```bash
cd backend
pip install -r requirements.txt
```

Copy the environment file:
```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_key_here
```

> The app works **without** an API key. The AI debrief falls back to pre-written personalized responses. Only live Claude generation requires the key. Get one free at console.anthropic.com.

Start the backend:
```bash
uvicorn main:app --reload
```

Backend: `http://localhost:8000`  
API docs: `http://localhost:8000/docs`

### 3. Set up the frontend

Open a **new terminal**:

```bash
cd RiskLab
npm install
npm run dev
```

Frontend: `http://localhost:5173`

### 4. Both must run simultaneously

Keep both terminals open. Frontend talks to backend automatically at `http://localhost:8000`.

---

## Environment Variables

### `backend/.env`
```
ANTHROPIC_API_KEY=     # From console.anthropic.com (optional — has fallback)
JWT_SECRET=            # Any long random string for token signing
```

See `backend/.env.example` for the full template.

### Frontend `.env` (optional — only needed for production)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/auth/register` | Create account — saves to SQLite |
| POST | `/api/auth/login` | Login, receive JWT token |
| GET | `/api/auth/me` | Get current user from token |
| GET | `/api/simulation/{stockId}` | Historical weekly crash data |
| POST | `/api/montecarlo` | Run 1,000 Monte Carlo scenarios |
| POST | `/api/debrief` | AI personalized debrief via Claude |
| POST | `/api/sip` | SIP return projections |
| POST | `/api/simulations` | Save simulation result to database |
| GET | `/api/simulations/{email}` | Get user's full simulation history |
| GET | `/api/assets` | List all available simulation assets |

---

## AI / ML Implementation

### 1. Monte Carlo Simulation (NumPy)
Runs 1,000 market scenarios using geometric Brownian motion. Weekly returns sampled from a normal distribution calibrated to historical asset volatility. Returns zone classification, percentiles, and histogram data.  
**File:** `backend/monte_carlo.py`

### 2. Anthropic Claude API
Sends the user's investor profile, asset, decision, and exact P&L numbers to Claude Sonnet. Receives a fully personalized coaching debrief. Falls back to pre-written responses if no API key.  
**File:** `backend/main.py` → `POST /api/debrief`  
**Model:** `claude-sonnet-4-6`

### 3. Fear Profile Classification
5-question weighted scoring quiz classifies users into: Panic Seller, Cautious Holder, or Calculated Risk-Taker. Profile personalizes every subsequent screen.  
**File:** `src/data/marketData.js`

> No pre-trained models are used. No model files need to be downloaded.

---

## Team

| Name | Roll Number |
|------|------------|
| Vaani Singh | 2410992911 |
| Niyati Aggarwal | 2410992825 |

Chitkara University, Punjab · Department of CSE (Artificial Intelligence)  
Finvasia Innovation Hackathon 2026 — Problem Statement PS3: Investing Fear

---

*This is a simulation tool for financial education. Not financial advice.*  
*~ Keep Evolving*
