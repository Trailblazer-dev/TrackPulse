import React from 'react';
import { Navigate } from 'react-router-dom';
import { roleService, type UserRole } from '../utils/roleService';

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
  const currentRole = roleService.getCurrentRole();
  
  // Check if user has permission based on their role
  const hasAccess = Array.isArray(requiredRole)
    ? requiredRole.includes(currentRole)
    : currentRole === requiredRole;
    
  // Special handling for 'guest' - they should only see guest routes
  if (currentRole === 'guest' && requiredRole !== 'guest') {
    return <Navigate to={redirectTo} replace />;
  }
    
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