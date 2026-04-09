import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import GroundZeroPage from './pages/GroundZeroPage.jsx';
import FearQuizPage from './pages/FearQuizPage.jsx';
import StockPickerPage from './pages/StockPickerPage.jsx';
import SimulatorPage from './pages/SimulatorPage.jsx';
import LossMeterPage from './pages/LossMeterPage.jsx';
import DebriefPage from './pages/DebriefPage.jsx';

// Route names
const ROUTES = {
  LANDING:    'landing',
  GROUND_ZERO:'groundzero',
  FEAR_QUIZ:  'fearquiz',
  STOCK_PICK: 'stockpick',
  SIMULATOR:  'simulator',
  LOSS_METER: 'lossmeter',
  DEBRIEF:    'debrief',
};

function getStep(route) {
  const map = {
    [ROUTES.LANDING]:     0,
    [ROUTES.GROUND_ZERO]: 1,
    [ROUTES.FEAR_QUIZ]:   2,
    [ROUTES.STOCK_PICK]:  3,
    [ROUTES.SIMULATOR]:   4,
    [ROUTES.LOSS_METER]:  4,
    [ROUTES.DEBRIEF]:     5,
  };
  return map[route] ?? 0;
}

export default function App() {
  const [route, setRoute] = useState(ROUTES.LANDING);
  const [profile, setProfile] = useState(null);   // 'panic' | 'cautious' | 'calculated'
  const [stockId, setStockId] = useState(null);   // 'netflix' | 'nifty' | 'gold'
  const [decision, setDecision] = useState(null); // 'sell' | 'hold'

  const navigate = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Path selection from landing
  const handlePathSelect = (path) => {
    if (path === 'zero') {
      navigate(ROUTES.GROUND_ZERO);
    } else if (path === 'scared') {
      navigate(ROUTES.FEAR_QUIZ);
    } else {
      // Advanced — give a default cautious profile, skip to stock pick
      setProfile('calculated');
      navigate(ROUTES.STOCK_PICK);
    }
  };

  // Ground Zero complete → fear quiz
  const handleGroundZeroComplete = () => {
    navigate(ROUTES.FEAR_QUIZ);
  };

  // Fear quiz complete → stock pick
  const handleFearQuizComplete = (p) => {
    setProfile(p);
    navigate(ROUTES.STOCK_PICK);
  };

  // Stock selected → simulator
  const handleStockSelect = (sid) => {
    setStockId(sid);
    navigate(ROUTES.SIMULATOR);
  };

  // Simulator done → loss meter
  const handleSimulatorComplete = (dec) => {
    setDecision(dec || 'hold');
    navigate(ROUTES.LOSS_METER);
  };

  // Loss meter done → debrief
  const handleLossMeterComplete = () => {
    navigate(ROUTES.DEBRIEF);
  };

  // Restart
  const handleRestart = () => {
    setProfile(null);
    setStockId(null);
    setDecision(null);
    navigate(ROUTES.LANDING);
  };

  return (
    <>
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <Navbar step={getStep(route)} />

      {route === ROUTES.LANDING && (
        <LandingPage onSelectPath={handlePathSelect} />
      )}

      {route === ROUTES.GROUND_ZERO && (
        <GroundZeroPage onComplete={handleGroundZeroComplete} />
      )}

      {route === ROUTES.FEAR_QUIZ && (
        <FearQuizPage onComplete={handleFearQuizComplete} />
      )}

      {route === ROUTES.STOCK_PICK && (
        <StockPickerPage
          profile={profile}
          onSelect={handleStockSelect}
        />
      )}

      {route === ROUTES.SIMULATOR && (
        <SimulatorPage
          profile={profile}
          stockId={stockId}
          onComplete={handleSimulatorComplete}
        />
      )}

      {route === ROUTES.LOSS_METER && (
        <LossMeterPage
          stockId={stockId}
          onComplete={handleLossMeterComplete}
        />
      )}

      {route === ROUTES.DEBRIEF && (
        <DebriefPage
          profile={profile}
          stockId={stockId}
          decision={decision}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
