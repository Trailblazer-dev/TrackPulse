// import api from '../index';
// import type { ApiResponse } from '../types';
// import { adminReportBuilder } from '../../../utils/admin/admin';

// export interface ReportConfig {
//   name: string;
//   type: string;
//   dateRange: {
//     start: string;
//     end: string;
//   };
//   filters: {
//     status: string;
//     includeInactiveUsers: boolean;
//     granularity: string;
//     advancedFilters: {
//       field: string;
//       operator: string;
//       value: string;
//     }[];
//   };
//   exportFormat: string;
//   includeCharts: boolean;
//   schedule?: {
//     enabled: boolean;
//     frequency: string;
//     day?: string;
//     time?: string;
//     recipients: string[];
//     sendToAdmins: boolean;
//     saveToCloud: boolean;
//   };
// }

// export interface SavedReport {
//   id: string;
//   name: string;
//   type: string;
//   createdBy: string;
//   createdAt: string;
//   lastRun: string;
// }

// export interface GeneratedReport {
//   reportId: string;
//   reportUrl: string;
//   status: 'completed' | 'failed' | 'processing';
//   error?: string;
// }

// export const adminReportsApi = {
//   generateReport: async (reportConfig: ReportConfig): Promise<ApiResponse<GeneratedReport>> => {
//     try {
//       // When API is ready:
//       // const response = await api.post<ApiResponse<GeneratedReport>>('/admin/reports/generate', reportConfig);
//       // return response.data;
      
//       // Mock response
//       return Promise.resolve({
//         data: {
//           reportId: Date.now().toString(),
//           reportUrl: `/reports/admin/${Date.now()}`,
//           status: 'completed'
//         },
//         status: 200,
//         message: 'Report generated successfully'
//       });
//     } catch (error) {
//       console.error('Error generating report:', error);
//       throw error;
//     }
//   },
  
//   getSavedReports: async (): Promise<ApiResponse<SavedReport[]>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<SavedReport[]>>('/admin/reports/saved');
//       // return response.data;
      
//       // Mock response
//       return Promise.resolve({
//         data: adminReportBuilder.savedReports,
//         status: 200,
//         message: 'Saved reports retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching saved reports:', error);
//       throw error;
//     }
//   },
  
//   saveReportTemplate: async (config: ReportConfig): Promise<ApiResponse<SavedReport>> => {
//     try {
//       // When API is ready:
//       // const response = await api.post<ApiResponse<SavedReport>>('/admin/reports/templates', config);
//       // return response.data;
      
//       // Mock response
//       return Promise.resolve({
//         data: {
//           id: Date.now().toString(),
//           name: config.name,
//           type: config.type,
//           createdBy: 'admin@example.com',
//           createdAt: new Date().toLocaleDateString(),
//           lastRun: 'Never'
//         },
//         status: 200,
//         message: 'Report template saved successfully'
//       });
//     } catch (error) {
//       console.error('Error saving report template:', error);
//       throw error;
//     }
//   },
  
//   deleteReport: async (reportId: string): Promise<ApiResponse<null>> => {
//     try {
//       // When API is ready:
//       // const response = await api.delete<ApiResponse<null>>(`/admin/reports/${reportId}`);
//       // return response.data;
      
//       // Mock response
//       return Promise.resolve({
//         data: null,
//         status: 200,
//         message: 'Report deleted successfully'
//       });
//     } catch (error) {
//       console.error(`Error deleting report with ID ${reportId}:`, error);
//       throw error;
//     }
//   }
// };
