import { useState, useEffect } from 'react'
import { dashboard } from '../../utils/user/user'
import { Pie, Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js'

// Register the required chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement, 
  Title
);

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Check initial screen size
    checkScreenSize();
    
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
    
    // Add resize event listener for responsive adjustments
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Check screen size for responsive adjustments
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Chart options with theme and device awareness
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'right' as const,
        align: isMobile ? 'center' as const : 'center' as const,
        labels: {
          boxWidth: isMobile ? 12 : 20,
          padding: isMobile ? 10 : 20,
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: { 
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 12 : 14
        }
      }
    }
  };

  // Fix chart options with proper type annotations
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          boxWidth: 15
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 12 : 14
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          display: !isMobile
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          // Fix the callback function signature with correct typing
          callback: function(this: any, tickValue: number | string): string {
            return String(tickValue);
          },
          font: {
            size: 11
          },
          maxTicksLimit: 8
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          display: false
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          font: {
            size: isMobile ? 9 : 11
          },
          maxTicksLimit: isMobile ? 4 : 6
        }
      }
    }
  };

  const barChartOptions = {
    ...lineChartOptions,
    scales: {
      ...lineChartOptions.scales,
      y: {
        ...lineChartOptions.scales.y,
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          font: {
            size: isMobile ? 9 : 11
          },
          maxTicksLimit: isMobile ? 5 : 8
        }
      }
    },
    barThickness: isMobile ? 20 : 30
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-4 sm:mb-8">Your Dashboard</h1>
      
      {/* Belt Section - Responsive grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-10">
        {dashboard.belt.map((item, idx) => (
          <div
            key={idx}
            className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 flex flex-col items-center text-center border border-themed/10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-themed-lg"
          >
            <span className="text-xs sm:text-sm text-muted mb-1">{item.title}</span>
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-themed truncate w-full">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
      {/* Responsive grid layout that changes based on screen size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Genre Distribution Chart */}
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">{dashboard.genre.title}</h3>
          <div className="h-48 sm:h-64 flex items-center justify-center">
            <Pie 
              data={dashboard.genre.chartData} 
              options={pieChartOptions}
            />
          </div>
          <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 px-2">
            {dashboard.genre.chartData.labels.map((label, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-2 sm:w-3 h-2 sm:h-3 rounded-full" 
                  style={{ backgroundColor: dashboard.genre.chartData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-[10px] sm:text-xs text-muted truncate">{label}: {dashboard.genre.chartData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Tracks - Scrollable on mobile */}
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">{dashboard.topTracks.title}</h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-themed/10">
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-left">#</th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-left">Track</th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-left">Artist</th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-right">Streams</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.topTracks.tracks.slice(0, isMobile ? 3 : 5).map((track, idx) => (
                  <tr key={idx} className="hover:bg-themed/5 transition-colors border-b border-themed/5">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">
                      <span className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
                        idx === 0 ? 'bg-yellow-500' : 
                        idx === 1 ? 'bg-gray-300' : 
                        idx === 2 ? 'bg-amber-700' : 
                        'bg-gray-100 dark:bg-gray-700'
                      } text-white text-[10px] sm:text-xs`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-themed font-medium text-xs sm:text-base truncate max-w-[100px] sm:max-w-none">
                      {track.title}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-muted text-xs sm:text-base truncate max-w-[80px] sm:max-w-none">
                      {track.artist}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-primary font-medium text-xs sm:text-base">
                      {track.streams}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <button className="text-primary text-xs sm:text-sm hover:underline flex items-center justify-center mx-auto">
              View all tracks
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Sales Trends - Full width on mobile */}
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 col-span-1 md:col-span-2 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">{dashboard.sales.title}</h3>
          <div className="h-56 sm:h-72">
            <Line 
              data={dashboard.sales.chartData} 
              options={lineChartOptions} 
            />
          </div>
        </div>
        
        {/* Demographics - Full width on mobile */}
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 col-span-1 md:col-span-2 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">{dashboard.demographics.title}</h3>
          <div className="h-56 sm:h-72">
            <Bar 
              data={dashboard.demographics.chartData} 
              options={barChartOptions} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard