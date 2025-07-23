import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load user pages
const Dashboard = lazy(() => import('../pages/user/Dashboard'));
const Analytics = lazy(() => import('../pages/user/Analytics'));
const Reports = lazy(() => import('../pages/user/Reports'));
const Bookmarks = lazy(() => import('../pages/user/Bookmarks'));

export const userRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '/reports',
    element: <Reports />,
  },
  {
    path: '/bookmarks',
    element: <Bookmarks />,
  },
];
