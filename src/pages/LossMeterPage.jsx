import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { runMonteCarlo as runMonteCarloAPI } from '../api.js';

const YEARS = 5;
const FD_RATE = 0.065;

const ASSET_PARAMS = {
  netflix: { mean: 0.22, std: 0.55, label: 'Netflix (NFLX)' },
  nifty:   { mean: 0.12, std: 0.18, label: 'Nifty 50' },
  gold:    { mean: 0.08, std: 0.14, label: 'Gold ETF' },
};

// JS fallback Monte Carlo (used if backend is offline)
function runMonteCarloJS(investment, annualMean, annualStd, years = 5, scenarios = 1000) {
  const weeksPerYear = 52;
  const totalWeeks = years * weeksPerYear;
  const weeklyMean = annualMean / weeksPerYear;
  const weeklyStd = annualStd / Math.sqrt(weeksPerYear);
  const results = [];
  for (let s = 0; s < scenarios; s++) {
    let value = investment;
    for (let w = 0; w < totalWeeks; w++) {
      const u1 = Math.random(), u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      value *= (1 + weeklyMean + weeklyStd * z);
    }
    results.push(value);
  }
  const sorted = [...results].sort((a, b) => a - b);
  const green  = sorted.filter(v => v > investment).length;
  const yellow = sorted.filter(v => v >= investment * 0.75 && v <= investment).length;
  const red    = sorted.filter(v => v < investment * 0.75).length;
  const p10 = sorted[Math.floor(sorted.length * 0.10)];
  const p50 = sorted[Math.floor(sorted.length * 0.50)];
  const p90 = sorted[Math.floor(sorted.length * 0.90)];
  const fdFinal = investment * Math.pow(1 + FD_RATE, years);
  const min = sorted[0], max = sorted[sorted.length - 1];
  const binCount = 24;
  const binSize = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => {
    const center = min + i * binSize + binSize / 2;
    const count = results.filter(v => v >= min + i * binSize && v < min + (i + 1) * binSize).length;
    return {
      rangeValue: Math.round(center),
      label: `₹${Math.round(center / 1000)}k`,
      count,
      zone: center > investment ? 'green' : center >= investment * 0.75 ? 'yellow' : 'red',
    };
  });
  return {
    zones: {
      green:  { count: green,  pct: (green  / 1000 * 100).toFixed(1) },
      yellow: { count: yellow, pct: (yellow / 1000 * 100).toFixed(1) },
      red:    { count: red,    pct: (red    / 1000 * 100).toFixed(1) },
    },
    percentiles: { p10: Math.round(p10), p50: Math.round(p50), p90: Math.round(p90) },
    fdFinal: Math.round(fdFinal),
    bins,
    investment,
    source: 'js',
  };
}

function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

