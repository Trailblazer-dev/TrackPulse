// import axios from 'axios';

// // Create axios instance with default configs
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 15000, // 15 seconds
// });

// // Request interceptor for adding auth token, etc.
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for handling common errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;
    
//     // Handle token expiration/auth errors
//     if (response && response.status === 401) {
//       // Clear local storage and redirect to login
//       localStorage.removeItem('accessToken');
//       window.location.href = '/login';
//     }
    
//     // Handle server errors
//     if (response && response.status >= 500) {
//       console.error('Server error occurred:', error);
//       // You could trigger a notification here
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;

// // Export all API services
// export * from './types';
// export * from './auth';

// // Guest services
// export * from './guest/explore';
// export * from './guest/contact';
// export * from './guest/newsletter';

// // User services
// export * from './user/dashboard';
// export * from './user/analytics';
// export * from './user/reports';
// export * from './user/bookmarks';

// // Admin services
// export * from './admin/dashboard';
// export * from './admin/users';
// export * from './admin/metrics';
// export * from './admin/reports';
// export * from './admin/auditLogs';
// export * from './admin/dataManagement';

// // Shared services
// export * from './settings';
