import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const inp = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)', fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
};

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = mode === 'login'
      ? login(email, password)
      : (!name.trim() ? { success: false, error: 'Enter your name' } : signup(name, email, password));
    setLoading(false);
    if (result.success) onClose();
    else setError(result.error);
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#12161E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 36, width: '100%', maxWidth: 420, animation: 'fadeUp 0.3s ease' }}>
        {/* Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              style={{ flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, transition: 'all 0.2s', background: mode === m ? 'var(--accent-green)' : 'transparent', color: mode === m ? '#001A0E' : 'var(--text-secondary)' }}>
              {m === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
          {mode === 'login' ? 'Welcome back' : 'Join RiskLab'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
          {mode === 'login' ? 'Continue your investing journey' : 'Start your flight simulator journey — free'}
        </p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 6 }}>YOUR NAME</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Vaani Singh" style={inp} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 6 }}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inp} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 6 }}>PASSWORD</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={inp} />
          </div>
          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.25)', fontSize: 13, color: 'var(--accent-red)' }}>{error}</div>
          )}
          <button type="submit" disabled={loading} style={{ marginTop: 4, padding: '14px 0', borderRadius: 12, border: 'none', background: loading ? 'rgba(0,214,143,0.4)' : 'var(--accent-green)', color: '#001A0E', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In →' : 'Create Account →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
          {mode === 'login' ? "No account? " : 'Have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', cursor: 'pointer', fontSize: 12 }}>
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
