import React, { useState, useMemo } from 'react';

const TERMS = [
  { term: 'Bear Market', cat: 'Market Terms', emoji: '🐻', short: 'Market falling 20%+ from recent highs', full: 'A bear market is when stock prices fall 20%+ from recent highs lasting at least 2 months. Investors panic and sell. Examples: COVID crash (2020), Dot-com bust (2000). Every bear market in Indian history has recovered — every single one.' },
  { term: 'Bull Market', cat: 'Market Terms', emoji: '🐂', short: 'Market rising 20%+ sustainably', full: 'A period of rising stock prices with 20%+ gains over months or years. India has been in a long-term structural bull market since 1991 liberalization, with brief bear interruptions.' },
  { term: 'Compound Interest', cat: 'Investing Basics', emoji: '📈', short: 'Earning returns on your returns', full: 'Einstein called it the 8th wonder of the world. ₹10,000 at 12% for 30 years = ₹2,99,600. The growth is explosive because returns earn returns earn returns. Start early — 10 years earlier makes a 3x difference at the end.' },
  { term: 'Diversification', cat: 'Strategy', emoji: '🎯', short: 'Don\'t put all eggs in one basket', full: 'Spread investments across assets so one crash doesn\'t destroy you. Index funds like Nifty 50 give you instant diversification across 50 companies with one investment.' },
  { term: 'Dividend', cat: 'Investing Basics', emoji: '💵', short: 'Company sharing profits with shareholders', full: 'When a company profits, it pays shareholders a dividend. Like owning part of Vaani\'s dosa stall — when she profits, you get your share. Some stocks pay 2–5% dividends annually.' },
  { term: 'ETF', cat: 'Instruments', emoji: '🏬', short: 'Basket of stocks traded like a single stock', full: 'Exchange Traded Fund. Nifty BeES is an ETF that tracks Nifty 50 — one purchase gives you all 50 companies. Very low fees, instant diversification, trades like a stock.' },
  { term: 'Fixed Deposit (FD)', cat: 'Instruments', emoji: '🏦', short: 'Guaranteed returns, usually below inflation', full: 'Lock money for a period at a guaranteed 6–7% rate. 100% safe but often loses real value after inflation and tax. Good for emergency funds, bad for long-term wealth.' },
  { term: 'Index Fund', cat: 'Instruments', emoji: '🇮🇳', short: 'Automatically tracks a market index', full: 'Copies a market index like Nifty 50. No fund manager — just buys all stocks in proportion. Result: 0.1% fees (vs 1–2% for active funds), beats 90% of active funds over 15 years. Best starting point for any investor.' },
  { term: 'Inflation', cat: 'Economics', emoji: '🍽️', short: 'Money losing purchasing power over time', full: 'India\'s average inflation is ~6%. A savings account at 3.5% means you\'re losing 2.5% real purchasing power every year. Chhole bhature: ₹30 in 2015, ₹100 today. Investing is the only defense.' },
  { term: 'IPO', cat: 'Market Terms', emoji: '🚀', short: 'Company listing on stock exchange for first time', full: 'Initial Public Offering. Can be exciting but risky — new companies have no public track record. Many IPOs underperform the index in year 1. Research deeply before applying.' },
  { term: 'Large Cap', cat: 'Market Terms', emoji: '🏢', short: 'Big, established, stable companies', full: 'Market cap above ₹20,000 crore. Think Reliance, TCS, HDFC Bank. More stable and less volatile than mid/small caps but lower growth potential. Nifty 50 is all large cap.' },
  { term: 'Liquidity', cat: 'Investing Basics', emoji: '💧', short: 'How quickly you can convert to cash', full: 'Stocks: sell in seconds (high liquidity). Real estate: months (low liquidity). FD: medium. Always keep 3–6 months expenses in liquid assets before investing.' },
  { term: 'Market Cap', cat: 'Market Terms', emoji: '💰', short: 'Total market value of a company', full: 'Share Price × Total Shares = Market Cap. Reliance: ~₹17 lakh crore. Large cap = safe, mid cap = growth, small cap = high risk/reward.' },
  { term: 'Mutual Fund', cat: 'Instruments', emoji: '👨‍💼', short: 'Pooled money professionally managed', full: 'Fund manager collects money from thousands, invests across stocks/bonds. You get diversification and professional management from ₹500. Types: Equity (stocks), Debt (bonds), Hybrid.' },
  { term: 'NAV', cat: 'Instruments', emoji: '📊', short: 'Price of one unit of a mutual fund', full: 'Net Asset Value. If fund assets = ₹100 crore and units = 1 crore, NAV = ₹100. When investments grow, NAV rises. You profit by selling units at higher NAV than purchase price.' },
  { term: 'P/E Ratio', cat: 'Strategy', emoji: '⚖️', short: 'How expensive a stock is vs its earnings', full: 'Price ÷ Earnings Per Share. If stock = ₹100, earnings = ₹5/year, P/E = 20. Lower P/E = potentially cheaper. Nifty 50 average P/E ~20. High P/E = high growth expectations.' },
  { term: 'Portfolio', cat: 'Investing Basics', emoji: '🗂️', short: 'Your complete investment collection', full: 'All investments together. Rule of thumb: (100 - age)% in equity, rest in debt. At 25: 75% equity, 25% debt. Review and rebalance annually.' },
  { term: 'Rebalancing', cat: 'Strategy', emoji: '🔁', short: 'Adjusting portfolio back to target allocation', full: 'Sell some winners, buy underperformers to maintain target allocation. Do annually — it forces buy low, sell high automatically.' },
  { term: 'SIP', cat: 'Instruments', emoji: '🔄', short: 'Fixed monthly investment, automated', full: 'Systematic Investment Plan. ₹500/month deducted automatically. Buys more units when cheap, fewer when expensive (rupee cost averaging). Removes emotion. ₹500/month × 20 years @ 12% = ₹3.8L from ₹1.2L invested.' },
  { term: 'Small Cap', cat: 'Market Terms', emoji: '🌱', short: 'Small companies — high risk and reward', full: 'Market cap below ₹5,000 crore. Can 10x but also can go to zero. Not a first investment. Start with Nifty 50, add max 10–15% small cap after gaining experience.' },
  { term: 'Stop Loss', cat: 'Strategy', emoji: '🛑', short: 'Auto-sell order to cap your losses', full: 'Pre-set instruction to sell if price falls below a level. Buy at ₹100, stop loss at ₹85 = max 15% loss. Good for individual stocks, not for long-term SIPs.' },
  { term: 'Volatility', cat: 'Market Terms', emoji: '📉', short: 'How much a price swings', full: 'Degree of price fluctuation. High volatility = big swings. Low = stable. For long-term investors volatility is an opportunity, not a risk. The real risk is permanent loss — which only happens if you sell.' },
  { term: 'XIRR', cat: 'Investing Basics', emoji: '🧮', short: 'Your actual annual return rate on SIPs', full: 'Extended Internal Rate of Return. The right way to measure SIP returns. Apps like Zerodha/Groww show XIRR automatically. 12% XIRR = 12% annual growth accounting for when each SIP was invested.' },
];

