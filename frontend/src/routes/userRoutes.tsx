import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Setting from '../components/reuse/Setting';

// Lazy load user pages
const Dashboard = lazy(() => import('../pages/user/Dashboard'));
const Analytics = lazy(() => import('../pages/user/Analytics'));
const Reports = lazy(() => import('../pages/user/Reports'));
const Bookmarks = lazy(() => import('../pages/user/Bookmarks'));

export const userRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <UserLayout>
        <Dashboard />
      </UserLayout>
    ),
  },
  {
    path: '/analytics',
    element: (
      <UserLayout>
        <Analytics />
      </UserLayout>
    ),
  },
  {
    path: '/reports',
    element: (
      <UserLayout>
        <Reports />
      </UserLayout>
    ),
  },
  {
    path: '/bookmarks',
    element: (
      <UserLayout>
        <Bookmarks />
      </UserLayout>
    ),
  },
  {
    path: '/settings',
    element: (
      <UserLayout>  
        <Setting />
      </UserLayout> 
    ),
  }
];
