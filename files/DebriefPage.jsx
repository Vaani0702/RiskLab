import React, { useState, useEffect } from 'react';
import { FEAR_PROFILES, STOCKS } from '../data/marketData.js';

const DEBRIEFS = {
  panic: {
    sell: {
      headline: "Your emotions cost you more than the crash did.",
      summary: "The market dropped. That's normal — it always does. But the loss was locked in the moment you sold, not when the crash started. Markets have always recovered. Sellers haven't always gotten back in.",
      insights: [
        { icon: '🧠', title: 'What happened', text: 'You experienced a completely normal emotional response to loss. Research shows humans feel losses 2x more intensely than equivalent gains. You\'re wired to sell. Most people do.' },
        { icon: '📉', title: 'The real risk', text: 'Selling at a low doesn\'t protect you — it makes the loss permanent. The market recovered. Your loss didn\'t.' },
        { icon: '🛡️', title: 'Your action plan', text: 'Start with a Nifty 50 SIP of ₹500/month. Set it up, forget the app. Review once every 6 months, not daily. Time heals volatility.' },
      ],
      actionItems: ['Start ₹500/month Nifty 50 SIP', 'Delete the investing app from your home screen', 'Set a 6-month calendar reminder to check once'],
    },
    hold: {
      headline: "You beat your own psychology. That's rarer than you think.",
      summary: "As a Panic Seller profile, holding through that crash was genuinely difficult. Your instincts screamed sell. You didn't. That decision separates long-term investors from short-term gamblers.",
      insights: [
        { icon: '🏆', title: 'What you did right', text: 'You sat with discomfort. Every successful long-term investor has had to do exactly what you did — feel the loss and do nothing.' },
        { icon: '💡', title: 'The lesson', text: 'The best investment strategy is the one you can actually stick to through a crash. You just proved you can.' },
        { icon: '🚀', title: 'Next step', text: 'Now do it with real money. Start small — ₹500/month — and build the habit of not checking daily.' },
      ],
      actionItems: ['Start ₹500/month Nifty 50 SIP immediately', 'Set portfolio check reminder for every 6 months', 'Share this result with someone who\'s afraid to invest'],
    },
  },
  cautious: {
    sell: {
      headline: "Analysis paralysis meets panic selling — a dangerous combo.",
      summary: "Your profile says you overthink before investing, but when it got scary, you bailed fast. The worst of both worlds: slow to enter, quick to exit. Let's fix that.",
      insights: [
        { icon: '⏳', title: 'The real cost', text: 'Every month you wait to invest while "doing research" costs you compound interest. Time in the market beats timing the market — always.' },
        { icon: '🎯', title: 'Your pattern', text: 'You need a set-and-forget system. SIPs automate the entry so you never have to "decide" to invest each month.' },
        { icon: '📖', title: 'Your action plan', text: 'Today, not tomorrow. Open a Zerodha or Groww account. Set up ₹500/month Nifty 50 SIP. You don\'t need more information.' },
      ],
      actionItems: ['Open Zerodha/Groww today', 'Start ₹500 Nifty 50 SIP — not ₹5,000, just ₹500', 'Stop researching. Start doing.'],
    },
    hold: {
      headline: "Patience is your superpower. Don't waste it by never starting.",
      summary: "You held when it got hard. That's your biggest strength. The trap for your profile isn't panic-selling — it's never investing in the first place. You've proven you can hold through pain.",
      insights: [
        { icon: '✅', title: 'What you did right', text: 'You didn\'t panic. This is harder than it sounds and more valuable than any stock pick.' },
        { icon: '⚠️', title: 'Your one warning', text: 'Don\'t use "I need to learn more" as an excuse to never start. You know enough. The rest comes from experience.' },
        { icon: '💰', title: 'Start now', text: '₹500/month for 20 years at 12% = ₹3,80,000. From ₹1,20,000 invested. The math works. Start.' },
      ],
      actionItems: ['Start investing within 48 hours — set a deadline', '₹500/month minimum to build the habit', 'Automate it so you never have to decide again'],
    },
  },
  calculated: {
    sell: {
      headline: "You know the theory but panicked in practice. That's a gap worth closing.",
      summary: "Calculated Risk-Takers know that crashes recover. But knowing and feeling are different. You sold when it got real. The simulation exposed a gap between your intellectual understanding and your emotional response.",
      insights: [
        { icon: '🔍', title: 'What this reveals', text: 'You\'re confident in theory but not yet battle-hardened. Real crashes feel different from simulations. This is actually valuable information.' },
        { icon: '⚖️', title: 'Diversification matters', text: 'Overconcentration in one stock — especially high-volatility ones like Netflix — amplifies panic. Spread across sectors.' },
        { icon: '📐', title: 'Your action plan', text: 'Never put more than 10% of your portfolio in a single stock. Build a core of index funds, then experiment with individual stocks on the edges.' },
      ],
      actionItems: ['Cap individual stocks at 10% of portfolio', 'Build a 70% index fund core first', 'Keep 10% cash for crash opportunities'],
    },
    hold: {
      headline: "Textbook response. Now scale it up responsibly.",
      summary: "You did exactly what the data says to do. Held through the crash, watched the recovery, came out ahead. This is the foundation of wealth creation. The next challenge is overconfidence.",
      insights: [
        { icon: '🧮', title: 'What you got right', text: 'You trusted historical patterns over real-time fear. That\'s a rare skill. Most experienced investors still panic-sell.' },
        { icon: '⚠️', title: 'Your blind spot', text: 'Overconfidence. One crash doesn\'t make you invincible. Every "this time is different" crash has humbled smart investors. Diversification is your hedge against your own confidence.' },
        { icon: '🎯', title: 'Next level', text: 'Start allocating intentionally: 60% index, 30% sector funds, 10% individual stocks. Rebalance annually.' },
      ],
      actionItems: ['Build diversified portfolio: 60% index, 30% sector, 10% stocks', 'Set annual rebalancing calendar reminder', 'Read: The Psychology of Money by Morgan Housel'],
    },
  },
};

