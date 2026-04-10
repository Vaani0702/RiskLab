import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FEAR_PROFILES, STOCKS } from '../data/marketData.js';

function fmt(n) { return '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN'); }
function pct(n) { return (n >= 0 ? '+' : '') + n.toFixed(1) + '%'; }

export default function ProfilePage({ simHistory, onStartNew, onNavigate }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>?</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Sign in to see your profile</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>Create a free account to track your simulations, P&L history, and achievements.</p>
          <button onClick={() => onNavigate('home')} style={{ padding: '12px 28px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Sign up free
          </button>
        </div>
      </div>
    );
  }

  // Calculate aggregate stats from simHistory
  const totalInvested = simHistory.reduce((a, s) => a + (s.investment || 0), 0);
  const totalFinal = simHistory.reduce((a, s) => a + (s.finalValue || 0), 0);
  const totalPnL = totalFinal - totalInvested;
  const holds = simHistory.filter(s => s.decision === 'hold').length;
  const sells = simHistory.filter(s => s.decision === 'sell').length;
  const bestSim = simHistory.length ? simHistory.reduce((best, s) => (s.returnPct > (best?.returnPct ?? -999) ? s : best), null) : null;
  const worstSim = simHistory.length ? simHistory.reduce((worst, s) => (s.returnPct < (worst?.returnPct ?? 999) ? s : worst), null) : null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Profile hero */}
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
          <img src="https://images.unsplash.com/photo-1642790551116-18e4f3dcc0e6?w=1200&q=60" alt="bg" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,11,15,0.85) 0%, rgba(9,11,15,0.4) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '2px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'Syne, sans-serif', flexShrink: 0 }}>
              {user.name[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{user.name}</h2>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'DM Mono, monospace' }}>{user.email} · Member since {user.joinDate}</div>
            </div>
            <button onClick={onStartNew} style={{ padding: '10px 20px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              + New Simulation
            </button>
          </div>
        </div>

        {/* Virtual balance summary */}
        {simHistory.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Total virtual invested', value: fmt(totalInvested), color: 'var(--text-primary)' },
              { label: 'Total virtual value', value: fmt(totalFinal), color: totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
              { label: 'Overall P&L', value: (totalPnL >= 0 ? '+' : '−') + fmt(totalPnL), color: totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
              { label: 'Simulations run', value: simHistory.length, color: 'var(--text-primary)' },
              { label: 'Times held', value: holds, color: 'var(--accent-green)' },
              { label: 'Times sold', value: sells, color: 'var(--accent-red)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Best/worst */}
        {simHistory.length >= 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {bestSim && (
              <div style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>BEST SIMULATION</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--accent-green)', marginBottom: 4 }}>{pct(bestSim.returnPct ?? 0)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{STOCKS.find(s => s.id === bestSim.stockId)?.name} · {bestSim.date}</div>
              </div>
            )}
            {worstSim && (
              <div style={{ background: 'var(--accent-red-dim)', border: '1px solid rgba(255,77,77,0.2)', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, color: 'var(--accent-red)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>WORST SIMULATION</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--accent-red)', marginBottom: 4 }}>{pct(worstSim.returnPct ?? 0)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{STOCKS.find(s => s.id === worstSim.stockId)?.name} · {worstSim.date}</div>
              </div>
            )}
          </div>
        )}

        {/* Simulation timeline */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>Simulation Timeline</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{simHistory.length} runs</div>
          </div>

          {simHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>—</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>No simulations yet. Run your first one to start tracking.</p>
              <button onClick={onStartNew} style={{ padding: '10px 22px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Run first simulation
              </button>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              {/* Timeline vertical line */}
              <div style={{ position: 'absolute', left: 19, top: 6, bottom: 6, width: 2, background: 'var(--border-card)', borderRadius: 1 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[...simHistory].reverse().map((sim, i) => {
                  const stock = STOCKS.find(s => s.id === sim.stockId);
                  const prof = FEAR_PROFILES[sim.profile];
                  const rPct = sim.returnPct ?? 0;
                  const pnl = sim.pnl ?? 0;
                  const isProfit = pnl >= 0;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: 24 }}>
                      {/* Dot */}
                      <div style={{ flexShrink: 0, paddingTop: 4 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: isProfit ? 'var(--accent-green)' : 'var(--accent-red)', border: '2px solid var(--bg-card)', zIndex: 1 }} />
                      </div>
                      {/* Card */}
                      <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 120 }}>
                          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{stock?.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{sim.date}</div>
                          {prof && <div style={{ fontSize: 11, color: prof.color, marginTop: 3, fontFamily: 'DM Mono, monospace' }}>{prof.name}</div>}
                        </div>
                        {/* P&L block */}
                        <div style={{ textAlign: 'right', minWidth: 120 }}>
                          {sim.investment && <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 2 }}>Invested: {fmt(sim.investment)}</div>}
                          {sim.finalValue && <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, fontWeight: 700, color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>Final: {fmt(sim.finalValue)}</div>}
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                            {isProfit ? '+' : '−'}{fmt(pnl)} ({pct(rPct)})
                          </div>
                        </div>
                        {/* Decision badge */}
                        <div style={{ padding: '5px 12px', borderRadius: 100, fontSize: 11, fontFamily: 'DM Mono, monospace', fontWeight: 700, background: sim.decision === 'hold' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)', color: sim.decision === 'hold' ? 'var(--accent-green)' : 'var(--accent-red)', flexShrink: 0 }}>
                          {sim.decision === 'hold' ? 'HELD' : 'SOLD'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Syne, sans-serif', marginBottom: 20 }}>Achievements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { label: 'First Launch', desc: 'Ran first simulation', unlocked: simHistory.length >= 1 },
              { label: 'Diamond Hands', desc: 'Held through a crash', unlocked: simHistory.some(s => s.decision === 'hold') },
              { label: 'Repeat Pilot', desc: 'Ran 3+ simulations', unlocked: simHistory.length >= 3 },
              { label: 'All Assets', desc: 'Tried all 3 assets', unlocked: new Set(simHistory.map(s => s.stockId)).size >= 3 },
              { label: 'Big Investor', desc: 'Invested ₹1L+ virtual', unlocked: simHistory.some(s => (s.investment || 0) >= 100000) },
              { label: 'Master Pilot', desc: '5+ simulations run', unlocked: simHistory.length >= 5 },
            ].map(a => (
              <div key={a.label} style={{ padding: 16, borderRadius: 12, textAlign: 'center', background: a.unlocked ? 'var(--accent-green-dim)' : 'var(--bg-secondary)', border: `1px solid ${a.unlocked ? 'rgba(0,214,143,0.2)' : 'var(--border-subtle)'}`, opacity: a.unlocked ? 1 : 0.4 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.unlocked ? 'var(--accent-green)' : 'var(--border-card)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, color: a.unlocked ? '#fff' : 'var(--text-muted)' }}>{a.unlocked ? '✓' : '—'}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: a.unlocked ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: 3 }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
