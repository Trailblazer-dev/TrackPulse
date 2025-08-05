import React from 'react'
import { bookmarks } from '../../utils/user/user'

const Bookmarks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-8">Bookmarks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Saved Tracks */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{bookmarks.savedTracks.title}</h3>
          <ul className="divide-y divide-themed/10">
            {bookmarks.savedTracks.tracks.map((track, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-themed">{track.title}</span>
                  <span className="ml-2 text-xs text-muted">{track.artist}</span>
                </div>
                <span className="text-xs text-muted">{track.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Saved Artists */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{bookmarks.savedArtists.title}</h3>
          <ul className="divide-y divide-themed/10">
            {bookmarks.savedArtists.artists.map((artist, idx) => (
              <li key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium text-themed">{artist.name}</span>
                  <span className="ml-2 text-xs text-muted">{artist.genre}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span className="text-xs text-muted">{artist.followers} followers</span>
                  <span className="text-xs text-muted">Last: {artist.lastRelease}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Saved Playlists */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{bookmarks.savedPlaylists.title}</h3>
          <ul className="divide-y divide-themed/10">
            {bookmarks.savedPlaylists.playlists.map((pl, idx) => (
              <li key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium text-themed">{pl.name}</span>
                  <span className="ml-2 text-xs text-muted">{pl.creator}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span className="text-xs text-muted">{pl.tracks} tracks</span>
                  <span className="text-xs text-muted">{pl.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Recently Viewed */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{bookmarks.recentlyViewed.title}</h3>
          <ul className="divide-y divide-themed/10">
            {bookmarks.recentlyViewed.items.map((item, idx) => (
              <li key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium text-themed">{item.name}</span>
                  <span className="ml-2 text-xs text-muted">{item.type}</span>
                  {item.artist && <span className="ml-2 text-xs text-muted">{item.artist}</span>}
                  {item.creator && <span className="ml-2 text-xs text-muted">{item.creator}</span>}
                </div>
                <span className="text-xs text-muted">{item.viewedOn}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Categories */}
      <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10 mt-8">
        <h3 className="text-xl font-semibold text-themed mb-4">{bookmarks.categories.title}</h3>
        <div className="flex flex-wrap gap-2">
          {bookmarks.categories.options.map((cat, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{cat}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bookmarks