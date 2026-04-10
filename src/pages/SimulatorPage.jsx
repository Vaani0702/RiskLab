import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CRASH_DATA, STOCKS, FEAR_PROFILES } from '../data/marketData.js';

const SPEEDS = [
  { label: 'Slow', ms: 1200 },
  { label: 'Normal', ms: 600 },
  { label: 'Fast', ms: 200 },
];

const INVESTMENT_OPTIONS = [
  { label: '₹10,000', value: 10000 },
  { label: '₹25,000', value: 25000 },
  { label: '₹50,000', value: 50000 },
  { label: '₹1,00,000', value: 100000 },
  { label: '₹5,00,000', value: 500000 },
];

function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function pct(n) { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }

const CustomTooltip = ({ active, payload, label, investment }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const change = val - 100;
  const rupees = investment * (val / 100);
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ color: change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 700, fontSize: 14 }}>{fmt(rupees)}</div>
      <div style={{ color: change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>{pct(change)}</div>
    </div>
  );
};

// ─── HOW TO USE SCREEN ────────────────────────────────────────────────
function HowToUseScreen({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 62, paddingBottom: 60 }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80" alt="Trading screen" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 36px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>TIME MACHINE SIMULATOR</div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Live through a real market crash.<br />Before it costs you anything.
            </h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 0' }}>
        {/* What is this */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 32, marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>What is the Time Machine Simulator?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
            We take real historical market crashes — Netflix losing 76% in 2022, Nifty 50 falling 40% during COVID — and replay them week by week, as if you were there.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
            You invest a virtual amount of money. You watch it grow and fall in real time. At the moment our data says you would have panicked, we pause and ask: <strong style={{ color: 'var(--text-primary)' }}>Do you sell or hold?</strong> Then we show you exactly what that decision would have cost you — in rupees.
          </p>
        </div>

        {/* How to use steps */}
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>How to use it</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { step: '01', title: 'Choose your investment', desc: 'Pick how much virtual money you want to invest. You start with ₹1,00,000 virtual balance. This is not real money.' },
            { step: '02', title: 'Pick an asset', desc: 'Choose between Netflix (high risk), Nifty 50 (medium), or Gold ETF (low risk). Each plays a different real crash.' },
            { step: '03', title: 'Watch it unfold', desc: 'The simulation plays week by week. See what was happening in the news. Watch prices move in real time.' },
            { step: '04', title: 'Make the decision', desc: 'When the crash hits your panic point, the simulator pauses. Sell or Hold? Your choice determines your outcome.' },
          ].map(s => (
            <div key={s.step} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--accent-green)', marginBottom: 10 }}>STEP {s.step}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{s.title}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(255,184,0,0.25)', borderRadius: 14, padding: '18px 22px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: 'var(--accent-amber)', fontWeight: 600, marginBottom: 6 }}>Important: This is a simulation</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>All money in the simulator is virtual. No real money is involved. The historical data is real — Netflix did drop 76% in 2022, and Nifty 50 did fall 40% in COVID. The simulation replays those real events.</p>
        </div>

        {/* Free play option */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 24 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--accent-green)', marginBottom: 10 }}>GUIDED MODE</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Time Machine</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>Replay a real historical crash. Your fear profile determines when the simulator pauses and challenges you.</p>
            <button onClick={() => onStart('guided')} style={{ padding: '12px 22px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
              Start guided simulation →
            </button>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 24 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--accent-amber)', marginBottom: 10 }}>FREE PLAY MODE</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Free Explorer</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>Pick any asset and any investment amount. Control the speed. No fear profile — just explore the data freely.</p>
            <button onClick={() => onStart('free')} style={{ padding: '12px 22px', borderRadius: 10, background: 'transparent', border: '1px solid var(--border-card)', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, cursor: 'pointer', width: '100%' }}>
              Explore freely →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INVESTMENT PICKER ─────────────────────────────────────────────────
function InvestmentPicker({ mode, profile, onConfirm }) {
  const [investment, setInvestment] = useState(100000);
  const [custom, setCustom] = useState('');
  const [stockId, setStockId] = useState('nifty');
  const [speed, setSpeed] = useState(1);

  const prof = FEAR_PROFILES[profile];
  const finalAmount = custom ? parseInt(custom.replace(/,/g, '')) || investment : investment;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>
            {mode === 'guided' ? 'GUIDED MODE' : 'FREE PLAY MODE'}
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Set up your simulation</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>You have a virtual balance of <strong style={{ color: 'var(--accent-green)' }}>₹1,00,000</strong>. How much do you want to invest?</p>
        </div>

        {/* Virtual balance card */}
        <div style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: 16, padding: '20px 24px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>VIRTUAL BALANCE</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--accent-green)' }}>₹1,00,000</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 240, lineHeight: 1.5 }}>
            This is virtual money. No real funds are involved. Use it to practice risk-free.
          </div>
        </div>

        {/* Investment amount */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>How much to invest?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 12 }}>
            {INVESTMENT_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => { setInvestment(opt.value); setCustom(''); }}
                style={{ padding: '12px 10px', borderRadius: 10, border: `1px solid ${investment === opt.value && !custom ? 'var(--accent-green)' : 'var(--border-card)'}`, background: investment === opt.value && !custom ? 'var(--accent-green-dim)' : 'var(--bg-card)', color: investment === opt.value && !custom ? 'var(--accent-green)' : 'var(--text-secondary)', fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Or enter amount:</span>
            <input value={custom} onChange={e => setCustom(e.target.value)} placeholder="e.g. 75000" style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'DM Mono, monospace', fontSize: 14, outline: 'none' }} />
          </div>
        </div>

        {/* Asset picker */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Which asset to simulate?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { id: 'nifty', name: 'Nifty 50', crash: 'COVID Crash 2020', drop: '−40%', recovery: '8 months', risk: 'Medium', img: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?w=200&q=60' },
              { id: 'netflix', name: 'Netflix (NFLX)', crash: '2022 Crash', drop: '−76%', recovery: '18 months', risk: 'High', img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&q=60' },
              { id: 'gold', name: 'Gold ETF', crash: 'COVID Period', drop: '−8%', recovery: '2 months', risk: 'Low', img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&q=60' },
            ].map(s => (
              <button key={s.id} onClick={() => setStockId(s.id)} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderRadius: 14, border: `1px solid ${stockId === s.id ? 'var(--accent-green)' : 'var(--border-card)'}`, background: stockId === s.id ? 'var(--accent-green-dim)' : 'var(--bg-card)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.crash} · Max drop: <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>{s.drop}</span> · Recovery: {s.recovery}</div>
                </div>
                <div style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: s.risk === 'High' ? 'var(--accent-red-dim)' : s.risk === 'Medium' ? 'var(--accent-amber-dim)' : 'var(--accent-green-dim)', color: s.risk === 'High' ? 'var(--accent-red)' : s.risk === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-green)', fontFamily: 'DM Mono, monospace', fontWeight: 600, flexShrink: 0 }}>{s.risk}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Speed */}
        {mode === 'free' && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Simulation speed</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {SPEEDS.map((s, i) => (
                <button key={i} onClick={() => setSpeed(i)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `1px solid ${speed === i ? 'var(--accent-green)' : 'var(--border-card)'}`, background: speed === i ? 'var(--accent-green-dim)' : 'var(--bg-card)', color: speed === i ? 'var(--accent-green)' : 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{s.label}</button>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => onConfirm({ investment: finalAmount, stockId, speed })} style={{ width: '100%', padding: '16px 0', borderRadius: 14, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Launch simulation with {fmt(finalAmount)} →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN SIMULATOR ────────────────────────────────────────────────────
function TimeMachine({ investment, stockId, profile, mode, speed, onComplete }) {
  const stock = STOCKS.find(s => s.id === stockId);
  const crashData = CRASH_DATA[stock.crashData];
  const prof = profile ? FEAR_PROFILES[profile] : null;
  const allWeeks = crashData.weeks;
  const panicWeek = mode === 'guided' ? crashData.panicPoint : 999;

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [paused, setPaused] = useState(false);
  const [decision, setDecision] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [simSpeed, setSimSpeed] = useState(speed);
  const intervalRef = useRef(null);

  const visibleData = allWeeks.slice(0, currentWeek + 1);
  const currentVal = allWeeks[currentWeek]?.value ?? 100;
  const changePercent = currentVal - 100;
  const currentRupees = investment * (currentVal / 100);
  const pnl = currentRupees - investment;
  const finalVal = allWeeks[allWeeks.length - 1].value;
  const finalRupees = investment * (finalVal / 100);

  useEffect(() => {
    if (!playing || paused || decision) return;
    intervalRef.current = setInterval(() => {
      setCurrentWeek(w => {
        const next = w + 1;
        if (next >= allWeeks.length) { setPlaying(false); setShowResult(true); clearInterval(intervalRef.current); return w; }
        if (mode === 'guided' && next === panicWeek) { setPaused(true); clearInterval(intervalRef.current); }
        return next;
      });
    }, SPEEDS[simSpeed].ms);
    return () => clearInterval(intervalRef.current);
  }, [playing, paused, decision, simSpeed]);

  useEffect(() => {
    if (decision === 'hold' && playing && !paused) {
      intervalRef.current = setInterval(() => {
        setCurrentWeek(w => {
          const next = w + 1;
          if (next >= allWeeks.length) { setPlaying(false); setShowResult(true); clearInterval(intervalRef.current); return w; }
          return next;
        });
      }, SPEEDS[simSpeed].ms);
      return () => clearInterval(intervalRef.current);
    }
  }, [decision, playing, paused, simSpeed]);

  const handleStart = () => { setStarted(true); setPlaying(true); setCurrentWeek(0); };
  const handleSell = () => { setDecision('sell'); setPaused(false); setShowResult(true); };
  const handleHold = () => { setDecision('hold'); setPaused(false); setPlaying(true); };

  const currentEvent = allWeeks[currentWeek]?.event;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>
              {mode === 'guided' ? 'GUIDED SIMULATION' : 'FREE PLAY'} · {stock.name} · {crashData.label}
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800 }}>{crashData.name} — {crashData.label}</h2>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{crashData.startDate} → {crashData.endDate} · Started with {fmt(investment)}</div>
          </div>

          {/* Live P&L */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>PORTFOLIO VALUE</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, color: pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', lineHeight: 1 }}>
              {fmt(currentRupees)}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', marginTop: 4 }}>
              {pnl >= 0 ? '+' : ''}{fmt(pnl)} ({pct(changePercent)})
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Invested', value: fmt(investment), color: 'var(--text-primary)' },
            { label: 'Current value', value: fmt(currentRupees), color: pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
            { label: 'Profit / Loss', value: (pnl >= 0 ? '+' : '') + fmt(pnl), color: pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
            { label: 'Week', value: `${currentWeek + 1} / ${allWeeks.length}`, color: 'var(--text-primary)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: '20px 20px 12px', marginBottom: 16 }}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={changePercent >= 0 ? '#00D68F' : '#FF4D4D'} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={changePercent >= 0 ? '#00D68F' : '#FF4D4D'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'DM Mono' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'DM Mono' }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip investment={investment} />} />
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="value" stroke={changePercent >= 0 ? '#00D68F' : '#FF4D4D'} strokeWidth={2.5} fill="url(#sg)" dot={false} activeDot={{ r: 5 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>

          {/* News ticker */}
          {currentEvent && (
            <div style={{ marginTop: 10, padding: '8px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'DM Mono, monospace' }}>
              News: {currentEvent}
            </div>
          )}
        </div>

        {/* Speed controls (free mode) */}
        {mode === 'free' && started && !showResult && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>SPEED:</span>
            {SPEEDS.map((s, i) => (
              <button key={i} onClick={() => { setSimSpeed(i); if (playing && !paused) { clearInterval(intervalRef.current); } }} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${simSpeed === i ? 'var(--accent-green)' : 'var(--border-card)'}`, background: simSpeed === i ? 'var(--accent-green-dim)' : 'transparent', color: simSpeed === i ? 'var(--accent-green)' : 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: 12, cursor: 'pointer' }}>{s.label}</button>
            ))}
            {playing && !paused && <button onClick={() => { setPlaying(false); clearInterval(intervalRef.current); }} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border-card)', background: 'transparent', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: 12, cursor: 'pointer' }}>Pause</button>}
            {!playing && started && !showResult && <button onClick={() => setPlaying(true)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--accent-green)', background: 'var(--accent-green-dim)', color: 'var(--accent-green)', fontFamily: 'DM Sans, sans-serif', fontSize: 12, cursor: 'pointer' }}>Resume</button>}
          </div>
        )}

        {/* START button */}
        {!started && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <button onClick={handleStart} style={{ padding: '16px 48px', borderRadius: 14, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              Start Simulation
            </button>
          </div>
        )}

        {/* PANIC POINT */}
        {paused && !decision && mode === 'guided' && (
          <div style={{ background: 'rgba(255,77,77,0.07)', border: '1px solid rgba(255,77,77,0.35)', borderRadius: 20, padding: 32, textAlign: 'center', marginTop: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--accent-red)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 12 }}>
              PANIC POINT — BASED ON YOUR PROFILE
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>
              {stock.name} is down {Math.abs(changePercent).toFixed(0)}%.<br />Your portfolio has lost {fmt(Math.abs(pnl))}.
            </h3>
            {prof && <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
              As a <strong style={{ color: prof.color }}>{prof.name}</strong>, our data says this is where most people in your profile would sell. What do you do?
            </p>}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleSell} style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--accent-red-dim)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Sell — get out now
              </button>
              <button onClick={handleHold} style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Hold — trust the market
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {showResult && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 32, marginTop: 8 }}>
            {decision === 'sell' ? (
              <>
                <div style={{ fontSize: 11, color: 'var(--accent-red)', fontFamily: 'DM Mono, monospace', marginBottom: 10 }}>YOU SOLD</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
                  You locked in a loss of <span style={{ color: 'var(--accent-red)' }}>{fmt(Math.abs(pnl))}</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                  If you had held through the crash, {stock.name} recovered to <strong style={{ color: 'var(--accent-green)' }}>{fmt(finalRupees)}</strong> — a gain of <strong style={{ color: 'var(--accent-green)' }}>{fmt(finalRupees - investment)}</strong> over your starting amount. The loss wasn't the market's fault. It was the decision to sell.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div style={{ padding: 20, borderRadius: 12, background: 'var(--accent-red-dim)', border: '1px solid rgba(255,77,77,0.2)' }}>
                    <div style={{ fontSize: 11, color: 'var(--accent-red)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>BY SELLING</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--accent-red)' }}>{fmt(currentRupees)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{pct(changePercent)} return</div>
                  </div>
                  <div style={{ padding: 20, borderRadius: 12, background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)' }}>
                    <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>IF YOU HELD</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--accent-green)' }}>{fmt(finalRupees)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{pct(finalVal - 100)} return</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 10 }}>
                  {decision === 'hold' ? 'YOU HELD' : 'SIMULATION COMPLETE'}
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 14 }}>
                  Your {fmt(investment)} is now <span style={{ color: changePercent >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>{fmt(currentRupees)}</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                  {decision === 'hold' ? 'You held through the crash. That\'s the single most important skill an investor can have. The market recovered, and so did your portfolio.' : 'The simulation is complete. You watched the full historical price movement of this asset.'}
                </p>
              </>
            )}
            <button onClick={() => onComplete({ stockId, investment, finalValue: showResult && decision === 'sell' ? currentRupees : finalRupees, pnl: showResult && decision === 'sell' ? pnl : finalRupees - investment, decision: decision || 'hold', returnPct: showResult && decision === 'sell' ? changePercent : finalVal - 100 })}
              style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              See full debrief →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────
export default function SimulatorPage({ profile, stockId: prefillStockId, onComplete }) {
  const [screen, setScreen] = useState('howto'); // howto | pick | simulate
  const [mode, setMode] = useState('guided');
  const [config, setConfig] = useState(null);

  const handleHowToStart = (m) => { setMode(m); setScreen('pick'); };
  const handleConfirm = (cfg) => { setConfig(cfg); setScreen('simulate'); };
  const handleSimComplete = (result) => { onComplete(result.decision, result); };

  if (screen === 'howto') return <HowToUseScreen onStart={handleHowToStart} />;
  if (screen === 'pick') return <InvestmentPicker mode={mode} profile={profile} onConfirm={handleConfirm} />;
  if (screen === 'simulate') return (
    <TimeMachine
      investment={config.investment}
      stockId={config.stockId}
      profile={profile}
      mode={mode}
      speed={config.speed ?? 1}
      onComplete={handleSimComplete}
    />
  );
  return null;
}
