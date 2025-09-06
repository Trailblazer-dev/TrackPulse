import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService, type UserRole } from '../services/api/auth';

interface ProtectedRouteProps {
  requiredRole: UserRole | UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  children,
  redirectTo = '/'
}) => {
  const isAuthenticated = authService.isAuthenticated();
  const currentRole = authService.getCurrentRole();
  
  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // Check if user has permission based on their role
  const hasAccess = Array.isArray(requiredRole)
    ? requiredRole.includes(currentRole)
    : currentRole === requiredRole;
    
  if (!hasAccess) {
    // Redirect to appropriate page based on role
    if (currentRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (currentRole === 'user') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to={redirectTo} replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;