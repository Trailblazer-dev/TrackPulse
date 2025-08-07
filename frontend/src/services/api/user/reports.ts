// import api from '../index';
// import type { ApiResponse } from '../types';
// import { reports as mockReports } from '../../../utils/user/user';

// export interface Report {
//   id: string;
//   name: string;
//   date: string;
//   type: string;
//   status: string;
//   url?: string;
// }

// export interface ReportTemplate {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
// }

// export interface GenerateReportOptions {
//   templateId: string;
//   name: string;
//   dateRange: {
//     start: string;
//     end: string;
//   };
//   format: 'PDF' | 'CSV' | 'Excel' | 'JSON';
//   schedule?: {
//     frequency: 'One-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
//     day?: string; // For weekly
//     date?: number; // For monthly
//   };
// }

// export const reportsApi = {
//   getRecentReports: async (): Promise<ApiResponse<Report[]>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<Report[]>>('/user/reports/recent');
//       // return response.data;
      
//       // Return mock data
//       return Promise.resolve({
//         data: mockReports.recentReports.reports.map((report, index) => ({
//           id: `rec-${index + 1}`,
//           ...report
//         })),
//         status: 200,
//         message: 'Recent reports retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching recent reports:', error);
//       throw error;
//     }
//   },
  
//   getScheduledReports: async (): Promise<ApiResponse<Report[]>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<Report[]>>('/user/reports/scheduled');
//       // return response.data;
      
//       // Return mock data
//       return Promise.resolve({
//         data: mockReports.scheduledReports.reports.map((report, index) => ({
//           id: `sch-${index + 1}`,
//           ...report
//         })),
//         status: 200,
//         message: 'Scheduled reports retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching scheduled reports:', error);
//       throw error;
//     }
//   },
  
//   getReportTemplates: async (): Promise<ApiResponse<ReportTemplate[]>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<ReportTemplate[]>>('/user/reports/templates');
//       // return response.data;
      
//       // Return mock data
//       return Promise.resolve({
//         data: mockReports.reportTemplates.templates.map((template, index) => ({
//           id: `tmpl-${index + 1}`,
//           ...template
//         })),
//         status: 200,
//         message: 'Report templates retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching report templates:', error);
//       throw error;
//     }
//   },
  
//   generateReport: async (options: GenerateReportOptions): Promise<ApiResponse<Report>> => {
//     try {
//       // When API is ready:
//       // const response = await api.post<ApiResponse<Report>>('/user/reports/generate', options);
//       // return response.data;
      
//       // Return mock response
//       return Promise.resolve({
//         data: {
//           id: `gen-${Date.now()}`,
//           name: options.name,
//           date: new Date().toLocaleDateString(),
//           type: options.templateId,
//           status: 'Generated',
//           url: `/reports/download/${Date.now()}`
//         },
//         status: 200,
//         message: 'Report generated successfully'
//       });
//     } catch (error) {
//       console.error('Error generating report:', error);
//       throw error;
//     }
//   }
// };
