import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

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
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminLayout>
        <Users />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/metrics',
    element: (
      <AdminLayout>
        <SystemMetrics />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/audit-logs',
    element: (
      <AdminLayout>
        <AuditLogs />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/data-management',
    element: (
      <AdminLayout>
        <DataManagement />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/report-builder',
    element: (
      <AdminLayout>
        <ReportBuilder />
      </AdminLayout>
    ),
  },
];
