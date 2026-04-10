import React, { useState, useEffect } from 'react';
import { FEAR_PROFILES, STOCKS } from '../data/marketData.js';
import { getDebrief } from '../api.js';

function fmt(n) { return '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN'); }

// Static fallback debriefs
const STATIC = {
  panic: {
    sell: {
      headline: "Your emotions cost you more than the crash did.",
      summary: "The market dropped. That's normal — it always does. But the loss was locked in the moment you sold. Markets have always recovered. Sellers haven't always gotten back in.",
      insights: [
        { icon: '🧠', title: 'What happened', text: 'You experienced a completely normal fear response. Research shows humans feel losses 2x more intensely than equivalent gains. Your brain was doing what evolution designed it to do — but that instinct is wrong in stock markets.' },
        { icon: '📉', title: 'The real cost', text: 'Selling at a low makes the loss permanent. The market recovered. Your loss didn\'t. The crash didn\'t cause the permanent loss — the decision to sell did.' },
        { icon: '🛡️', title: 'Your action plan', text: 'Start a Nifty 50 SIP of ₹500/month. Delete the app from your home screen. Review once every 6 months. Time heals volatility — panic makes it permanent.' },
      ],
      actionItems: ['Start ₹500/month Nifty 50 SIP today', 'Delete investing app from home screen', 'Set 6-month portfolio review reminder'],
      sipSuggestion: 'Start ₹500/month in UTI Nifty 50 Index Fund — low fees, automatic diversification.',
    },
    hold: {
      headline: "You beat your own psychology. That's rarer than you think.",
      summary: "As a Panic Seller profile, holding through that crash was genuinely difficult. Your instincts screamed sell. You didn't. That decision separates long-term investors from everyone else.",
      insights: [
        { icon: '🏆', title: 'What you did right', text: 'You sat with discomfort. Every successful long-term investor has had to do exactly this — feel the loss and do nothing. This is harder than it sounds.' },
        { icon: '💡', title: 'The lesson', text: 'The best investment strategy is the one you can actually stick to through a crash. You just proved you can hold. That\'s the most important thing.' },
        { icon: '🚀', title: 'Next step', text: 'Now do it with real money. Start small — ₹500/month — so the amounts don\'t trigger your panic response. Build the habit first.' },
      ],
      actionItems: ['Start ₹500/month Nifty 50 SIP this week', 'Set 6-month review reminder', 'Share your result with someone scared to invest'],
      sipSuggestion: 'You\'re ready for ₹1,000/month in Nifty 50. Your behavior in this simulation proves it.',
    },
  },
  cautious: {
    sell: {
      headline: "Analysis paralysis met panic selling — a dangerous combination.",
      summary: "You research before acting but moved fast in the wrong direction when scared. Slow to enter, quick to exit is the worst combination in investing.",
      insights: [
        { icon: '⏳', title: 'The real cost of waiting', text: 'Every month you delay investing while doing research costs you compound interest. Time in market beats timing the market — always.' },
        { icon: '🎯', title: 'Your pattern', text: 'You need a set-and-forget system. SIPs automate the entry so you never have to decide to invest each month.' },
        { icon: '📖', title: 'Your action plan', text: 'Stop researching. Start today with ₹500/month. You don\'t need more information. You need one decision.' },
      ],
      actionItems: ['Open Groww or Zerodha today — not tomorrow', 'Start ₹500 Nifty 50 SIP immediately', 'Stop researching and start doing'],
      sipSuggestion: '₹500/month in HDFC Index Fund Nifty 50 Plan. Expense ratio 0.1%. No decisions after setup.',
    },
    hold: {
      headline: "Patience is your superpower. Don't waste it by never starting.",
      summary: "You held when it got hard — that's your biggest strength. The trap for your profile isn't panic-selling — it's never starting at all.",
      insights: [
        { icon: '✅', title: 'What you did right', text: 'You didn\'t panic. This is harder than it sounds and more valuable than any stock pick.' },
        { icon: '⚠️', title: 'Your one warning', text: 'Don\'t use \'I need to learn more\' as an excuse to never start. You know enough. The rest comes from experience.' },
        { icon: '💰', title: 'The math', text: '₹500/month for 20 years at 12% = ₹5 lakh from ₹1.2 lakh invested. Every year you wait, you lose compounding that can never be recovered.' },
      ],
      actionItems: ['Start investing within 48 hours — set a hard deadline', '₹500/month minimum to build the habit', 'Automate it completely — remove the decision'],
      sipSuggestion: '₹1,000/month in UTI Nifty 50. Your patience means you won\'t panic-sell. You\'re ready.',
    },
  },
  calculated: {
    sell: {
      headline: "You know the theory but panicked in practice. Gap worth closing.",
      summary: "You understand crashes recover — but when it was real, you sold anyway. The gap between intellectual knowledge and emotional response is the thing to fix.",
      insights: [
        { icon: '🔍', title: 'What this reveals', text: 'You\'re confident in theory but not yet battle-hardened. Real crashes feel different from simulations. This one just gave you that experience — without the real loss.' },
        { icon: '⚖️', title: 'Diversification matters', text: 'Overconcentration amplifies panic. If you had 5 assets instead of one, a 70% drop in one would only be 14% in your portfolio — much easier to hold.' },
        { icon: '📐', title: 'Your rule', text: 'Never more than 10% in a single stock. 70% index fund core. 10% cash reserved for buying during crashes — then you benefit from them.' },
      ],
      actionItems: ['Cap individual stocks at 10% of total portfolio', 'Build 70% index fund core first', 'Keep 10% cash specifically for crash opportunities'],
      sipSuggestion: '₹3,000/month split: ₹2,000 Nifty 50 + ₹1,000 Nifty Next 50. Diversified, low-cost.',
    },
    hold: {
      headline: "Textbook response. Now scale it up responsibly.",
      summary: "You did exactly what the data says to do. Held through the crash, watched the recovery. The next challenge for your profile is overconfidence.",
      insights: [
        { icon: '🧮', title: 'What you got right', text: 'You trusted historical patterns over real-time fear. That\'s rare. Most experienced investors still panic-sell during real crashes.' },
        { icon: '⚠️', title: 'Your blind spot', text: 'Overconfidence. Every \'this time is different\' crash has humbled smart investors. Diversification is your hedge against your own confidence.' },
        { icon: '🎯', title: 'Next level', text: '60% index funds, 30% sector/mid-cap funds, 10% individual stocks. Rebalance annually. This is how wealth is actually built.' },
      ],
      actionItems: ['Build: 60% Nifty 50, 30% sector funds, 10% individual stocks', 'Set annual rebalancing reminder (January)', 'Read: The Psychology of Money by Morgan Housel'],
      sipSuggestion: '₹5,000/month: ₹3,000 Nifty 50 + ₹1,500 Nifty Next 50 + ₹500 in one sector you understand.',
    },
  },
};

