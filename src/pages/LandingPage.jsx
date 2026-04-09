import React, { useState } from 'react';

const PATHS = [
  {
    id: 'zero',
    icon: '🌱',
    title: 'I know nothing about investing',
    subtitle: 'Start from absolute zero. No jargon.',
    tag: 'GROUND ZERO',
    tagColor: 'var(--accent-green)',
    tagBg: 'var(--accent-green-dim)',
    description: 'We\'ll teach you everything — what a stock is, why markets crash, and how ₹500/month becomes ₹3.8L.',
    delay: 1,
  },
  {
    id: 'scared',
    icon: '😰',
    title: 'I know basics but I\'m scared to invest',
    subtitle: 'Skip the lessons, face your fear directly.',
    tag: 'FEAR MODE',
    tagColor: 'var(--accent-amber)',
    tagBg: 'var(--accent-amber-dim)',
    description: 'Take the fear quiz, discover your investor personality, then simulate a real crash safely.',
    delay: 2,
  },
  {
    id: 'advanced',
    icon: '📉',
    title: 'I invest but make bad decisions',
    subtitle: 'Diagnose why. Fix it with simulation.',
    tag: 'ADVANCED',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.12)',
    description: 'Skip straight to the simulator. See exactly what your panic decisions cost you in rupees.',
    delay: 3,
  }
];

export default function LandingPage({ onSelectPath }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 80 }}>
      <div className="container">
        {/* Hero */}
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 100,
            background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)',
            fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)',
            marginBottom: 28, letterSpacing: '0.1em'
          }}>
            ✈️ &nbsp; FLIGHT SIMULATOR FOR INVESTING
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: 20,
            letterSpacing: '-0.03em',
          }}>
            Stop fearing{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-green) 0%, #00A86B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              money.
            </span>
            <br />
            Start living through it.
          </h1>

          <p style={{
            fontSize: 18, color: 'var(--text-secondary)',
            maxWidth: 560, margin: '0 auto 16px',
            lineHeight: 1.7
          }}>
            RiskLab lets you live through real market crashes — safely —
            before risking a single rupee. No jargon. Just experience.
          </p>

          {/* Ticker strip */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 24, marginTop: 28, flexWrap: 'wrap'
          }}>
            {[
              { label: 'Netflix 2022', value: '-76%', color: 'var(--accent-red)' },
              { label: 'Nifty COVID', value: '-40%', color: 'var(--accent-amber)' },
              { label: 'Recovery rate', value: '100%', color: 'var(--accent-green)' },
            ].map(t => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 8,
                background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {t.label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: t.color }}>
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Path selection */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: 12, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center', marginBottom: 24,
            letterSpacing: '0.08em'
          }}>
            — FIRST, WHO ARE YOU? —
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => onSelectPath(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                className={`animate-fade-up animate-delay-${path.delay}`}
                style={{
                  background: hovered === path.id ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: `1px solid ${hovered === path.id ? 'rgba(255,255,255,0.14)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 28,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  transform: hovered === path.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hovered === path.id ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{path.icon}</div>

                <div style={{
                  display: 'inline-block',
                  padding: '3px 10px', borderRadius: 100,
                  background: path.tagBg, color: path.tagColor,
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  fontWeight: 600, letterSpacing: '0.1em',
                  marginBottom: 12,
                }}>
                  {path.tag}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18, fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 6, lineHeight: 1.3
                }}>
                  {path.title}
                </h3>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
                  {path.description}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: path.tagColor, fontWeight: 500
                }}>
                  Start here →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="animate-fade-up animate-delay-4" style={{
          display: 'flex', gap: 24, justifyContent: 'center',
          flexWrap: 'wrap', paddingTop: 40, paddingBottom: 40,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {[
            { number: '₹500', label: 'minimum to start investing' },
            { number: '10Y', label: 'zero negative returns in Nifty 50' },
            { number: '3', label: 'investor personalities identified' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28, fontWeight: 800,
                color: 'var(--accent-green)', lineHeight: 1
              }}>
                {s.number}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, maxWidth: 140 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
