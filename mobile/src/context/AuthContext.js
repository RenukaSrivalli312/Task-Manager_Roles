import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearAuthSession, getAuthSession, setAuthSession } from '../utils/storage';
import { getApiErrorMessage, setUnauthorizedHandler } from '../services/api';
import { loginRequest, signupRequest } from '../services/authService';

const AuthContext = createContext(null);

function normalizeAuthData(data) {
  const token = data?.token || data?.accessToken || data?.jwt;
  const user = data?.user || data?.data?.user;
  return { token, user };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const session = await getAuthSession();
        if (session.token && session.user) {
          setToken(session.token);
          setUser(session.user);
        }
      } finally {
        setIsInitializing(false);
      }
    }
    restoreSession();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(async () => {
      await logout();
    });
  }, []);

  const login = async ({ email, password }) => {
    const response = await loginRequest({ email, password });
    const auth = normalizeAuthData(response);
    if (!auth.token || !auth.user) {
      throw new Error('Invalid login response from server.');
    }
    await setAuthSession(auth.token, auth.user);
    setToken(auth.token);
    setUser(auth.user);
  };

  const signup = async ({ name, email, password, role }) => {
    const response = await signupRequest({ name, email, password, role });
    const auth = normalizeAuthData(response);
    if (!auth.token || !auth.user) {
      throw new Error('Invalid signup response from server.');
    }
    await setAuthSession(auth.token, auth.user);
    setToken(auth.token);
    setUser(auth.user);
  };

  const logout = async () => {
    await clearAuthSession();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isInitializing,
      login,
      signup,
      logout,
      getErrorMessage: getApiErrorMessage,
    }),
    [user, token, isInitializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
