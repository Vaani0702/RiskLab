import React from 'react';

const STEPS = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Fear Quiz' },
  { id: 3, label: 'Pick Asset' },
  { id: 4, label: 'Simulate' },
  { id: 5, label: 'Debrief' },
];

export default function Navbar({ step }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="logo">
          <span className="logo-dot" />
          RiskLab
        </div>

        {step > 0 && (
          <div className="steps-bar" style={{ gap: 0 }}>
            {STEPS.map((s, i) => {
              const status = s.id < step ? 'done' : s.id === step ? 'active' : '';
              return (
                <React.Fragment key={s.id}>
                  <div className={`step-item ${status}`}>
                    <div className="step-circle">
                      {s.id < step ? '✓' : s.id}
                    </div>
                    <span style={{ display: 'none' }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="step-line" />}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Flight Simulator for Investing
        </div>
      </div>
    </nav>
  );
}
