// ============================================================
// RiskLab – Market Data & Psychology Engine
// ============================================================

export const CRASH_DATA = {
  netflix2022: {
    name: "Netflix",
    label: "2022 Crash",
    startDate: "Jan 2022",
    endDate: "May 2023",
    panicPoint: 18,
    color: "#E50914",
    investedAmount: 10000,
    sellValue: 2600,
    holdValue: 10200,
    crashPercent: 74,
    recoveryMonths: 17,
    weeks: [
      { week: 0,  label: "Jan '22",  value: 100,  event: "Start — ₹10,000 invested" },
      { week: 1,  label: "W2",       value: 96,   event: null },
      { week: 2,  label: "W3",       value: 88,   event: "Q4 earnings miss" },
      { week: 3,  label: "W4",       value: 82,   event: null },
      { week: 4,  label: "Feb",      value: 79,   event: null },
      { week: 5,  label: "W6",       value: 74,   event: null },
      { week: 6,  label: "W7",       value: 71,   event: null },
      { week: 7,  label: "W8",       value: 68,   event: null },
      { week: 8,  label: "Mar",      value: 72,   event: "Brief bounce" },
      { week: 9,  label: "W10",      value: 66,   event: null },
      { week: 10, label: "W11",      value: 61,   event: null },
      { week: 11, label: "Apr",      value: 55,   event: null },
      { week: 12, label: "W13",      value: 48,   event: "Subscriber loss news" },
      { week: 13, label: "W14",      value: 43,   event: null },
      { week: 14, label: "W15",      value: 40,   event: null },
      { week: 15, label: "W16",      value: 38,   event: null },
      { week: 16, label: "May",      value: 35,   event: null },
      { week: 17, label: "W18",      value: 33,   event: null },
      { week: 18, label: "Jun",      value: 26,   event: "DECISION POINT -74%" },
      { week: 19, label: "W20",      value: 28,   event: null },
      { week: 20, label: "W21",      value: 31,   event: null },
      { week: 21, label: "Jul",      value: 35,   event: "Ad-tier announced" },
      { week: 22, label: "W23",      value: 38,   event: null },
      { week: 23, label: "Aug",      value: 42,   event: null },
      { week: 24, label: "W25",      value: 45,   event: null },
      { week: 25, label: "Sep",      value: 42,   event: null },
      { week: 26, label: "Oct",      value: 50,   event: "Password crackdown" },
      { week: 27, label: "Nov",      value: 57,   event: null },
      { week: 28, label: "Dec",      value: 62,   event: null },
      { week: 29, label: "Jan '23",  value: 70,   event: null },
      { week: 30, label: "Feb",      value: 79,   event: null },
      { week: 31, label: "Mar",      value: 88,   event: null },
      { week: 32, label: "Apr",      value: 96,   event: "Subscribers surge" },
      { week: 33, label: "May",      value: 100,  event: null },
      { week: 34, label: "Jun",      value: 104,  event: null },
      { week: 35, label: "Jul",      value: 102,  event: "Full recovery +2%" },
    ]
  },
  nifty2020: {
    name: "Nifty 50",
    label: "COVID Crash",
    startDate: "Jan 2020",
    endDate: "Dec 2020",
    panicPoint: 10,
    color: "#FF9500",
    investedAmount: 10000,
    sellValue: 6200,
    holdValue: 10700,
    crashPercent: 38,
    recoveryMonths: 8,
    weeks: [
      { week: 0,  label: "Jan '20",  value: 100,  event: "Start — invested" },
      { week: 1,  label: "W2",       value: 101,  event: null },
      { week: 2,  label: "W3",       value: 100,  event: null },
      { week: 3,  label: "W4",       value: 99,   event: null },
      { week: 4,  label: "Feb",      value: 98,   event: "COVID spreads globally" },
      { week: 5,  label: "W6",       value: 94,   event: null },
      { week: 6,  label: "W7",       value: 88,   event: null },
      { week: 7,  label: "W8",       value: 82,   event: null },
      { week: 8,  label: "Mar",      value: 74,   event: "WHO declares pandemic" },
      { week: 9,  label: "W10",      value: 68,   event: null },
      { week: 10, label: "W11",      value: 62,   event: "DECISION POINT -38%" },
      { week: 11, label: "W12",      value: 60,   event: null },
      { week: 12, label: "Apr",      value: 64,   event: "Stimulus package" },
      { week: 13, label: "W14",      value: 67,   event: null },
      { week: 14, label: "W15",      value: 70,   event: null },
      { week: 15, label: "W16",      value: 73,   event: null },
      { week: 16, label: "May",      value: 76,   event: "Unlock begins" },
      { week: 17, label: "W18",      value: 79,   event: null },
      { week: 18, label: "Jun",      value: 82,   event: null },
      { week: 19, label: "W20",      value: 85,   event: null },
      { week: 20, label: "Jul",      value: 83,   event: null },
      { week: 21, label: "W22",      value: 86,   event: null },
      { week: 22, label: "Aug",      value: 90,   event: "Vaccine hopes" },
      { week: 23, label: "W24",      value: 93,   event: null },
      { week: 24, label: "Sep",      value: 91,   event: null },
      { week: 25, label: "Oct",      value: 95,   event: null },
      { week: 26, label: "Nov",      value: 102,  event: "Vaccine approved!" },
      { week: 27, label: "Dec",      value: 107,  event: "Full recovery + new highs" },
    ]
  },
  gold2020: {
    name: "Gold ETF",
    label: "COVID Period",
    startDate: "Jan 2020",
    endDate: "Dec 2020",
    panicPoint: 99,
    color: "#FFD700",
    investedAmount: 10000,
    sellValue: 9600,
    holdValue: 11800,
    crashPercent: 8,
    recoveryMonths: 2,
    weeks: [
      { week: 0,  label: "Jan '20", value: 100, event: "Start — invested" },
      { week: 2,  label: "Feb",     value: 104, event: "Safe haven demand" },
      { week: 4,  label: "Mar",     value: 96,  event: "DECISION POINT -4%" },
      { week: 6,  label: "Apr",     value: 106, event: "Recovery" },
      { week: 10, label: "Jun",     value: 112, event: null },
      { week: 14, label: "Aug",     value: 128, event: "Gold all-time high" },
      { week: 18, label: "Oct",     value: 120, event: null },
      { week: 22, label: "Dec",     value: 118, event: "Year end +18%" },
    ]
  }
};

