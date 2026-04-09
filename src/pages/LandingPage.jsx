import React, { useState, useEffect } from 'react';

const TICKER_ITEMS = [
  { label: 'NFLX', value: '-76%', color: '#FF4444', sub: '2022 crash' },
  { label: 'NIFTY', value: '-38%', color: '#FF9500', sub: 'COVID 2020' },
  { label: 'SENSEX', value: '-60%', color: '#FF4444', sub: 'GFC 2008' },
  { label: 'GOLD', value: '+28%', color: '#00D68F', sub: 'COVID 2020' },
  { label: 'RECOVERY', value: '100%', color: '#00D68F', sub: 'all crashes' },
];

const STATS = [
  { number: '₹7,000', label: 'Where ₹10,000 goes in a crash', color: '#FF4444' },
  { number: '10Y', label: 'Nifty 50 never negative over any 10-year span', color: '#00D68F' },
  { number: '80%', label: 'Retail investors who panic sell at the bottom', color: '#FF9500' },
];

const PATHS = [
  {
    id: 'scared',
    icon: '😰',
    title: 'I know basics but I\'m scared to invest',
    subtitle: 'Take the fear quiz. Discover your investor type.',
    tag: 'MOST POPULAR',
    tagColor: '#00D68F',
    tagBg: 'rgba(0,214,143,0.12)',
    description: '20 psychology questions reveal whether you\'d panic-sell, freeze, or buy the dip during a real crash.',
    cta: 'Start Fear Assessment →',
  },
  {
    id: 'zero',
    icon: '🌱',
    title: 'I know nothing about investing',
    subtitle: 'Start from zero. No jargon. Just experience.',
    tag: 'BEGINNER',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59,130,246,0.12)',
    description: 'Learn what stocks are, why markets crash, and how ₹500/month can become ₹3.8L — before risking a rupee.',
    cta: 'Start from zero →',
  },
  {
    id: 'advanced',
    icon: '📉',
    title: 'I invest but make emotional decisions',
    subtitle: 'Skip the quiz. Go straight to the simulator.',
    tag: 'ADVANCED',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.12)',
    description: 'Relive real crashes — Netflix 2022, Nifty COVID — and see exactly how much your panic decisions cost you.',
    cta: 'Enter simulator →',
  }
];

export default function LandingPage({ onSelectPath }) {
  const [hovered, setHovered] = useState(null);
  const [tickerPos, setTickerPos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerPos(p => p - 1), 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <div style={{ paddingTop: 110, paddingBottom: 80 }}>
        <div className="container">
          <div className="animate-fade-up" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.25)',
              fontSize: 11, fontFamily: 'var(--font-mono)', color: '#FF4D4D',
              marginBottom: 32, letterSpacing: '0.12em'
            }}>
              ⚡ LIVE CRASH SIMULATOR — POWERED BY REAL MARKET DATA
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 7vw, 82px)',
              fontWeight: 900,
              lineHeight: 0.95,
              marginBottom: 28,
              letterSpacing: '-0.03em',
            }}>
              Most investors{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                panic sell.
              </span>
              <br />
              Will you?
            </h1>

            <p style={{
              fontSize: 19, color: 'var(--text-secondary)',
              maxWidth: 540, margin: '0 auto 16px',
              lineHeight: 1.65
            }}>
              Experience real market crashes safely. Discover your investor psychology.
              See exactly what fear costs you — in rupees.
            </p>

            {/* Ticker Strip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              justifyContent: 'center', marginTop: 36, flexWrap: 'wrap'
            }}>
              {TICKER_ITEMS.map(t => (
                <div key={t.label} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 16px', borderRadius: 8,
                  background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                }}>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>{t.label}</span>
                    <span style={{ fontSize: 12, color: t.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{t.value}</span>
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '28px 0',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900,
                  color: s.color, lineHeight: 1, marginBottom: 8
                }}>{s.number}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Path Selection */}
      <div style={{ paddingTop: 70, paddingBottom: 80 }}>
        <div className="container">
          <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{
              fontSize: 12, color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 14
            }}>
              — CHOOSE YOUR PATH —
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, lineHeight: 1.2 }}>
              Where do you start?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, maxWidth: 1040, margin: '0 auto' }}>
            {PATHS.map((path, idx) => (
              <button
                key={path.id}
                onClick={() => onSelectPath(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === path.id ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: `1px solid ${hovered === path.id ? 'rgba(255,255,255,0.14)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-lg)', padding: 28, textAlign: 'left',
                  cursor: 'pointer', transition: 'var(--transition)',
                  transform: hovered === path.id ? 'translateY(-6px)' : 'none',
                  boxShadow: hovered === path.id ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {hovered === path.id && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${path.tagColor}08, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{ fontSize: 40, marginBottom: 16 }}>{path.icon}</div>
                <div style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                  background: path.tagBg, color: path.tagColor,
                  fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em',
                  marginBottom: 14,
                }}>
                  {path.tag}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
                  color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3
                }}>{path.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                  {path.description}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: path.tagColor, fontWeight: 600
                }}>
                  {path.cta}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Social proof / footer */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '32px 0', textAlign: 'center',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div className="container">
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            RiskLab — Behavioral Finance Simulator · Built for Finvasia Innovation Hackathon 2026<br/>
            <span style={{ fontSize: 11 }}>Not financial advice. All scenarios use historical market data for educational simulation.</span>
          </p>
        </div>
      </div>
    </div>
  );
}