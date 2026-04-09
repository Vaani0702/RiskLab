import React, { useState } from 'react';

const CHAPTERS = [
  {
    id: 1,
    icon: '🍽️',
    title: 'Why your money is already losing value',
    content: [
      {
        type: 'story',
        text: 'Remember when chhole bhature cost ₹30 at your local dhaba? Today the same plate costs ₹100. That\'s not the dhaba owner being greedy. That\'s inflation.',
      },
      {
        type: 'analogy',
        title: 'The Leaky Bucket',
        text: 'Think of your savings as a bucket of water. Inflation is a hole in the bottom. Every year, 6-7% of your water leaks out. A savings account just adds a tiny trickle back. Investing is pouring water in faster than it leaks.',
        visual: 'bucket',
      },
      {
        type: 'fact',
        text: '₹1,00,000 in a savings account at 3.5% interest grows to ₹1,03,500 in a year. But at 6% inflation, it\'s actually worth only ₹97,642. You "earned" interest but actually lost ₹2,358 in real value.',
      },
    ],
    quiz: {
      question: 'If inflation is 6% and your savings account gives 3.5%, what actually happens to your money?',
      options: ['It grows — 3.5% is still positive!', 'It silently shrinks — you\'re losing 2.5% real value', 'Nothing changes'],
      correct: 1,
      explanation: 'Exactly. Your nominal balance goes up, but your purchasing power goes down. This is why just saving is not enough.',
    }
  },
  {
    id: 2,
    icon: '🫙',
    title: 'What is investing — the dosa stall story',
    content: [
      {
        type: 'story',
        text: 'Your friend Vaani wants to open a dosa stall. She needs ₹50,000 for equipment. She asks you to invest ₹25,000 and offers you 50% ownership.',
      },
      {
        type: 'analogy',
        title: 'You\'re now a part-owner',
        text: 'When Vaani earns ₹10,000 profit this month, ₹5,000 is yours. When she expands to a second stall, your 50% becomes more valuable. When she has a bad month, your share is worth less. This is exactly what a stock is — a tiny ownership slice of a real company.',
        visual: 'dosa',
      },
      {
        type: 'fact',
        text: 'When you buy 1 share of Reliance, you literally own a tiny piece of Reliance Industries. Their profits. Their assets. Their future. That\'s not gambling — that\'s ownership.',
      },
    ],
    quiz: {
      question: 'Vaani\'s dosa stall earns ₹20,000 this month. You own 50%. How much is yours?',
      options: ['₹0 — you just invested, not earning yet', '₹10,000 — your 50% share of profit', '₹20,000 — all profit since you took the risk'],
      correct: 1,
      explanation: '₹10,000 is yours! Ownership means sharing profits AND losses. That\'s the deal with stocks.',
    }
  },
  {
    id: 3,
    icon: '📊',
    title: 'Stocks, Mutual Funds & Index Funds',
    content: [
      {
        type: 'comparison',
        items: [
          {
            icon: '🏪',
            title: 'Stock',
            text: 'Owning one specific dosa stall. High reward, high risk. If Vaani\'s stall burns down, you lose everything.',
            risk: 'High',
            riskColor: 'var(--accent-red)',
          },
          {
            icon: '👨‍💼',
            title: 'Mutual Fund',
            text: 'A professional invests your ₹500 across 50 different stalls. One stall fails, 49 others save you.',
            risk: 'Medium',
            riskColor: 'var(--accent-amber)',
          },
          {
            icon: '🏬',
            title: 'Index Fund',
            text: 'You own a tiny piece of ALL the top 50 companies in India. When India grows, you grow.',
            risk: 'Low-Medium',
            riskColor: 'var(--accent-green)',
          },
          {
            icon: '🥇',
            title: 'Gold',
            text: 'Insurance. Goes up when everything else crashes. But boring in good times.',
            risk: 'Low',
            riskColor: '#FFD700',
          },
        ]
      },
    ],
    quiz: {
      question: 'You have ₹1,000 and want the safest way to grow it. Which is best for a beginner?',
      options: ['Buy stock in one company — higher potential!', 'Index Fund / Nifty 50 — diversified, safe start', 'Keep it in cash — no risk!'],
      correct: 1,
      explanation: 'Index funds spread your risk across 50 companies. One company crashes? Doesn\'t matter. India as a whole keeps growing.',
    }
  },
];

function BucketVisual() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40, padding: '20px 0', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 80, height: 100,
          border: '3px solid var(--accent-red)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          position: 'relative',
          background: 'rgba(255,77,77,0.08)',
          margin: '0 auto 8px',
        }}>
          <div style={{
            position: 'absolute', bottom: -8, left: '50%',
            transform: 'translateX(-50%)',
            width: 3, height: 20,
            background: 'var(--accent-red)',
            borderRadius: 2,
          }} />
          <div style={{
            fontSize: 11, color: 'var(--accent-red)',
            position: 'absolute', bottom: -28, left: '50%',
            transform: 'translateX(-50%)', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)'
          }}>
            -6% inflation
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 16 }}>Savings only</div>
      </div>

      <div style={{ fontSize: 24, color: 'var(--text-muted)' }}>→</div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 80, height: 100,
          border: '3px solid var(--accent-green)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          position: 'relative',
          background: 'linear-gradient(to top, rgba(0,214,143,0.2) 60%, transparent)',
          margin: '0 auto 8px',
        }}>
          <div style={{
            position: 'absolute', top: -16, left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11, color: 'var(--accent-green)',
            fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap'
          }}>
            +12% returns
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>Investing</div>
      </div>
    </div>
  );
}

