/**
 * RiskLab API Service
 * Connects the React frontend to the FastAPI backend.
 * Base URL: http://localhost:8000 in development
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function post(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

async function get(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─── API CALLS ────────────────────────────────────────────────────────

/**
 * Fetch historical simulation data for an asset
 * @param {string} stockId - 'nifty' | 'netflix' | 'gold'
 */
export async function fetchSimulationData(stockId) {
  return get(`/api/simulation/${stockId}`);
}

/**
 * Run Monte Carlo simulation
 * @param {string} stockId
 * @param {number} investment - starting amount in rupees
 * @param {number} years - simulation years (default 5)
 */
export async function runMonteCarlo({ stockId, investment, years = 5 }) {
  return post('/api/montecarlo', { stockId, investment, years, scenarios: 1000 });
}

/**
 * Get AI-powered personalized debrief
 * @param {Object} params - profile, stockId, decision, investment, finalValue, pnl, returnPct
 */
export async function getDebrief(params) {
  return post('/api/debrief', params);
}

/**
 * Get SIP projections for different time horizons
 * @param {number} monthlyAmount
 * @param {number} annualReturn - default 0.12 (12%)
 */
export async function getSIPProjections({ monthlyAmount, annualReturn = 0.12 }) {
  return post('/api/sip', { monthlyAmount, annualReturn });
}

/**
 * List all available simulation assets
 */
export async function listAssets() {
  return get('/api/assets');
}

/**
 * Health check
 */
export async function healthCheck() {
  return get('/');
}

/**
 * Save a simulation result to the database
 */
export async function saveSimulation(params) {
  try {
    return await post('/api/simulations', params);
  } catch (e) {
    console.warn('Could not save simulation to backend:', e.message);
    return null;
  }
}

/**
 * Get all simulations for a user from the database
 */
export async function getUserSimulations(email) {
  try {
    return await get(`/api/simulations/${encodeURIComponent(email)}`);
  } catch (e) {
    console.warn('Could not fetch simulations from backend:', e.message);
    return null;
  }
}
