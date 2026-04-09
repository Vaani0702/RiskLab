import React, { useState } from 'react';

const TIMELINE = [
  {
    year: '1602',
    era: 'The Beginning',
    title: 'World\'s first stock exchange',
    location: 'Amsterdam, Netherlands',
    body: 'The Dutch East India Company (VOC) became the first company to issue shares to the public. Merchants who funded the company\'s risky voyages received a proportional share of the profits. The Amsterdam Stock Exchange was born — and so was modern investing. For the first time, ordinary people could own a piece of a company without sailing the ship themselves.',
    impact: 'Invented the concept of publicly traded shares',
    color: '#A78BFA',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    tag: 'World First',
  },
  {
    year: '1792',
    era: 'American Markets',
    title: 'The Buttonwood Agreement',
    location: 'New York, USA',
    body: '24 stockbrokers signed an agreement under a buttonwood tree on Wall Street, agreeing to trade securities only with each other and to set fixed commissions. This informal pact became the New York Stock Exchange (NYSE) — now the world\'s largest stock exchange with over $25 trillion in listed securities.',
    impact: 'Founded the NYSE — world\'s largest exchange',
    color: '#60A5FA',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    tag: 'NYSE Founded',
  },
  {
    year: '1875',
    era: 'India\'s Turn',
    title: 'Bombay Stock Exchange established',
    location: 'Mumbai, India',
    body: 'Under a banyan tree on Dalal Street, Premchand Roychand and a group of stockbrokers began trading. This grew into the Bombay Stock Exchange (BSE) — Asia\'s oldest stock exchange. India\'s capital markets were born 122 years before economic liberalization would unleash their full potential.',
    impact: 'Asia\'s oldest stock exchange, est. 1875',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80',
    tag: 'India Milestone',
  },
  {
    year: '1929',
    era: 'The Great Crash',
    title: 'Black Tuesday — markets collapse',
    location: 'New York, USA',
    body: 'On October 29, 1929, the US stock market lost 12% in a single day. Billions of dollars in wealth evaporated. Banks collapsed. Unemployment hit 25%. The Great Depression followed for a decade. Critically: markets eventually recovered. The Dow Jones hit new all-time highs by 1954. Investors who held through the crash recovered everything — those who sold, didn\'t.',
    impact: 'Markets fell 89%. Recovered in 25 years.',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80',
    tag: 'Great Crash',
  },
  {
    year: '1949',
    era: 'The Philosophy',
    title: 'Benjamin Graham publishes The Intelligent Investor',
    location: 'New York, USA',
    body: 'Benjamin Graham — Warren Buffett\'s mentor — published the book that defined value investing. His core idea: the stock market is a voting machine in the short term and a weighing machine in the long term. Buy businesses below their intrinsic value and hold patiently. Warren Buffett called it "the best book about investing ever written."',
    impact: 'Warren Buffett calls it the greatest investing book',
    color: '#10B981',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    tag: 'Value Investing',
  },
  {
    year: '1971',
    era: 'Digital Markets',
    title: 'NASDAQ — the world\'s first electronic exchange',
    location: 'New York, USA',
    body: 'NASDAQ launched as the world\'s first electronic stock market. No trading floor. No phone calls between brokers. For the first time, stock prices were displayed electronically. This paved the way for every modern trading platform, from Zerodha to Robinhood. The concept of clicking a button to buy a stock was born here.',
    impact: 'First electronic exchange — enabled online trading',
    color: '#6366F1',
    img: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&q=80',
    tag: 'Digital Revolution',
  },
  {
    year: '1991',
    era: 'India Liberalizes',
    title: 'India opens its economy',
    location: 'New Delhi, India',
    body: 'Finance Minister Manmohan Singh presented a historic budget that dismantled the License Raj and opened India\'s economy to the world. Foreign investment was allowed. Private companies could expand freely. The BSE Sensex was at around 1,000 points in 1991. By 2024, it crossed 80,000. That is an 80x return over 33 years — a testament to what economic growth does to stock markets.',
    impact: 'Sensex: 1,000 in 1991 → 80,000 in 2024',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?w=600&q=80',
    tag: 'India Milestone',
  },
  {
    year: '1993',
    era: 'India\'s Modern Market',
    title: 'NSE founded — technology meets trading',
    location: 'Mumbai, India',
    body: 'The National Stock Exchange was founded to bring transparency and technology to Indian markets. NSE introduced screen-based electronic trading across India, replacing the open-outcry system. It became the world\'s largest derivatives exchange by volume. The Nifty 50 index was created in 1996 — it is now the benchmark for all of Indian investing.',
    impact: 'Created the Nifty 50 — India\'s investing benchmark',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1642790551116-18e4f3dcc0e6?w=600&q=80',
    tag: 'India Milestone',
  },
  {
    year: '2000',
    era: 'The Dot-com Bubble',
    title: 'Internet mania and the crash that followed',
    location: 'Global',
    body: 'Valuations of internet companies went to absurd levels. Companies with no revenue were worth billions. NASDAQ peaked at 5,048 in March 2000, then crashed 78% over the next two years. Yet the internet itself was real — Amazon, Google, and Apple all survived and went on to become the most valuable companies in history. Lesson: the technology was right, the timing was wrong.',
    impact: 'NASDAQ fell 78%. Then rose 1,500% from the bottom.',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    tag: 'Crash & Recovery',
  },
  {
    year: '2008',
    era: 'Global Financial Crisis',
    title: 'Lehman Brothers collapses',
    location: 'Global',
    body: 'The US housing bubble burst. Banks that had bet massively on mortgage-backed securities collapsed. Lehman Brothers — a 158-year-old firm — filed for bankruptcy. Global markets fell 50-60%. India\'s Sensex dropped from 21,000 to 8,000. Then: the greatest bull market in history began. By 2024, every index was at all-time highs. Every investor who held through, won.',
    impact: 'Markets fell 60%. Then rose 1,000% from bottom.',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    tag: 'Global Crisis',
  },
  {
    year: '2010',
    era: 'India Goes Digital',
    title: 'Zerodha founded — democratizing investing',
    location: 'Bengaluru, India',
    body: 'Nithin Kamath founded Zerodha with one mission: make investing accessible to ordinary Indians. They introduced zero brokerage on equity delivery and flat fees on intraday. By 2021, Zerodha had more active clients than any other broker in India. Groww, Upstox, and others followed. For the first time, a college student with ₹500 could invest in Nifty 50 from their phone.',
    impact: 'Made investing accessible to 130 crore Indians',
    color: '#10B981',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    tag: 'India Milestone',
  },
  {
    year: '2020',
    era: 'COVID Crash',
    title: 'Pandemic sends markets into freefall',
    location: 'Global',
    body: 'COVID-19 was declared a pandemic in March 2020. Global markets fell 35-40% in 30 days — the fastest crash in market history. India\'s Nifty 50 dropped from 12,000 to 7,500. Panic was everywhere. Experts predicted years of recovery. Instead: by December 2020, the Nifty had fully recovered and hit new all-time highs. The fastest crash in history became the fastest recovery.',
    impact: 'Fell 40% in 30 days. Recovered in 8 months.',
    color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=80',
    tag: 'COVID Crash',
  },
  {
    year: '2024',
    era: 'Today',
    title: 'India\'s demat accounts cross 15 crore',
    location: 'India',
    body: 'India now has over 15 crore (150 million) demat accounts — up from 4 crore in 2019. Monthly SIP inflows crossed ₹20,000 crore. Young investors aged 18-35 are the fastest growing demographic. The Sensex crossed 80,000. Nifty crossed 24,000. India is the fastest-growing major economy in the world. For the first time in history, ordinary Indians are participating in their country\'s growth through the stock market.',
    impact: '15 crore investors. SIPs crossing ₹20,000 Cr/month.',
    color: '#10B981',
    img: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?w=600&q=80',
    tag: 'Present Day',
  },
];

