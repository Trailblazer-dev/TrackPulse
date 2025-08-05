import React from 'react'
import { dashboard } from '../../utils/user/user'

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-8">User Dashboard</h1>
      {/* Belt Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {dashboard.belt.map((item, idx) => (
          <div
            key={idx}
            className="surface rounded-xl shadow-themed-md p-6 flex flex-col items-center text-center border border-themed/10"
          >
            <span className="text-sm text-muted mb-1">{item.title}</span>
            <span className="text-2xl font-bold text-themed">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Genre Distribution Chart */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{dashboard.genre.title}</h3>
          {/* Chart placeholder */}
          <div className="h-48 flex items-center justify-center text-muted">[Genre Pie Chart]</div>
        </div>
        {/* Top Tracks */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{dashboard.topTracks.title}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xs text-muted text-left">#</th>
                  <th className="px-4 py-2 text-xs text-muted text-left">Track</th>
                  <th className="px-4 py-2 text-xs text-muted text-left">Artist</th>
                  <th className="px-4 py-2 text-xs text-muted text-right">Streams</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.topTracks.tracks.map((track, idx) => (
                  <tr key={idx} className="hover:bg-themed/5 transition-colors">
                    <td className="px-4 py-2 text-primary font-bold">{idx + 1}</td>
                    <td className="px-4 py-2 text-themed">{track.title}</td>
                    <td className="px-4 py-2 text-muted">{track.artist}</td>
                    <td className="px-4 py-2 text-right text-primary">{track.streams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Sales Trends */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10 md:col-span-2">
          <h3 className="text-xl font-semibold text-themed mb-4">{dashboard.sales.title}</h3>
          <div className="h-56 flex items-center justify-center text-muted">[Sales Line Chart]</div>
        </div>
        {/* Demographics */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10 md:col-span-2">
          <h3 className="text-xl font-semibold text-themed mb-4">{dashboard.demographics.title}</h3>
          <div className="h-56 flex items-center justify-center text-muted">[Demographics Bar Chart]</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard