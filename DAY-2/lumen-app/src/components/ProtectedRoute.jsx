import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredRoles = null,
  fallbackPath = '/login' 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboard = {
      admin: '/admin',
      manager: '/manager',
      staff: '/staff'
    };
    
    const redirectPath = roleDashboard[user?.role] || '/landing';
    return <Navigate to={redirectPath} replace />;
  }

  // Check multiple roles access
  if (requiredRoles && !requiredRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboard = {
      admin: '/admin',
      manager: '/manager',
      staff: '/staff'
    };
    
    const redirectPath = roleDashboard[user?.role] || '/landing';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
