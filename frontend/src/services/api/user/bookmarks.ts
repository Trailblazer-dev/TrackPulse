import api from '../index';
import type { ApiResponse } from '../types';
import type { Track } from '../../../types/models';

export interface Bookmark {
  id: number;
  track: number;
  track_details: Track;
  created_at: string;
}

export interface BookmarkListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bookmark[];
}

export const bookmarksApi = {
  /**
   * Get all bookmarks for the current user
   */
  getBookmarks: async (page: number = 1): Promise<ApiResponse<BookmarkListResponse>> => {
    try {
      const response = await api.get<BookmarkListResponse>(`/users/bookmarks/?page=${page}`);
      return {
        data: response.data,
        status: response.status,
        message: 'Bookmarks retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  },

  /**
   * Bookmark a track
   */
  bookmarkTrack: async (trackId: number): Promise<ApiResponse<Bookmark>> => {
    try {
      const response = await api.post<Bookmark>('/users/bookmarks/', { track: trackId });
      return {
        data: response.data,
        status: response.status,
        message: 'Track bookmarked successfully'
      };
    } catch (error) {
      console.error('Error bookmarking track:', error);
      throw error;
    }
  },

  /**
   * Remove a bookmark by track ID
   */
  removeBookmark: async (trackId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete(`/users/bookmarks/tracks/${trackId}/`);
      return {
        data: response.data,
        status: response.status,
        message: 'Bookmark removed successfully'
      };
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }
};