export default function DebriefPage({ profile, stockId, decision, onRestart }) {
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState('');

  const prof = FEAR_PROFILES[profile];
  const stock = STOCKS.find(s => s.id === stockId);
  const debrief = DEBRIEFS[profile]?.[decision || 'hold'] || DEBRIEFS.calculated.hold;

  useEffect(() => {
    const fullText = debrief.summary;
    let i = 0;
    const t = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTyping(false);
        clearInterval(t);
      }
    }, 12);
    return () => clearInterval(t);
  }, [debrief.summary]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        {/* AI badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent-green-dim)',
            border: '1px solid rgba(0,214,143,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>
            🤖
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>RiskLab AI</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Personalized debrief for {prof.name} · {stock.name} · {decision === 'sell' ? 'Sold' : 'Held'}
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="animate-fade-up" style={{ marginBottom: 28 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 800, lineHeight: 1.2, marginBottom: 20,
            color: decision === 'hold' ? 'var(--accent-green)' : 'var(--accent-amber)',
          }}>
            "{debrief.headline}"
          </h2>

          <div style={{
            fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)',
            borderLeft: '2px solid var(--border-card)',
            paddingLeft: 20,
            minHeight: 60,
          }}>
            {text}
            {typing && <span style={{ animation: 'pulse-dot 0.7s ease infinite', color: 'var(--accent-green)' }}>|</span>}
          </div>
        </div>

        <div className="divider" />

        {/* Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {debrief.insights.map((ins, i) => (
            <div
              key={i}
              className="animate-fade-up"
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)', padding: 22,
                display: 'flex', gap: 16, alignItems: 'flex-start',
                animationDelay: `${i * 0.15}s`
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{ins.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
                  {ins.title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ins.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action items */}
        <div style={{
          background: 'var(--accent-green-dim)',
          border: '1px solid rgba(0,214,143,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 32
        }}>
          <div style={{ fontSize: 12, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
            YOUR PERSONAL ACTION PLAN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {debrief.actionItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(0,214,143,0.2)', border: '1px solid rgba(0,214,143,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)',
                  fontWeight: 700, flexShrink: 0, marginTop: 2,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIP calculator teaser */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 32
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>
            THE POWER OF ₹500/MONTH
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { years: 5, amount: '₹40,000', value: '₹40,000' },
              { years: 10, amount: '₹60,000', value: '₹1,16,000' },
              { years: 20, amount: '₹1,20,000', value: '₹3,80,000' },
            ].map(row => (
              <div key={row.years} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  {row.years} YEARS
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Invested: {row.amount}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>
                  {row.value}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>at 12% p.a.</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
            ₹500/month = one restaurant meal. The choice is yours.
          </div>
        </div>

        {/* Restart */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-secondary" onClick={onRestart} style={{ marginRight: 12 }}>
            ← Try a different scenario
          </button>
          <button className="btn btn-primary" onClick={onRestart}>
            Start over with a new asset →
          </button>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Built for Finvasia Innovation Hackathon 2026 · RiskLab by Team &lt;your team name&gt;<br/>
          ⚠️ This is a simulation tool for education. Not financial advice.
        </div>
      </div>
    </div>
  );
}
