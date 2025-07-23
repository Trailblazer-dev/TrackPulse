import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';

// Lazy load guest pages
const Landing = lazy(() => import('../pages/guest/Landing'));
const About = lazy(() => import('../pages/guest/About'));
const Contact = lazy(() => import('../pages/guest/Contact'));
const Explore = lazy(() => import('../pages/guest/Explore'));

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GuestLayout>
        <Landing />
      </GuestLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <GuestLayout>
        <About />
      </GuestLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <GuestLayout>
        <Contact />
      </GuestLayout>
    ),
  },
  {
    path: '/explore',
    element: (
      <GuestLayout>
        <Explore />
      </GuestLayout>
    ),
  },
];
