import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = AuthService.getSession();
    return session || null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = AuthService.login(email, password);
      setUser(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback((email, password, fullName) => {
    setLoading(true);
    setError(null);
    try {
      AuthService.register(email, password, fullName);
      return AuthService.login(email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    try {
      if (user) {
        AuthService.updateProfile(user.email, updates);
        setUser({ ...user, ...updates });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