function getStaticDebrief(profile, decision) {
  return STATIC[profile]?.[decision] || STATIC.calculated.hold;
}

function TypedText({ text, speed = 12 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return <span>{displayed}{displayed.length < text.length && <span style={{ color: 'var(--accent-green)', animation: 'pulse-dot 0.6s infinite' }}>|</span>}</span>;
}

export default function DebriefPage({ profile, stockId, decision, investment, finalValue, pnl, returnPct, onRestart }) {
  const [debrief, setDebrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);

  const prof = FEAR_PROFILES[profile] || FEAR_PROFILES.calculated;
  const stock = STOCKS.find(s => s.id === stockId);

  useEffect(() => {
    let cancelled = false;

    async function fetchDebrief() {
      // Try backend AI debrief first
      try {
        const result = await getDebrief({
          profile: profile || 'calculated',
          stockId: stockId || 'nifty',
          decision: decision || 'hold',
          investment: investment || 10000,
          finalValue: finalValue || investment || 10000,
          pnl: pnl || 0,
          returnPct: returnPct || 0,
        });
        if (!cancelled) {
          setDebrief(result);
          setSource(result.source || 'backend');
          setLoading(false);
        }
      } catch (err) {
        console.warn('Backend unavailable, using static debrief:', err.message);
        if (!cancelled) {
          setDebrief(getStaticDebrief(profile || 'calculated', decision || 'hold'));
          setSource('static');
          setLoading(false);
        }
      }
    }

    // Small delay for better UX — let the user land on the page first
    const t = setTimeout(fetchDebrief, 600);
    return () => { cancelled = true; clearTimeout(t); };
  }, [profile, stockId, decision, investment]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--accent-green)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>Generating your personalized debrief...</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>Calling AI analysis engine</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, paddingBottom: 80 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 0' }}>

        {/* AI badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            AI
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>RiskLab AI Coach</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', display: 'flex', gap: 8, alignItems: 'center' }}>
              {prof?.name} · {stock?.name} · {decision === 'sell' ? 'Sold' : 'Held'}
              {source === 'backend' && <span style={{ padding: '1px 6px', borderRadius: 100, background: 'var(--accent-green-dim)', color: 'var(--accent-green)' }}>Live AI</span>}
              {source === 'static' && <span style={{ padding: '1px 6px', borderRadius: 100, background: 'rgba(255,184,0,0.1)', color: 'var(--accent-amber)' }}>Pre-written</span>}
            </div>
          </div>
        </div>

        {/* Headline */}
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(22px,4vw,34px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 20, color: decision === 'hold' ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
          "{debrief.headline}"
        </h2>

        {/* Typed summary */}
        <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, borderLeft: '3px solid var(--border-card)', paddingLeft: 20, marginBottom: 28 }}>
          <TypedText text={debrief.summary} speed={10} />
        </div>

        {/* P&L summary strip */}
        {investment && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
            {[
              { label: 'Invested', value: fmt(investment), color: 'var(--text-primary)' },
              { label: 'Final value', value: fmt(finalValue || investment), color: (pnl || 0) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
              { label: 'P&L', value: ((pnl || 0) >= 0 ? '+' : '−') + fmt(pnl || 0), color: (pnl || 0) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 24 }} />

        {/* Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {debrief.insights?.map((ins, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{ins.icon}</span>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{ins.title}</div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{ins.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action plan */}
        <div style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 14 }}>YOUR PERSONAL ACTION PLAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {debrief.actionItems?.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,214,143,0.2)', border: '1px solid rgba(0,214,143,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIP suggestion */}
        {debrief.sipSuggestion && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: '16px 20px', marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 8 }}>SIP RECOMMENDATION</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{debrief.sipSuggestion}</p>
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            This is a simulation tool for financial education. Not financial advice.<br />
            Built for Finvasia Innovation Hackathon 2026 by Team Bold Rupee.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onRestart} style={{ padding: '12px 24px', borderRadius: 12, background: 'transparent', border: '1px solid var(--border-card)', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, cursor: 'pointer' }}>
            Try a different scenario
          </button>
          <button onClick={onRestart} style={{ padding: '12px 24px', borderRadius: 12, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Start new simulation →
          </button>
        </div>
      </div>
    </div>
  );
}
