import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load guest pages
const Landing = lazy(() => import('../pages/guest/Landing'));
const About = lazy(() => import('../pages/guest/About'));
const Contact = lazy(() => import('../pages/guest/Contact'));
const Explore = lazy(() => import('../pages/guest/Explore'));

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
];
