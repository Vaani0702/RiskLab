import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const INVESTMENT = 10000;
const YEARS = 5;
const FD_RATE = 0.065;

// Simple Monte Carlo in JS
function runMonteCarlo(scenarios, annualMeanReturn, annualStdDev, years) {
  const results = [];
  const weeksPerYear = 52;
  const totalWeeks = years * weeksPerYear;
  const weeklyMean = annualMeanReturn / weeksPerYear;
  const weeklyStd = annualStdDev / Math.sqrt(weeksPerYear);

  for (let s = 0; s < scenarios; s++) {
    let value = INVESTMENT;
    for (let w = 0; w < totalWeeks; w++) {
      // Box-Muller for normal distribution
      const u1 = Math.random(), u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const weeklyReturn = weeklyMean + weeklyStd * z;
      value *= (1 + weeklyReturn);
    }
    results.push(value);
  }
  return results;
}

const ASSET_PARAMS = {
  netflix: { mean: 0.22, std: 0.55, label: 'Netflix (NFLX)' },
  nifty:   { mean: 0.12, std: 0.18, label: 'Nifty 50' },
  gold:    { mean: 0.08, std: 0.14, label: 'Gold ETF' },
};

export default function LossMeterPage({ stockId, onComplete }) {
  const [results, setResults] = useState(null);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => {
    // Run Monte Carlo after brief delay for UX
    const t = setTimeout(() => {
      const params = ASSET_PARAMS[stockId] || ASSET_PARAMS.nifty;
      const raw = runMonteCarlo(1000, params.mean, params.std, YEARS);
      const sorted = [...raw].sort((a, b) => a - b);

      const green  = sorted.filter(v => v > INVESTMENT).length;
      const yellow = sorted.filter(v => v >= INVESTMENT * 0.75 && v <= INVESTMENT).length;
      const red    = sorted.filter(v => v < INVESTMENT * 0.75).length;

      const p10 = sorted[Math.floor(sorted.length * 0.10)];
      const p50 = sorted[Math.floor(sorted.length * 0.50)];
      const p90 = sorted[Math.floor(sorted.length * 0.90)];

      const fdFinal = INVESTMENT * Math.pow(1 + FD_RATE, YEARS);

      // Histogram bins
      const min = sorted[0], max = sorted[sorted.length - 1];
      const binCount = 20;
      const binSize = (max - min) / binCount;
      const bins = Array.from({ length: binCount }, (_, i) => ({
        range: min + i * binSize,
        count: 0,
        label: `₹${((min + i * binSize) / 1000).toFixed(0)}k`,
      }));
      raw.forEach(v => {
        const bi = Math.min(Math.floor((v - min) / binSize), binCount - 1);
        bins[bi].count++;
      });

      setResults({ green, yellow, red, p10, p50, p90, fdFinal, bins, sorted, raw });
      setSimulated(true);
    }, 1200);
    return () => clearTimeout(t);
  }, [stockId]);

  const params = ASSET_PARAMS[stockId] || ASSET_PARAMS.nifty;

  if (!simulated) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '2px solid var(--accent-green)',
            borderTopColor: 'transparent',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            Running 1,000 market scenarios...
          </p>
        </div>
      </div>
    );
  }

  const { green, yellow, red, p10, p50, p90, fdFinal, bins } = results;
  const total = 1000;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60 }}>
      <div className="container">
        <div className="animate-fade-up" style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
            LOSS PROBABILITY METER
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
            1,000 scenarios. 5 years. Where do you land?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Monte Carlo simulation for <strong>{params.label}</strong> — ₹{INVESTMENT.toLocaleString()} invested
          </p>
        </div>

        {/* Zone bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            {
              color: '#00D68F', bg: 'rgba(0,214,143,0.08)', border: 'rgba(0,214,143,0.25)',
              label: '🟢 Chill Zone', count: green, pct: ((green / total) * 100).toFixed(0),
              desc: 'You made money. Market rewarded patience.',
              recovery: null,
            },
            {
              color: '#FFB800', bg: 'rgba(255,184,0,0.08)', border: 'rgba(255,184,0,0.25)',
              label: '🟡 Uncomfortable but OK', count: yellow, pct: ((yellow / total) * 100).toFixed(0),
              desc: 'Small loss. Recovers in 8–14 months if held.',
              recovery: '8–14 months',
            },
            {
              color: '#FF4D4D', bg: 'rgba(255,77,77,0.08)', border: 'rgba(255,77,77,0.25)',
              label: '🔴 Worst Case', count: red, pct: ((red / total) * 100).toFixed(0),
              desc: 'Significant loss. Extreme global event. 2–3 year recovery.',
              recovery: '2–3 years',
            },
          ].map((zone, i) => (
            <div key={i} style={{
              background: zone.bg, border: `1px solid ${zone.border}`,
              borderRadius: 'var(--radius-lg)', padding: 22,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 10, color: zone.color }}>
                {zone.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: zone.color, lineHeight: 1 }}>
                {zone.pct}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
                {zone.count} of 1,000 scenarios
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{zone.desc}</p>
              {zone.recovery && (
                <div style={{ fontSize: 11, marginTop: 8, color: zone.color, fontFamily: 'var(--font-mono)' }}>
                  Recovery: {zone.recovery}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Distribution chart */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 20
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
            OUTCOME DISTRIBUTION — ALL 1,000 SCENARIOS
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bins} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'DM Mono' }} tickLine={false} axisLine={false} interval={3} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12 }}
              />
              <Bar dataKey="count" radius={[3,3,0,0]}>
                {bins.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.range < INVESTMENT * 0.75 ? '#FF4D4D' :
                          entry.range < INVESTMENT ? '#FFB800' : '#00D68F'}
                    fillOpacity={0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FD Comparison — the aha moment */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
            THE AHA MOMENT — YOUR ASSET VS FIXED DEPOSIT OVER 5 YEARS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{params.label} (Median outcome)</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--accent-green)' }}>
                ₹{p50.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4 }}>
                +{(((p50 - INVESTMENT) / INVESTMENT) * 100).toFixed(0)}% return
              </div>
              {/* Visual bar */}
              <div style={{ marginTop: 12, height: 8, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: 'var(--accent-green)',
                  width: `${Math.min(100, (p50 / fdFinal / 1.5) * 100)}%`
                }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Fixed Deposit (6.5% p.a.)</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--text-muted)' }}>
                ₹{fdFinal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                +{(((fdFinal - INVESTMENT) / INVESTMENT) * 100).toFixed(0)}% guaranteed
              </div>
              <div style={{ marginTop: 12, height: 8, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: 'var(--text-muted)',
                  width: `${Math.min(100, (fdFinal / p50 / 1.5) * 100)}%`
                }} />
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 20, padding: '12px 16px',
            background: 'var(--accent-green-dim)', borderRadius: 'var(--radius-sm)',
            fontSize: 14, color: 'var(--accent-green)', lineHeight: 1.6
          }}>
            Yes, the market has volatility. But the median outcome is still significantly better than a fixed deposit.
            The key word is <strong>hold</strong>.
          </div>
        </div>

        {/* Percentile breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Worst 10%', value: p10, color: 'var(--accent-red)' },
            { label: 'Median (50th)', value: p50, color: 'var(--accent-green)' },
            { label: 'Best 10%', value: p90, color: '#A78BFA' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)', padding: 18, textAlign: 'center'
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: s.color }}>
                ₹{s.value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={onComplete}>
            Get your personal AI debrief →
          </button>
        </div>
      </div>
    </div>
  );
}
