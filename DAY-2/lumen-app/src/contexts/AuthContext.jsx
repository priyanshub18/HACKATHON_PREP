import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Mock user data for testing - no authentication required
  const [user, setUser] = useState({
    _id: 'mock-user-id',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'admin'
  });
  const [token, setToken] = useState('mock-token-for-testing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize auth state with mock data
  useEffect(() => {
    // Simulate loading completion
    setLoading(false);
  }, []);

  // Login function - mock implementation for testing
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock successful login
      const mockUser = {
        _id: 'mock-user-id',
        name: 'Test Admin',
        email: credentials.email || 'admin@test.com',
        role: 'admin'
      };
      
      setUser(mockUser);
      setToken('mock-token-for-testing');
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function - mock implementation for testing
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock successful registration
      const mockUser = {
        _id: 'mock-user-id',
        name: userData.name || 'Test User',
        email: userData.email || 'user@test.com',
        role: 'admin'
      };
      
      setUser(mockUser);
      setToken('mock-token-for-testing');
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function - mock implementation for testing
  const logout = () => {
    // Keep mock user for testing - just clear error
    setError(null);
  };

  // Update profile function - mock implementation for testing
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock successful profile update
      const updatedUser = {
        ...user,
        ...profileData
      };
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change password function - mock implementation for testing
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock successful password change
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is manager or admin
  const isManagerOrAdmin = () => {
    return hasAnyRole(['manager', 'admin']);
  };

  // Check if user is staff, manager, or admin
  const isStaffOrAbove = () => {
    return hasAnyRole(['staff', 'manager', 'admin']);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    hasRole,
    hasAnyRole,
    isAdmin,
    isManagerOrAdmin,
    isStaffOrAbove,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
