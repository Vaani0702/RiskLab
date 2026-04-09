// Historical crash data — weekly close prices (normalized to starting value = 100)
export const CRASH_DATA = {
  netflix2022: {
    name: "Netflix",
    label: "2022 Crash",
    startDate: "Jan 2022",
    endDate: "May 2023",
    panicPoint: 18, // week index where panic seller would bail
    color: "#E50914",
    weeks: [
      { week: 0,  label: "Jan '22",  value: 100,  event: "Start" },
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
      { week: 18, label: "Jun",      value: 30,   event: "⚠️ -70% from peak" },
      { week: 19, label: "W20",      value: 28,   event: null },
      { week: 20, label: "W21",      value: 26,   event: null },
      { week: 21, label: "Jul",      value: 29,   event: "Ad-tier announced" },
      { week: 22, label: "W23",      value: 31,   event: null },
      { week: 23, label: "Aug",      value: 35,   event: null },
      { week: 24, label: "W25",      value: 37,   event: null },
      { week: 25, label: "Sep",      value: 34,   event: null },
      { week: 26, label: "Oct",      value: 40,   event: "Password sharing crackdown" },
      { week: 27, label: "Nov",      value: 44,   event: null },
      { week: 28, label: "Dec",      value: 47,   event: null },
      { week: 29, label: "Jan '23",  value: 52,   event: null },
      { week: 30, label: "Feb",      value: 58,   event: null },
      { week: 31, label: "Mar",      value: 63,   event: null },
      { week: 32, label: "Apr",      value: 70,   event: "Subscribers surge" },
      { week: 33, label: "May",      value: 80,   event: null },
      { week: 34, label: "Jun",      value: 90,   event: null },
      { week: 35, label: "Jul",      value: 102,  event: "Full recovery" },
    ]
  },
  nifty2020: {
    name: "Nifty 50",
    label: "COVID Crash",
    startDate: "Jan 2020",
    endDate: "Dec 2020",
    panicPoint: 10,
    color: "#FF9500",
    weeks: [
      { week: 0,  label: "Jan '20",  value: 100,  event: "Start" },
      { week: 1,  label: "W2",       value: 101,  event: null },
      { week: 2,  label: "W3",       value: 100,  event: null },
      { week: 3,  label: "W4",       value: 99,   event: null },
      { week: 4,  label: "Feb",      value: 98,   event: "COVID spreads" },
      { week: 5,  label: "W6",       value: 94,   event: null },
      { week: 6,  label: "W7",       value: 88,   event: null },
      { week: 7,  label: "W8",       value: 82,   event: null },
      { week: 8,  label: "Mar",      value: 74,   event: "WHO declares pandemic" },
      { week: 9,  label: "W10",      value: 68,   event: null },
      { week: 10, label: "W11",      value: 62,   event: "⚠️ Lockdown announced" },
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
    panicPoint: 99, // gold barely drops
    color: "#FFD700",
    weeks: [
      { week: 0,  label: "Jan '20", value: 100, event: "Start" },
      { week: 2,  label: "Feb",     value: 104, event: "Safe haven demand" },
      { week: 4,  label: "Mar",     value: 96,  event: "Liquidity crunch" },
      { week: 6,  label: "Apr",     value: 106, event: "Recovery" },
      { week: 10, label: "Jun",     value: 112, event: null },
      { week: 14, label: "Aug",     value: 128, event: "Gold all-time high" },
      { week: 18, label: "Oct",     value: 120, event: null },
      { week: 22, label: "Dec",     value: 118, event: "Year end" },
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
    description: "Safe haven asset. Gains during market panic, lower long-term returns.",
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
    description: "You feel market drops physically. Your instinct is to protect what you have.",
    advice: "Start with Nifty 50 SIPs. Never check daily. Set a 6-month reminder only.",
    warning: "Your biggest risk is locking in losses by selling at the bottom.",
  },
  cautious: {
    id: "cautious",
    name: "Cautious Holder",
    emoji: "🤔",
    color: "#FF9500",
    colorMuted: "rgba(255,149,0,0.12)",
    panicThreshold: -0.50,
    description: "You're patient, but you might never actually start. Analysis paralysis is real.",
    advice: "Set up a ₹500/month SIP today. Start before you feel 100% ready.",
    warning: "Not investing at all is itself a risk — inflation eats your savings.",
  },
  calculated: {
    id: "calculated",
    name: "Calculated Risk-Taker",
    emoji: "😎",
    color: "#00D68F",
    colorMuted: "rgba(0,214,143,0.12)",
    panicThreshold: -0.70,
    description: "Good instincts. You understand markets move in cycles.",
    advice: "Diversify before concentrating. Index funds first, individual stocks later.",
    warning: "Overconfidence is your enemy. Don't put everything in one bet.",
  }
};

export const FEAR_QUESTIONS = [
  {
    id: 1,
    question: "Your ₹10,000 investment drops to ₹7,000 in one month. What do you do?",
    options: [
      { text: "Sell immediately. I can't lose more.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Hold and wait. It'll come back... maybe.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Buy more. It's on sale!", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 2,
    question: "How often do you check your investments?",
    options: [
      { text: "Multiple times a day. I need to know.", score: { panic: 3, cautious: 0, calculated: 0 } },
      { text: "Rarely. I'm afraid to look.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Weekly or monthly. Just enough to stay informed.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 3,
    question: "A friend says a stock will 10x in 3 months. What do you do?",
    options: [
      { text: "Avoid it completely. Too risky.", score: { panic: 2, cautious: 2, calculated: 0 } },
      { text: "Research it first, then maybe invest a small amount.", score: { panic: 0, cautious: 0, calculated: 3 } },
      { text: "Go all in! YOLO.", score: { panic: 0, cautious: 0, calculated: -1 } },
    ]
  },
  {
    id: 4,
    question: "Markets crash 40% due to a global event. Your reaction?",
    options: [
      { text: "Panic. This time it's different. Sell everything.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "Stay calm but frozen. I don't know what to do.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Check history. Every crash recovered. Continue SIPs.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  },
  {
    id: 5,
    question: "What is your primary investing goal?",
    options: [
      { text: "Protect my money. Savings account is fine.", score: { panic: 3, cautious: 1, calculated: 0 } },
      { text: "Beat inflation, but slowly and safely.", score: { panic: 0, cautious: 3, calculated: 0 } },
      { text: "Build long-term wealth. Some risk is okay.", score: { panic: 0, cautious: 0, calculated: 3 } },
    ]
  }
];