const KEY_FACTS = [
  { label: 'First stock exchange', value: '1602', sub: 'Amsterdam' },
  { label: 'BSE founded', value: '1875', sub: 'Asia\'s oldest' },
  { label: 'India liberalized', value: '1991', sub: 'Changed everything' },
  { label: 'Nifty 50 created', value: '1996', sub: 'The benchmark' },
  { label: 'Zerodha founded', value: '2010', sub: 'Access for all' },
  { label: 'Demat accounts', value: '15 Cr+', sub: 'India 2024' },
];

export default function HistoryPage({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 62, paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80"
          alt="Stock market history"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,11,15,0.5) 0%, rgba(9,11,15,0.92) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '0 0 48px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', width: '100%' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.12em', marginBottom: 12 }}>
              HISTORY OF INVESTING
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#fff' }}>
              From Dutch spice ships<br />to your phone screen.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 560, lineHeight: 1.7 }}>
              422 years of markets, crashes, recoveries, and the relentless story of how ordinary people learned to grow wealth.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Key facts strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, margin: '36px 0' }}>
          {KEY_FACTS.map(f => (
            <div key={f.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--accent-green)', lineHeight: 1 }}>{f.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, marginTop: 6 }}>{f.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{f.sub}</div>
            </div>
          ))}
        </div>

        {/* The one lesson panel */}
        <div style={{ background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', borderRadius: 16, padding: '24px 28px', marginBottom: 48, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>THE ONE LESSON FROM ALL 422 YEARS</div>
            <p style={{ fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>
              Every single crash in recorded market history has recovered and gone on to new highs. Every one. Without exception. The only investors who permanently lost money were those who sold during the panic.
            </p>
          </div>
          <button onClick={() => onNavigate('simulator')} style={{ padding: '12px 24px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
            Experience a crash live
          </button>
        </div>

        {/* Timeline */}
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 28 }}>
          TIMELINE — 1602 TO PRESENT
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 2, background: 'var(--border-card)', borderRadius: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((item, i) => {
              const isOpen = expanded === i;
              return (
                <div key={i} style={{ display: 'flex', gap: 24, paddingBottom: 32, cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : i)}>
                  {/* Dot + year */}
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, border: '2px solid var(--bg-primary)', zIndex: 1, flexShrink: 0 }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, background: isOpen ? 'var(--bg-card)' : 'transparent', border: `1px solid ${isOpen ? 'var(--border-card)' : 'transparent'}`, borderRadius: 14, padding: isOpen ? '20px 24px' : '4px 0', transition: 'all 0.2s' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 22, fontWeight: 700, color: item.color, lineHeight: 1 }}>{item.year}</span>
                          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: `${item.color}20`, color: item.color, fontFamily: 'DM Mono, monospace', fontWeight: 600 }}>{item.tag}</span>
                        </div>
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</h3>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{item.location} · {item.era}</div>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4, flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <div style={{ marginTop: 20 }}>
                        {/* Image */}
                        <div style={{ borderRadius: 12, overflow: 'hidden', height: 200, marginBottom: 20, position: 'relative' }}>
                          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,11,15,0.3) 0%, transparent 60%)' }} />
                        </div>
                        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16 }}>{item.body}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: `${item.color}15`, border: `1px solid ${item.color}40`, borderRadius: 8 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: item.color, fontWeight: 600 }}>{item.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, overflow: 'hidden', marginTop: 24 }}>
          <img src="https://images.unsplash.com/photo-1642790551116-18e4f3dcc0e6?w=1200&q=80" alt="Modern markets" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '28px 32px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>You are living through the next chapter.</h3>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, maxWidth: 560 }}>
              India in 2024 is at the same inflection point the US was in the 1950s. 15 crore investors. A growing middle class. Digital infrastructure. This is the beginning — not the end. The question is whether you participate.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('learn')} style={{ padding: '12px 24px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Start learning
              </button>
              <button onClick={() => onNavigate('simulator')} style={{ padding: '12px 24px', borderRadius: 10, background: 'var(--bg-glass)', border: '1px solid var(--border-card)', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, cursor: 'pointer' }}>
                Try the simulator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
