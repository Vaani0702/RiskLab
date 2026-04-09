import React, { useState } from 'react';
import { FEAR_QUESTIONS, FEAR_PROFILES } from '../data/marketData.js';

function computeProfile(answers) {
  const scores = { panic: 0, cautious: 0, calculated: 0 };
  answers.forEach(({ questionIdx, optionIdx }) => {
    const q = FEAR_QUESTIONS[questionIdx];
    const opt = q.options[optionIdx];
    Object.entries(opt.score).forEach(([k, v]) => { scores[k] += v; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function FearQuizPage({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState(null);

  const q = FEAR_QUESTIONS[current];
  const progress = ((current) / FEAR_QUESTIONS.length) * 100;

  const handleOption = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => {
      const newAnswers = [...answers, { questionIdx: current, optionIdx: i }];
      setAnswers(newAnswers);
      if (current < FEAR_QUESTIONS.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        const p = computeProfile(newAnswers);
        setProfile(p);
        setShowResult(true);
      }
    }, 600);
  };

  if (showResult && profile) {
    const p = FEAR_PROFILES[profile];
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>{p.emoji}</div>
            <div style={{ fontSize: 12, color: p.color, fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.1em' }}>
              YOUR INVESTOR PROFILE
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800,
              color: p.color, marginBottom: 16
            }}>
              {p.name}
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              {p.description}
            </p>
          </div>

          <div style={{ display: 'grid', gap: 16, marginBottom: 36 }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)', padding: 24
            }}>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                ✓ YOUR ACTION PLAN
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-primary)' }}>{p.advice}</p>
            </div>

            <div style={{
              background: 'rgba(255,184,0,0.06)', border: '1px solid rgba(255,184,0,0.2)',
              borderRadius: 'var(--radius-md)', padding: 24
            }}>
              <div style={{ fontSize: 12, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                ⚠️ YOUR BIGGEST RISK
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{p.warning}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              Now let's run a simulation based on your profile.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(profile)}>
              Pick an asset to simulate →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              QUESTION {current + 1} OF {FEAR_QUESTIONS.length}
            </span>
            <span style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              FEAR QUIZ
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((current + 1) / FEAR_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        <div className="animate-fade-up" key={current}>
          <div style={{
            fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
            marginBottom: 20, letterSpacing: '0.06em'
          }}>
            THIS IS ABOUT YOU, NOT STOCKS
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 700, lineHeight: 1.3, marginBottom: 36
          }}>
            {q.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => handleOption(i)}
                  style={{
                    width: '100%',
                    background: isSelected ? 'var(--accent-green-dim)' : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? 'var(--accent-green)' : 'var(--border-card)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '18px 22px',
                    textAlign: 'left', cursor: 'pointer',
                    color: isSelected ? 'var(--accent-green)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-body)', fontSize: 15,
                    transition: 'var(--transition)',
                    transform: isSelected ? 'scale(0.99)' : 'none',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: isSelected ? 'var(--accent-green)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontFamily: 'var(--font-mono)', flexShrink: 0,
                    color: isSelected ? '#001A0E' : 'var(--text-muted)',
                    fontWeight: 600,
                    transition: 'var(--transition)',
                  }}>
                    {isSelected ? '✓' : String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
