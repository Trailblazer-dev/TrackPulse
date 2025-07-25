import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load authentication pages
const SignIn = lazy(() => import('../auth/SignIn'));
const Register = lazy(() => import('../auth/Register'));
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));

export const authRoutes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/login', // Alternative route for sign in
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/signup', // Alternative route for register
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
];
