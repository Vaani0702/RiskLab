# RiskLab Backend

FastAPI backend for RiskLab — the investing flight simulator.

## Setup

### 1. Prerequisites
- Python 3.11+
- pip

### 2. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at: https://console.anthropic.com/

> Note: The AI debrief works WITHOUT an API key — it falls back to pre-written personalized responses. Only the live AI generation requires the key.

### 4. Run the server

```bash
uvicorn main:app --reload
```

Server runs at: `http://localhost:8000`

### 5. Test it's working

Open your browser and go to:
- `http://localhost:8000` → health check
- `http://localhost:8000/docs` → interactive API documentation

---

## API Endpoints

### `GET /api/simulation/{stockId}`
Returns historical weekly price data.

**Stock IDs:** `nifty` | `netflix` | `gold`

```bash
curl http://localhost:8000/api/simulation/nifty
```

---

### `POST /api/montecarlo`
Runs 1,000 Monte Carlo scenarios.

```bash
curl -X POST http://localhost:8000/api/montecarlo \
  -H "Content-Type: application/json" \
  -d '{"stockId": "nifty", "investment": 100000, "years": 5}'
```

**Response:**
```json
{
  "zones": {
    "green":  { "count": 650, "pct": 65.0 },
    "yellow": { "count": 250, "pct": 25.0 },
    "red":    { "count": 100, "pct": 10.0 }
  },
  "percentiles": { "p10": 89000, "p50": 176000, "p90": 310000 },
  "fdFinal": 138000,
  "bins": [...],
  "yearlyPath": [...]
}
```

---

### `POST /api/debrief`
Returns AI-powered personalized investing debrief.

```bash
curl -X POST http://localhost:8000/api/debrief \
  -H "Content-Type: application/json" \
  -d '{
    "profile": "panic",
    "stockId": "nifty",
    "decision": "hold",
    "investment": 100000,
    "finalValue": 116000,
    "pnl": 16000,
    "returnPct": 16.0
  }'
```

---

### `POST /api/sip`
Calculate SIP projections.

```bash
curl -X POST http://localhost:8000/api/sip \
  -H "Content-Type: application/json" \
  -d '{"monthlyAmount": 500}'
```

---

## Project Structure

```
backend/
  main.py          ← FastAPI app and all API routes
  monte_carlo.py   ← Monte Carlo simulation engine (numpy)
  market_data.py   ← Historical crash data for all assets
  requirements.txt ← Python dependencies
  .env.example     ← Environment variable template
  .env             ← Your local env (never commit this)
  README.md        ← This file
```

## Running alongside the frontend

Keep two terminals open:

**Terminal 1 — Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd RiskLab
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`
