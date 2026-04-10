import React, { useState, useEffect } from 'react';

const CHAPTERS = [
  {
    id: 'why-money-loses',
    title: 'Why Your Money Is Losing Value Right Now',
    section: 'Part 1 — The Problem',
    readTime: '8 min read',
    content: {
      intro: 'Before we talk about investing, we need to understand why NOT investing is itself a financial decision — and usually a bad one.',
      body: [
        {
          type: 'h2', text: 'The silent thief: inflation'
        },
        {
          type: 'p', text: 'In 2015, a plate of chhole bhature at your local dhaba cost ₹30. Today, the same plate costs ₹100. The dhaba owner did not get greedy. Your money got weaker. This is inflation — the gradual decline in the purchasing power of money.'
        },
        {
          type: 'highlight', text: 'India\'s average inflation rate is around 6% per year. This means everything you buy costs roughly 6% more each year. Your savings must grow by at least 6% annually just to stay in place.'
        },
        {
          type: 'h2', text: 'The leaky bucket problem'
        },
        {
          type: 'p', text: 'Think of your money as water in a bucket. Inflation is a hole in the bottom of that bucket — small, but constant. Every year, water leaks out. A savings account at 3.5% interest is like pouring a thin trickle of water in from the top. But if inflation is 6%, more water is leaking out (6%) than you\'re pouring in (3.5%). Your bucket is getting emptier — slowly, silently, every single year.'
        },
        {
          type: 'math-example',
          title: 'The real math: ₹1,00,000 over 5 years',
          rows: [
            { label: 'In savings account (3.5%/yr)', values: ['₹1,00,000', '₹1,03,500', '₹1,07,123', '₹1,10,872', '₹1,14,752', '₹1,18,769'] },
            { label: 'Real purchasing power (adjusted for 6% inflation)', values: ['₹1,00,000', '₹97,642', '₹95,335', '₹93,077', '₹90,866', '₹88,699'] },
          ],
          headers: ['Start', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
          note: 'Your account shows ₹1,18,769 — but in real terms, you can only buy what ₹88,699 could buy in Year 0. You lost ₹11,301 in purchasing power while thinking you were "saving".'
        },
        {
          type: 'h2', text: 'The Rule of 72: how fast does money halve?'
        },
        {
          type: 'p', text: 'The Rule of 72 is a simple mental tool every investor should know. Divide 72 by the inflation rate to find how many years it takes for your purchasing power to halve.'
        },
        {
          type: 'formula',
          title: 'Rule of 72',
          formula: '72 ÷ Inflation Rate = Years to halve purchasing power',
          examples: [
            'At 6% inflation: 72 ÷ 6 = 12 years to halve',
            'At 4% inflation: 72 ÷ 4 = 18 years to halve',
            'At 3% inflation: 72 ÷ 3 = 24 years to halve',
          ]
        },
        {
          type: 'p', text: 'This means that a ₹10 lakh sitting in a savings account will have the purchasing power of ₹5 lakh in just 12 years. Your children\'s education, your retirement, your dreams — all become harder to fund if you only save and never invest.'
        },
        {
          type: 'h2', text: 'What does investing actually fix?'
        },
        {
          type: 'p', text: 'Investing puts your money into assets that grow faster than inflation. The Nifty 50 — an index of India\'s top 50 companies — has returned an average of 12.4% per year over the last 20 years. Against 6% inflation, that\'s a real return of about 6% per year. Your bucket fills faster than it leaks.'
        },
        {
          type: 'note', text: 'Key insight: The goal of investing is not to "make money." The goal is to preserve and grow the purchasing power of your money over time. Any return below inflation is a real loss, even if your account balance is higher.'
        },
        {
          type: 'percentage-lesson',
          title: 'How to calculate real returns',
          content: 'Real Return = Nominal Return − Inflation Rate\n\nExample: If your FD gives 7% and inflation is 6%:\nReal Return = 7% − 6% = 1%\n\nAfter tax (assuming 30% tax bracket):\nPost-tax return = 7% × (1 − 0.30) = 4.9%\nReal post-tax return = 4.9% − 6% = −1.1%\n\nYou are losing 1.1% in real purchasing power every year, even with a "good" FD rate.',
        }
      ],
      terms: ['inflation', 'purchasing power', 'real return', 'nominal return'],
      quiz: [
        {
          q: 'India\'s inflation is 6% and your savings account gives 3.5%. What happens to your money\'s real value?',
          options: ['It grows by 3.5%', 'It shrinks by 2.5% per year in real terms', 'It stays the same', 'It shrinks by 6%'],
          correct: 1,
          explanation: 'Real return = 3.5% − 6% = −2.5%. Your account balance goes up, but your purchasing power goes down by 2.5% every year.'
        },
        {
          q: 'Using the Rule of 72, at 6% inflation, how long until ₹10 lakh has the buying power of ₹5 lakh?',
          options: ['6 years', '8 years', '12 years', '18 years'],
          correct: 2,
          explanation: '72 ÷ 6 = 12 years. The Rule of 72 tells you how long it takes to halve your purchasing power at a given inflation rate.'
        },
        {
          q: 'Your FD gives 7% but you\'re in the 30% tax bracket and inflation is 6%. What is your real post-tax return?',
          options: ['1%', '4.9%', '-1.1%', '7%'],
          correct: 2,
          explanation: 'Post-tax = 7% × 0.7 = 4.9%. Real = 4.9% − 6% = −1.1%. You are actually losing purchasing power.'
        }
      ]
    }
  },
  {
    id: 'what-is-investing',
    title: 'What Is Investing? The Dosa Stall Explained',
    section: 'Part 1 — The Problem',
    readTime: '10 min read',
    content: {
      intro: 'Most people think investing means buying shares in companies they\'ve never heard of based on tips from people they barely know. That\'s speculation. Real investing is something much simpler.',
      body: [
        { type: 'h2', text: 'The dosa stall analogy' },
        {
          type: 'p', text: 'Your friend Vaani wants to open a dosa stall near your college. She has a great recipe, a perfect location, and full confidence. The problem: she needs ₹50,000 for equipment, a gas connection, and initial inventory. She has ₹25,000. She asks you to invest ₹25,000 and in return, she gives you 50% ownership of the stall.'
        },
        {
          type: 'highlight', text: 'You are now a part-owner of Vaani\'s Dosa Stall. When she earns ₹10,000 profit this month, ₹5,000 belongs to you. When she expands to a second stall, your 50% stake in the whole business becomes more valuable. This is exactly what buying a stock means.'
        },
        { type: 'h2', text: 'From dosa stall to Reliance Industries' },
        {
          type: 'p', text: 'When you buy 1 share of Reliance Industries, you are doing exactly what you did with Vaani\'s stall — just at a much larger scale. You are buying a tiny ownership slice of a real business with real revenues, real employees, and real profits. Reliance has roughly 676 crore shares outstanding. Buy 10 shares and you own 10/676,00,00,000 of Reliance Industries. Small? Yes. But ownership nonetheless.'
        },
        {
          type: 'p', text: 'The stock market is simply a marketplace where people buy and sell these ownership slices. When Reliance reports strong quarterly earnings, more people want to own a piece of it, so the price goes up. When it reports weak results, fewer people want it, and the price goes down.'
        },
        { type: 'h2', text: 'Why stock prices move: supply and demand' },
        {
          type: 'p', text: 'Stock prices move every second because thousands of buyers and sellers are constantly negotiating. If more people want to buy a stock than sell it, the price goes up. If more people want to sell than buy, the price goes down. In the short term, this is driven by news, sentiment, and emotion. In the long term, it is driven by one thing only: the actual business performance of the company.'
        },
        {
          type: 'math-example',
          title: 'How your investment grows with the company',
          rows: [
            { label: 'Vaani\'s Dosa Stall Revenue', values: ['₹50,000', '₹80,000', '₹1,20,000', '₹1,80,000', '₹2,50,000'] },
            { label: 'Your 50% ownership value', values: ['₹25,000', '₹40,000', '₹60,000', '₹90,000', '₹1,25,000'] },
          ],
          headers: ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
          note: 'Your ₹25,000 became ₹1,25,000 in 4 years — a 5x return — simply because you owned part of a growing business. The stock market works the same way.'
        },
        { type: 'h2', text: 'The critical difference: investing vs speculation' },
        {
          type: 'p', text: 'Investing means buying ownership in a business because you believe in its long-term fundamentals. Speculation means buying something because you think the price will go up tomorrow so you can sell it to someone else at a higher price. Warren Buffett buys companies. Speculators buy price movements.'
        },
        {
          type: 'note', text: 'The question every real investor asks before buying: "Would I be happy if the market closed for 10 years and I had to hold this?" If the answer is yes, it\'s investing. If you\'re anxious about tomorrow\'s price, it\'s speculation.'
        },
        {
          type: 'percentage-lesson',
          title: 'Understanding percentage returns',
          content: 'Return % = ((Ending Value − Starting Value) / Starting Value) × 100\n\nExample 1: You invest ₹10,000 in Vaani\'s stall. After 2 years it\'s worth ₹14,500.\nReturn = ((14,500 − 10,000) / 10,000) × 100 = 45% total return\n\nExample 2: Nifty 50 was at 8,500 in March 2020 (COVID low). By March 2021 it was 14,900.\nReturn = ((14,900 − 8,500) / 8,500) × 100 = 75.3% in 12 months\n\nAnnualized return formula: CAGR = ((Ending Value / Starting Value)^(1/years) − 1) × 100',
        }
      ],
      terms: ['stock', 'share', 'market cap', 'dividend', 'CAGR'],
      quiz: [
        {
          q: 'You invest ₹20,000 in a company. After 3 years your investment is worth ₹29,000. What is your total return?',
          options: ['9%', '45%', '29%', '14.5%'],
          correct: 1,
          explanation: 'Return = ((29,000 − 20,000) / 20,000) × 100 = (9,000 / 20,000) × 100 = 45%'
        },
        {
          q: 'Nifty 50 was at 10,000 in January 2020 and 15,000 in January 2021. What was the 1-year return?',
          options: ['15%', '50%', '33.3%', '25%'],
          correct: 1,
          explanation: 'Return = ((15,000 − 10,000) / 10,000) × 100 = (5,000 / 10,000) × 100 = 50%'
        },
        {
          q: 'What is the key difference between investing and speculation?',
          options: ['Amount of money involved', 'Investing is based on business fundamentals, speculation on price movements', 'The time period', 'Whether you use a broker'],
          correct: 1,
          explanation: 'Investing means buying ownership in a business based on its long-term fundamentals. Speculation means betting on short-term price movements regardless of underlying business value.'
        }
      ]
    }
  },
  {
    id: 'types-of-investments',
    title: 'Stocks, Mutual Funds, Gold, FDs: What Is What?',
    section: 'Part 2 — The Instruments',
    readTime: '12 min read',
    content: {
      intro: 'India offers many ways to grow your money. Each has a different risk level, return potential, and time horizon. Understanding each one is essential before choosing where to invest.',
      body: [
        { type: 'h2', text: 'Stocks (Equities)' },
        {
          type: 'p', text: 'A stock represents direct ownership in a company. You buy shares on BSE or NSE through a broker like Zerodha, Groww, or Upstox. When the company grows, your shares become more valuable. When it pays dividends, you receive cash without selling anything.'
        },
        {
          type: 'highlight', text: 'Best for: Long-term wealth creation (5+ years). Risk level: High. Historical return: 12-15% CAGR for quality large-cap stocks. Not suitable for: Money you need in 1-2 years.'
        },
        { type: 'h2', text: 'Mutual Funds' },
        {
          type: 'p', text: 'A mutual fund pools money from thousands of investors and a professional fund manager invests it across many stocks or bonds. You benefit from diversification (owning many companies) even with ₹500. If one company in the fund performs badly, the others cushion the impact.'
        },
        {
          type: 'p', text: 'Types of mutual funds you need to know: Equity funds invest primarily in stocks. Debt funds invest in bonds and government securities — lower risk, lower return. Hybrid funds mix both. Index funds simply copy an index like Nifty 50 — no active management, very low fees.'
        },
        {
          type: 'note', text: 'The expense ratio is the annual fee a mutual fund charges you. A fund with 0.1% expense ratio charges ₹10 per year on ₹10,000 invested. An active fund with 1.5% charges ₹150. Over 20 years, this difference is enormous due to compounding.'
        },
        { type: 'h2', text: 'Index Funds: the best starting point' },
        {
          type: 'p', text: 'An index fund simply buys all the stocks in a market index in the same proportion as the index. A Nifty 50 index fund buys all 50 stocks in the Nifty 50 in their exact weightings. No analysis needed. No fund manager to pay. The fund performs exactly like the index.'
        },
        {
          type: 'math-example',
          title: 'Active fund vs index fund over 20 years (₹10,000/month SIP)',
          rows: [
            { label: 'Index Fund (12% return, 0.1% expense)', values: ['₹2,400', '₹12,500', '₹49,900', '₹1,99,800'] },
            { label: 'Active Fund (11% return, 1.5% expense)', values: ['₹2,300', '₹11,800', '₹44,500', '₹1,68,900'] },
            { label: 'Difference (index fund advantage)', values: ['₹100', '₹700', '₹5,400', '₹30,900'] },
          ],
          headers: ['1 year', '5 years', '10 years', '20 years'],
          note: 'Over 20 years, the index fund advantage grows to ₹30,900 per ₹10,000 invested — purely due to lower fees. This is why expense ratio matters enormously.'
        },
        { type: 'h2', text: 'Fixed Deposits (FDs)' },
        {
          type: 'p', text: 'An FD locks your money with a bank for a fixed period at a guaranteed interest rate. Currently SBI offers around 6.5-7% for 1-5 year FDs. This sounds good until you account for inflation (6%) and tax (interest is fully taxable at your income tax slab rate).'
        },
        {
          type: 'percentage-lesson',
          title: 'FD real return calculation (step by step)',
          content: 'FD rate: 7% | Your tax slab: 30% | Inflation: 6%\n\nStep 1: Post-tax return = 7% × (1 − 0.30) = 7% × 0.70 = 4.9%\nStep 2: Real return = 4.9% − 6% = −1.1%\n\nAt a 20% tax slab:\nPost-tax = 7% × 0.80 = 5.6%\nReal return = 5.6% − 6% = −0.4%\n\nFDs are only truly "safe" for money you need within 1-2 years. For anything longer, they quietly destroy real wealth.',
        },
        { type: 'h2', text: 'Gold' },
        {
          type: 'p', text: 'Gold has been a store of value for thousands of years. In India, it holds cultural and financial significance. Over the long term, gold has returned roughly 10-11% CAGR in rupee terms, primarily because the rupee depreciates against the dollar over time. Gold is a hedge — it goes up when everything else crashes.'
        },
        {
          type: 'p', text: 'The modern way to invest in gold is through Gold ETFs or Sovereign Gold Bonds (SGBs). Physical gold has making charges (10-25%) and storage costs. Gold ETFs trade like stocks on the exchange. SGBs give you 2.5% annual interest on top of gold price appreciation — the best form of gold investment.'
        }
      ],
      terms: ['mutual fund', 'ETF', 'NAV', 'expense ratio', 'dividend', 'index fund'],
      quiz: [
        {
          q: 'A mutual fund has an expense ratio of 0.5% and your investment is ₹1,00,000. How much do you pay annually as fees?',
          options: ['₹5,000', '₹500', '₹50', '₹5'],
          correct: 1,
          explanation: 'Expense ratio 0.5% of ₹1,00,000 = 0.005 × 1,00,000 = ₹500 per year.'
        },
        {
          q: 'FD gives 7%. You\'re in the 30% tax bracket. Inflation is 6%. What is your real post-tax return?',
          options: ['1%', '4.9%', '−1.1%', '7%'],
          correct: 2,
          explanation: 'Post-tax = 7% × (1−0.30) = 4.9%. Real return = 4.9% − 6% = −1.1%. You\'re losing purchasing power.'
        },
        {
          q: 'Nifty 50 index fund charges 0.1% and an active fund charges 1.5%. On ₹5,00,000, what is the annual fee difference?',
          options: ['₹7,000', '₹5,000', '₹6,000', '₹7,500'],
          correct: 0,
          explanation: 'Active fund fee: 1.5% × 5,00,000 = ₹7,500. Index fund fee: 0.1% × 5,00,000 = ₹500. Difference = ₹7,000 per year.'
        }
      ]
    }
  },
  {
    id: 'understanding-risk',
    title: 'What Risk Actually Means (And Why You\'re Wrong About It)',
    section: 'Part 3 — Understanding Risk',
    readTime: '10 min read',
    content: {
      intro: 'Most beginners think risk means "chance of losing money." That\'s part of it — but incomplete. Real investing risk is more nuanced, and understanding it properly changes how you invest.',
      body: [
        { type: 'h2', text: 'The two types of risk' },
        {
          type: 'p', text: 'Volatility risk is the short-term price swings of an investment. A stock that drops 40% in a market crash is highly volatile. But if you hold it for 10 years and it recovers and grows, you haven\'t actually lost anything. Volatility is temporary.'
        },
        {
          type: 'p', text: 'Permanent loss of capital is the real risk. This happens when a company goes bankrupt and never recovers, or when you sell during a crash and lock in a loss. This is the risk that actually destroys wealth — and it\'s usually caused by your own behavior, not the market.'
        },
        {
          type: 'highlight', text: 'The greatest risk for most young Indian investors is not stock market volatility. It is not investing at all — and watching inflation slowly destroy their savings over decades.'
        },
        { type: 'h2', text: 'How time reduces risk: historical data' },
        {
          type: 'p', text: 'Here is the single most important fact about risk and the Nifty 50: in any 1-year period since 1990, the index has had negative returns roughly 30% of the time. In any 5-year period, negative returns occur about 8% of the time. In any 10-year period: zero. There has never been a 10-year period where Nifty 50 gave negative returns.'
        },
        {
          type: 'math-example',
          title: 'Nifty 50: Probability of negative returns by holding period',
          rows: [
            { label: 'Probability of loss', values: ['~30%', '~10%', '~3%', '0%'] },
            { label: 'Best case return', values: ['+100%', '+250%', '+450%', '+900%'] },
            { label: 'Worst case return', values: ['−60%', '−20%', '+5%', '+120%'] },
          ],
          headers: ['1 year', '3 years', '5 years', '10 years'],
          note: 'This is why time horizon is the most important variable in investing. A 10-year horizon has eliminated all historical loss periods in Nifty 50.'
        },
        { type: 'h2', text: 'Standard deviation: measuring volatility' },
        {
          type: 'p', text: 'Standard deviation measures how much an investment\'s returns vary from its average. A high standard deviation means the investment swings wildly. A low standard deviation means it is stable. Understanding this helps you choose investments appropriate for your timeline.'
        },
        {
          type: 'percentage-lesson',
          title: 'How to interpret volatility numbers',
          content: 'Nifty 50 standard deviation: ~22% per year\nThis means in any given year, returns will likely fall between:\nAverage return (12%) ± 22% = anywhere from −10% to +34%\n\nGold standard deviation: ~14% per year\nExpected range: 10% ± 14% = −4% to +24%\n\nFD standard deviation: ~0%\nReturn is fixed at say 7% with no variation\n\nHigher standard deviation = higher volatility = higher potential reward but also higher short-term swings.',
        },
        { type: 'h2', text: 'Diversification: the only free lunch in investing' },
        {
          type: 'p', text: 'Nobel laureate Harry Markowitz said diversification is "the only free lunch in investing." By combining assets that don\'t move together perfectly, you can reduce overall portfolio volatility without sacrificing return. A portfolio of 50 stocks has dramatically less volatility than a single stock, for the same expected return.'
        }
      ],
      terms: ['volatility', 'standard deviation', 'diversification', 'risk-adjusted return', 'beta'],
      quiz: [
        {
          q: 'Nifty 50 average return is 12% with standard deviation of 22%. What is the approximate range of returns in any given year?',
          options: ['0% to 24%', '−10% to +34%', '6% to 18%', '−22% to +34%'],
          correct: 1,
          explanation: 'Mean ± 1 standard deviation = 12% − 22% to 12% + 22% = −10% to +34%. About 68% of years will fall in this range.'
        },
        {
          q: 'In Nifty 50 history, what is the probability of a negative return over any 10-year holding period?',
          options: ['30%', '10%', '5%', '0%'],
          correct: 3,
          explanation: 'In recorded Nifty 50 history, there has never been a 10-year period that gave negative returns. Time is the most powerful risk reducer.'
        }
      ]
    }
  },
  {
    id: 'market-crashes',
    title: 'How Market Crashes Happen: A Complete Guide',
    section: 'Part 3 — Understanding Risk',
    readTime: '15 min read',
    content: {
      intro: 'Every major crash in market history was followed by a full recovery and new highs. Understanding why crashes happen — and how they end — is what separates investors who profit from those who panic.',
      body: [
        { type: 'h2', text: 'The anatomy of a market crash' },
        {
          type: 'p', text: 'A market crash doesn\'t happen randomly. It follows a remarkably consistent pattern that has repeated itself throughout history. Understanding the pattern doesn\'t mean you can predict the exact timing — but it means you won\'t be surprised when it happens.'
        },
        {
          type: 'highlight', text: 'Phase 1: Euphoria. Everything is going up. Newspapers run headlines about the "new economy." Your cab driver gives you stock tips. Valuations are stretched but nobody cares. Everyone thinks this time is different.'
        },
        {
          type: 'p', text: 'Phase 2: The trigger. Something breaks. A bank fails, a pandemic begins, an election result shocks, oil prices spike, or interest rates rise suddenly. The trigger is almost always unpredictable — but the vulnerability in the market was building for months.'
        },
        {
          type: 'p', text: 'Phase 3: Panic. Prices fall. Margin calls force leveraged investors to sell. Retail investors see red portfolios and sell too. News becomes catastrophic. Experts predict further declines. Everyone rushes to exit at the same time — which makes prices fall faster.'
        },
        {
          type: 'p', text: 'Phase 4: Capitulation. The final crash. Usually the sharpest drop. This is where the most money is lost permanently — not because stocks never recover, but because investors sell at the bottom and never buy back in.'
        },
        {
          type: 'p', text: 'Phase 5: Recovery. Slowly, quietly, the market begins to recover. There\'s no announcement. No bell rings. News is still pessimistic. But the companies are still operating, still earning, still growing. The market begins to reflect this reality again.'
        },
        { type: 'h2', text: 'India\'s major crashes: what happened and what followed' },
        {
          type: 'math-example',
          title: 'Every major Nifty 50 crash and its recovery',
          rows: [
            { label: 'Peak to trough drop', values: ['−55%', '−60%', '−22%', '−40%', '−38%'] },
            { label: 'Recovery time', values: ['4 years', '2 years', '8 months', '14 months', '8 months'] },
            { label: 'New all-time high achieved?', values: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
          ],
          headers: ['2000 Dot-com', '2008 Financial', '2015 China', '2018 IL&FS', '2020 COVID'],
          note: '100% recovery rate. Every crash. Every time. Investors who held through all five crashes turned ₹1 lakh into over ₹25 lakh.'
        },
        { type: 'h2', text: 'The COVID crash: a case study in panic and recovery' },
        {
          type: 'p', text: 'In February 2020, the WHO declared COVID-19 a pandemic. Between February 20 and March 23, 2020 — just 33 days — the Nifty 50 fell from 12,362 to 7,511. A drop of 39.3% in one month. This was the fastest major market decline in recorded history.'
        },
        {
          type: 'p', text: 'Media headlines: "Markets in freefall." "Recovery could take years." "This is worse than 2008." Millions of retail investors sold their holdings, locking in permanent losses. Smart investors — and those who simply didn\'t have the option to sell quickly — held.'
        },
        {
          type: 'p', text: 'By November 2020, the Nifty 50 had fully recovered to pre-COVID levels. By December 2020, it hit new all-time highs. Investors who sold at the bottom lost 39%. Investors who held lost nothing. Investors who bought at the bottom gained 85% in 9 months.'
        },
        {
          type: 'note', text: 'The lesson: Market crashes are not the problem. Your reaction to market crashes is the problem. The investor who lost money in COVID was not the one who had a Nifty 50 fund — it was the one who panicked and sold.'
        },
        {
          type: 'percentage-lesson',
          title: 'The math of loss and recovery',
          content: 'This is the most important percentage calculation in investing:\n\nIf you lose 50%, you need 100% gain to break even.\nIf you lose 30%, you need 43% gain to break even.\nIf you lose 10%, you need 11% gain to break even.\n\nFormula: Recovery needed = (1 / (1 − Loss%)) − 1\n\nExample: Loss of 40%\nRecovery needed = (1 / 0.60) − 1 = 1.667 − 1 = 66.7%\n\nThis is why NOT selling during a crash matters so much. If you sell at −40% and buy back when things "feel safe" (usually after a 30% recovery), you\'ve locked in a loss and missed the recovery.'
        }
      ],
      terms: ['bear market', 'bull market', 'market correction', 'volatility', 'liquidity'],
      quiz: [
        {
          q: 'If your portfolio falls 50%, what percentage gain do you need to break even?',
          options: ['50%', '75%', '100%', '150%'],
          correct: 2,
          explanation: 'If ₹1,00,000 drops 50% to ₹50,000, you need to double your money (100% gain) to get back to ₹1,00,000. Recovery = 1/(1−0.5) − 1 = 100%.'
        },
        {
          q: 'Nifty 50 fell from 12,000 to 7,200 during COVID. What was the percentage drop?',
          options: ['40%', '45%', '38%', '60%'],
          correct: 0,
          explanation: 'Drop = ((12,000 − 7,200) / 12,000) × 100 = (4,800 / 12,000) × 100 = 40%'
        },
        {
          q: 'Which of the following 5 major Nifty 50 crashes did NOT eventually recover to new all-time highs?',
          options: ['2000 Dot-com crash', '2008 Financial crisis', '2020 COVID crash', 'All of them recovered'],
          correct: 3,
          explanation: 'All five major crashes in Nifty 50 history recovered fully and went on to new all-time highs. This is the pattern, not the exception.'
        }
      ]
    }
  },
  {
    id: 'how-to-start',
    title: 'How to Actually Start: ₹500 to Your First SIP',
    section: 'Part 4 — Taking Action',
    readTime: '12 min read',
    content: {
      intro: 'This is the chapter that turns knowledge into action. You now understand inflation, investing, instruments, risk, and crashes. The only thing left is to actually start — and that\'s easier than you think.',
      body: [
        { type: 'h2', text: 'The SIP: India\'s most powerful investing tool' },
        {
          type: 'p', text: 'SIP stands for Systematic Investment Plan. It is an instruction to your bank to deduct a fixed amount every month — say ₹500 — and automatically invest it in a mutual fund. You set it up once. It runs on autopilot. You don\'t have to decide when to invest.'
        },
        {
          type: 'highlight', text: 'The most important benefit of a SIP is not the returns — it is the removal of your worst enemy: yourself. By automating the investment, you cannot panic-sell during a crash, you cannot delay because "the market feels risky," and you cannot forget to invest when life gets busy.'
        },
        { type: 'h2', text: 'Rupee cost averaging: why timing the market doesn\'t matter' },
        {
          type: 'p', text: 'When you invest ₹500 every month, you buy more units when prices are low and fewer units when prices are high. This is called rupee cost averaging. Over time, your average purchase price ends up lower than the average market price — automatically, without any effort.'
        },
        {
          type: 'math-example',
          title: '₹500/month SIP — rupee cost averaging in action',
          rows: [
            { label: 'NAV (unit price)', values: ['₹100', '₹80', '₹60', '₹90', '₹110'] },
            { label: 'Units bought this month', values: ['5.00', '6.25', '8.33', '5.56', '4.55'] },
            { label: 'Total units held', values: ['5.00', '11.25', '19.58', '25.14', '29.69'] },
            { label: 'Portfolio value', values: ['₹500', '₹900', '₹1,175', '₹2,263', '₹3,266'] },
          ],
          headers: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
          note: 'You invested ₹2,500 total. In Month 3 the market crashed and you bought at ₹60. By Month 5 at ₹110 your portfolio is worth ₹3,266 — a 30.6% return despite the crash.'
        },
        { type: 'h2', text: 'The power of compounding: ₹500/month over time' },
        {
          type: 'p', text: 'Albert Einstein reportedly called compound interest "the eighth wonder of the world." Whether or not he said it, the math is real. When your returns earn returns, growth becomes exponential — not linear.'
        },
        {
          type: 'math-example',
          title: '₹500/month SIP at 12% annual returns',
          rows: [
            { label: 'Total invested', values: ['₹30,000', '₹60,000', '₹1,20,000', '₹1,80,000', '₹3,00,000'] },
            { label: 'Portfolio value', values: ['₹40,931', '₹1,16,170', '₹4,99,574', '₹12,34,678', '₹52,93,000'] },
            { label: 'Wealth created (extra)', values: ['₹10,931', '₹56,170', '₹3,79,574', '₹10,54,678', '₹49,93,000'] },
          ],
          headers: ['5 years', '10 years', '20 years', '25 years', '35 years'],
          note: 'The first 10 years feel slow. The last 10 years feel explosive. This is why starting early matters more than investing large amounts later.'
        },
        { type: 'h2', text: 'Step-by-step: your first SIP in 15 minutes' },
        {
          type: 'p', text: 'Step 1: Open a free account on Zerodha, Groww, or Paytm Money. You need your PAN card, Aadhaar, and a bank account. KYC is fully online and takes 10-15 minutes.'
        },
        {
          type: 'p', text: 'Step 2: Search for "UTI Nifty 50 Index Fund" or "HDFC Index Fund Nifty 50 Plan." Look for expense ratio below 0.2%. These track the Nifty 50 automatically.'
        },
        {
          type: 'p', text: 'Step 3: Click "Start SIP." Choose monthly frequency. Choose a date (5th or 10th of each month works well — after salary). Minimum amount: ₹500. Set it. Forget it.'
        },
        {
          type: 'p', text: 'Step 4: Set a calendar reminder for 6 months from now to review. Do not open the app daily. Do not stop the SIP during market downturns. This is the hardest step — it requires discipline.'
        },
        {
          type: 'note', text: 'The best time to start investing was 10 years ago. The second best time is today. ₹500/month for 35 years at 12% returns = ₹52.9 lakh from ₹2.1 lakh invested. Every month you delay costs you.'
        },
        {
          type: 'percentage-lesson',
          title: 'The CAGR formula: measuring your investment growth',
          content: 'CAGR = Compound Annual Growth Rate — the smoothed annual growth rate\n\nFormula: CAGR = ((Ending Value / Beginning Value)^(1/Number of Years)) − 1\n\nExample: ₹10,000 invested, grew to ₹25,000 in 8 years\nCAGR = (25,000/10,000)^(1/8) − 1\n      = (2.5)^(0.125) − 1\n      = 1.1213 − 1\n      = 0.1213 = 12.13% per year\n\nThis tells you the investment grew at 12.13% per year on average — even if actual yearly returns varied from −20% to +40%.',
        }
      ],
      terms: ['SIP', 'rupee cost averaging', 'compound interest', 'CAGR', 'NAV'],
      quiz: [
        {
          q: 'You invest ₹1,000/month SIP. In Month 1 NAV is ₹100, Month 2 NAV is ₹50. How many total units do you hold after 2 months?',
          options: ['20 units', '30 units', '15 units', '25 units'],
          correct: 1,
          explanation: 'Month 1: ₹1,000 ÷ ₹100 = 10 units. Month 2: ₹1,000 ÷ ₹50 = 20 units. Total = 30 units. The crash helped you — you bought more units cheaply!'
        },
        {
          q: '₹10,000 invested grew to ₹16,105 in 5 years. Using the Rule of 72, approximately what annual return did it achieve?',
          options: ['6%', '10%', '12%', '15%'],
          correct: 2,
          explanation: 'CAGR = (16,105/10,000)^(1/5) − 1 ≈ 10%. Check with Rule of 72: 72/10 = 7.2 years to double, which roughly fits the 5-year growth of 61%. The answer is approximately 10%.'
        },
        {
          q: 'You started a ₹500/month SIP 20 years ago. You invested ₹1,20,000 total. At 12% CAGR, approximately what is your portfolio worth today?',
          options: ['₹1,50,000', '₹2,40,000', '₹5,00,000', '₹10,00,000'],
          correct: 2,
          explanation: 'At 12% CAGR for 20 years, ₹500/month SIP grows to approximately ₹4,99,574 — roughly ₹5 lakh. That\'s 4.2x the amount you invested.'
        }
      ]
    }
  }
];

const ROADMAP = [
  { id: 'why-money-loses', label: 'Why money loses value', done: false },
  { id: 'what-is-investing', label: 'What investing means', done: false },
  { id: 'types-of-investments', label: 'Types of investments', done: false },
  { id: 'understanding-risk', label: 'Understanding risk', done: false },
  { id: 'market-crashes', label: 'How crashes work', done: false },
  { id: 'how-to-start', label: 'How to start your SIP', done: false },
];

function QuizBlock({ quiz, chapterId, completedQuizzes, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const key = `${chapterId}-quiz`;

  if (completedQuizzes.includes(key)) {
    return (
      <div style={{ background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', borderRadius: 12, padding: '14px 18px', marginTop: 32 }}>
        <div style={{ fontSize: 13, color: 'var(--accent-green)', fontWeight: 600 }}>Quiz completed for this chapter</div>
      </div>
    );
  }

  const allAnswered = Object.keys(answers).length === quiz.length;
  const score = submitted ? quiz.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (allAnswered) onComplete(key, score, quiz.length);
  };

  return (
    <div style={{ marginTop: 36, borderTop: '2px solid var(--border-subtle)', paddingTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--accent-green)', fontWeight: 700, flexShrink: 0 }}>?</div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Chapter Quiz</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{quiz.length} questions</span>
      </div>

      {quiz.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 24, background: 'var(--bg-secondary)', borderRadius: 12, padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.5 }}>{qi + 1}. {q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.options.map((opt, oi) => {
              let bg = 'var(--bg-card)';
              let border = 'var(--border-card)';
              let color = 'var(--text-primary)';
              if (submitted) {
                if (oi === q.correct) { bg = 'var(--accent-green-dim)'; border = 'var(--accent-green)'; color = 'var(--accent-green)'; }
                else if (oi === answers[qi] && answers[qi] !== q.correct) { bg = 'var(--accent-red-dim)'; border = 'var(--accent-red)'; color = 'var(--accent-red)'; }
              } else if (answers[qi] === oi) {
                bg = 'var(--accent-green-dim)'; border = 'var(--accent-green)'; color = 'var(--accent-green)';
              }
              return (
                <button key={oi} onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                  style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${border}`, background: bg, color, fontFamily: 'DM Sans, sans-serif', fontSize: 13, textAlign: 'left', cursor: submitted ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                  <span style={{ marginRight: 8, fontFamily: 'DM Mono, monospace', opacity: 0.6 }}>{String.fromCharCode(65 + oi)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--bg-card)', borderRadius: 8, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--accent-green)' }}>Explanation:</strong> {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ padding: '12px 24px', borderRadius: 10, background: allAnswered ? 'var(--accent-green)' : 'var(--bg-card)', border: 'none', color: allAnswered ? '#fff' : 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: allAnswered ? 'pointer' : 'default' }}>
          {allAnswered ? 'Submit answers' : `Answer all ${quiz.length} questions first`}
        </button>
      ) : (
        <div style={{ padding: '14px 18px', borderRadius: 10, background: score === quiz.length ? 'var(--accent-green-dim)' : 'var(--accent-amber-dim)', border: `1px solid ${score === quiz.length ? 'var(--accent-green)' : 'var(--accent-amber)'}` }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: score === quiz.length ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
            {score}/{quiz.length} correct — {score === quiz.length ? 'Perfect! Move to next chapter.' : 'Review the explanations above.'}
          </span>
        </div>
      )}
    </div>
  );
}

function renderBlock(block, i, onTermClick) {
  if (block.type === 'h2') return <h2 key={i} className="article-h2">{block.text}</h2>;
  if (block.type === 'h3') return <h3 key={i} className="article-h3">{block.text}</h3>;

  if (block.type === 'p') {
    // Detect term-linkable words
    const termMap = { 'inflation': 'inflation', 'purchasing power': 'purchasing power', 'compound interest': 'compound interest', 'SIP': 'SIP', 'index fund': 'index fund', 'mutual fund': 'mutual fund', 'ETF': 'ETF', 'NAV': 'NAV', 'expense ratio': 'expense ratio', 'dividend': 'dividend', 'CAGR': 'CAGR', 'stock': 'stock', 'share': 'share', 'diversification': 'diversification', 'volatility': 'volatility', 'beta': 'beta', 'bear market': 'bear market', 'bull market': 'bull market' };
    let text = block.text;
    return <p key={i} className="article-p">{text}</p>;
  }

  if (block.type === 'highlight') return (
    <div key={i} className="article-highlight">
      <p style={{ fontSize: 15, color: 'var(--accent-green)', lineHeight: 1.7, fontWeight: 500 }}>{block.text}</p>
    </div>
  );

  if (block.type === 'note') return (
    <div key={i} className="article-note">
      <strong style={{ color: 'var(--accent-amber)' }}>Note: </strong>{block.text}
    </div>
  );

  if (block.type === 'formula') return (
    <div key={i} style={{ background: 'var(--code-bg)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '16px 20px', margin: '16px 0', fontFamily: 'DM Mono, monospace' }}>
      <div style={{ fontSize: 11, color: 'var(--accent-green)', marginBottom: 8, letterSpacing: '0.08em' }}>{block.title.toUpperCase()}</div>
      <div style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 12 }}>{block.formula}</div>
      {block.examples.map((ex, ei) => (
        <div key={ei} style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>• {ex}</div>
      ))}
    </div>
  );

  if (block.type === 'percentage-lesson') return (
    <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 12, padding: '20px 24px', margin: '20px 0' }}>
      <div style={{ fontSize: 11, color: 'var(--accent-amber)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>PERCENTAGE CALCULATION — {block.title.toUpperCase()}</div>
      <pre style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.85, fontFamily: 'DM Mono, monospace', whiteSpace: 'pre-wrap', margin: 0 }}>{block.content}</pre>
    </div>
  );

  if (block.type === 'math-example') return (
    <div key={i} style={{ overflowX: 'auto', margin: '20px 0' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 10 }}>{block.title.toUpperCase()}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 12px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 500, borderBottom: '1px solid var(--border-card)' }}>Metric</th>
            {block.headers.map((h, hi) => (
              <th key={hi} style={{ textAlign: 'right', padding: '8px 12px', background: 'var(--bg-secondary)', color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 600, borderBottom: '1px solid var(--border-card)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 12 }}>{row.label}</td>
              {row.values.map((v, vi) => (
                <td key={vi} style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'DM Mono, monospace', color: 'var(--text-primary)', fontWeight: 500 }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.note && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.6, fontStyle: 'italic' }}>{block.note}</div>}
    </div>
  );

  return null;
}

export default function GroundZeroPage({ onNavigate }) {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [quizScores, setQuizScores] = useState({});

  const chapter = CHAPTERS.find(c => c.id === activeChapter);
  const chapterIndex = CHAPTERS.findIndex(c => c.id === activeChapter);

  const handleQuizComplete = (key, score, total) => {
    setCompletedQuizzes(prev => [...new Set([...prev, key])]);
    setQuizScores(prev => ({ ...prev, [key]: { score, total } }));
    setCompletedChapters(prev => [...new Set([...prev, activeChapter])]);
  };

  const progress = Math.round((completedChapters.length / CHAPTERS.length) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Top breadcrumb */}
      <div style={{ paddingTop: 62, background: 'var(--sidebar-bg)', borderBottom: '1px solid var(--border-subtle)', padding: '8px 24px 8px', paddingTop: 70 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>
          <span style={{ cursor: 'pointer', color: 'var(--accent-green)' }} onClick={() => onNavigate('home')}>Home</span>
          <span>›</span>
          <span style={{ cursor: 'pointer', color: 'var(--accent-green)' }} onClick={() => onNavigate('learn')}>Learn</span>
          <span>›</span>
          <span>Beginner's Guide</span>
          <span>›</span>
          <span style={{ color: 'var(--text-secondary)' }}>{chapter?.title}</span>
        </div>
      </div>

      <div className="gfg-layout" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* LEFT SIDEBAR */}
        <div className="gfg-sidebar">
          <div style={{ padding: '16px 20px 8px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              Beginner's Guide
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 12 }}>
              {completedChapters.length}/{CHAPTERS.length} chapters done
            </div>
            {/* Progress bar */}
            <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2, marginBottom: 16 }}>
              <div style={{ height: '100%', background: 'var(--accent-green)', borderRadius: 2, width: `${progress}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Chapter sections */}
          {['Part 1 — The Problem', 'Part 2 — The Instruments', 'Part 3 — Understanding Risk', 'Part 4 — Taking Action'].map(section => {
            const sectionChapters = CHAPTERS.filter(c => c.content && c.section === section ? true : c.section === section);
            const filteredChapters = CHAPTERS.filter(c => c.section === section);
            if (filteredChapters.length === 0) return null;
            return (
              <div key={section}>
                <div className="sidebar-section">{section}</div>
                {filteredChapters.map(ch => {
                  const isDone = completedChapters.includes(ch.id);
                  const isActive = activeChapter === ch.id;
                  return (
                    <button key={ch.id} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => { setActiveChapter(ch.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, background: isDone ? 'var(--accent-green)' : isActive ? 'var(--accent-green-dim)' : 'var(--border-card)', border: `1.5px solid ${isDone ? 'var(--accent-green)' : isActive ? 'var(--accent-green)' : 'var(--border-card)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isDone && <span style={{ fontSize: 8, color: '#fff' }}>✓</span>}
                        </div>
                        <span style={{ lineHeight: 1.4 }}>{ch.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Roadmap */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '16px 0', padding: '16px 20px 8px' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 12 }}>YOUR ROADMAP</div>
            {ROADMAP.map((item, i) => {
              const done = completedChapters.includes(item.id);
              return (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: done ? 'var(--accent-green)' : 'var(--border-card)', border: '1.5px solid', borderColor: done ? 'var(--accent-green)' : 'var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {done && <span style={{ fontSize: 9, color: '#fff' }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 11, color: done ? 'var(--accent-green)' : 'var(--text-muted)', lineHeight: 1.4 }}>{item.label}</span>
                </div>
              );
            })}
            {completedChapters.length === CHAPTERS.length && (
              <button onClick={() => onNavigate('simulator')} style={{ width: '100%', marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Start the simulator
              </button>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="gfg-main">
          {/* Chapter header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
              {chapter?.section?.toUpperCase()} · {chapter?.readTime?.toUpperCase()}
            </div>
            <h1 className="article-h1">{chapter?.title}</h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: '3px solid var(--accent-green)', paddingLeft: 16 }}>
              {chapter?.content?.intro}
            </p>
          </div>

          {/* Terms in this chapter */}
          {chapter?.content?.terms?.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', alignSelf: 'center' }}>KEY TERMS:</span>
              {chapter.content.terms.map(term => (
                <button key={term} onClick={() => onNavigate('learn')} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 100, background: 'var(--accent-green-dim)', color: 'var(--accent-green)', border: '1px solid rgba(0,214,143,0.2)', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.15s' }}>
                  {term} →
                </button>
              ))}
            </div>
          )}

          {/* Body content */}
          <div>
            {chapter?.content?.body?.map((block, i) => renderBlock(block, i, onNavigate))}
          </div>

          {/* Quiz */}
          {chapter?.content?.quiz && (
            <QuizBlock
              quiz={chapter.content.quiz}
              chapterId={chapter.id}
              completedQuizzes={completedQuizzes}
              onComplete={handleQuizComplete}
            />
          )}

          {/* Chapter navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
            {chapterIndex > 0 ? (
              <button onClick={() => { setActiveChapter(CHAPTERS[chapterIndex - 1].id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '10px 18px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', fontSize: 13, cursor: 'pointer' }}>
                ← Previous: {CHAPTERS[chapterIndex - 1].title.substring(0, 30)}...
              </button>
            ) : <div />}
            {chapterIndex < CHAPTERS.length - 1 && (
              <button onClick={() => { setActiveChapter(CHAPTERS[chapterIndex + 1].id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '10px 18px', borderRadius: 10, background: 'var(--accent-green)', border: 'none', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Next: {CHAPTERS[chapterIndex + 1].title.substring(0, 30)}... →
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="gfg-right">
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', marginBottom: 14 }}>ON THIS PAGE</div>
          {chapter?.content?.body?.filter(b => b.type === 'h2').map((b, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 0', borderLeft: '2px solid var(--border-subtle)', paddingLeft: 10, marginBottom: 4, cursor: 'pointer', lineHeight: 1.4 }}>
              {b.text}
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />

          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 12 }}>QUICK FACTS</div>
          {[
            'Nifty 50 CAGR (20yr): 12.4%',
            'India inflation avg: 6%',
            'FD real return: negative',
            '0 negative 10-yr Nifty periods',
            'SIP min amount: ₹500',
          ].map((f, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '5px 0', borderBottom: '1px solid var(--border-subtle)', lineHeight: 1.5 }}>{f}</div>
          ))}

          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />

          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginBottom: 12 }}>RELATED</div>
          {[['Dictionary', 'learn'], ['Markets', 'markets'], ['Simulator', 'simulator']].map(([label, page]) => (
            <button key={page} onClick={() => onNavigate(page)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--accent-green)', fontFamily: 'DM Sans, sans-serif' }}>
              {label} →
            </button>
          ))}

          {/* Progress card */}
          <div style={{ marginTop: 20, background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontFamily: 'DM Mono, monospace', marginBottom: 6 }}>YOUR PROGRESS</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--accent-green)' }}>{progress}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{completedChapters.length}/{CHAPTERS.length} chapters completed</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginTop: 8 }}>
              <div style={{ height: '100%', background: 'var(--accent-green)', borderRadius: 2, width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