const STRATEGIES = [
  { title: 'SIP Strategy', icon: '🔄', risk: 'Low', time: '5–30 years', desc: 'Invest a fixed amount every month regardless of market. Buys more units cheap, fewer when expensive. Best for beginners. Start ₹500/month in Nifty 50.', steps: ['Open Zerodha or Groww', 'Choose Nifty 50 Index Fund', 'Set ₹500–₹5,000/month SIP', 'Never stop during crashes — that\'s when you buy cheap', 'Review every 6 months only'] },
  { title: 'Buy & Hold', icon: '💎', risk: 'Medium', time: '10+ years', desc: 'Buy quality index funds or stocks and hold for years. Ignores short-term noise. Warren Buffett\'s core approach. Best long-term result with minimum effort.', steps: ['Research or pick an index fund', 'Buy and don\'t look for 6 months', 'Reinvest dividends automatically', 'Only sell if fundamental reason to hold changes', 'Think in decades, not months'] },
  { title: 'Core & Satellite', icon: '🛸', risk: 'Medium-High', time: '5+ years', desc: 'Stable core (70% index funds) + smaller satellite (30% individual stocks). Core gives stability, satellite gives upside. Best for intermediate investors.', steps: ['70% Nifty 50 / large cap index', '15% mid/small cap index', '15% in 3–5 individual stocks you understand', 'Rebalance annually', 'Never let satellite exceed 30%'] },
  { title: 'Value Investing', icon: '🔍', risk: 'Medium', time: '3–10 years', desc: 'Find companies trading below intrinsic value. Buy when undervalued, hold until market recognizes it. Requires reading financials. Not for beginners.', steps: ['Learn P/E, P/B ratios', 'Find stocks below sector average P/E', 'Check debt and cash flow', 'Only buy at significant discount (margin of safety)', 'Be patient — undervalued can stay cheap for years'] },
];

