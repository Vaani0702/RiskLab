import React, { useState, useEffect, useRef } from 'react';
import { FEAR_PROFILES, STOCKS, CRASH_DATA } from '../data/marketData.js';

// ──────────────────────────────────────────────
// AI Analysis via Anthropic API
// ──────────────────────────────────────────────
async function fetchAIAnalysis({ profile, stockId, decision, quizScore }) {
  const profileData = FEAR_PROFILES[profile];
  const stock = STOCKS.find(s => s.id === stockId);

  const prompt = `You are RiskLab AI, a behavioral finance psychologist and investment coach.

A user just completed a 20-question investor psychology quiz and a market crash simulation. Here is their data:

INVESTOR PROFILE: ${profileData.name} (${profile})
Profile Description: ${profileData.description}
Quiz Score: ${quizScore.correct} out of ${quizScore.total} correct (${Math.round((quizScore.correct/quizScore.total)*100)}%)

SIMULATION: ${stock?.name} ${CRASH_DATA[stock?.crashData]?.label}
Decision Made: ${decision === 'sell' ? 'SOLD during the crash (locked in loss)' : 'HELD through the crash (recovered to profit)'}

OUTCOME:
- If sold: Rs${CRASH_DATA[stock?.crashData]?.sellValue?.toLocaleString('en-IN')} (permanent loss)
- If held: Rs${CRASH_DATA[stock?.crashData]?.holdValue?.toLocaleString('en-IN')} (recovery + gain)

Generate a PERSONALIZED, EMOTIONALLY INTELLIGENT behavioral analysis. Be direct, insightful, and a little provocative (in a good way). Reference their specific profile + decision combination.

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "headline": "One powerful, memorable sentence about what their decision reveals about them (max 12 words)",
  "psychologyRead": "2-3 sentences of deep behavioral analysis — reference specific cognitive biases they likely exhibit based on their profile and decision",
  "costOfEmotion": "1-2 sentences about the real rupee cost of their emotional decision (or praise if they held)",
  "blindSpot": "Their single biggest investing blind spot based on quiz answers",
  "strengthToLeverage": "Their one genuine investing strength they can build on",
  "actionPlan": ["Step 1 as specific string", "Step 2 as specific string", "Step 3 as specific string"],
  "motivationalClose": "1-2 sentences of genuinely motivating, non-cliche closing statement"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content?.map(b => b.text || '').join('') || '';
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('AI analysis error:', err);
    return null;
  }
}

// Fallback static content
const STATIC_ANALYSIS = {
  panic: {
    sell: {
      headline: "Your emotions cost you more than the crash did.",
      psychologyRead: "You exhibit classic Loss Aversion — a cognitive bias where losses feel 2x more painful than equivalent gains feel good. When markets dropped, your brain shifted into threat-response mode, prioritizing immediate pain relief over long-term outcome. This is biology, not weakness. But it's expensive biology.",
      costOfEmotion: "The market dropped and recovered. Your loss didn't. The real cost wasn't the crash — it was the moment you clicked 'sell'.",
      blindSpot: "You confuse temporary price drops with permanent value destruction. Most crashes are temporary. Most sold losses are permanent.",
      strengthToLeverage: "Your caution means you won't over-leverage or YOLO into risky bets. Channel that into disciplined SIP investing.",
      actionPlan: ["Start a Rs500/month Nifty 50 SIP today — automate it so emotions can't interfere", "Delete your investing app from your home screen for 6 months", "Set one calendar reminder for a 6-month portfolio review — not daily checks"],
      motivationalClose: "The market will crash again. The investor who profits from that crash is the one who prepared today, not the one who panicked last time."
    },
    hold: {
      headline: "You beat your own psychology. That is rarer than you think.",
      psychologyRead: "Your profile indicates strong panic instincts, yet you overrode them. This is not luck — this is emotional regulation under real pressure. The investors who build generational wealth are not the ones without fear; they are the ones who act correctly despite it.",
      costOfEmotion: "You felt the fear and held anyway. That decision alone is worth more than any stock pick or market timing strategy.",
      blindSpot: "Your panic instincts haven't disappeared — they'll return in the next crash. Build systems that protect you from yourself.",
      strengthToLeverage: "Proven ability to hold under pressure. This is your most valuable investing trait.",
      actionPlan: ["Immediately start a Rs500/month Nifty 50 SIP to lock in this mindset", "Write down how you felt during this simulation — read it during the next real crash", "Set a 6-month reminder to review, not a daily habit of checking"],
      motivationalClose: "You just did what 80% of retail investors fail to do. Now build the systems to do it automatically."
    }
  },
  calculated: {
    hold: {
      headline: "Textbook response. The data confirms what you already suspected.",
      psychologyRead: "You demonstrate sophisticated temporal discounting — the ability to delay gratification in favor of better future outcomes. While most investors anchor to current prices and panic, you anchored to historical patterns and probability. This is the behavioral edge that separates wealth builders from wealth destroyers.",
      costOfEmotion: "You made the right call. The market recovered. Your portfolio grew. This is not luck — it is method.",
      blindSpot: "Overconfidence is the calculated investor's kryptonite. One crisis you haven't seen before can shatter a framework built on 'historical patterns'.",
      strengthToLeverage: "Data-driven decision making under emotional pressure. This compounds over decades.",
      actionPlan: ["Build a diversified portfolio: 60% index funds, 30% sector funds, 10% individual stocks", "Set an annual rebalancing reminder — discipline beats brilliance", "Read 'The Psychology of Money' by Morgan Housel — even your profile has blind spots"],
      motivationalClose: "The gap between knowing and doing is where most investors fail. You crossed it. Now scale it up."
    },
    sell: {
      headline: "You know the theory but panicked in practice. That gap is worth closing.",
      psychologyRead: "You scored well on knowledge but sold under emotional pressure — revealing a classic knowing-doing gap. Your intellectual understanding of markets is strong, but emotional regulation under real loss hasn't been battle-tested. Most experienced investors have this gap. The dangerous ones never discover it.",
      costOfEmotion: "Knowing that crashes recover didn't stop you from selling. That's the real insight: information alone doesn't override emotion. Systems do.",
      blindSpot: "Overconcentration amplifies panic. Spreading across asset classes reduces the emotional weight of any single position dropping.",
      strengthToLeverage: "Strong market knowledge means you can build better systems — you just need to automate the execution.",
      actionPlan: ["Never put more than 10% of portfolio in a single stock", "Build a 70% index core before experimenting with individual names", "Create a written Investment Policy Statement you read before any panic decision"],
      motivationalClose: "The investors who lose the most aren't the ignorant ones — they're the knowledgeable ones who trust their emotions over their systems."
    }
  }
};

function getStaticAnalysis(profile, decision) {
  const p = STATIC_ANALYSIS[profile] || STATIC_ANALYSIS.calculated;
  return p[decision] || p.hold || STATIC_ANALYSIS.calculated.hold;
}

// ──────────────────────────────────────────────
export default function DebriefPage({ profile, stockId, decision, quizScore, onRestart }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const timerRef = useRef(null);

  const prof = FEAR_PROFILES[profile] || FEAR_PROFILES.calculated;
  const stock = STOCKS.find(s => s.id === stockId) || STOCKS[0];
  const crashData = CRASH_DATA[stock.crashData];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const ai = await fetchAIAnalysis({
        profile, stockId, decision,
        quizScore: quizScore || { correct: 10, total: 20 }
      });
      const result = ai || getStaticAnalysis(profile, decision);
      setAnalysis(result);
      setLoading(false);

      // Typing effect for headline
      let i = 0;
      timerRef.current = setInterval(() => {
        setTypedText(result.headline.slice(0, i));
        i++;
        if (i > result.headline.length) {
          setTypingDone(true);
          clearInterval(timerRef.current);
        }
      }, 30);
    }
    load();
    return () => clearInterval(timerRef.current);
  }, []);

  const sellAmount = crashData?.sellValue || 7000;
  const holdAmount = crashData?.holdValue || 11000;
  const invested = crashData?.investedAmount || 10000;
  const didSell = decision === 'sell';
  const diffAmount = holdAmount - sellAmount;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          border: '2px solid rgba(0,214,143,0.2)',
          borderTop: '2px solid var(--accent-green)',
          animation: 'spin 1s linear infinite',
        }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6 }}>
            RiskLab AI is analyzing your behavior
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Mapping cognitive biases · Generating personalized insights
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 780 }}>

        {/* AI Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,214,143,0.2), rgba(0,214,143,0.05))',
            border: '1px solid rgba(0,214,143,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            🧠
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>RiskLab Behavioral AI</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {prof.name} · {stock.name} {crashData?.label} · {didSell ? 'SOLD' : 'HELD'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse 2s ease infinite' }} />
            <span style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>AI POWERED</span>
          </div>
        </div>

        {/* Headline */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 38px)',
            fontWeight: 800, lineHeight: 1.2,
            color: didSell ? '#FF4D4D' : 'var(--accent-green)',
            marginBottom: 20,
          }}>
            "{typedText}{!typingDone && <span style={{ color: 'var(--accent-green)', opacity: 0.6 }}>|</span>}"
          </h2>
        </div>

        {/* Money outcome — THE EMOTIONAL HIT */}
        <div style={{
          background: didSell
            ? 'linear-gradient(135deg, rgba(255,77,77,0.08), rgba(255,77,77,0.02))'
            : 'linear-gradient(135deg, rgba(0,214,143,0.08), rgba(0,214,143,0.02))',
          border: `1px solid ${didSell ? 'rgba(255,77,77,0.2)' : 'rgba(0,214,143,0.2)'}`,
          borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: 28
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20, letterSpacing: '0.08em' }}>
            YOUR ACTUAL OUTCOME — IN RUPEES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>INVESTED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-secondary)' }}>
                ₹{invested.toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', padding: '0 20px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>YOU {didSell ? 'SOLD AT' : 'NOW HAVE'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: didSell ? '#FF4D4D' : 'var(--accent-green)' }}>
                ₹{(didSell ? sellAmount : holdAmount).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 11, color: didSell ? '#FF4D4D' : 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                {didSell ? `−₹${(invested - sellAmount).toLocaleString('en-IN')} loss` : `+₹${(holdAmount - invested).toLocaleString('en-IN')} gain`}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{didSell ? 'IF YOU HELD' : 'IF YOU SOLD'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: didSell ? 'var(--accent-green)' : '#FF4D4D' }}>
                ₹{(didSell ? holdAmount : sellAmount).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                {didSell ? `missed ₹${diffAmount.toLocaleString('en-IN')}` : `avoided ₹${diffAmount.toLocaleString('en-IN')} loss`}
              </div>
            </div>
          </div>
          {didSell && (
            <div style={{
              marginTop: 20, padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,77,77,0.08)', border: '1px solid rgba(255,77,77,0.15)',
              fontSize: 13, color: '#FF8080', textAlign: 'center', fontStyle: 'italic',
            }}>
              "The market dropped {crashData?.crashPercent}%. You felt that loss. But the recovery was just {crashData?.recoveryMonths} months away."
            </div>
          )}
        </div>

        {/* Psychology Read */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>🧠</span>
            <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              BEHAVIORAL PSYCHOLOGY ANALYSIS
            </div>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {analysis?.psychologyRead}
          </p>
        </div>

        {/* Blind spot + Strength */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{
            background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.15)',
            borderRadius: 'var(--radius-md)', padding: 22
          }}>
            <div style={{ fontSize: 11, color: '#FF4D4D', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: '0.08em' }}>
              🎯 BLIND SPOT
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {analysis?.blindSpot}
            </p>
          </div>
          <div style={{
            background: 'rgba(0,214,143,0.05)', border: '1px solid rgba(0,214,143,0.15)',
            borderRadius: 'var(--radius-md)', padding: 22
          }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: '0.08em' }}>
              💪 YOUR STRENGTH
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {analysis?.strengthToLeverage}
            </p>
          </div>
        </div>

        {/* Cost of Emotion */}
        <div style={{
          background: 'rgba(255,184,0,0.05)', border: '1px solid rgba(255,184,0,0.15)',
          borderRadius: 'var(--radius-md)', padding: 22, marginBottom: 20
        }}>
          <div style={{ fontSize: 11, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: '0.08em' }}>
            ₹ COST OF EMOTION
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "{analysis?.costOfEmotion}"
          </p>
        </div>

        {/* Action Plan */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,214,143,0.08), rgba(0,214,143,0.02))',
          border: '1px solid rgba(0,214,143,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 32
        }}>
          <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 20, letterSpacing: '0.08em' }}>
            ✓ YOUR PERSONAL ACTION PLAN — AI GENERATED
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(analysis?.actionPlan || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(0,214,143,0.15)', border: '1px solid rgba(0,214,143,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)',
                  fontWeight: 700, flexShrink: 0, marginTop: 2,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          {analysis?.motivationalClose && (
            <div style={{
              marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(0,214,143,0.1)',
              fontSize: 14, color: 'var(--accent-green)', lineHeight: 1.7, fontStyle: 'italic'
            }}>
              {analysis.motivationalClose}
            </div>
          )}
        </div>

        {/* SIP Calculator */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 40
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
            ₹500/MONTH — THE POWER OF COMPOUNDING
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, textAlign: 'center' }}>
            {[
              { years: 5, invested: '30,000', value: '40,000' },
              { years: 10, invested: '60,000', value: '1,16,000' },
              { years: 20, invested: '1,20,000', value: '3,80,000' },
            ].map(row => (
              <div key={row.years}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{row.years} YEARS</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>₹{row.invested} invested</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>₹{row.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>at 12% p.a.</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
            ₹500/month = one restaurant meal. That meal compounds into ₹3.8 lakhs.
          </div>
        </div>

        {/* Restart */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-secondary" onClick={onRestart} style={{ marginRight: 12 }}>
            ← Try a different scenario
          </button>
          <button className="btn btn-primary" onClick={onRestart}>
            Restart with new profile →
          </button>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Built for Finvasia Innovation Hackathon 2026 · RiskLab AI<br/>
          ⚠️ Simulation for behavioral education only. Not financial advice.
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}