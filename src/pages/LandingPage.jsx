import React, { useState } from 'react';

const STATS = [
  { number: '15 Cr+', label: 'Indians now invest in stock market' },
  { number: '12.4%', label: 'Nifty 50 average annual return (20 years)' },
  { number: '0', label: 'Negative 10-year periods in Nifty 50 history' },
  { number: '₹500', label: 'Minimum to start a SIP today' },
];

const PATHS = [
  {
    id: 'zero',
    title: 'I know nothing about investing',
    subtitle: 'Start from zero. No jargon. No assumptions.',
    tag: 'GROUND ZERO',
    tagColor: 'var(--accent-green)',
    tagBg: 'var(--accent-green-dim)',
    description: 'We teach you everything — inflation, stocks, mutual funds, SIPs — using plain analogies. Chhole bhature and dosa stalls, not Wall Street jargon.',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80',
  },
  {
    id: 'scared',
    title: 'I know basics but I\'m scared to start',
    subtitle: 'Discover your investor personality first.',
    tag: 'FEAR MODE',
    tagColor: 'var(--accent-amber)',
    tagBg: 'var(--accent-amber-dim)',
    description: 'Take the 5-question fear quiz. Find out exactly what kind of investor you are. Then simulate a real crash to see how you\'d actually behave.',
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80',
  },
  {
    id: 'advanced',
    title: 'I invest but keep making bad decisions',
    subtitle: 'Diagnose the problem. Fix it with data.',
    tag: 'ADVANCED',
    tagColor: '#A78BFA',
    tagBg: 'rgba(167,139,250,0.12)',
    description: 'Skip straight to the Time Machine simulator. See exactly what your panic decisions would cost you in rupees — with real historical data.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
  },
];

const FACTS = [
  'The Sensex was 1,000 in 1991. It crossed 80,000 in 2024. That is 80x in 33 years.',
  'SIP of ₹500/month for 20 years at 12% = ₹3.8 lakh from ₹1.2 lakh invested.',
  'Nifty 50 has NEVER given negative returns over any 10-year holding period in history.',
  '89% of retail F&O traders lose money. Index fund investors win over time.',
  'Warren Buffett made 99% of his wealth after age 52. Time beats timing every time.',
  'India will be the 3rd largest economy by 2030. Nifty 50 will reflect this growth.',
];

export default function LandingPage({ onSelectPath }) {
  const [hovered, setHovered] = useState(null);
  const [factIdx, setFactIdx] = useState(0);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>

      {/* Hero with image */}
      <div style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1642790551116-18e4f3dcc0e6?w=1600&q=80"
            alt="Stock market"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 30%, transparent 70%, var(--bg-primary) 100%)' }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="animate-fade-up">
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.12em', marginBottom: 20, textTransform: 'uppercase' }}>
              India's investing simulator
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Stop fearing money.<br />
              <span style={{ color: 'var(--accent-green)' }}>Start living through it.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
              RiskLab lets you experience real market crashes — safely — before risking a single rupee. No jargon. Just experience.
            </p>

            {/* Rotating fact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, maxWidth: 580, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', flexShrink: 0 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', flex: 1, lineHeight: 1.5 }}>{FACTS[factIdx]}</p>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {FACTS.map((_, i) => (
                  <button key={i} onClick={() => setFactIdx(i)} style={{ width: i === factIdx ? 16 : 5, height: 5, borderRadius: 3, background: i === factIdx ? 'var(--accent-green)' : 'var(--border-card)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 60 }}>
          {STATS.map((s, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--accent-green)', lineHeight: 1, marginBottom: 8 }}>{s.number}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Path selection */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 20, textTransform: 'uppercase' }}>
            Where do you start?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {PATHS.map((path, i) => {
              const isHov = hovered === path.id;
              return (
                <button key={path.id} onClick={() => onSelectPath(path.id)} onMouseEnter={() => setHovered(path.id)} onMouseLeave={() => setHovered(null)}
                  style={{ background: 'var(--bg-card)', border: `1px solid ${isHov ? 'var(--border-card)' : 'var(--border-subtle)'}`, borderRadius: 20, overflow: 'hidden', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', transform: isHov ? 'translateY(-4px)' : 'none', boxShadow: isHov ? '0 20px 40px rgba(0,0,0,0.15)' : 'none' }}>
                  {/* Image */}
                  <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                    <img src={path.img} alt={path.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: isHov ? 'scale(1.05)' : 'scale(1)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--bg-card) 100%)' }} />
                    <div style={{ position: 'absolute', top: 14, left: 14, padding: '3px 10px', borderRadius: 100, background: path.tagBg, color: path.tagColor, fontSize: 10, fontFamily: 'DM Mono, monospace', fontWeight: 700, letterSpacing: '0.08em' }}>
                      {path.tag}
                    </div>
                  </div>
                  {/* Text */}
                  <div style={{ padding: '16px 22px 22px' }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>{path.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{path.description}</p>
                    <span style={{ fontSize: 13, color: path.tagColor, fontWeight: 600 }}>Start here →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom image banner */}
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginTop: 56, height: 220 }}>
          <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1400&q=80" alt="India markets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.5) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 40px' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(18px,3vw,28px)', fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>
                The Bombay Stock Exchange.<br />Asia's oldest. Est. 1875.
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 380, lineHeight: 1.6, marginBottom: 16 }}>
                149 years of Indian market history. Liberalization. Crashes. Recoveries. All-time highs.
              </p>
              <button onClick={() => onSelectPath('zero')} style={{ padding: '10px 22px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Learn the full story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