function QuizBlock({ quiz, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  const isCorrect = selected === quiz.correct;

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-md)',
      padding: 24, marginTop: 24
    }}>
      <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', marginBottom: 12 }}>
        QUICK CHECK
      </div>
      <p style={{ fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>{quiz.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {quiz.options.map((opt, i) => {
          let borderColor = 'var(--border-card)';
          let bg = 'var(--bg-glass)';
          let color = 'var(--text-primary)';

          if (answered) {
            if (i === quiz.correct) {
              borderColor = 'var(--accent-green)';
              bg = 'var(--accent-green-dim)';
              color = 'var(--accent-green)';
            } else if (i === selected && selected !== quiz.correct) {
              borderColor = 'var(--accent-red)';
              bg = 'var(--accent-red-dim)';
              color = 'var(--accent-red)';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                background: bg, border: `1px solid ${borderColor}`,
                borderRadius: 10, padding: '12px 16px',
                textAlign: 'left', cursor: answered ? 'default' : 'pointer',
                color, fontSize: 14, fontFamily: 'var(--font-body)',
                transition: 'var(--transition)',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 16 }}>
          <div style={{
            padding: '12px 16px',
            background: isCorrect ? 'var(--accent-green-dim)' : 'var(--accent-amber-dim)',
            border: `1px solid ${isCorrect ? 'rgba(0,214,143,0.3)' : 'rgba(255,184,0,0.3)'}`,
            borderRadius: 10,
            fontSize: 14, lineHeight: 1.6,
            color: isCorrect ? 'var(--accent-green)' : 'var(--accent-amber)',
            marginBottom: 16
          }}>
            {isCorrect ? '✓ Correct! ' : '✗ Not quite. '}{quiz.explanation}
          </div>
          <button className="btn btn-primary" onClick={onNext}>
            Next Chapter →
          </button>
        </div>
      )}
    </div>
  );
}

export default function GroundZeroPage({ onComplete }) {
  const [chapter, setChapter] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const currentChapter = CHAPTERS[chapter];
  const progress = ((chapter) / CHAPTERS.length) * 100;

  const handleNextChapter = () => {
    if (chapter < CHAPTERS.length - 1) {
      setChapter(c => c + 1);
      setQuizDone(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete();
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        {/* Chapter progress */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              CHAPTER {chapter + 1} OF {CHAPTERS.length}
            </span>
            <span style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              GROUND ZERO
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((chapter + 1) / CHAPTERS.length) * 100}%` }} />
          </div>
        </div>

        {/* Chapter header */}
        <div className="animate-fade-up" key={chapter} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{currentChapter.icon}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
            marginBottom: 8, lineHeight: 1.2
          }}>
            {currentChapter.title}
          </h2>
        </div>

        {/* Chapter content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {currentChapter.content.map((block, i) => {
            if (block.type === 'story') {
              return (
                <div key={i} style={{
                  fontSize: 17, lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  padding: '0 0 4px'
                }}>
                  {block.text}
                </div>
              );
            }

            if (block.type === 'analogy') {
              return (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderLeft: '3px solid var(--accent-green)',
                  borderRadius: 'var(--radius-md)',
                  padding: 24,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                    ANALOGY — {block.title.toUpperCase()}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-primary)' }}>{block.text}</p>
                  {block.visual === 'bucket' && <BucketVisual />}
                </div>
              );
            }

            if (block.type === 'fact') {
              return (
                <div key={i} style={{
                  background: 'rgba(255,184,0,0.06)',
                  border: '1px solid rgba(255,184,0,0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: 20,
                  fontSize: 14, lineHeight: 1.7,
                  color: 'var(--text-secondary)'
                }}>
                  💡 {block.text}
                </div>
              );
            }

            if (block.type === 'comparison') {
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {block.items.map((item, j) => (
                    <div key={j} style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      padding: 18,
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                        {item.title}
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                        {item.text}
                      </p>
                      <span style={{
                        fontSize: 11, fontFamily: 'var(--font-mono)',
                        padding: '3px 8px', borderRadius: 100,
                        background: 'rgba(255,255,255,0.06)',
                        color: item.riskColor,
                      }}>
                        Risk: {item.risk}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}

          {/* Quiz */}
          <QuizBlock
            quiz={currentChapter.quiz}
            onNext={handleNextChapter}
          />
        </div>
      </div>
    </div>
  );
}
