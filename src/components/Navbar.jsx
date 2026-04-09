import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthModal from './AuthModal.jsx';

const NAV_LINKS = [
  { id: 'home',      label: 'Home',      icon: '🏠' },
  { id: 'simulator', label: 'Simulator', icon: '🚀' },
  { id: 'learn',     label: 'Learn',     icon: '📖' },
  { id: 'markets',   label: 'Markets',   icon: '📊' },
  { id: 'profile',   label: 'Profile',   icon: '👤' },
];

export default function Navbar({ activePage, onNavigate, canGoBack, canGoForward, onBack, onForward }) {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(9,11,15,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Logo */}
          <div onClick={() => onNavigate('home')} style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0, marginRight: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-green)', animation: 'pulse-dot 2s infinite' }} />
            RiskLab
          </div>

          {/* Back / Forward */}
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {[{ fn: onBack, ok: canGoBack, char: '←' }, { fn: onForward, ok: canGoForward, char: '→' }].map(({ fn, ok, char }) => (
              <button key={char} onClick={fn} disabled={!ok} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid rgba(255,255,255,0.08)', background: ok ? 'rgba(255,255,255,0.05)' : 'transparent', color: ok ? 'var(--text-primary)' : 'var(--text-muted)', cursor: ok ? 'pointer' : 'default', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {char}
              </button>
            ))}
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}>
            {NAV_LINKS.map(link => {
              const active = activePage === link.id;
              return (
                <button key={link.id} onClick={() => onNavigate(link.id)} style={{ padding: '7px 14px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: active ? 600 : 400, background: active ? 'rgba(0,214,143,0.12)' : 'transparent', color: active ? 'var(--accent-green)' : 'var(--text-secondary)', transition: 'all 0.18s', display: 'flex', alignItems: 'center', gap: 6, borderBottom: active ? '2px solid var(--accent-green)' : '2px solid transparent' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <span style={{ fontSize: 14 }}>{link.icon}</span>{link.label}
                </button>
              );
            })}
          </div>

          {/* Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {!user ? (
              <>
                <button onClick={() => setShowAuth(true)} style={{ padding: '7px 14px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13 }}>Log in</button>
                <button onClick={() => setShowAuth(true)} style={{ padding: '7px 14px', borderRadius: 8, background: 'var(--accent-green)', border: 'none', color: '#001A0E', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>Sign up</button>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowDropdown(d => !d)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 5px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '1px solid rgba(0,214,143,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{user.name.split(' ')[0]}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>▾</span>
                </button>
                {showDropdown && (
                  <div onMouseLeave={() => setShowDropdown(false)} style={{ position: 'absolute', top: 46, right: 0, background: '#12161E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 8, minWidth: 210, boxShadow: '0 24px 48px rgba(0,0,0,0.6)', zIndex: 600 }}>
                    <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 6 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{user.email}</div>
                    </div>
                    {[['👤','My Profile','profile'],['🚀','Run Simulation','simulator'],['📖','Learn','learn'],['📊','Markets','markets']].map(([icon,label,page]) => (
                      <button key={label} onClick={() => { onNavigate(page); setShowDropdown(false); }}
                        style={{ width: '100%', padding: '9px 14px', borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', display: 'flex', gap: 10, alignItems: 'center' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      ><span>{icon}</span>{label}</button>
                    ))}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '6px 0' }} />
                    <button onClick={() => { logout(); setShowDropdown(false); }}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: 'var(--accent-red)', fontFamily: 'var(--font-body)', display: 'flex', gap: 10, alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,77,77,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    ><span>🚪</span>Log out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
