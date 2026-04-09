import React, { useState, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
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

// Top-level pages navigated via navbar
const TOP_PAGES = ['home', 'simulator', 'learn', 'markets', 'profile'];

// Simulator sub-flow pages (not in navbar)
const SIM_FLOW = ['groundzero', 'fearquiz', 'stockpick', 'simulate', 'lossmeter', 'debrief'];

function AppInner() {
  const [history, setHistory] = useState(['home']);
  const [idx, setIdx] = useState(0);
  const [profile, setProfile] = useState(null);
  const [stockId, setStockId] = useState(null);
  const [decision, setDecision] = useState(null);
  const [simHistory, setSimHistory] = useState([]);

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

  // Navbar navigation — top level pages
  const onNavigate = (p) => push(p);

  // Simulator flow handlers
  const startSimulator = (path) => {
    if (path === 'zero') push('groundzero');
    else if (path === 'scared') push('fearquiz');
    else { setProfile('calculated'); push('stockpick'); }
  };

  const activePage = TOP_PAGES.includes(page) ? page : 'simulator';

  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onBack={goBack}
        onForward={goForward}
      />

      <div style={{ paddingTop: 62 }}>
        {page === 'home' && (
          <LandingPage onSelectPath={startSimulator} />
        )}
        {page === 'groundzero' && (
          <GroundZeroPage onComplete={() => push('fearquiz')} />
        )}
        {page === 'fearquiz' && (
          <FearQuizPage onComplete={(p) => { setProfile(p); push('stockpick'); }} />
        )}
        {page === 'stockpick' && (
          <StockPickerPage profile={profile} onSelect={(sid) => { setStockId(sid); push('simulate'); }} />
        )}
        {page === 'simulate' && (
          <SimulatorPage profile={profile} stockId={stockId} onComplete={(dec) => {
            const d = dec || 'hold';
            setDecision(d);
            setSimHistory(prev => [...prev, {
              stockId, profile, decision: d,
              date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            }]);
            push('lossmeter');
          }} />
        )}
        {page === 'lossmeter' && (
          <LossMeterPage stockId={stockId} onComplete={() => push('debrief')} />
        )}
        {page === 'debrief' && (
          <DebriefPage profile={profile} stockId={stockId} decision={decision}
            onRestart={() => { setProfile(null); setStockId(null); setDecision(null); push('home'); }} />
        )}
        {page === 'simulator' && (
          <LandingPage onSelectPath={startSimulator} />
        )}
        {page === 'learn' && (
          <LearnPage onNavigate={onNavigate} />
        )}
        {page === 'markets' && (
          <MarketsPage onNavigate={onNavigate} />
        )}
        {page === 'profile' && (
          <ProfilePage simHistory={simHistory} onStartNew={() => push('home')} onNavigate={onNavigate} />
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
