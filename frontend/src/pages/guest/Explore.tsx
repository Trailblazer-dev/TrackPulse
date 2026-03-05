import { Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { useEffect, useState, useCallback } from 'react'
import { exploreApi } from '../../services/api/guest/explore'
import type { ExploreData } from '../../services/api/guest/explore'
import { explore } from '../../utils/guest/guest'
import { Search } from 'lucide-react'

// Register the required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// Simple GenrePieChart component
const GenrePieChart = ({ data }: { data: any }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const options = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  };

  return <Pie data={data} options={options} />;
};

const Explore = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [exploreData, setExploreData] = useState<ExploreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchExploreData = useCallback(async (query?: string) => {
    try {
      setLoading(true);
      const response = await exploreApi.getExploreData(query);
      setExploreData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch explore data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Create MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });

    fetchExploreData();
    
    // Clean up
    return () => observer.disconnect();
  }, [fetchExploreData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchExploreData(searchQuery);
  };

  // Prepare chart options with theme awareness
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          callback: (value: number | string) => `${value}%`
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
        }
      }
    }
  };

  const salesChartOptions = {
    ...lineChartOptions,
    scales: {
      ...lineChartOptions.scales,
      y: {
        ...lineChartOptions.scales.y,
        beginAtZero: false,
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          callback: (value: number | string) => `$${(Number(value) / 1000000).toFixed(1)}M`
        }
      }
    }
  };

  const genreLabels = exploreData?.tracks.reduce((acc: string[], track: any) => {
    if (track.genre && !acc.includes(track.genre.name)) {
      acc.push(track.genre.name);
    }
    return acc;
  }, []) || [];

  const genreCounts = exploreData?.tracks.reduce((acc: any, track: any) => {
    if (track.genre) {
      acc[track.genre.name] = (acc[track.genre.name] || 0) + 1;
    }
    return acc;
  }, {}) || {};

  const genreChartData = {
    labels: genreLabels,
    datasets: [
      {
        data: genreLabels.map(label => genreCounts[label]),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  if (loading && !exploreData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      
      {/* Explore Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-themed mb-6 transition-colors">
              Explore Music Analytics
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-10 transition-colors">
              Dive deep into music trends, sales patterns, and industry insights with our comprehensive analytics dashboard.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search artists, albums, or tracks..."
                className="w-full px-6 py-4 pr-12 rounded-full border border-themed/20 bg-surface text-themed focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-primary transition-colors"
              >
                <Search size={24} />
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Genre Distribution */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">Genre Distribution</h3>
                <div className="bg-accent surface-accent rounded-lg p-4 md:p-6 border border-themed/5">
                  {genreLabels.length > 0 ? (
                    <>
                      <GenrePieChart data={genreChartData} />
                      <div className="space-y-3 mt-6">
                        {genreChartData.labels.map((label, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full`} style={{
                                backgroundColor: genreChartData.datasets[0].backgroundColor[index % 6]
                              }}></div>
                              <span className="text-muted transition-colors">{label}</span>
                            </div>
                            <span className="font-semibold text-themed transition-colors">
                              {genreChartData.datasets[0].data[index]} tracks
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10 text-muted italic">No genre data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Tracks */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">Top Tracks</h3>
                <div className="bg-accent surface-accent rounded-lg p-4 md:p-6 border border-themed/5">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-themed/10">
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider transition-colors">Rank</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider transition-colors">Track</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider transition-colors">Artist</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider transition-colors">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-themed/10">
                        {exploreData?.tracks && exploreData.tracks.length > 0 ? (
                          exploreData.tracks.slice(0, 5).map((track, index) => (
                            <tr key={index} className="hover:bg-themed/5 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600 text-white text-sm font-bold rounded-full shadow-md">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium text-themed transition-colors truncate max-w-[150px]">{track.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-muted transition-colors truncate max-w-[120px]">{track.album?.artist?.name || 'Unknown'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-primary transition-colors">${track.unit_price}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-muted italic">No tracks found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {exploreData?.tracks && exploreData.tracks.length > 5 && (
                    <button className="w-full mt-4 text-primary hover:text-primary-hover font-medium transition-colors flex items-center justify-center space-x-1">
                      <span>View All Tracks</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Artists Section */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">Top Artists</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {exploreData?.artists && exploreData.artists.length > 0 ? (
                    exploreData.artists.slice(0, 6).map((artist: any, index: number) => (
                      <div key={index} className="bg-accent surface-accent rounded-lg p-4 text-center border border-themed/5 hover:border-primary/30 transition-all group relative">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary font-bold transition-transform group-hover:scale-110">
                          {artist.name.charAt(0)}
                        </div>
                        <p className="text-themed font-medium truncate text-sm">{artist.name}</p>
                        <div className="mt-2 flex justify-center space-x-2 text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>{artist.album_count} Albums</span>
                          <span>•</span>
                          <span>{artist.track_count} Tracks</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-10 text-center text-muted italic">No artists found</div>
                  )}
                </div>
              </div>
            </div>

            {/* Sales Trends (Using Mock Data) */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">{explore.sales.title}</h3>
                <div className="bg-accent surface-accent rounded-lg p-4 md:p-6 border border-themed/5">
                  <div className="h-64 md:h-72">
                    <Line 
                      data={explore.sales.chartData}
                      options={salesChartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Genre Trends (Using Mock Data) */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">{explore.genreTrends.title}</h3>
                <div className="bg-accent surface-accent rounded-lg p-4 md:p-6 border border-themed/5">
                  <div className="h-64 md:h-72">
                    <Line 
                      data={explore.genreTrends.chartData}
                      options={lineChartOptions}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6 px-2">
                    {explore.genreTrends.chartData.datasets.map((dataset, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: dataset.borderColor}}></div>
                        <span className="text-sm text-muted font-medium transition-colors">{dataset.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="cta-section rounded-xl p-8 md:p-10 shadow-lg relative overflow-hidden">
              {/* Background gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/2"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Dive Deeper?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  Register now to access advanced analytics, custom reports, and real-time data insights tailored to your musical journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/register" 
                    className="cta-sphere-button bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Get Started Free
                  </a>
                  <a 
                    href="/about" 
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
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

export default Explore;
