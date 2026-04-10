import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from token on load
  useEffect(() => {
    const token = localStorage.getItem('rl_token');
    if (!token) { setLoading(false); return; }

    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setUser({ ...data, token });
        else localStorage.removeItem('rl_token');
      })
      .catch(() => localStorage.removeItem('rl_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.detail || 'Login failed' };
      localStorage.setItem('rl_token', data.token);
      setUser({ ...data.user, token: data.token });
      return { success: true };
    } catch {
      // Fallback to localStorage if backend offline
      return _localLogin(email, password);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.detail || 'Registration failed' };
      localStorage.setItem('rl_token', data.token);
      setUser({ ...data.user, token: data.token });
      return { success: true };
    } catch {
      // Fallback to localStorage if backend offline
      return _localSignup(name, email, password);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rl_token');
    localStorage.removeItem('rl_session');
  };

  // ── localStorage fallbacks (when backend is offline) ──
  const _localLogin = (email, password) => {
    const stored = JSON.parse(localStorage.getItem('rl_users') || '{}');
    if (stored[email] && stored[email].password === password) {
      const u = { email, name: stored[email].name, joinDate: stored[email].joinDate };
      setUser(u);
      localStorage.setItem('rl_session', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const _localSignup = (name, email, password) => {
    const stored = JSON.parse(localStorage.getItem('rl_users') || '{}');
    if (stored[email]) return { success: false, error: 'Email already registered' };
    const joinDate = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    stored[email] = { name, password, joinDate };
    localStorage.setItem('rl_users', JSON.stringify(stored));
    const u = { email, name, joinDate };
    setUser(u);
    localStorage.setItem('rl_session', JSON.stringify(u));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
