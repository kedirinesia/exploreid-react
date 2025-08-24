import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const checkAuthStatus = () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            // Clear invalid authentication
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const response = await authService.register(username, email, password);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (userId, username, email, password) => {
    try {
      setLoading(true);
      const response = await authService.updateUserProfile(userId, username, email, password);
      if (response.status === 'success') {
        const updatedUser = { ...user, username, email };
        setUser(updatedUser);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (userId) => {
    try {
      setLoading(true);
      const response = await authService.deleteAccount(userId);
      if (response.status === 'success') {
        setUser(null);
        setIsAuthenticated(false);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 