const MISTAKES = [
  { title: 'Panic selling during crashes', icon: '😰', impact: 'Permanent loss', detail: 'Selling when markets drop locks in losses that would have recovered. Every crash recovered. The loss isn\'t from the crash — it\'s from selling.' },
  { title: 'Trying to time the market', icon: '⏰', impact: 'Missed returns', detail: 'Missing just the 10 best days per decade can cut returns in half. Nobody predicts tops/bottoms consistently. Time in market beats timing always.' },
  { title: 'Investing money you need soon', icon: '💸', impact: 'Forced selling at loss', detail: 'Never invest money needed within 1–2 years. Build 3–6 month emergency fund in FD first, then invest.' },
  { title: 'Checking portfolio daily', icon: '📱', impact: 'Anxiety + bad decisions', detail: 'Frequent checking leads to emotional trades. Investors who check less frequently get better returns. Set 6-month calendar reminders.' },
  { title: 'Following tips and hot stocks', icon: '🔥', impact: 'High loss probability', detail: 'By the time a tip reaches you, informed money has already moved. 80%+ of hot tips underperform the index.' },
  { title: 'Ignoring expense ratios', icon: '💀', impact: 'Massive compounding drag', detail: '1% extra fee on ₹10L over 20 years = ₹6.7L in lost compounding. Index funds: 0.1%. Active funds: 1–2%. The math is brutal.' },
];

const CATS = ['All', 'Market Terms', 'Investing Basics', 'Instruments', 'Strategy', 'Economics'];

