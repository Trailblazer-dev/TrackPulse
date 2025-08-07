// import api from '../index';
// import type { ApiResponse } from '../types';
// import { dashboard as mockDashboard } from '../../../utils/user/user';

// export interface DashboardData {
//   stats: {
//     title: string;
//     value: string;
//   }[];
//   genreDistribution: {
//     title: string;
//     chartData: {
//       labels: string[];
//       datasets: {
//         data: number[];
//         backgroundColor: string[];
//       }[];
//     };
//   };
//   topTracks: {
//     title: string;
//     tracks: {
//       title: string;
//       artist: string;
//       streams: string;
//     }[];
//   };
//   salesTrend: {
//     title: string;
//     chartData: {
//       labels: string[];
//       datasets: {
//         label: string;
//         data: number[];
//         fill: boolean;
//         borderColor: string;
//       }[];
//     };
//   };
//   demographics: {
//     title: string;
//     chartData: {
//       labels: string[];
//       datasets: {
//         label: string;
//         data: number[];
//         backgroundColor: string;
//       }[];
//     };
//   };
// }

// export const dashboardApi = {
//   getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<DashboardData>>('/user/dashboard');
//       // return response.data;
      
//       // Return mock data for now
//       return Promise.resolve({
//         data: {
//           stats: mockDashboard.belt,
//           genreDistribution: mockDashboard.genre,
//           topTracks: mockDashboard.topTracks,
//           salesTrend: mockDashboard.sales,
//           demographics: mockDashboard.demographics
//         },
//         status: 200,
//         message: 'Dashboard data retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       throw error;
//     }
//   }
// };
