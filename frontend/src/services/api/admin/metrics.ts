import api from '../index';
import type { ApiResponse } from '../types';
import { adminSystemMetrics } from '../../../utils/admin/admin';

export interface SystemMetricsData {
  title: string;
  description: string;
  metrics: {
    title: string;
    type: string;
    value: string;
    graphConfig?: {
      dataPoints: { time: string; value: number }[];
      colors: string[];
      showLegend: boolean;
    };
    pieConfig?: {
      dataPoints: { label: string; value: string }[];
      colors: string[];
      showLegend: boolean;
    };
  }[];
}

export interface MetricsTimeRange {
  range: '24h' | '7d' | '30d' | 'custom';
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
}

export const metricsApi = {
  getSystemMetrics: async (timeRange: MetricsTimeRange = { range: '24h' }): Promise<ApiResponse<SystemMetricsData>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<SystemMetricsData>>('/admin/metrics', {
      //   params: timeRange
      // });
      // return response.data;
      
      // Return mock data
      return Promise.resolve({
        data: adminSystemMetrics,
        status: 200,
        message: 'System metrics retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      throw error;
    }
  },
  
  getServerStatus: async (): Promise<ApiResponse<{ status: 'online' | 'offline' | 'degraded'; issues: string[] }>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<{ status: string; issues: string[] }>>('/admin/metrics/server-status');
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          status: 'online',
          issues: []
        },
        status: 200,
        message: 'Server status retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching server status:', error);
      throw error;
    }
  }
};
