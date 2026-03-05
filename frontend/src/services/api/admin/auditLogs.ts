import api from '../index';
import type { ApiResponse } from '../types';

export interface AuditLog {
  id: number;
  user: string;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: any;
  ip_address: string;
  timestamp: string;
}

export interface AuditLogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AuditLog[];
}

export interface AuditVisualizations {
  daily_activity: { day: string; count: number }[];
  by_resource: { resource_type: string; count: number }[];
  by_action: { action: string; count: number }[];
}

export const auditLogsApi = {
  getAuditLogs: async (params?: { 
    page?: number; 
    action?: string; 
    resource_type?: string;
    ordering?: string;
  }): Promise<ApiResponse<AuditLogListResponse>> => {
    try {
      const response = await api.get<AuditLogListResponse>('/admin/audit-logs/', { params });
      return {
        data: response.data,
        status: response.status,
        message: 'Audit logs retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw error;
    }
  },

  getVisualizations: async (): Promise<ApiResponse<AuditVisualizations>> => {
    try {
      const response = await api.get<AuditVisualizations>('/admin/audit-logs/visualizations/');
      return {
        data: response.data,
        status: response.status,
        message: 'Visualizations data retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching audit visualizations:', error);
      throw error;
    }
  },

  exportLogs: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get('/admin/audit-logs/export/');
      return {
        data: response.data,
        status: response.status,
        message: 'Audit logs export started'
      };
    } catch (error) {
      console.error('Error exporting audit logs:', error);
      throw error;
    }
  }
};
