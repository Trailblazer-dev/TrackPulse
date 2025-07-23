import {explore } from '../../utils/guest/guest'
import { Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

// Register the required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// Simple GenrePieChart component
const GenrePieChart = ({ data }) => {
  return <Pie data={data} />;
};

const Explore = () => {
  return (
    <div className="min-h-screen surface">
      
      {/* Explore Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Explore Music Analytics
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Dive deep into music trends, sales patterns, and industry insights with our comprehensive analytics dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Genre Distribution */}
            <div className="surface p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">{explore.genre.title}</h3>
              <div className="bg-gray-100 p-6 rounded-lg">
                <GenrePieChart data={explore.genre.chartData} />
                <div className="space-y-2 mt-4">
                  {explore.genre.chartData.labels.map((label, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-red-400' : 
                          index === 1 ? 'bg-blue-400' : 
                          index === 2 ? 'bg-yellow-400' : 'bg-teal-400'
                        }`}></div>
                        <span className="text-muted">{label}</span>
                      </div>
                      <span className="font-semibold text-primary">
                        {explore.genre.chartData.datasets[0].data[index]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Tracks */}
            <div className="surface p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">{explore.topTracks.title}</h3>
              <div className="bg-gray-100 p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full surface">
                <thead className="surface">
                  <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Track</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Streams</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {explore.topTracks.tracks.slice(0, 5).map((track, index) => (
                  <tr key={index} className="hover:bg-surface">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full">
                      {index + 1}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-primary">{track.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">{track.artist}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-blue-600">{track.streams}</td>
                  </tr>
                  ))}
                </tbody>
                </table>
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium">
                View All Tracks →
              </button>
              </div>
            </div>

            {/* Sales Trends */}
            <div className="surface p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">{explore.sales.title}</h3>
              <div className="bg-gray-100 p-2 rounded-lg">
              
              <div className="h-64">
              <Line 
              data={explore.sales.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                line: {
                  tension: 0.4 // This creates smooth curves (0 = straight lines, 1 = very curved)
                }
                },
                scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                  callback: (value) => `$${(Number(value) / 1000000).toFixed(1)}M`
                  }
                }
                }
              }}
              />
              </div>
              
              </div>
            </div>

            {/* Genre Trends */}
            <div className="surface p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">{explore.genreTrends.title}</h3>
              <div className="bg-gray-100 p-2 rounded-lg">
              <div className="h-64">
              <Line 
              data={explore.genreTrends.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                line: {
                  tension: 0.4 // This creates smooth curves (0 = straight lines, 1 = very curved)
                }
                },
                scales: {
                y: {
                beginAtZero: true,
                ticks: {
                callback: (value) => `${value}%`
                }
                }
                }
              }}
              />
              </div>
              <div className="flex flex-wrap gap-4 mt-4 px-4 pb-2">
              {explore.genreTrends.chartData.datasets.map((dataset, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: dataset.borderColor}}></div>
                <span className="text-sm text-gray-700 font-medium">{dataset.label}</span>
              </div>
              ))}
              </div>
              </div>
            </div>
          

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h3>
              <p className="text-blue-100 mb-6">
                Register now to access advanced analytics, custom reports, and real-time data insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </a>
                <a 
                  href="/about" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Explore