export default function LossMeterPage({ stockId, investment: investmentProp, onComplete }) {
  const investment = investmentProp || 100000;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);

  const params = ASSET_PARAMS[stockId] || ASSET_PARAMS.nifty;

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      // Try backend first
      try {
        const result = await runMonteCarloAPI({ stockId, investment, years: YEARS });
        if (!cancelled) {
          setData(result);
          setSource('backend');
          setLoading(false);
        }
      } catch (err) {
        console.warn('Backend unavailable, using JS fallback:', err.message);
        // Fallback to JS
        setTimeout(() => {
          if (!cancelled) {
            const result = runMonteCarloJS(investment, params.mean, params.std, YEARS);
            setData(result);
            setSource('js');
            setLoading(false);
          }
        }, 800);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [stockId, investment]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--accent-green)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
          Running 1,000 market scenarios...
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>Connecting to Python backend</p>
      </div>
    );
  }

  const { zones, percentiles, fdFinal, bins } = data;
  const p10 = percentiles.p10 ?? percentiles['p10'];
  const p50 = percentiles.p50 ?? percentiles['p50'];
  const p90 = percentiles.p90 ?? percentiles['p90'];

  const ZONES = [
    { key: 'green',  label: 'Chill Zone',           color: 'var(--accent-green)', bg: 'rgba(0,214,143,0.08)', border: 'rgba(0,214,143,0.25)', desc: 'You made money. Market rewarded patience.', recovery: null },
    { key: 'yellow', label: 'Uncomfortable but OK', color: 'var(--accent-amber)', bg: 'rgba(255,184,0,0.08)',  border: 'rgba(255,184,0,0.25)',  desc: 'Small loss. Recovers in 8–14 months if held.', recovery: '8–14 months' },
    { key: 'red',    label: 'Worst Case',            color: 'var(--accent-red)',   bg: 'rgba(255,77,77,0.08)',  border: 'rgba(255,77,77,0.25)',   desc: 'Significant loss. Only in extreme global events.', recovery: '2–3 years' },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 24px 0' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>LOSS PROBABILITY METER</div>
            {source === 'backend' && (
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'var(--accent-green-dim)', color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace' }}>Python backend</span>
            )}
            {source === 'js' && (
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'rgba(255,184,0,0.1)', color: 'var(--accent-amber)', fontFamily: 'DM Mono, monospace' }}>JS fallback</span>
            )}
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            1,000 scenarios. 5 years. Where do you land?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Monte Carlo simulation for <strong>{params.label}</strong> — {fmt(investment)} invested
          </p>
        </div>

        {/* Zone cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
          {ZONES.map(zone => (
            <div key={zone.key} style={{ background: zone.bg, border: `1px solid ${zone.border}`, borderRadius: 16, padding: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: zone.color, marginBottom: 10 }}>{zone.label}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, color: zone.color, lineHeight: 1 }}>
                {zones[zone.key]?.pct}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, marginBottom: 10, fontFamily: 'DM Mono, monospace' }}>
                {zones[zone.key]?.count} of 1,000 scenarios
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{zone.desc}</p>
              {zone.recovery && (
                <div style={{ fontSize: 11, marginTop: 8, color: zone.color, fontFamily: 'DM Mono, monospace' }}>Recovery: {zone.recovery}</div>
              )}
            </div>
          ))}
        </div>

        {/* Histogram */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: '24px 20px 16px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 16 }}>
            OUTCOME DISTRIBUTION — ALL 1,000 SCENARIOS
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bins} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'DM Mono' }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, fontFamily: 'DM Mono, monospace', fontSize: 12 }}
                formatter={(v) => [v + ' scenarios', 'Count']}
              />
              <Bar dataKey="count" radius={[3,3,0,0]}>
                {bins.map((entry, i) => (
                  <Cell key={i} fill={entry.zone === 'green' ? '#00D68F' : entry.zone === 'yellow' ? '#FFB800' : '#FF4D4D'} fillOpacity={0.75} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FD Comparison — the aha moment */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 20 }}>
            YOUR ASSET vs FIXED DEPOSIT — 5 YEARS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{params.label} (Median outcome)</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--accent-green)' }}>{fmt(p50)}</div>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', marginTop: 4 }}>
                +{(((p50 - investment) / investment) * 100).toFixed(0)}% return
              </div>
              <div style={{ marginTop: 10, height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--accent-green)', borderRadius: 3, width: `${Math.min(100, (p50 / fdFinal) * 70)}%`, transition: 'width 1s ease' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Fixed Deposit (6.5% p.a.)</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--text-muted)' }}>{fmt(fdFinal)}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                +{(((fdFinal - investment) / investment) * 100).toFixed(0)}% guaranteed
              </div>
              <div style={{ marginTop: 10, height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--text-muted)', borderRadius: 3, width: '55%' }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18, padding: '12px 16px', background: 'var(--accent-green-dim)', borderRadius: 10, fontSize: 14, color: 'var(--accent-green)', lineHeight: 1.6 }}>
            Yes — there's volatility. But the median outcome is significantly better than an FD. The key word is <strong>hold</strong>.
          </div>
        </div>

        {/* Percentile strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Worst 10%', value: p10, color: 'var(--accent-red)' },
            { label: 'Median (50th)', value: p50, color: 'var(--accent-green)' },
            { label: 'Best 10%', value: p90, color: '#A78BFA' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: s.color }}>{fmt(s.value)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                {(((s.value - investment) / investment) * 100).toFixed(0)}% return
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onComplete} style={{ padding: '16px 40px', borderRadius: 14, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Get your AI debrief →
          </button>
        </div>
      </div>
    </div>
  );
}
