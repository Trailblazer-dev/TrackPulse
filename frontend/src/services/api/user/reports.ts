import api from '../index';
import type { ApiResponse } from '../types';

export interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
}

export interface GeneratedReport {
  id: number;
  name: string;
  report_type: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'SCHEDULED';
  template: number | null;
  template_name: string;
  file_path: string | null;
  parameters: any;
  created_at: string;
  updated_at: string;
  scheduled_for: string | null;
}

export const reportsApi = {
  getTemplates: async (): Promise<ApiResponse<ReportTemplate[]>> => {
    try {
      const response = await api.get<any>('/user/reports/templates/');
      // Handle potential pagination
      const data = response.data.results || response.data;
      return {
        data: data,
        status: response.status,
        message: 'Templates retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching report templates:', error);
      throw error;
    }
  },

  getRecentReports: async (): Promise<ApiResponse<GeneratedReport[]>> => {
    try {
      const response = await api.get<GeneratedReport[]>('/user/reports/recent/');
      return {
        data: response.data,
        status: response.status,
        message: 'Recent reports retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching recent reports:', error);
      throw error;
    }
  },

  getScheduledReports: async (): Promise<ApiResponse<GeneratedReport[]>> => {
    try {
      const response = await api.get<GeneratedReport[]>('/user/reports/scheduled/');
      return {
        data: response.data,
        status: response.status,
        message: 'Scheduled reports retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching scheduled reports:', error);
      throw error;
    }
  },

  generateReport: async (reportData: {
    name: string;
    report_type: string;
    template?: number;
    parameters?: any;
  }): Promise<ApiResponse<GeneratedReport>> => {
    try {
      const response = await api.post<GeneratedReport>('/user/reports/generate/', reportData);
      return {
        data: response.data,
        status: response.status,
        message: 'Report generation started'
      };
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
};
