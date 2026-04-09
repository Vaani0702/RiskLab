import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import AuthModal from './AuthModal.jsx';

const NAV_LINKS = [
  { id: 'home',      label: 'Home' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'learn',     label: 'Learn' },
  { id: 'markets',   label: 'Markets' },
  { id: 'history',   label: 'History' },
  { id: 'profile',   label: 'Profile' },
];

export default function Navbar({ activePage, onNavigate, canGoBack, canGoForward, onBack, onForward }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Logo */}
          <div onClick={() => onNavigate('home')} style={{ fontFamily: 'Syne, sans-serif', fontSize: 19, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0, marginRight: 8, color: 'var(--text-primary)' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            RiskLab
          </div>

          {/* Back/Forward */}
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {[{ fn: onBack, ok: canGoBack, char: '←' }, { fn: onForward, ok: canGoForward, char: '→' }].map(({ fn, ok, char }) => (
              <button key={char} onClick={fn} disabled={!ok} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid var(--border-card)', background: ok ? 'var(--bg-glass)' : 'transparent', color: ok ? 'var(--text-primary)' : 'var(--text-muted)', cursor: ok ? 'pointer' : 'default', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {char}
              </button>
            ))}
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center', flexWrap: 'nowrap' }}>
            {NAV_LINKS.map(link => {
              const active = activePage === link.id;
              return (
                <button key={link.id} onClick={() => onNavigate(link.id)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: active ? 600 : 400, background: active ? 'var(--accent-green-dim)' : 'transparent', color: active ? 'var(--accent-green)' : 'var(--text-secondary)', transition: 'all 0.15s', borderBottom: active ? '2px solid var(--accent-green)' : '2px solid transparent', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Theme toggle */}
            <button onClick={toggle} className="theme-toggle" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? '☀' : '◑'}
            </button>

            {!user ? (
              <>
                <button onClick={() => setShowAuth(true)} style={{ padding: '7px 14px', borderRadius: 8, background: 'transparent', border: '1px solid var(--border-card)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>Log in</button>
                <button onClick={() => setShowAuth(true)} style={{ padding: '7px 14px', borderRadius: 8, background: 'var(--accent-green)', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600 }}>Sign up</button>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowDropdown(d => !d)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 5px', borderRadius: 10, background: 'var(--bg-glass)', border: '1px solid var(--border-card)', cursor: 'pointer' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'Syne, sans-serif' }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{user.name.split(' ')[0]}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>▾</span>
                </button>
                {showDropdown && (
                  <div onMouseLeave={() => setShowDropdown(false)} style={{ position: 'absolute', top: 46, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: 8, minWidth: 200, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 600 }}>
                    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 6 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{user.email}</div>
                    </div>
                    {[['My Profile','profile'],['Simulator','simulator'],['Learn','learn'],['Markets','markets'],['History','history']].map(([label,page]) => (
                      <button key={label} onClick={() => { onNavigate(page); setShowDropdown(false); }} style={{ width: '100%', padding: '9px 14px', borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', display: 'flex', gap: 10, alignItems: 'center' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >{label}</button>
                    ))}
                    <div style={{ height: 1, background: 'var(--border-subtle)', margin: '6px 0' }} />
                    <button onClick={() => { logout(); setShowDropdown(false); }} style={{ width: '100%', padding: '9px 14px', borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: 'var(--accent-red)', fontFamily: 'DM Sans, sans-serif' }}>Log out</button>
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
