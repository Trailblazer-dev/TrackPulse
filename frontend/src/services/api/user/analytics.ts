import api from '../index';
import type { ApiResponse } from '../types';
import { analytics as mockAnalytics } from '../../../utils/user/user';

export interface AnalyticsFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  platform?: string;
  region?: string;
}

export interface AnalyticsData {
  performance: {
    title: string;
    chartData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
  };
  geographicDistribution: {
    title: string;
    chartData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
  };
  platformUsage: {
    title: string;
    chartData: {
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    };
  };
  revenueBySource: {
    title: string;
    chartData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
  };
  audienceGrowth: {
    title: string;
    chartData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
        tension: number;
      }[];
    };
  };
}

export const analyticsApi = {
  getAnalyticsData: async (filters: AnalyticsFilters = {}): Promise<ApiResponse<AnalyticsData>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<AnalyticsData>>('/user/analytics', { params: filters });
      // return response.data;
      
      // Return mock data for now
      return Promise.resolve({
        data: {
          performance: mockAnalytics.performance,
          geographicDistribution: mockAnalytics.geographicDistribution,
          platformUsage: mockAnalytics.platformUsage,
          revenueBySource: mockAnalytics.revenueBySource,
          audienceGrowth: mockAnalytics.audienceGrowth
        },
        status: 200,
        message: 'Analytics data retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  }
};
