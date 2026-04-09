import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem('rl_session');
    if (s) setUser(JSON.parse(s));
  }, []);

  const login = (email, password) => {
    const stored = JSON.parse(localStorage.getItem('rl_users') || '{}');
    if (stored[email] && stored[email].password === password) {
      const u = { email, name: stored[email].name, joinDate: stored[email].joinDate };
      setUser(u);
      localStorage.setItem('rl_session', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rl_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
