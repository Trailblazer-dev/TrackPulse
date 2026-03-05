import api from '../index';
import type { ApiResponse } from '../types';
import type { Artist, Album, Track } from '../../../types/models';

export interface ExploreData {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export const exploreApi = {
  getExploreData: async (query?: string): Promise<ApiResponse<ExploreData>> => {
    try {
      const url = query ? `/guest/explore/?q=${encodeURIComponent(query)}` : '/guest/explore/';
      const response = await api.get<ExploreData>(url);
      return {
        data: response.data,
        status: response.status,
        message: 'Explore data retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching explore data:', error);
      throw error;
    }
  },
};