export const STOCKS = [
  {
    id: "netflix",
    name: "Netflix",
    ticker: "NFLX",
    category: "High Risk",
    risk: 3,
    color: "#E50914",
    bg: "rgba(229,9,20,0.08)",
    border: "rgba(229,9,20,0.3)",
    icon: "🎬",
    description: "Streaming giant. Very high volatility. Dropped 76% in 2022.",
    crashData: "netflix2022",
  },
  {
    id: "nifty",
    name: "Nifty 50",
    ticker: "NIFTY50",
    category: "Medium Risk",
    risk: 2,
    color: "#FF9500",
    bg: "rgba(255,149,0,0.08)",
    border: "rgba(255,149,0,0.3)",
    icon: "🇮🇳",
    description: "India's top 50 companies. Recovered in 8 months from COVID.",
    crashData: "nifty2020",
  },
  {
    id: "gold",
    name: "Gold ETF",
    ticker: "GOLDBEES",
    category: "Low Risk",
    risk: 1,
    color: "#FFD700",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.3)",
    icon: "🥇",
    description: "Safe haven asset. Minimal crash, strong recovery.",
    crashData: "gold2020",
  }
];

export const FEAR_PROFILES = {
  panic: {
    id: "panic",
    name: "Panic Seller",
    emoji: "😰",
    color: "#FF4444",
    colorMuted: "rgba(255,68,68,0.12)",
    panicThreshold: -0.30,
    description: "You feel market drops physically. Your instinct is to protect what you have — even at a permanent loss.",
    advice: "Start with Nifty 50 SIPs. Never check daily. Set a 6-month reminder only.",
    warning: "Your biggest risk is locking in losses by selling at the bottom, then missing the recovery.",
    riskScore: 2,
    disciplineScore: 3,
    knowledgeScore: 4,
  },
  cautious: {
    id: "cautious",
    name: "Cautious Holder",
    emoji: "🤔",
    color: "#FF9500",
    colorMuted: "rgba(255,149,0,0.12)",
    panicThreshold: -0.50,
    description: "You're patient, but you might never actually start. Analysis paralysis is costly.",
    advice: "Set up a Rs500/month SIP today. Start before you feel 100% ready.",
    warning: "Not investing at all is itself a risk — inflation silently eats your savings.",
    riskScore: 5,
    disciplineScore: 6,
    knowledgeScore: 5,
  },
  calculated: {
    id: "calculated",
    name: "Calculated Risk-Taker",
    emoji: "😎",
    color: "#00D68F",
    colorMuted: "rgba(0,214,143,0.12)",
    panicThreshold: -0.70,
    description: "Good instincts. You understand markets move in cycles and act on data, not headlines.",
    advice: "Diversify before concentrating. Index funds first, individual stocks later.",
    warning: "Overconfidence is your enemy. Don't put everything in one bet.",
    riskScore: 8,
    disciplineScore: 8,
    knowledgeScore: 9,
  }
};

