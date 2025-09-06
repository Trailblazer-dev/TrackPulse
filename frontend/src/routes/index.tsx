import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { guestRoutes } from './guestRoutes';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';
import ProtectedRoute from './ProtectedRoute';

// NotFound component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <a 
        href="/" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Go back to home
      </a>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Spinner /></div>}>
      <Routes>
        {/* Guest Routes - Accessible to everyone */}
        {guestRoutes.map((route) => (
          <Route 
            key={route.path as string} 
            path={route.path as string} 
            element={route.element} 
          />
        ))}
        
        {/* Auth Routes - Accessible to everyone */}
        {authRoutes.map((route) => (
          <Route 
            key={route.path as string} 
            path={route.path as string} 
            element={route.element} 
          />
        ))}
        
        {/* User Routes - Protected */}
        {userRoutes.map((route) => (
          <Route 
            key={route.path as string} 
            path={route.path as string} 
            element={
              <ProtectedRoute requiredRole={['user', 'admin']} redirectTo="/signin">
                {route.element}
              </ProtectedRoute>
            } 
          />
        ))}
        
        {/* Admin Routes - Protected */}
        {adminRoutes.map((route) => (
          <Route 
            key={route.path as string} 
            path={route.path as string} 
            element={
              <ProtectedRoute requiredRole="admin" redirectTo="/signin">
                {route.element}
              </ProtectedRoute>
            } 
          />
        ))}
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
        