export default function LearnPage({ onNavigate }) {
  const [tab, setTab] = useState('dictionary');
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => TERMS.filter(t =>
    (cat === 'All' || t.cat === cat) &&
    (t.term.toLowerCase().includes(search.toLowerCase()) || t.short.toLowerCase().includes(search.toLowerCase()))
  ), [search, cat]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 0' }}>
        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.1em' }}>LEARN & REFERENCE</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,5vw,44px)', fontWeight: 800, marginBottom: 10 }}>The Investing Reference</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 520 }}>Every term, strategy, and mistake — explained in plain language for someone who just started.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0 }}>
          {[['dictionary',`📖 Dictionary (${TERMS.length})`],['strategies','🎯 Strategies'],['mistakes','⚠️ Mistakes'],['sip','🔄 SIP Guide']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '10px 18px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: tab===id ? 600 : 400, background: 'transparent', color: tab===id ? 'var(--accent-green)' : 'var(--text-secondary)', borderBottom: tab===id ? '2px solid var(--accent-green)' : '2px solid transparent', transition: 'all 0.18s', marginBottom: -1, whiteSpace: 'nowrap' }}>
              {label}
            </button>
          ))}
        </div>

        {/* ===== DICTIONARY ===== */}
        {tab === 'dictionary' && (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search terms..." style={{ flex: 1, minWidth: 200, padding: '11px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, background: cat===c ? 'rgba(0,214,143,0.12)' : 'var(--bg-card)', color: cat===c ? 'var(--accent-green)' : 'var(--text-secondary)', border: cat===c ? '1px solid rgba(0,214,143,0.25)' : '1px solid var(--border-card)' }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.map((t, i) => (
                <div key={t.term} onClick={() => setExpanded(expanded===i ? null : i)} style={{ background: expanded===i ? 'var(--bg-card-hover)' : 'var(--bg-card)', border: `1px solid ${expanded===i ? 'rgba(0,214,143,0.2)' : 'var(--border-card)'}`, borderRadius: 'var(--radius-md)', padding: '16px 20px', cursor: 'pointer', transition: 'var(--transition)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{t.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>{t.term}</span>
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t.cat}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{t.short}</p>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0 }}>{expanded===i ? '▲' : '▼'}</span>
                  </div>
                  {expanded===i && <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t.full}</div>}
                </div>
              ))}
              {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No terms match "{search}"</div>}
            </div>
          </>
        )}

        {/* ===== STRATEGIES ===== */}
        {tab === 'strategies' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {STRATEGIES.map((s, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 36 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Risk: {s.risk}</span>
                      <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'var(--accent-green-dim)', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>{s.time}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>HOW TO DO IT</div>
                {s.steps.map((step, j) => (
                  <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 700, flexShrink: 0 }}>{j+1}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ===== MISTAKES ===== */}
        {tab === 'mistakes' && (
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: '14px 18px', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.12)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              🧠 These mistakes cost Indian retail investors thousands of crores every year. Knowing them is half the battle.
            </div>
            {MISTAKES.map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{m.title}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,77,77,0.1)', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>{m.impact}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== SIP GUIDE ===== */}
        {tab === 'sip' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>What is a SIP?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                SIP stands for <strong style={{ color: 'var(--text-primary)' }}>Systematic Investment Plan</strong>. Think of it as a gym subscription for your future self. Every month, a fixed amount is automatically deducted from your bank and invested in a mutual fund — whether the market is up or down.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
                The magic is <strong style={{ color: 'var(--accent-green)' }}>rupee cost averaging</strong>. When markets are low (like during COVID), your ₹500 buys more units. When markets are high, it buys fewer. Over time this averages your cost and removes the pressure of "when to invest."
              </p>
            </div>

            {/* SIP calculator */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>₹500/MONTH — WHAT IT BECOMES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
                {[
                  { years: 5, invested: '₹30,000', value: '₹40,931', returns: '+36%' },
                  { years: 10, invested: '₹60,000', value: '₹1,16,170', returns: '+94%' },
                  { years: 15, invested: '₹90,000', value: '₹2,50,286', returns: '+178%' },
                  { years: 20, invested: '₹1,20,000', value: '₹4,99,574', returns: '+316%' },
                  { years: 25, invested: '₹1,50,000', value: '₹9,52,828', returns: '+535%' },
                  { years: 30, invested: '₹1,80,000', value: '₹17,64,933', returns: '+880%' },
                ].map(row => (
                  <div key={row.years} style={{ background: 'rgba(0,214,143,0.04)', border: '1px solid rgba(0,214,143,0.1)', borderRadius: 'var(--radius-md)', padding: 18, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{row.years} YEARS</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Invested: {row.invested}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--accent-green)', lineHeight: 1 }}>{row.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4 }}>{row.returns} return</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>Assumed 12% annual returns (Nifty 50 historical average). Not guaranteed but historically consistent.</div>
            </div>

            {/* How to start */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>HOW TO START YOUR FIRST SIP IN 15 MINUTES</div>
              {[
                { step: 1, title: 'Open a Zerodha or Groww account', detail: 'Free to open. Download the app, complete KYC with Aadhaar + PAN. Takes 10–15 minutes.' },
                { step: 2, title: 'Search for "Nifty 50 Index Fund"', detail: 'Look for UTI Nifty 50 Index Fund or HDFC Index Fund Nifty 50. Expense ratio should be below 0.15%.' },
                { step: 3, title: 'Click "Start SIP" and set ₹500/month', detail: 'Choose the 5th of every month (after salary). Link your bank account. Authorize the mandate.' },
                { step: 4, title: 'Delete the app from your home screen', detail: 'Seriously. Daily checking leads to panic. Set a calendar reminder for 6 months from today.' },
                { step: 5, title: 'Increase SIP amount annually', detail: 'Every year when you get a raise, increase the SIP by ₹500–₹1,000. Step-up SIP makes a massive difference.' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#001A0E', flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button onClick={() => onNavigate('simulator')} style={{ padding: '14px 28px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                Now simulate how it performs in a crash →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
