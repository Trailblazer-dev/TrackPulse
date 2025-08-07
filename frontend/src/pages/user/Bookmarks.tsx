import React, { useState, useEffect } from 'react'
import { bookmarks } from '../../utils/user/user'

const Bookmarks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Debounced resize handler for better performance
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Function to filter items based on category and search query
  const filterItems = (items: any[], type: string) => {
    if (!items) return [];
    
    return items.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && activeCategory.toLowerCase() !== type.toLowerCase()) {
        return false;
      }
      
      // Search filter - search across all properties
      if (searchQuery) {
        const searchStr = searchQuery.toLowerCase();
        return Object.values(item).some(
          value => typeof value === 'string' && value.toLowerCase().includes(searchStr)
        );
      }
      
      return true;
    });
  };

  // Get filtered items for each section
  const filteredTracks = filterItems(bookmarks.savedTracks?.tracks || [], 'tracks');
  const filteredArtists = filterItems(bookmarks.savedArtists?.artists || [], 'artists');
  const filteredPlaylists = filterItems(bookmarks.savedPlaylists?.playlists || [], 'playlists');
  const filteredRecentItems = filterItems(bookmarks.recentlyViewed?.items || [], 'recent');

  return (
    <div className="w-full max-w-full px-0 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-themed">Bookmarks</h1>
        
        {/* Search and filter controls - responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-lg border border-themed/20 surface text-themed w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Horizontally scrollable category filter buttons */}
          <div className="overflow-x-auto w-full -mx-1 px-1 pb-1 sm:pb-0 sm:w-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === 'all' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {bookmarks.categories?.options.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeCategory === category 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Show proper message when no items match filters */}
      {filteredTracks.length === 0 && filteredArtists.length === 0 && 
       filteredPlaylists.length === 0 && filteredRecentItems.length === 0 && (
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-6 sm:p-12 border border-themed/10 text-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted opacity-50 mb-3 sm:mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          <h3 className="text-lg sm:text-xl font-medium text-themed mb-2">No bookmarks found</h3>
          <p className="text-muted text-sm">
            {searchQuery ? `No items match your search "${searchQuery}"` : 
             `You don't have any ${activeCategory !== 'all' ? activeCategory.toLowerCase() : 'bookmarks'} saved yet`}
          </p>
          <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Browse Content
          </button>
        </div>
      )}

      {/* Responsive grid for bookmark sections */}
      {(filteredTracks.length > 0 || filteredArtists.length > 0 || 
        filteredPlaylists.length > 0 || filteredRecentItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Saved Tracks */}
          {(activeCategory === 'all' || activeCategory === 'Tracks') && filteredTracks.length > 0 && (
            <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 border border-themed/10 w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-themed">Saved Tracks</h2>
                <button className="text-xs sm:text-sm text-primary hover:underline">View all</button>
              </div>
              <ul className="divide-y divide-themed/10">
                {filteredTracks.map((track, idx) => (
                  <li key={idx} className="py-2 sm:py-3 hover:bg-themed/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                          <div className="font-medium text-themed text-sm sm:text-base truncate">{track.title}</div>
                          <div className="text-[10px] sm:text-xs text-muted truncate">{track.artist} • {track.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Artists - Responsive layout */}
          {(activeCategory === 'all' || activeCategory === 'Artists') && filteredArtists.length > 0 && (
            <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 border border-themed/10 w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-themed">Followed Artists</h2>
                <button className="text-xs sm:text-sm text-primary hover:underline">View all</button>
              </div>
              <ul className="divide-y divide-themed/10">
                {filteredArtists.map((artist, idx) => (
                  <li key={idx} className="py-2 sm:py-3 hover:bg-themed/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {artist.name.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                          <div className="font-medium text-themed text-sm sm:text-base truncate">{artist.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted truncate">{artist.genre} • {artist.followers}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <div className="text-[10px] sm:text-xs font-medium text-green-600 dark:text-green-400">New release</div>
                        <div className="text-[10px] sm:text-xs text-muted">{artist.lastRelease}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Playlists - Responsive layout */}
          {(activeCategory === 'all' || activeCategory === 'Playlists') && filteredPlaylists.length > 0 && (
            <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 border border-themed/10 w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-themed">Saved Playlists</h2>
                <button className="text-xs sm:text-sm text-primary hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {filteredPlaylists.map((playlist, idx) => (
                  <div key={idx} className="border border-themed/10 rounded-lg p-3 hover:bg-themed/5 transition-all hover:shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded flex items-center justify-center text-white flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                          <div className="font-medium text-themed text-sm sm:text-base truncate">{playlist.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted truncate">By {playlist.creator}</div>
                        </div>
                      </div>
                      <div className="text-right text-[10px] sm:text-xs text-muted ml-2">
                        <div>{playlist.tracks} tracks</div>
                        <div>{playlist.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Items - Responsive grid layout */}
          {(activeCategory === 'all' || activeCategory === 'recent') && filteredRecentItems.length > 0 && (
            <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 border border-themed/10 w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-themed">Recently Viewed</h2>
                <button className="text-xs sm:text-sm text-primary hover:underline">Clear history</button>
              </div>
              <div className="divide-y divide-themed/10">
                {filteredRecentItems.map((item, idx) => (
                  <div key={idx} className="py-2 sm:py-3 hover:bg-themed/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-white flex-shrink-0 ${
                          item.type === 'Track' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 
                          item.type === 'Artist' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 
                          item.type === 'Album' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                          'bg-gradient-to-br from-green-500 to-teal-600'
                        }`}>
                          {item.type === 'Track' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                          )}
                          {item.type === 'Artist' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                          {item.type === 'Album' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                              <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                            </svg>
                          )}
                          {item.type === 'Playlist' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                          <div className="font-medium text-themed text-sm sm:text-base truncate">{item.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted flex items-center space-x-1">
                            <span className="px-1.5 py-0.5 rounded-full bg-themed/10 text-muted text-[10px]">
                              {item.type}
                            </span>
                            {item.artist && <span>• {item.artist}</span>}
                            {item.creator && <span>• {item.creator}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted ml-2">
                        {item.viewedOn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Bookmarks