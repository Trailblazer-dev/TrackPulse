import { useState, useEffect } from 'react'
import { adminDashboard } from '../../utils/admin/admin'
import { Line, Pie } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Filler 
} from 'chart.js'

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
  Title,
  Filler
);

const AdminDashboard = () => {
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
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
        borderWidth: isMobile ? 2 : 3
      },
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 3 : 5
      }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: { 
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12 
          }
        }
      },
      tooltip: {
        mode: 'index' as const, // Fixed tooltip mode type
        intersect: false,
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
          font: {
            size: isMobile ? 9 : 11
          },
          maxTicksLimit: isMobile ? 5 : 8
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
          maxTicksLimit: isMobile ? 4 : 7
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: isMobile ? 12 : 15,
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

  // API Usage chart data
  const apiUsageData = {
    labels: adminDashboard.metrics[0].graphConfig.dataPoints.map(point => point.date.slice(-2)),
    datasets: [
      {
        label: 'API Requests',
        data: adminDashboard.metrics[0].graphConfig.dataPoints.map(point => point.value),
        fill: true,
        backgroundColor: isDarkMode 
          ? 'rgba(79, 70, 229, 0.2)' 
          : 'rgba(79, 70, 229, 0.1)',
        borderColor: adminDashboard.metrics[0].graphConfig.colors[0],
        tension: 0.4
      }
    ]
  };

  // Error Rate pie chart data
  const errorRateData = {
    labels: adminDashboard.errorRate.pieConfig.data.map(item => item.label),
    datasets: [
      {
        data: adminDashboard.errorRate.pieConfig.data.map(item => item.value),
        backgroundColor: adminDashboard.errorRate.pieConfig.colors,
        borderWidth: 1,
        borderColor: isDarkMode 
          ? 'rgba(30, 41, 59, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)'
      }
    ]
  };

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-themed">Admin Dashboard</h1>
        
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Last 24 Hours
          </button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200">
            Week
          </button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200">
            Month
          </button>
        </div>
      </div>
      
      {/* Top stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">{adminDashboard.metrics[0].title}</p>
              <h3 className="text-xl font-semibold text-themed">{adminDashboard.metrics[0].value}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-2">
            +12.5% from last week
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">{adminDashboard.errorRate.title}</p>
              <h3 className="text-xl font-semibold text-themed">{adminDashboard.errorRate.value}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-red-600 dark:text-red-400 font-medium mt-2">
            +0.8% from last week
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">{adminDashboard.systemUptime.title}</p>
              <h3 className="text-xl font-semibold text-themed">{adminDashboard.systemUptime.value}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-2">
            Stable for 30 days
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">{adminDashboard.currentVersion.title}</p>
              <h3 className="text-xl font-semibold text-themed">{adminDashboard.currentVersion.value}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-2">
            <a href="#" className="flex items-center">
              Check for updates
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* API Usage Chart - Takes 2 columns on larger screens */}
        <div className="surface rounded-lg shadow-themed-md border border-themed/10 p-4 lg:col-span-2">
          <h3 className="text-base font-semibold text-themed mb-4">
            {adminDashboard.metrics[0].title}
          </h3>
          <div className="h-60 sm:h-72">
            <Line data={apiUsageData} options={lineChartOptions} />
          </div>
        </div>
        
        {/* Error Rate Pie Chart */}
        <div className="surface rounded-lg shadow-themed-md border border-themed/10 p-4">
          <h3 className="text-base font-semibold text-themed mb-4">
            {adminDashboard.errorRate.title}
          </h3>
          <div className="h-60 sm:h-72 flex items-center">
            <Pie data={errorRateData} options={pieChartOptions} />
          </div>
        </div>
      </div>
      
      {/* Recent Alerts/Logs Table */}
      <div className="surface rounded-lg shadow-themed-md border border-themed/10 p-4">
        <h3 className="text-base font-semibold text-themed mb-4">
          {adminDashboard.recentAlerts.title}
        </h3>
        <div className="overflow-x-auto -mx-4 px-4 pb-1">
          <table className="min-w-full">
            <thead>
              <tr className="bg-themed/5">
                {adminDashboard.recentAlerts.columns.map((column, idx) => (
                  <th key={idx} className="px-3 py-3 text-left text-xs font-medium text-muted">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-themed/10">
              {adminDashboard.recentAlerts.data.map((alert, idx) => (
                <tr key={idx} className="hover:bg-themed/5">
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-themed">
                    {alert.timestamp}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      alert.level === 'Error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                      alert.level === 'Warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {alert.level}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-themed">
                    {alert.message}
                  </td>
                  <td className="px-3 py-3 text-xs text-muted">
                    {alert.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted">
            Showing {adminDashboard.recentAlerts.data.length} of {adminDashboard.recentAlerts.data.length} alerts
          </div>
          <a href="#" className="text-xs text-primary hover:text-primary-hover flex items-center">
            View all logs
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <a href="/admin/users" className="surface rounded-lg shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-200 group">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-themed group-hover:text-primary transition-colors">User Management</h3>
              <p className="text-xs text-muted">Manage system users</p>
            </div>
          </div>
        </a>
        
        <a href="/admin/metrics" className="surface rounded-lg shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-200 group">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-themed group-hover:text-primary transition-colors">System Metrics</h3>
              <p className="text-xs text-muted">Monitor performance</p>
            </div>
          </div>
        </a>
        
        <a href="/admin/data-management" className="surface rounded-lg shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-200 group">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-themed group-hover:text-primary transition-colors">Data Management</h3>
              <p className="text-xs text-muted">Backup and restore</p>
            </div>
          </div>
        </a>
        
        <a href="/admin/audit-logs" className="surface rounded-lg shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-200 group">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-themed group-hover:text-primary transition-colors">Audit Logs</h3>
              <p className="text-xs text-muted">View system activity</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
