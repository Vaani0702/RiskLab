import React, { useState, useEffect } from 'react';

const MARKET_DATA = [
  { name: 'Nifty 50', value: '22,147.90', change: '+1.24%', up: true, desc: 'India top 50 companies' },
  { name: 'Sensex', value: '73,088.33', change: '+1.18%', up: true, desc: 'BSE top 30 companies' },
  { name: 'Nifty Bank', value: '47,632.10', change: '-0.34%', up: false, desc: 'Top banking stocks' },
  { name: 'Gold (MCX)', value: '₹71,240', change: '+0.67%', up: true, desc: 'Per 10 grams' },
  { name: 'USD/INR', value: '83.42', change: '+0.12%', up: false, desc: 'Dollar to Rupee' },
  { name: 'Crude Oil', value: '$82.14', change: '-1.03%', up: false, desc: 'Brent per barrel' },
];

const FACTS = [
  { icon: '🇮🇳', title: 'India GDP Growth', value: '7.3%', sub: 'Fastest major economy in 2024', color: 'var(--accent-green)' },
  { icon: '📈', title: 'Nifty 50 CAGR', value: '12.4%', sub: '20-year average annual return', color: 'var(--accent-green)' },
  { icon: '👥', title: 'Demat Accounts', value: '13.5 Cr+', sub: 'Active investors in India', color: '#A78BFA' },
  { icon: '💰', title: 'SIP Inflows', value: '₹19,000 Cr', sub: 'Monthly SIP contributions 2024', color: 'var(--accent-amber)' },
  { icon: '🏦', title: 'MF Industry AUM', value: '₹53 Lakh Cr', sub: 'Total mutual fund assets', color: '#60A5FA' },
  { icon: '📉', title: 'Retail Loss Rate', value: '~89%', sub: 'F&O traders lose money (SEBI data)', color: 'var(--accent-red)' },
];

const NEWS = [
  { headline: 'RBI holds repo rate at 6.5% for 6th straight meeting', time: '2h ago', tag: 'RBI', tagColor: '#60A5FA' },
  { headline: 'Nifty 50 hits fresh all-time high driven by IT and banking stocks', time: '4h ago', tag: 'Markets', tagColor: 'var(--accent-green)' },
  { headline: 'SIP inflows cross ₹19,000 crore mark for 3rd consecutive month', time: '6h ago', tag: 'Mutual Funds', tagColor: '#A78BFA' },
  { headline: 'SEBI tightens F&O norms — minimum contract size raised to ₹15 lakh', time: '1d ago', tag: 'SEBI', tagColor: 'var(--accent-amber)' },
  { headline: 'Gold surges to all-time high of ₹71,400/10g on global uncertainty', time: '1d ago', tag: 'Gold', tagColor: '#FFD700' },
  { headline: 'Smallcap index up 35% in FY24 — analysts warn of overvaluation', time: '2d ago', tag: 'Analysis', tagColor: 'var(--accent-red)' },
];

const CRASHLOG = [
  { year: '2020', event: 'COVID-19 Crash', drop: '-38%', recovery: '8 months', color: 'var(--accent-amber)' },
  { year: '2015', event: 'China Slowdown', drop: '-22%', recovery: '14 months', color: '#60A5FA' },
  { year: '2008', event: 'Global Financial Crisis', drop: '-60%', recovery: '24 months', color: 'var(--accent-red)' },
  { year: '2004', event: 'Election Shock', drop: '-28%', recovery: '6 months', color: '#A78BFA' },
  { year: '2000', event: 'Dot-com Bust', drop: '-55%', recovery: '36 months', color: 'var(--accent-red)' },
];

function Ticker() {
  const items = [...MARKET_DATA, ...MARKET_DATA];
  return (
    <div style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '8px 0' }}>
      <div style={{ display: 'flex', gap: 40, animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap' }}>
        {items.map((m, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{m.name}</span>
            <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{m.value}</span>
            <span style={{ color: m.up ? 'var(--accent-green)' : 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{m.change}</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

export default function MarketsPage({ onNavigate }) {
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ minHeight: '100vh', paddingTop: 62, paddingBottom: 60 }}>
      <Ticker />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.1em' }}>MARKETS OVERVIEW</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,5vw,44px)', fontWeight: 800, marginBottom: 10 }}>Indian Markets at a Glance</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Data, context, and crash history — everything to understand the market before you simulate.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0 }}>
          {[['overview','Overview'],['crashlog','Crash Log'],['news','Market News']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 18px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: tab===id ? 600 : 400, background: 'transparent', color: tab===id ? 'var(--accent-green)' : 'var(--text-secondary)', borderBottom: tab===id ? '2px solid var(--accent-green)' : '2px solid transparent', transition: 'all 0.18s', marginBottom: -1 }}>
              {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <>
            {/* Index cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
              {MARKET_DATA.map((m, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 18, transition: 'var(--transition)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-card)'}
                >
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{m.desc.toUpperCase()}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: m.up ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>{m.change}</div>
                </div>
              ))}
            </div>

            {/* Key stat cards */}
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 14, letterSpacing: '0.08em' }}>KEY MARKET FACTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 36 }}>
              {FACTS.map((f, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{f.title.toUpperCase()}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: f.color, lineHeight: 1 }}>{f.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: 'var(--radius-xl)', padding: 28, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Ready to simulate a crash?</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>See how Nifty 50's COVID crash plays out week by week — and test if you'd hold or panic.</p>
              </div>
              <button onClick={() => onNavigate('simulator')} style={{ padding: '12px 24px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                Launch Simulator →
              </button>
            </div>
          </>
        )}

        {/* CRASH LOG */}
        {tab === 'crashlog' && (
          <div>
            <div style={{ padding: '14px 18px', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.12)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
              📖 Every single crash below fully recovered and went on to new highs. This is not optimism — it is the historical record of Nifty 50.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CRASHLOG.map((c, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'grid', gridTemplateColumns: '80px 1fr auto auto', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-muted)' }}>{c.year}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{c.event}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nifty 50 crash</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: 'var(--accent-red)' }}>{c.drop}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MAX DROP</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--accent-green)' }}>{c.recovery}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RECOVERY</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS */}
        {tab === 'news' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>Note: Sample headlines for demo purposes</div>
            {NEWS.map((n, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'var(--transition)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-card)'; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, lineHeight: 1.4 }}>{n.headline}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', color: n.tagColor, fontFamily: 'var(--font-mono)' }}>{n.tag}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
