import React, { useState, useEffect, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer
} from 'recharts';
import { CRASH_DATA, STOCKS, FEAR_PROFILES } from '../data/marketData.js';

const INVESTMENT = 10000;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const change = val - 100;
  const rupeeChange = ((val - 100) / 100) * INVESTMENT;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-card)',
      borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, color: val >= 100 ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
        ₹{(INVESTMENT + rupeeChange).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </div>
      <div style={{ fontSize: 11, color: change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
        {change >= 0 ? '+' : ''}{change.toFixed(1)}%
      </div>
    </div>
  );
};

export default function SimulatorPage({ profile, stockId, onComplete }) {
  const stock = STOCKS.find(s => s.id === stockId);
  const crashData = CRASH_DATA[stock.crashData];
  const prof = FEAR_PROFILES[profile];

  const allWeeks = crashData.weeks;
  const panicWeek = crashData.panicPoint;

  const [playing, setPlaying] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [paused, setPaused] = useState(false);
  const [decision, setDecision] = useState(null); // 'sell' | 'hold'
  const [showResult, setShowResult] = useState(false);
  const intervalRef = useRef(null);

  const visibleData = allWeeks.slice(0, currentWeek + 1);
  const currentVal = allWeeks[currentWeek]?.value ?? 100;
  const changePercent = currentVal - 100;
  const currentRupees = INVESTMENT + (changePercent / 100) * INVESTMENT;
  const atPanicPoint = currentWeek === panicWeek && !decision && playing;

  useEffect(() => {
    if (!playing || paused || decision) return;

    intervalRef.current = setInterval(() => {
      setCurrentWeek(w => {
        const next = w + 1;
        if (next >= allWeeks.length) {
          setPlaying(false);
          setShowResult(true);
          clearInterval(intervalRef.current);
          return w;
        }
        if (next === panicWeek) {
          setPaused(true);
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 350);

    return () => clearInterval(intervalRef.current);
  }, [playing, paused, decision, allWeeks.length, panicWeek]);

  const handleStart = () => {
    setPlaying(true);
    setCurrentWeek(0);
    setPaused(false);
    setDecision(null);
    setShowResult(false);
  };

  const handleSell = () => {
    setDecision('sell');
    setPaused(false);
    const lockInLoss = currentRupees;
    setTimeout(() => setShowResult(true), 800);
  };

  const handleHold = () => {
    setDecision('hold');
    setPaused(false);
    setPlaying(true);
  };

  useEffect(() => {
    if (decision === 'hold' && playing) {
      intervalRef.current = setInterval(() => {
        setCurrentWeek(w => {
          const next = w + 1;
          if (next >= allWeeks.length) {
            setPlaying(false);
            setShowResult(true);
            clearInterval(intervalRef.current);
            return w;
          }
          return next;
        });
      }, 300);
      return () => clearInterval(intervalRef.current);
    }
  }, [decision, playing]);

  const finalVal = allWeeks[allWeeks.length - 1].value;
  const finalRupees = INVESTMENT + ((finalVal - 100) / 100) * INVESTMENT;
  const sellLoss = currentRupees - INVESTMENT;
  const holdGain = finalRupees - INVESTMENT;

  const gradientColor = changePercent >= 0 ? '#00D68F' : stock.color;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60 }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              TIME MACHINE SIMULATOR
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>
              {stock.name} — {crashData.label}
            </h2>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              {crashData.startDate} → {crashData.endDate} &nbsp;·&nbsp; ₹{INVESTMENT.toLocaleString()} invested
            </div>
          </div>

          {/* Live value */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              PORTFOLIO VALUE
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
              color: changePercent >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
              lineHeight: 1,
            }}>
              ₹{currentRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{
              fontSize: 14, fontFamily: 'var(--font-mono)',
              color: changePercent >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
              marginTop: 4,
            }}>
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)', padding: 24, marginBottom: 20
        }}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'DM Mono' }}
                tickLine={false} axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'DM Mono' }}
                tickLine={false} axisLine={false}
                tickFormatter={v => `${v}%`}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <Area
                type="monotone"
                dataKey="value"
                stroke={gradientColor}
                strokeWidth={2.5}
                fill="url(#chartGrad)"
                dot={false}
                activeDot={{ r: 5, fill: gradientColor, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Events strip */}
          {allWeeks[currentWeek]?.event && (
            <div style={{
              marginTop: 12,
              padding: '8px 14px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 8,
              fontSize: 13, color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              animation: 'ticker 0.3s ease',
            }}>
              📰 {allWeeks[currentWeek].event}
            </div>
          )}
        </div>

        {/* PANIC POINT - The key moment */}
        {paused && !decision && (
          <div className="animate-fade-up" style={{
            background: 'rgba(255,77,77,0.08)',
            border: '1px solid rgba(255,77,77,0.4)',
            borderRadius: 'var(--radius-xl)',
            padding: 32, marginBottom: 20,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🚨</div>
            <div style={{ fontSize: 12, color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.1em' }}>
              BASED ON YOUR PROFILE — THIS IS YOUR PANIC POINT
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Your {stock.name} is down {Math.abs(changePercent).toFixed(0)}%.
              <br />What do you do?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 28, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
              As a <strong style={{ color: prof.color }}>{prof.name}</strong>, this is exactly where most people in your profile bail.
              Your ₹{INVESTMENT.toLocaleString()} is now worth ₹{currentRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.
              <br />This is the real decision. Make it.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-danger btn-lg" onClick={handleSell}>
                😰 Sell now — cut my losses
              </button>
              <button className="btn btn-primary btn-lg" onClick={handleHold}>
                💎 Hold — I trust the market
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        {!paused && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {!playing ? (
              <button className="btn btn-primary btn-lg" onClick={handleStart}>
                ▶ Start Simulation
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--accent-green)',
                  animation: 'pulse-dot 1s ease infinite'
                }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  Playing week {currentWeek + 1} of {allWeeks.length}...
                </span>
              </div>
            )}

            {decision === 'hold' && (
              <span className="badge badge-green">💎 HOLDING — watching recovery</span>
            )}
          </div>
        )}

        {/* RESULT SCREEN */}
        {showResult && (
          <div className="animate-fade-up" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)', padding: 36, marginTop: 4,
          }}>
            {decision === 'sell' ? (
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📉</div>
                <div style={{ fontSize: 12, color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                  YOU SOLD
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
                  You locked in a loss of{' '}
                  <span style={{ color: 'var(--accent-red)' }}>
                    ₹{Math.abs(sellLoss).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                  If you had held through the crash, {stock.name} recovered to{' '}
                  <strong style={{ color: 'var(--accent-green)' }}>
                    ₹{finalRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </strong>{' '}
                  — a gain of ₹{Math.abs(holdGain).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} over your original investment.
                  <br /><br />
                  The crash didn't cause the loss. Selling did.
                </p>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24
                }}>
                  <div style={{
                    padding: 20, borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-red-dim)', border: '1px solid rgba(255,77,77,0.2)'
                  }}>
                    <div style={{ fontSize: 11, color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                      WHAT YOU GOT
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent-red)' }}>
                      ₹{currentRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>by selling</div>
                  </div>
                  <div style={{
                    padding: 20, borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)'
                  }}>
                    <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                      WHAT YOU'D HAVE
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent-green)' }}>
                      ₹{finalRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>by holding</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
                <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                  YOU HELD — EXCELLENT DECISION
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
                  Your ₹{INVESTMENT.toLocaleString()} is now{' '}
                  <span style={{ color: 'var(--accent-green)' }}>
                    ₹{finalRupees.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                  Despite feeling terrifying at {Math.abs(changePercent).toFixed(0)}% down, you held.
                  And the market did what it always does — it recovered, then went higher.
                  <br /><br />
                  This is the pattern. Every single major crash in history has recovered.
                  The only way to permanently lose is to sell.
                </p>
              </>
            )}

            <button className="btn btn-primary btn-lg" onClick={onComplete}>
              See your AI debrief →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
