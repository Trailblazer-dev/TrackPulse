import { useState, useEffect } from 'react'
import { adminSystemMetrics } from '../../utils/admin/admin'
import { Line, Bar, Pie } from 'react-chartjs-2'
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
  Title 
} from 'chart.js'

// Register Chart.js components
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

const SystemMetrics = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Create observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Common chart options with theme awareness
  const chartOptions = {
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
      },
      bar: {
        borderWidth: 1
      }
    },
    plugins: {
      legend: {
        display: !isMobile,
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          boxWidth: isMobile ? 10 : 15,
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
          maxTicksLimit: isMobile ? 4 : 6
        }
      }
    }
  };

  // Pie chart options with better mobile optimization
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'right' as const,
        labels: {
          boxWidth: isMobile ? 10 : 15,
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
    },
    cutout: isMobile ? '65%' : '70%',
  };

  // Bar chart options
  const barOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true
      }
    },
    barThickness: isMobile ? 15 : 25
  };

  // Prepare chart data
  const prepareChartData = (metric: any) => {
    if (metric.type === 'line') {
      return {
        labels: metric.graphConfig.dataPoints.map((point: any) => point.time),
        datasets: [{
          label: metric.title,
          data: metric.graphConfig.dataPoints.map((point: any) => point.value),
          borderColor: metric.graphConfig.colors[0],
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: false
        }]
      };
    } else if (metric.type === 'bar') {
      return {
        labels: metric.graphConfig.dataPoints.map((point: any) => point.time || point.date),
        datasets: [{
          label: metric.title,
          data: metric.graphConfig.dataPoints.map((point: any) => point.value),
          backgroundColor: metric.graphConfig.colors[0],
          borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1
        }]
      };
    } else if (metric.type === 'pie') {
      return {
        labels: metric.pieConfig.dataPoints.map((point: any) => point.label),
        datasets: [{
          data: metric.pieConfig.dataPoints.map((point: any) => point.value),
          backgroundColor: metric.pieConfig.colors,
          borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1
        }]
      };
    }

    return null;
  };

  // Render the appropriate chart type
  const renderChart = (metric: any) => {
    const chartData = prepareChartData(metric);
    
    if (!chartData) return null;
    
    switch (metric.type) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={barOptions} />;
      case 'pie':
        return <Pie data={chartData} options={pieOptions} />;
      default:
        return null;
    }
  };

  // Format value with appropriate symbols and units
  const formatValue = (value: string) => {
    // For percentages, keep as is
    if (value.includes('%')) return value;
    
    // For milliseconds, add appropriate styling
    if (value.includes('ms')) {
      return (
        <span>
          {value.replace('ms', '')}
          <span className="text-muted text-xs ml-0.5">ms</span>
        </span>
      );
    }
    
    // For regular values
    return value;
  };

  // Icon selection based on metric type
  const getMetricIcon = (metric: any) => {
    if (metric.title.toLowerCase().includes('cpu')) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (metric.title.toLowerCase().includes('memory')) {
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
          </svg>
        </div>
      );
    } else if (metric.title.toLowerCase().includes('disk')) {
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (metric.title.toLowerCase().includes('response')) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (metric.title.toLowerCase().includes('downtime') || metric.title.toLowerCase().includes('error')) {
      return (
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-themed">{adminSystemMetrics.title}</h1>
        
        {/* Time range selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              timeRange === '24h'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Last 24 Hours
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              timeRange === '7d'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              timeRange === '30d'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>
      
      {/* Metrics Overview - Top row cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminSystemMetrics.metrics.slice(0, 4).map((metric, idx) => (
          <div key={idx} className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted mb-1">{metric.title}</p>
                <h3 className="text-xl font-semibold text-themed">{formatValue(metric.value)}</h3>
              </div>
              {getMetricIcon(metric)}
            </div>
            
            {/* Status indicator */}
            <div className={`text-xs mt-2 ${
              metric.title.includes('CPU') || metric.title.includes('Memory') ? 
                parseInt(metric.value) > 75 ? 'text-red-600 dark:text-red-400' : 
                parseInt(metric.value) > 50 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-green-600 dark:text-green-400'
              : 'text-blue-600 dark:text-blue-400'
            }`}>
              {metric.title.includes('CPU') || metric.title.includes('Memory') ? 
                parseInt(metric.value) > 75 ? 'High utilization' : 
                parseInt(metric.value) > 50 ? 'Moderate utilization' : 
                'Normal utilization'
              : metric.title.includes('Response') ?
                parseInt(metric.value) > 300 ? 'Slow response time' :
                parseInt(metric.value) > 200 ? 'Average response time' :
                'Fast response time'
              : 'Normal operation'}
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Grid - Responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {adminSystemMetrics.metrics.map((metric, idx) => (
          <div 
            key={idx}
            className="surface rounded-lg shadow-themed-md border border-themed/10 p-4 sm:p-6 hover:shadow-themed-lg transition-all duration-300"
          >
            <h3 className="text-base sm:text-lg font-semibold text-themed mb-3 sm:mb-4">{metric.title}</h3>
            <div className="h-60 sm:h-72">
              {renderChart(metric)}
            </div>
          </div>
        ))}
      </div>
      
      {/* System Status Summary */}
      <div className="surface rounded-lg shadow-themed-md border border-themed/10 p-4 sm:p-6 mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-semibold text-themed mb-3 sm:mb-4">System Status Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
            <h4 className="text-blue-700 dark:text-blue-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Performance Insights</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              System is operating at normal capacity with adequate resource allocation. CPU and memory utilization are within expected parameters.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
            <h4 className="text-green-700 dark:text-green-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Uptime Status</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              99.9% uptime achieved over the past 30 days. Scheduled maintenance completed successfully with minimal service disruption.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/50">
            <h4 className="text-yellow-700 dark:text-yellow-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Warnings</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Disk space utilization exceeds 80%. Consider scheduling a cleanup or increasing storage capacity in the next maintenance window.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
            <h4 className="text-purple-700 dark:text-purple-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Recommendations</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Consider optimizing database queries to improve overall response times. Monitor for spikes in error rates during peak usage hours.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Generate Full System Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default SystemMetrics