export const FEAR_QUESTIONS = [
  {
    id: 1, block: "Loss Reaction",
    question: "Your Rs10,000 investment drops to Rs7,000 in one month. No news — just market movement. What do you do?",
    correctIdx: 2,
    correctHint: "Holding or buying more during dips is historically the best strategy. Selling locks in loss permanently.",
    options: [
      { text: "Sell immediately. I cannot watch it drop further.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Hold and wait nervously, checking every day.", score: { panic: 1, cautious: 3, calculated: 0 } },
      { text: "Hold calmly or buy more — it's likely on sale.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 2, block: "Loss Reaction",
    question: "Markets crash 40% in 3 weeks. Every news channel screams 'worst crisis in a decade'. Your move?",
    correctIdx: 2,
    correctHint: "Every major crash in history has recovered. Selling during panic = buying back at higher prices later.",
    options: [
      { text: "Sell everything. This time is different.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "Freeze. I have no idea what to do.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Check historical data. Continue SIPs. Maybe add more.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 3, block: "Loss Reaction",
    question: "You invested Rs50,000 six months ago. It is now Rs35,000. Your best friend says 'cut your losses'. You...",
    correctIdx: 2,
    correctHint: "Peer pressure is one of the most dangerous drivers of bad investment decisions.",
    options: [
      { text: "Listen to my friend and sell. They might be right.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Feel tempted but do nothing. Stay confused.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Evaluate the fundamentals — not my friend's opinion.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 4, block: "Monitoring",
    question: "How often do you check your investment portfolio?",
    correctIdx: 2,
    correctHint: "Research shows frequent checking leads to worse returns. Monthly or quarterly reviews are optimal.",
    options: [
      { text: "Multiple times a day. I need to know every tick.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Rarely — I am scared to look when markets are down.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Monthly or quarterly. I review, not obsess.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 5, block: "Monitoring",
    question: "A stock you own is down 15% today. You get 4 WhatsApp forwards saying it will crash further. You...",
    correctIdx: 2,
    correctHint: "WhatsApp forwards are almost never a reliable source for investment decisions.",
    options: [
      { text: "Sell immediately. The crowd knows something I don't.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Panic-hold. Spend 3 hours reading scary news.", score: { panic: 1, cautious: 3, calculated: 0 } },
      { text: "Ignore the forwards. Check official company filings.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 6, block: "Risk Appetite",
    question: "A trusted friend says a stock will 10x in 3 months. What do you do?",
    correctIdx: 1,
    correctHint: "No legitimate investment reliably 10x in 3 months. Research first, then invest only a small amount.",
    options: [
      { text: "All in! If my friend says so, I trust it.", score: { panic: 0, cautious: 0, calculated: -2 } },
      { text: "Research it. Maybe invest 5-10% of portfolio at most.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "Avoid completely. Sounds too good to be true.", score: { panic: 2, cautious: 2, calculated: 0 } },
    ]
  },
  {
    id: 7, block: "Risk Appetite",
    question: "What percentage of your monthly salary would you be comfortable investing?",
    correctIdx: 1,
    correctHint: "Investing 10-20% of income is widely recommended as a starting point for wealth building.",
    options: [
      { text: "Nothing. I cannot risk any money right now.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "10-20%. Enough to build wealth, not hurt my lifestyle.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "50%+. I want to get rich as fast as possible.", score: { panic: 0, cautious: 0, calculated: -1 } },
    ]
  },
  {
    id: 8, block: "Risk Appetite",
    question: "Which statement best reflects your investment philosophy?",
    correctIdx: 1,
    correctHint: "Long-term wealth building through index funds is backed by decades of data and Buffett's own advice.",
    options: [
      { text: "I want guaranteed returns. FD or savings only.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Index funds + time = wealth. Slow and steady wins.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "I will pick the next Tesla or Apple myself.", score: { panic: 0, cautious: 0, calculated: -1 } },
    ]
  },
  {
    id: 9, block: "Pressure Decisions",
    question: "You are about to invest Rs20,000. The next day, markets fall 5%. What do you do with your cash?",
    correctIdx: 2,
    correctHint: "A 5% daily drop is a buying opportunity. Waiting for the 'perfect time' costs more than just investing.",
    options: [
      { text: "Wait for markets to stabilize. Too scary right now.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "Invest half now, wait with the rest.", score: { panic: 0, cautious: 3, calculated: 1 } },
      { text: "Invest all of it. A 5% dip is a gift.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 10, block: "Pressure Decisions",
    question: "Portfolio is -25% from peak. An analyst on TV says 'recovery in exactly 6 months'. Do you act on this?",
    correctIdx: 2,
    correctHint: "No analyst can reliably predict short-term market recovery. Focus on long-term fundamentals.",
    options: [
      { text: "Yes! I sell now and re-enter in 6 months.", score: { panic: 2, cautious: 1, calculated: 0 } },
      { text: "I hope so, but I am not sure what to do.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "No one knows timing. I stay invested, ignore predictions.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 11, block: "Pressure Decisions",
    question: "You need Rs1 lakh in 3 months for a big expense. Your investments are down 20%. You...",
    correctIdx: 2,
    correctHint: "Never invest money you will need within 3 years. Short-term needs = savings account, not markets.",
    options: [
      { text: "Sell at a loss. I need the money regardless.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Try to borrow instead and hope markets recover.", score: { panic: 0, cautious: 2, calculated: 1 } },
      { text: "I would not have invested short-term money in stocks.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 12, block: "Knowledge",
    question: "What is a Systematic Investment Plan (SIP)?",
    correctIdx: 1,
    correctHint: "SIPs are the most effective way for most investors to build wealth — automatic, disciplined, emotionless.",
    options: [
      { text: "A way to buy stocks when they are at peak prices.", score: { panic: 0, cautious: 1, calculated: 0 } },
      { text: "Investing a fixed amount regularly — removes emotional timing.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "A savings account with better interest rates.", score: { panic: 1, cautious: 1, calculated: 0 } },
    ]
  },
  {
    id: 13, block: "Knowledge",
    question: "The Nifty 50 has NEVER given negative returns over any 10-year rolling period in history. True or false?",
    correctIdx: 0,
    correctHint: "TRUE. Over every rolling 10-year window since inception, Nifty 50 has given positive returns.",
    options: [
      { text: "True — and this is exactly why long-term investing works.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "False — markets can stay down for decades.", score: { panic: 2, cautious: 1, calculated: 0 } },
      { text: "Maybe, but I still do not trust markets.", score: { panic: 1, cautious: 2, calculated: 0 } },
    ]
  },
  {
    id: 14, block: "Knowledge",
    question: "Inflation in India averages ~6% per year. Your savings account earns 3.5%. What is happening to your money?",
    correctIdx: 0,
    correctHint: "Money in savings accounts loses real purchasing power when interest is below inflation.",
    options: [
      { text: "My money is slowly losing value in real terms.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "My money is safe — I am earning 3.5% which is positive.", score: { panic: 2, cautious: 2, calculated: 0 } },
      { text: "I do not think about it. Safety is enough for me.", score: { panic: 3, cautious: 1, calculated: 0 } },
    ]
  },
  {
    id: 15, block: "Emotional Triggers",
    question: "Headline: 'SENSEX crashes 2000 points — worst day of the year!' Your emotional reaction?",
    correctIdx: 2,
    correctHint: "Headlines are designed to alarm. A 2000 point drop is often less than 2% of the total index value.",
    options: [
      { text: "Terror. I check my portfolio immediately and consider selling.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Anxiety. I check prices all day, cannot focus on work.", score: { panic: 1, cautious: 3, calculated: 0 } },
      { text: "I note it, check the actual % drop — usually overblown.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 16, block: "Emotional Triggers",
    question: "Your colleague brags about 300% returns on a crypto tip. You feel...",
    correctIdx: 2,
    correctHint: "FOMO (Fear of Missing Out) is responsible for more investor losses than any market crash.",
    options: [
      { text: "Massive FOMO. I ask them for the tip immediately.", score: { panic: 0, cautious: 0, calculated: -2 } },
      { text: "Jealous but skeptical. I do nothing but feel bad.", score: { panic: 1, cautious: 3, calculated: 0 } },
      { text: "Happy for them, but I know survivor bias is real.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 17, block: "Emotional Triggers",
    question: "Markets have been falling for 3 months straight. Every week is worse. You feel...",
    correctIdx: 2,
    correctHint: "Multi-month downturns are historically the best SIP opportunities. Patience = outsized returns.",
    options: [
      { text: "Certain the world is ending. Sell before it gets worse.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Worried and paralyzed. I pause my SIPs and wait.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "This is exactly when to keep investing — more units, same price.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 18, block: "Long-term Thinking",
    question: "What is your primary investing goal?",
    correctIdx: 2,
    correctHint: "Long-term wealth building is supported by decades of market data. Short-term safety in stocks is a myth.",
    options: [
      { text: "Protect my capital at all costs. Safety is everything.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "Beat inflation slowly. I am very conservative.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Build significant wealth over 10-20 years. Accept risk.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 19, block: "Long-term Thinking",
    question: "Rs500/month for 20 years at 12% annual returns gives you approximately how much?",
    correctIdx: 1,
    correctHint: "Rs500/month = Rs1,20,000 invested over 20 years grows to ~Rs3,80,000 at 12% due to compounding.",
    options: [
      { text: "About Rs1,20,000 — just what I invested.", score: { panic: 2, cautious: 2, calculated: 0 } },
      { text: "About Rs3,80,000 — compounding triples my money.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "Way more — at least Rs20 lakhs.", score: { panic: 0, cautious: 0, calculated: -1 } },
    ]
  },
  {
    id: 20, block: "Long-term Thinking",
    question: "Warren Buffett recommends most people should invest their savings in...",
    correctIdx: 1,
    correctHint: "Buffett repeatedly says most people should buy a low-cost index fund and hold for decades.",
    options: [
      { text: "Gold and real estate for stability and safety.", score: { panic: 2, cautious: 1, calculated: 0 } },
      { text: "Low-cost index funds and hold for decades.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "Individual stocks you have deeply researched yourself.", score: { panic: 0, cautious: 0, calculated: 1 } },
    ]
  },
];