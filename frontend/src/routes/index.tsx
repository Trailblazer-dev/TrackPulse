import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import { guestRoutes } from './guestRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

// Combine all routes
const allRoutes: RouteObject[] = [
  ...guestRoutes,
  ...userRoutes,
  ...adminRoutes,
];

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
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Render all routes */}
        {allRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
