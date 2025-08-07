// import type { ApiResponse } from '../types';
// import { adminDashboard } from '../../../utils/admin/admin';

// export interface AdminDashboardData {
//   apiUsage: {
//     title: string;
//     type: string;
//     description: string;
//     value: string;
//     graphConfig: {
//       type: string;
//       dataPoints: { date: string; value: number }[];
//       colors: string[];
//       showLegend: boolean;
//       period: string;
//     };
//   };
//   errorRate: {
//     title: string;
//     type: string;
//     description: string;
//     value: string;
//     pieConfig: {
//       data: { label: string; value: number }[];
//       colors: string[];
//       showLegend: boolean;
//     };
//   };
//   systemUptime: {
//     title: string;
//     type: string;
//     description: string;
//     value: string;
//     icon: string;
//   };
//   currentVersion: {
//     title: string;
//     type: string;
//     description: string;
//     value: string;
//     icon: string;
//   };
//   recentAlerts: {
//     title: string;
//     type: string;
//     description: string;
//     columns: { header: string; key: string }[];
//     data: { timestamp: string; level: string; message: string; source: string }[];
//   };
// }

// export const adminDashboardApi = {
//   getDashboardData: async (): Promise<ApiResponse<AdminDashboardData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<AdminDashboardData>>('/admin/dashboard');
//       // return response.data;
      
//       // Return mock data
//       return Promise.resolve({
//         data: {
//           apiUsage: adminDashboard.metrics[0],
//           errorRate: adminDashboard.errorRate,
//           systemUptime: adminDashboard.systemUptime,
//           currentVersion: adminDashboard.currentVersion,
//           recentAlerts: adminDashboard.recentAlerts
//         },
//         status: 200,
//         message: 'Admin dashboard data retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching admin dashboard data:', error);
//       throw error;
//     }
//   }
// };
