import React, { useState } from 'react';
import { STOCKS, FEAR_PROFILES } from '../data/marketData.js';

const RISK_LABELS = ['', 'Low', 'Medium', 'High'];

export default function StockPickerPage({ profile, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [warning, setWarning] = useState(null);
  const prof = FEAR_PROFILES[profile];

  const handlePick = (stock) => {
    // Show warning for Panic Seller picking high-risk stock
    if (profile === 'panic' && stock.risk === 3) {
      setWarning(stock);
    } else {
      onSelect(stock.id);
    }
  };

  if (warning) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="animate-fade-up" style={{
            background: 'rgba(255,77,77,0.06)',
            border: '1px solid rgba(255,77,77,0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: 40,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontSize: 12, color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
              PROFILE MISMATCH DETECTED
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
              As a {prof.name}, picking {warning.name} is particularly risky
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
              Netflix dropped <strong style={{ color: 'var(--accent-red)' }}>76%</strong> in 2022.
              Based on your quiz profile, you would have panic-sold around <strong style={{ color: 'var(--accent-red)' }}>-30%</strong>,
              locking in a permanent loss of <strong style={{ color: 'var(--accent-red)' }}>₹3,000 on every ₹10,000 invested</strong>.
              <br /><br />
              Investors who held through the crash recovered fully in 18 months and then some.
              The loss wasn't Netflix's fault — it was the decision to sell.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-danger" onClick={() => onSelect(warning.id)}>
                I understand — simulate it anyway
              </button>
              <button className="btn btn-secondary" onClick={() => setWarning(null)}>
                ← Pick a different asset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
      <div className="container">
        <div className="animate-fade-up" style={{ marginBottom: 48, maxWidth: 640 }}>
          <div style={{ fontSize: 12, color: prof.color, fontFamily: 'var(--font-mono)', marginBottom: 14, letterSpacing: '0.08em' }}>
            {prof.emoji} YOU ARE A {prof.name.toUpperCase()}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
            Pick what you want to invest in
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6 }}>
            We'll simulate a real historical crash for your chosen asset. You'll experience it week-by-week.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {STOCKS.map((stock) => {
            const isHovered = hovered === stock.id;
            const mismatch = profile === 'panic' && stock.risk === 3;

            return (
              <button
                key={stock.id}
                onClick={() => handlePick(stock)}
                onMouseEnter={() => setHovered(stock.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? stock.bg : 'var(--bg-card)',
                  border: `1px solid ${isHovered ? stock.border : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: 28,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.3)` : 'none',
                  position: 'relative',
                }}
              >
                {mismatch && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    fontSize: 10, padding: '3px 8px', borderRadius: 100,
                    background: 'rgba(255,77,77,0.15)', color: 'var(--accent-red)',
                    fontFamily: 'var(--font-mono)', fontWeight: 600
                  }}>
                    ⚠️ MISMATCH
                  </div>
                )}

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: stock.bg, border: `1px solid ${stock.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24,
                  }}>
                    {stock.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
                      {stock.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {stock.ticker}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                  {stock.description}
                </p>

                {/* Risk bar */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RISK LEVEL</span>
                    <span style={{ fontSize: 11, color: stock.color, fontFamily: 'var(--font-mono)' }}>
                      {RISK_LABELS[stock.risk]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 4, borderRadius: 2,
                        background: i <= stock.risk ? stock.color : 'var(--border-subtle)',
                        transition: 'var(--transition)',
                      }} />
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: stock.color, fontWeight: 500
                }}>
                  Simulate crash →
                </div>
              </button>
            );
          })}
        </div>

        {/* Info row */}
        <div style={{
          marginTop: 36, padding: 20,
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center'
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
            ALL DATA IS REAL:
          </div>
          {[
            'Netflix 2022 actual weekly prices',
            'Nifty 50 COVID crash March 2020',
            'Gold ETF real performance data',
          ].map(d => (
            <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-green)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
