import api from '../index';
import type { ApiResponse } from '../types';

// Types for explore page
export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface ExploreFilters {
  category?: string;
  featured?: boolean;
  search?: string;
}

export const exploreApi = {
  getExploreItems: async (filters: ExploreFilters = {}): Promise<ApiResponse<ExploreItem[]>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<ExploreItem[]>>('/explore', { params: filters });
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: [
          { 
            id: '1', 
            title: 'Track Analytics', 
            description: 'Monitor your music performance across platforms',
            image: '/images/analytics.jpg',
            category: 'Analytics',
            featured: true
          },
          { 
            id: '2', 
            title: 'Distribution Services', 
            description: 'Distribute your music to major streaming platforms',
            image: '/images/distribution.jpg',
            category: 'Distribution',
            featured: false
          },
          { 
            id: '3', 
            title: 'Royalty Management', 
            description: 'Track and collect your royalties effortlessly',
            image: '/images/royalties.jpg',
            category: 'Finance',
            featured: true
          },
        ],
        status: 200,
        message: 'Explore items retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching explore items:', error);
      throw error;
    }
  }
};
