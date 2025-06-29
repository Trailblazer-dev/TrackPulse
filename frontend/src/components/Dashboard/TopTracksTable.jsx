const TopTracksTable = ({ tracks }) => {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tracks data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr key={track.track_id}>
              <td>
                <span className="badge badge-primary">#{index + 1}</span>
              </td>
              <td>
                <div className="font-medium text-gray-900">{track.name}</div>
                {track.composer && (
                  <div className="text-sm text-gray-500">
                    Composer: {track.composer}
                  </div>
                )}
              </td>
              <td className="text-gray-700">
                {track.album?.artist?.name || 'Unknown Artist'}
              </td>
              <td className="text-gray-700">
                {track.album?.title || 'Unknown Album'}
              </td>
              <td>
                <span className="badge badge-secondary">
                  {track.genre?.name || 'Unknown'}
                </span>
              </td>
              <td className="font-medium text-gray-900">
                ${track.unit_price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTracksTable;
