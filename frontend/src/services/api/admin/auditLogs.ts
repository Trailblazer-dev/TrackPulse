import api from '../index';
import type { ApiResponse, PaginatedResponse, FilterParams } from '../types';
import { adminAuditLogs } from '../../../utils/admin/admin';

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  ipAddress: string;
  action: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  details: string;
}

export interface LogsFilters extends FilterParams {
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  actionType?: string;
  severity?: string;
  sortBy?: string;
}

export interface LogsVisualizationData {
  activityByTime: {
    type: string;
    title: string;
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
  };
  actionDistribution: {
    type: string;
    title: string;
    data: {
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    };
  };
}

export const auditLogsApi = {
  getLogs: async (
    filters: LogsFilters = {},
    pagination = { page: 1, limit: 10 }
  ): Promise<ApiResponse<PaginatedResponse<AuditLog>>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<PaginatedResponse<AuditLog>>>('/admin/audit-logs', {
      //   params: { ...pagination, ...filters }
      // });
      // return response.data;
      
      // Mock data
      const logsData = adminAuditLogs.table.data.map((log, index) => ({
        id: `log-${index + 1}`,
        ...log
      }));
      
      return Promise.resolve({
        data: {
          items: logsData,
          pagination: {
            currentPage: pagination.page,
            totalPages: Math.ceil(adminAuditLogs.pagination.totalRecords / pagination.limit),
            totalItems: adminAuditLogs.pagination.totalRecords,
            itemsPerPage: pagination.limit
          }
        },
        status: 200,
        message: 'Audit logs retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw error;
    }
  },
  
  getLogVisualizationData: async (filters: LogsFilters = {}): Promise<ApiResponse<LogsVisualizationData>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<LogsVisualizationData>>('/admin/audit-logs/visualizations', {
      //   params: filters
      // });
      // return response.data;
      
      // Mock visualization data
      return Promise.resolve({
        data: {
          activityByTime: {
            type: 'line',
            title: 'Activity Over Time',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Events',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }]
            }
          },
          actionDistribution: {
            type: 'pie',
            title: 'Actions by Type',
            data: {
              labels: ['Login', 'Logout', 'Create', 'Update', 'Delete'],
              datasets: [{
                data: [12, 19, 8, 15, 5],
                backgroundColor: [
                  '#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ef4444'
                ],
              }]
            }
          }
        },
        status: 200,
        message: 'Log visualizations retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching log visualization data:', error);
      throw error;
    }
  },
  
  exportLogs: async (
    format: 'CSV' | 'JSON' | 'PDF',
    filters: LogsFilters = {}
  ): Promise<ApiResponse<{ url: string }>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<{ url: string }>>('/admin/audit-logs/export', {
      //   params: { format, ...filters }
      // });
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          url: `/exports/audit-logs-${Date.now()}.${format.toLowerCase()}`
        },
        status: 200,
        message: 'Logs exported successfully'
      });
    } catch (error) {
      console.error('Error exporting logs:', error);
      throw error;
    }
  }
};
