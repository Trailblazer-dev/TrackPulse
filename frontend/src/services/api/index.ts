import axios from 'axios';

// Get the base API URL from environment or default to local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      if (window.location.pathname !== '/signin' && window.location.pathname !== '/') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Export all API services
export * from './types';
export * from './auth';

// Guest services
export * from './guest/explore';
export * from './guest/contact';
export * from './guest/newsletter';

// User services
export * from './user/dashboard';
export * from './user/analytics';
export * from './user/reports';
export * from './user/bookmarks';

// Admin services
export * from './admin/dashboard';
export * from './admin/users';
export * from './admin/metrics';
export * from './admin/reports';
export * from './admin/auditLogs';
export * from './admin/dataManagement';

// Shared services
export * from './settings';
export * from './admin/auditLogs';
export * from './admin/dataManagement';

// Shared services
export * from './settings';
