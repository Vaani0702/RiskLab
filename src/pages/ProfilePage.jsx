import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FEAR_PROFILES, STOCKS } from '../data/marketData.js';

export default function ProfilePage({ simHistory, onStartNew, onNavigate }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>👤</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Sign in to see your profile</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>Create a free account to track your simulations, see your investor profile, and unlock achievements.</p>
          <button onClick={() => onNavigate('home')} style={{ padding: '12px 28px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Sign up free →
          </button>
        </div>
      </div>
    );
  }

  const holds = simHistory.filter(s => s.decision === 'hold').length;
  const sells = simHistory.filter(s => s.decision === 'sell').length;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Profile card */}
        <div className="animate-fade-up" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 32, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '2px solid rgba(0,214,143,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{user.name}</h2>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{user.email} · Member since {user.joinDate}</div>
          </div>
          <button onClick={onStartNew} style={{ padding: '10px 22px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            + New Simulation
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Simulations', value: simHistory.length, icon: '🚀', color: 'var(--accent-green)' },
            { label: 'Times Held', value: holds, icon: '💎', color: '#A78BFA' },
            { label: 'Times Sold', value: sells, icon: '😰', color: 'var(--accent-red)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Simulation history */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>SIMULATION HISTORY</div>
          {simHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>No simulations yet.</p>
              <button onClick={onStartNew} style={{ padding: '10px 22px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Run first simulation →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {simHistory.map((sim, i) => {
                const stock = STOCKS.find(s => s.id === sim.stockId);
                const prof = FEAR_PROFILES[sim.profile];
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 22 }}>{stock?.icon}</div>
                    <div style={{ flex: 1, minWidth: 100 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{stock?.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{sim.date}</div>
                    </div>
                    <div style={{ fontSize: 12, color: prof?.color, fontFamily: 'var(--font-mono)' }}>{prof?.emoji} {prof?.name}</div>
                    <div style={{ padding: '4px 10px', borderRadius: 100, fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, background: sim.decision === 'hold' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)', color: sim.decision === 'hold' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {sim.decision === 'hold' ? '💎 HELD' : '😰 SOLD'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>ACHIEVEMENTS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { icon: '🚀', label: 'First Launch', unlocked: simHistory.length >= 1 },
              { icon: '💎', label: 'Diamond Hands', unlocked: simHistory.some(s => s.decision === 'hold') },
              { icon: '🔁', label: 'Repeat Pilot', unlocked: simHistory.length >= 3 },
              { icon: '🧠', label: 'Self-Aware', unlocked: simHistory.some(s => s.profile) },
              { icon: '🏆', label: 'All Assets', unlocked: new Set(simHistory.map(s => s.stockId)).size >= 3 },
              { icon: '📚', label: 'Learner', unlocked: false },
            ].map(a => (
              <div key={a.label} style={{ padding: 16, borderRadius: 'var(--radius-md)', textAlign: 'center', background: a.unlocked ? 'rgba(0,214,143,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${a.unlocked ? 'rgba(0,214,143,0.2)' : 'rgba(255,255,255,0.05)'}`, opacity: a.unlocked ? 1 : 0.35 }}>
                <div style={{ fontSize: 26, marginBottom: 8, filter: a.unlocked ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: a.unlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
