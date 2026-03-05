import { useState, useEffect, useCallback } from 'react'
import { bookmarksApi } from '../../services/api/user/bookmarks'
import type { Bookmark } from '../../services/api/user/bookmarks'
import { Search, Clock, Music, Heart, Loader2 } from 'lucide-react'

const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedTracks, setBookmarkedTracks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await bookmarksApi.getBookmarks();
      setBookmarkedTracks(response.data.results);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Failed to load bookmarks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemoveBookmark = async (trackId: number) => {
    try {
      await bookmarksApi.removeBookmark(trackId);
      // Update local state to remove the bookmark
      setBookmarkedTracks(prev => prev.filter(b => b.track !== trackId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark.');
    }
  };

  // Filter bookmarks based on search query
  const filteredTracks = bookmarkedTracks.filter(
    (bookmark) => 
      (bookmark.track_details.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
      (bookmark.track_details.album?.artist?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-6">Your Bookmarks</h1>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search your bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-themed/20 bg-surface text-themed"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="mb-6 border-b border-themed/10">
        <div className="flex space-x-8">
          <button
            className={`pb-3 px-1 border-b-2 font-medium ${
              activeTab === 'tracks'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-themed'
            }`}
            onClick={() => setActiveTab('tracks')}
          >
            <div className="flex items-center">
              <Music className="h-4 w-4 mr-2" />
              Tracks
            </div>
          </button>
          <button
            className={`pb-3 px-1 border-b-2 font-medium ${
              activeTab === 'playlists'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-themed'
            }`}
            onClick={() => setActiveTab('playlists')}
          >
            <div className="flex items-center">
              <Music className="h-4 w-4 mr-2" />
              Playlists
            </div>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      {/* Display content based on active tab */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-muted">Loading your bookmarks...</p>
        </div>
      ) : (
        <>
          {activeTab === 'tracks' && (
            <div>
              {filteredTracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTracks.map((bookmark) => (
                    <div key={bookmark.id} className="surface rounded-lg shadow-themed-sm p-4 border border-themed/10 flex flex-col hover:shadow-themed-md transition-shadow">
                      <div className="mb-4">
                        <div className="font-semibold text-lg text-themed mb-1 truncate" title={bookmark.track_details.name}>
                          {bookmark.track_details.name}
                        </div>
                        <div className="text-muted text-sm truncate">
                          {bookmark.track_details.album?.artist?.name || 'Unknown Artist'}
                        </div>
                        <div className="text-muted text-xs mt-1 truncate italic">
                          {bookmark.track_details.album?.title}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-themed/10">
                        <div className="flex items-center text-xs text-muted">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{Math.floor(bookmark.track_details.duration_seconds / 60)}:{(bookmark.track_details.duration_seconds % 60).toFixed(0).padStart(2, '0')}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveBookmark(bookmark.track)}
                          className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1"
                          title="Remove bookmark"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-accent/30 rounded-xl border border-dashed border-themed/20">
                  <Heart className="h-12 w-12 text-muted mx-auto mb-4 opacity-20" />
                  <p className="text-muted text-lg">No bookmarked tracks found</p>
                  {searchQuery && <p className="text-sm text-muted mt-2">Try a different search query</p>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div className="text-center py-20 bg-accent/30 rounded-xl border border-dashed border-themed/20">
              <Music className="h-12 w-12 text-muted mx-auto mb-4 opacity-20" />
              <p className="text-muted text-lg">No bookmarked playlists found</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Bookmarks