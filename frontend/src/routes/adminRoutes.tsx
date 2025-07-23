import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const Users = lazy(() => import('../pages/admin/Users'));
const SystemMetrics = lazy(() => import('../pages/admin/SystemMetrics'));
const AuditLogs = lazy(() => import('../pages/admin/AuditLogs'));
const DataManagement = lazy(() => import('../pages/admin/DataManagement'));
const ReportBuilder = lazy(() => import('../pages/admin/ReportBuilder'));

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/users',
    element: <Users />,
  },
  {
    path: '/admin/metrics',
    element: <SystemMetrics />,
  },
  {
    path: '/admin/audit-logs',
    element: <AuditLogs />,
  },
  {
    path: '/admin/data-management',
    element: <DataManagement />,
  },
  {
    path: '/admin/report-builder',
    element: <ReportBuilder />,
  },
];
