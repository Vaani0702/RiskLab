import React, { useState, useEffect } from 'react';
import { FEAR_QUESTIONS, FEAR_PROFILES } from '../data/marketData.js';

function computeProfile(answers) {
  const scores = { panic: 0, cautious: 0, calculated: 0 };
  let correctCount = 0;
  answers.forEach(({ questionIdx, optionIdx }) => {
    const q = FEAR_QUESTIONS[questionIdx];
    const opt = q.options[optionIdx];
    Object.entries(opt.score).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
    if (optionIdx === q.correctIdx) correctCount++;
  });
  const profile = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return { profile, correctCount };
}

const BLOCK_COLORS = {
  "Loss Reaction": "#FF4444",
  "Monitoring": "#FF9500",
  "Risk Appetite": "#A78BFA",
  "Pressure Decisions": "#F59E0B",
  "Knowledge": "#00D68F",
  "Emotional Triggers": "#EC4899",
  "Long-term Thinking": "#3B82F6",
};

export default function FearQuizPage({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const q = FEAR_QUESTIONS[current];
  const totalQ = FEAR_QUESTIONS.length;

  const handleOption = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setRevealed(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, { questionIdx: current, optionIdx: selected }];
    setAnswers(newAnswers);
    if (current < totalQ - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const result = computeProfile(newAnswers);
      setProfileData(result);
      setShowResult(true);
    }
  };

  if (showResult && profileData) {
    const p = FEAR_PROFILES[profileData.profile];
    const accuracy = Math.round((profileData.correctCount / totalQ) * 100);
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            {/* Accuracy badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px', borderRadius: 100,
              background: accuracy >= 70 ? 'rgba(0,214,143,0.12)' : 'rgba(255,184,0,0.12)',
              border: `1px solid ${accuracy >= 70 ? 'rgba(0,214,143,0.3)' : 'rgba(255,184,0,0.3)'}`,
              fontSize: 13, fontFamily: 'var(--font-mono)',
              color: accuracy >= 70 ? 'var(--accent-green)' : 'var(--accent-amber)',
              marginBottom: 24,
            }}>
              🎯 {profileData.correctCount}/{totalQ} correct answers · {accuracy}% accuracy
            </div>

            <div style={{ fontSize: 80, marginBottom: 16 }}>{p.emoji}</div>
            <div style={{ fontSize: 12, color: p.color, fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.1em' }}>
              YOUR INVESTOR PSYCHOLOGY PROFILE
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800,
              color: p.color, marginBottom: 16
            }}>
              {p.name}
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
              {p.description}
            </p>
          </div>

          {/* Trait bars */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 20
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
              BEHAVIORAL ANALYSIS
            </div>
            {[
              { label: 'Risk Tolerance', value: p.riskScore, max: 10, color: '#FF9500' },
              { label: 'Emotional Discipline', value: p.disciplineScore, max: 10, color: '#00D68F' },
              { label: 'Market Knowledge', value: p.knowledgeScore, max: 10, color: '#A78BFA' },
            ].map(bar => (
              <div key={bar.label} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{bar.label}</span>
                  <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: bar.color }}>{bar.value}/{bar.max}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${(bar.value / bar.max) * 100}%`, height: '100%',
                    background: bar.color, borderRadius: 3,
                    transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div style={{
              background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.2)',
              borderRadius: 'var(--radius-md)', padding: 22
            }}>
              <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                ✓ ACTION PLAN
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>{p.advice}</p>
            </div>
            <div style={{
              background: 'rgba(255,184,0,0.06)', border: '1px solid rgba(255,184,0,0.2)',
              borderRadius: 'var(--radius-md)', padding: 22
            }}>
              <div style={{ fontSize: 12, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                ⚠️ BIGGEST RISK
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{p.warning}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              Now experience a real crash simulation based on your profile.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(profileData.profile, { correct: profileData.correctCount, total: totalQ })}>
              Enter the Simulator →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = revealed && selected === q.correctIdx;
  const blockColor = BLOCK_COLORS[q.block] || '#00D68F';
  const progress = ((current) / totalQ) * 100;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 680 }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                background: blockColor + '18', border: `1px solid ${blockColor}44`,
                fontSize: 10, fontFamily: 'var(--font-mono)', color: blockColor, letterSpacing: '0.08em'
              }}>
                {q.block.toUpperCase()}
              </span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {current + 1} / {totalQ}
            </span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${((current + 1) / totalQ) * 100}%`, height: '100%',
              background: `linear-gradient(90deg, var(--accent-green), ${blockColor})`,
              borderRadius: 2, transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Question */}
        <div key={current} className="animate-fade-up">
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 3.5vw, 26px)',
            fontWeight: 700, lineHeight: 1.35, marginBottom: 32, color: 'var(--text-primary)'
          }}>
            {q.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isRight = q.correctIdx === i;
              let bg = 'var(--bg-card)';
              let border = 'var(--border-card)';
              let textColor = 'var(--text-primary)';
              let indicator = String.fromCharCode(65 + i);

              if (revealed) {
                if (isRight) {
                  bg = 'rgba(0,214,143,0.08)';
                  border = 'rgba(0,214,143,0.5)';
                  textColor = 'var(--accent-green)';
                  indicator = '✓';
                } else if (isSelected && !isRight) {
                  bg = 'rgba(255,77,77,0.08)';
                  border = 'rgba(255,77,77,0.4)';
                  textColor = '#FF4D4D';
                  indicator = '✗';
                } else {
                  textColor = 'var(--text-muted)';
                }
              } else if (isSelected) {
                bg = 'var(--bg-card-hover)';
                border = 'rgba(255,255,255,0.2)';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOption(i)}
                  disabled={revealed}
                  style={{
                    width: '100%', background: bg, border: `1px solid ${border}`,
                    borderRadius: 'var(--radius-md)', padding: '18px 22px',
                    textAlign: 'left', cursor: revealed ? 'default' : 'pointer',
                    color: textColor, fontFamily: 'var(--font-body)', fontSize: 15,
                    transition: 'all 0.25s ease',
                    display: 'flex', alignItems: 'center', gap: 14,
                    opacity: revealed && !isRight && !isSelected ? 0.4 : 1,
                  }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: revealed && isRight ? 'rgba(0,214,143,0.2)'
                      : revealed && isSelected && !isRight ? 'rgba(255,77,77,0.2)'
                      : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700,
                    color: textColor, border: `1px solid ${border}`,
                  }}>
                    {indicator}
                  </span>
                  <span style={{ lineHeight: 1.5 }}>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          {revealed && (
            <div style={{
              padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: 24,
              background: isCorrect ? 'rgba(0,214,143,0.07)' : 'rgba(255,184,0,0.07)',
              border: `1px solid ${isCorrect ? 'rgba(0,214,143,0.25)' : 'rgba(255,184,0,0.25)'}`,
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                color: isCorrect ? 'var(--accent-green)' : 'var(--accent-amber)',
                marginBottom: 8
              }}>
                {isCorrect ? '✓ CORRECT — ' : '✗ INCORRECT — '}INSIGHT
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {q.correctHint}
              </p>
            </div>
          )}

          {revealed && (
            <button
              className="btn btn-primary"
              onClick={handleNext}
              style={{ width: '100%', fontSize: 15, padding: '14px 0' }}
            >
              {current < totalQ - 1 ? `Next Question (${current + 2}/${totalQ}) →` : 'See My Profile →'}
            </button>
          )}

          {!revealed && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Choose an answer to reveal the insight
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}