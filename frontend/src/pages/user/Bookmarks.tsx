import { useState, useEffect } from 'react'
import { bookmarks } from '../../utils/user/user'
import { Search, Clock, Music, Heart } from 'lucide-react'

// Define types that match the actual structure in bookmarks
interface TrackItem {
  title: string;
  artist: string;
  duration: string;
  dateAdded: string;
}

interface PlaylistItem {
  name: string;
  creator: string;
  tracks: number;
  duration: string;
}

const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check responsive behavior using resize listener
  useEffect(() => {
    const handleResize = () => {
      // Apply any responsive UI adjustments directly here if needed
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter bookmarks based on search query - updated to match the actual structure
  const filteredBookmarks = {
    tracks: bookmarks.savedTracks.tracks.filter(
      (track: TrackItem) => track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    playlists: bookmarks.savedPlaylists.playlists.filter(
      (playlist: PlaylistItem) => playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

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
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-themed/20 surface"
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

      {/* Display content based on active tab */}
      {activeTab === 'tracks' && (
        <div>
          {filteredBookmarks.tracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookmarks.tracks.map((track: TrackItem, index: number) => (
                <div key={index} className="surface rounded-lg shadow-themed-sm p-4 border border-themed/10 flex flex-col">
                  {/* Track content */}
                  <div className="mb-4">
                    <div className="font-semibold text-lg text-themed mb-1">{track.title}</div>
                    <div className="text-muted text-sm">{track.artist}</div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-themed/10">
                    <div className="flex items-center text-xs text-muted">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{track.duration}</span>
                    </div>
                    <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted text-lg">No bookmarked tracks found</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div>
          {filteredBookmarks.playlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookmarks.playlists.map((playlist: PlaylistItem, index: number) => (
                <div key={index} className="surface rounded-lg shadow-themed-sm p-4 border border-themed/10 flex flex-col">
                  {/* Playlist content - updated property names */}
                  <div className="mb-4">
                    <div className="font-semibold text-lg text-themed mb-1">{playlist.name}</div>
                    <div className="text-muted text-sm">{playlist.creator}</div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-themed/10">
                    <div className="flex items-center text-xs text-muted">
                      <Music className="h-3.5 w-3.5 mr-1" />
                      <span>{playlist.tracks} tracks</span>
                    </div>
                    <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted text-lg">No bookmarked playlists found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Bookmarks