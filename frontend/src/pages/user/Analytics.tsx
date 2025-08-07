import React, { useState, useEffect } from 'react'
import { analytics } from '../../utils/user/user'
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'
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
  RadialLinearScale,
  Title,
  Filler // Import the Filler plugin
} from 'chart.js'

// Register the required chart.js components including the Filler plugin
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Filler // Register the Filler plugin
);

const Analytics = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['streams', 'downloads']);
  const [dynamicChartType, setDynamicChartType] = useState('line');
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
    
    // Add resize event listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Common chart options with theme awareness and mobile responsiveness
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // Higher resolution for mobile screens
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'top' as const,
        align: 'center' as const,
        labels: {
          boxWidth: isMobile ? 10 : 16,
          padding: isMobile ? 10 : 20,
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: { 
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12,
          }
        }
      },
      tooltip: {
        // Mobile-friendly tooltips
        mode: isMobile ? 'nearest' as const : 'index' as const,
        intersect: isMobile ? true : false, // On mobile, only show tooltip when intersecting point
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 11 : 14
        },
        boxPadding: isMobile ? 4 : 8,
        callbacks: {
          // Format labels for smaller displays
          label: function(context: any) {
            const label = context.dataset.label || '';
            let value = context.raw;
            // Simplify large numbers on mobile
            if (isMobile && value > 1000) {
              value = value >= 1000000 
                ? (value / 1000000).toFixed(1) + 'M'
                : (value / 1000).toFixed(1) + 'K';
            }
            return label + ': ' + value;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          display: !isMobile // Hide grid on mobile for cleaner look
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          // Format Y axis ticks for mobile
          callback: function(value: any) {
            if (isMobile) {
              // Abbreviate numbers on mobile
              if (value >= 1000000) return (value / 1000000) + 'M';
              if (value >= 1000) return (value / 1000) + 'K';
              return value;
            }
            return value;
          },
          font: {
            size: isMobile ? 9 : 11
          },
          maxTicksLimit: isMobile ? 5 : 8, // Fewer ticks on mobile
          padding: isMobile ? 4 : 8
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          display: !isMobile // Hide grid on mobile for cleaner look
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          font: {
            size: isMobile ? 9 : 11
          },
          maxRotation: isMobile ? 45 : 0, // Rotate labels on mobile to save space
          minRotation: isMobile ? 45 : 0,
          maxTicksLimit: isMobile ? 6 : 10, // Fewer ticks on mobile
          padding: isMobile ? 2 : 5,
          callback: function(value: any, index: number, values: any[]) {
            // Abbreviate labels on mobile
            const label = this.getLabelForValue(value);
            if (isMobile) {
              // If we have too many labels, show fewer
              if (values.length > 6) {
                if (index % 2 !== 0) return '';
              }
              // Truncate long strings
              return label.length > 5 ? label.substring(0, 3) + '...' : label;
            }
            return label;
          }
        }
      }
    },
    // Mobile optimizations
    elements: {
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6,
      },
      line: {
        borderWidth: isMobile ? 1.5 : 2,
        tension: 0.4
      },
      arc: {
        borderWidth: isMobile ? 0.5 : 1
      },
      bar: {
        borderWidth: isMobile ? 0.5 : 1
      }
    },
    // Animation optimizations for mobile
    animation: {
      duration: isMobile ? 800 : 1200
    },
    layout: {
      padding: isMobile ? 10 : 20
    }
  };

  // Dynamic chart data based on selected filters
  const getDynamicChartData = () => {
    // Sample data structure - in a real app this would be filtered based on selections
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        selectedMetrics.includes('streams') ? {
          label: 'Streams',
          data: [15000, 21000, 18000, 24000, 27000, 25000],
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: dynamicChartType !== 'line',
          tension: 0.4
        } : null,
        selectedMetrics.includes('downloads') ? {
          label: 'Downloads',
          data: [12000, 19000, 14000, 22000, 24000, 23000],
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: dynamicChartType !== 'line',
          tension: 0.4
        } : null,
        selectedMetrics.includes('revenue') ? {
          label: 'Revenue ($)',
          data: [45000, 52000, 49000, 58000, 62000, 67000],
          borderColor: '#4BC0C0',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: dynamicChartType !== 'line',
          tension: 0.4
        } : null
      ].filter(Boolean)
    };
  };

  // Filter options
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'performance', label: 'Performance' },
    { id: 'audience', label: 'Audience' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'platforms', label: 'Platforms' }
  ];

  // Time range options
  const timeRanges = [
    { id: '7days', label: '7d' },
    { id: '30days', label: '30d' },
    { id: '90days', label: '90d' },
    { id: '1year', label: '1y' }
  ];

  // Metric options for the chart
  const metricOptions = [
    { id: 'streams', label: 'Streams' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'revenue', label: 'Revenue' }
  ];

  // Chart type options
  const chartTypeOptions = [
    { id: 'line', label: 'Line' },
    { id: 'bar', label: 'Bar' },
    { id: 'area', label: 'Area' }
  ];

  // Toggle metric selection
  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      if (selectedMetrics.length > 1) { // Ensure at least one metric remains selected
        setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  // Filtered sections based on active filter
  const filteredSections = Object.entries(analytics).filter(([key, section]) => {
    if (activeFilter === 'all') return true;
    
    const sectionKeywords: Record<string, string[]> = {
      performance: ['performance', 'growth', 'trend'],
      audience: ['audience', 'geographic', 'demographic'],
      revenue: ['revenue', 'sales', 'income'],
      platforms: ['platform', 'source', 'channel']
    };
    
    const keywords = sectionKeywords[activeFilter] || [];
    const sectionTitle = section.title.toLowerCase();
    return keywords.some(keyword => sectionTitle.includes(keyword));
  });

  // Chart type mapping function
  const renderChart = (section: any) => {
    // Determine chart type based on data structure or name if type is not specified
    const chartType = section.type || inferChartType(section);
    
    // Prepare mobile optimized data
    let optimizedData = prepareMobileData(section.chartData, chartType);
    
    switch (chartType) {
      case 'line':
        return <Line data={optimizedData} options={{...baseOptions, elements: { line: { tension: 0.4 }}}} />;
      case 'bar':
        return <Bar data={optimizedData} options={baseOptions} />;
      case 'doughnut':
      case 'pie':
        return <Doughnut 
          data={optimizedData} 
          options={{
            ...baseOptions,
            cutout: isMobile ? '60%' : '70%',
            plugins: {
              ...baseOptions.plugins,
              legend: {
                ...baseOptions.plugins.legend,
                position: 'bottom' as const,
                labels: {
                  ...baseOptions.plugins.legend.labels,
                  boxWidth: isMobile ? 8 : 12,
                  padding: isMobile ? 8 : 16,
                }
              }
            }
          }} 
        />;
      case 'radar':
        return <Radar 
          data={optimizedData} 
          options={{
            ...baseOptions,
            scales: {
              r: {
                pointLabels: {
                  color: isDarkMode ? '#CBD5E1' : '#1F2937',
                  font: {
                    size: isMobile ? 8 : 10
                  }
                },
                ticks: {
                  backdropColor: 'transparent',
                  maxTicksLimit: isMobile ? 4 : 8,
                  font: {
                    size: isMobile ? 8 : 10
                  },
                  display: !isMobile
                },
                grid: {
                  color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                  circular: true,
                  lineWidth: isMobile ? 0.5 : 1
                },
                angleLines: {
                  color: isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                  lineWidth: isMobile ? 0.5 : 1
                },
              }
            }
          }} 
        />;
      default:
        return <div className="h-full flex items-center justify-center text-muted">
          <p>Chart type not specified</p>
        </div>;
    }
  };
  
  // Prepare data for mobile by possibly reducing datapoints for better readability
  const prepareMobileData = (chartData: any, chartType: string) => {
    if (!isMobile || !chartData) return chartData;
    
    // Make a deep clone of the data to avoid mutations
    const data = JSON.parse(JSON.stringify(chartData));
    
    if (chartType === 'line' || chartType === 'bar') {
      // For line/bar charts, we might want to reduce the number of labels if there are too many
      if (data.labels && data.labels.length > 8) {
        // Keep every nth element to reduce density on mobile
        const n = Math.ceil(data.labels.length / 6); // Limit to about 6 points
        const newLabels = [];
        const newDatasets = data.datasets.map((dataset: any) => {
          const newData: any[] = [];
          return { ...dataset, data: newData };
        });
        
        for (let i = 0; i < data.labels.length; i += n) {
          newLabels.push(data.labels[i]);
          data.datasets.forEach((dataset: any, datasetIndex: number) => {
            newDatasets[datasetIndex].data.push(dataset.data[i]);
          });
        }
        
        data.labels = newLabels;
        data.datasets = newDatasets;
      }
    } else if (chartType === 'doughnut' || chartType === 'pie') {
      // For pie/doughnut, we might want to consolidate small slices
      if (data.labels && data.labels.length > 5) {
        // Find the smallest values and combine them into an "Other" category
        const threshold = 5; // Max number of slices to show
        const datasets = data.datasets[0];
        const values = [...datasets.data];
        const colors = [...datasets.backgroundColor];
        const labels = [...data.labels];
        
        // Sort by value (descending)
        const combined = labels.map((label, i) => ({ 
          label, value: values[i], color: colors[i] 
        })).sort((a, b) => b.value - a.value);
        
        // Take the top segments and combine the rest
        const topSegments = combined.slice(0, threshold - 1);
        const otherSegments = combined.slice(threshold - 1);
        
        if (otherSegments.length > 0) {
          const otherValue = otherSegments.reduce((sum, item) => sum + item.value, 0);
          const otherColor = '#CCCCCC'; // Gray color for "Other"
          
          // Create new arrays
          const newLabels = [...topSegments.map(item => item.label), 'Other'];
          const newValues = [...topSegments.map(item => item.value), otherValue];
          const newColors = [...topSegments.map(item => item.color), otherColor];
          
          // Update the data
          data.labels = newLabels;
          datasets.data = newValues;
          datasets.backgroundColor = newColors;
        }
      }
    }
    
    return data;
  };

  // Helper function to infer chart type from data structure
  const inferChartType = (section: any): string => {
    const chartData = section.chartData;
    if (!chartData) return 'unknown';

    // Check for single dataset with background colors array (likely a pie/doughnut chart)
    if (chartData.datasets && 
        chartData.datasets.length === 1 && 
        chartData.datasets[0].backgroundColor && 
        Array.isArray(chartData.datasets[0].backgroundColor) && 
        !chartData.datasets[0].borderColor) {
      return 'doughnut';
    }
    
    // Check for multiple datasets or a dataset with borderColor (likely a line chart)
    if (chartData.datasets && 
        (chartData.datasets.length > 1 || 
        (chartData.datasets.length === 1 && chartData.datasets[0].borderColor))) {
      // Check if fill is explicitly set to false, which usually indicates line chart
      if (chartData.datasets.some((ds: any) => ds.fill === false)) {
        return 'line';
      }
    }
    
    // If we have a single dataset with a backgroundColor that's not an array, likely a bar chart
    if (chartData.datasets && 
        chartData.datasets.length === 1 && 
        chartData.datasets[0].backgroundColor && 
        !Array.isArray(chartData.datasets[0].backgroundColor)) {
      return 'bar';
    }
    
    // Default to bar chart for other cases
    return 'bar';
  };

  // Check if analytics data exists
  if (!analytics) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-themed mb-8">Analytics</h1>
        <div className="surface rounded-xl shadow-themed-md p-8 border border-themed/10 text-center">
          <p className="text-muted">Analytics data is not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-5 sm:mb-8">Analytics Dashboard</h1>
      
      {/* Filter Panel - Mobile optimized with scrollable container */}
      <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 mb-5 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-themed mb-3 lg:mb-0">Analytics Controls</h2>
          </div>
          
          {/* Filter tabs - Horizontally scrollable on mobile */}
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Time range selector - Horizontally scrollable on mobile */}
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    timeRange === range.id
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 shadow-sm'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Chart Panel - Mobile optimized height and controls */}
      <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 mb-5 sm:mb-8">
        <div className="flex flex-col mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-themed">Performance Overview</h2>
          
          <div className="flex flex-wrap gap-y-3 gap-x-2">
            {/* Metric toggles */}
            <div className="flex flex-wrap gap-2 mr-auto">
              {metricOptions.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                    selectedMetrics.includes(metric.id)
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 shadow-sm'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
            
            {!isMobile && <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-1"></div>}
            
            {/* Chart type toggles */}
            <div className="flex gap-2">
              {chartTypeOptions.map((chartType) => (
                <button
                  key={chartType.id}
                  onClick={() => setDynamicChartType(chartType.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                    dynamicChartType === chartType.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {chartType.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Adjust chart height for better mobile viewing */}
        <div className="h-60 sm:h-80">
          {dynamicChartType === 'line' && (
            <Line 
              data={getDynamicChartData()} 
              options={{...baseOptions, elements: { line: { tension: 0.4 }}}}
            />
          )}
          {dynamicChartType === 'bar' && (
            <Bar 
              data={getDynamicChartData()} 
              options={baseOptions}
            />
          )}
          {dynamicChartType === 'area' && (
            <Line 
              data={{
                ...getDynamicChartData(),
                datasets: getDynamicChartData().datasets.map(dataset => 
                  dataset ? { ...dataset, fill: true } : null
                ).filter(Boolean)
              }}
              options={{
                ...baseOptions, 
                elements: { line: { tension: 0.4 }},
              }}
            />
          )}
        </div>
      </div>
      
      {/* Main charts grid - Mobile optimized with single column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {filteredSections.map(([key, section], idx) => {
          if (!section) return null;
          
          return (
            <div
              key={`section-${idx}`}
              className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="text-base sm:text-xl font-semibold text-themed">{section.title || key}</h3>
                {section.period && (
                  <span className="text-[10px] sm:text-xs text-muted bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {section.period}
                  </span>
                )}
              </div>
              
              {/* Adjust chart height for better mobile viewing */}
              <div className="h-52 sm:h-64">
                {section.chartData ? 
                  renderChart(section) : 
                  <div className="h-full flex items-center justify-center text-muted">No chart data available</div>
                }
              </div>
              
              {section.insight && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs sm:text-sm rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p>{section.insight}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Analytics summary section - Mobile optimized */}
      <div className="mt-6 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-themed mb-4 sm:mb-6">Performance Summary</h2>
        <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="text-blue-700 dark:text-blue-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Overall Growth</h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Your music has shown a steady growth in both listeners and engagement over the last quarter.</p>
            </div>
            
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
              <h4 className="text-green-700 dark:text-green-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Revenue Trends</h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Streaming revenue has increased by 15% compared to previous quarter.</p>
            </div>
            
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
              <h4 className="text-purple-700 dark:text-purple-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">Audience Insights</h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Your core audience is in the 25-34 age range, primarily using Spotify and Apple Music.</p>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 text-right">
            <a href="/reports" className="text-primary text-xs sm:text-sm hover:underline inline-flex items-center">
              View detailed reports
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics