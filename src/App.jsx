import React, { useState, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import GroundZeroPage from './pages/GroundZeroPage.jsx';
import FearQuizPage from './pages/FearQuizPage.jsx';
import StockPickerPage from './pages/StockPickerPage.jsx';
import SimulatorPage from './pages/SimulatorPage.jsx';
import LossMeterPage from './pages/LossMeterPage.jsx';
import DebriefPage from './pages/DebriefPage.jsx';
import LearnPage from './pages/LearnPage.jsx';
import MarketsPage from './pages/MarketsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

const TOP_PAGES = ['home','simulator','learn','markets','history','profile'];

function AppInner() {
  const [history, setHistory] = useState(['home']);
  const [idx, setIdx] = useState(0);
  const [profile, setProfile] = useState(null);
  const [stockId, setStockId] = useState(null);
  const [decision, setDecision] = useState(null);
  const [simHistory, setSimHistory] = useState([]);
  const [lastSimResult, setLastSimResult] = useState(null);

  const page = history[idx];
  const canGoBack = idx > 0;
  const canGoForward = idx < history.length - 1;

  const push = useCallback((p) => {
    setHistory(prev => [...prev.slice(0, idx + 1), p]);
    setIdx(i => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idx]);

  const goBack = () => { if (canGoBack) { setIdx(i => i - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const goForward = () => { if (canGoForward) { setIdx(i => i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

  const startSimulator = (path) => {
    if (path === 'zero') push('groundzero');
    else if (path === 'scared') push('fearquiz');
    else { setProfile('calculated'); push('stockpick'); }
  };

  const activePage = TOP_PAGES.includes(page) ? page : 'simulator';

  // Handle simulator complete — receives full result object
  const handleSimComplete = (dec, result) => {
    const d = dec || result?.decision || 'hold';
    const sid = result?.stockId || stockId;
    setDecision(d);
    setLastSimResult(result);
    const entry = {
      stockId: sid,
      profile,
      decision: d,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      investment: result?.investment,
      finalValue: result?.finalValue,
      pnl: result?.pnl,
      returnPct: result?.returnPct,
    };
    setSimHistory(prev => [...prev, entry]);
    push('lossmeter');
  };

  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar activePage={activePage} onNavigate={push} canGoBack={canGoBack} canGoForward={canGoForward} onBack={goBack} onForward={goForward} />
      <div>
        {page === 'home'       && <LandingPage onSelectPath={startSimulator} />}
        {page === 'groundzero' && <GroundZeroPage onComplete={() => push('fearquiz')} onNavigate={push} />}
        {page === 'fearquiz'   && <FearQuizPage onComplete={(p) => { setProfile(p); push('stockpick'); }} />}
        {page === 'stockpick'  && <StockPickerPage profile={profile} onSelect={(sid) => { setStockId(sid); push('simulate'); }} />}
        {page === 'simulate'   && <SimulatorPage profile={profile} stockId={stockId} onComplete={handleSimComplete} />}
        {page === 'simulator'  && <SimulatorPage profile={profile} stockId={null} onComplete={handleSimComplete} />}
        {page === 'lossmeter'  && <LossMeterPage stockId={lastSimResult?.stockId || stockId} onComplete={() => push('debrief')} />}
        {page === 'debrief'    && <DebriefPage profile={profile} stockId={lastSimResult?.stockId || stockId} decision={decision} onRestart={() => { setProfile(null); setStockId(null); setDecision(null); push('home'); }} />}
        {page === 'learn'      && <LearnPage onNavigate={push} />}
        {page === 'markets'    && <MarketsPage onNavigate={push} />}
        {page === 'profile'    && <ProfilePage simHistory={simHistory} onStartNew={() => push('simulator')} onNavigate={push} />}
        {page === 'history'    && <HistoryPage onNavigate={push} />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  );
}
