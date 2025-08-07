// import api from '../index';
// import type { ApiResponse } from '../types';
// import { bookmarks as mockBookmarks } from '../../../utils/user/user';

// export interface Track {
//   id: string;
//   title: string;
//   artist: string;
//   dateAdded: string;
//   duration: string;
// }

// export interface Artist {
//   id: string;
//   name: string;
//   genre: string;
//   followers: string;
//   lastRelease: string;
// }

// export interface Playlist {
//   id: string;
//   name: string;
//   creator: string;
//   tracks: number;
//   duration: string;
// }

// export interface RecentlyViewedItem {
//   id: string;
//   type: string;
//   name: string;
//   artist?: string;
//   creator?: string;
//   viewedOn: string;
// }

// export interface BookmarksData {
//   savedTracks: Track[];
//   followedArtists: Artist[];
//   savedPlaylists: Playlist[];
//   recentlyViewed: RecentlyViewedItem[];
// }

// export const bookmarksApi = {
//   getBookmarks: async (): Promise<ApiResponse<BookmarksData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<BookmarksData>>('/user/bookmarks');
//       // return response.data;
      
//       // Return mock data
//       return Promise.resolve({
//         data: {
//           savedTracks: mockBookmarks.savedTracks.tracks.map((track, index) => ({
//             id: `track-${index + 1}`,
//             ...track
//           })),
//           followedArtists: mockBookmarks.savedArtists.artists.map((artist, index) => ({
//             id: `artist-${index + 1}`,
//             ...artist
//           })),
//           savedPlaylists: mockBookmarks.savedPlaylists.playlists.map((playlist, index) => ({
//             id: `playlist-${index + 1}`,
//             ...playlist
//           })),
//           recentlyViewed: mockBookmarks.recentlyViewed.items.map((item, index) => ({
//             id: `recent-${index + 1}`,
//             ...item
//           }))
//         },
//         status: 200,
//         message: 'Bookmarks retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching bookmarks:', error);
//       throw error;
//     }
//   },
  
//   addTrackBookmark: async (trackId: string): Promise<ApiResponse<Track>> => {
//     try {
//       // When API is ready:
//       // const response = await api.post<ApiResponse<Track>>('/user/bookmarks/tracks', { trackId });
//       // return response.data;
      
//       // Return mock response
//       return Promise.resolve({
//         data: {
//           id: trackId,
//           title: 'New Bookmarked Track',
//           artist: 'Sample Artist',
//           dateAdded: new Date().toLocaleDateString(),
//           duration: '3:45'
//         },
//         status: 200,
//         message: 'Track bookmarked successfully'
//       });
//     } catch (error) {
//       console.error('Error adding track bookmark:', error);
//       throw error;
//     }
//   },
  
//   removeTrackBookmark: async (trackId: string): Promise<ApiResponse<null>> => {
//     try {
//       // When API is ready:
//       // const response = await api.delete<ApiResponse<null>>(`/user/bookmarks/tracks/${trackId}`);
//       // return response.data;
      
//       // Return mock response
//       return Promise.resolve({
//         data: null,
//         status: 200,
//         message: 'Track bookmark removed successfully'
//       });
//     } catch (error) {
//       console.error('Error removing track bookmark:', error);
//       throw error;
//     }
//   }
// };
