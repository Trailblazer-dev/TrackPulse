import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
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
  Filler,
} from 'chart.js';
import { dashboardApi } from '../../services/api/user/dashboard';
import type {
  DashboardSummary,
  MonthlySales,
  GenreAnalysis,
  CountryAnalysis,
} from '../../types/analytics';
import { AxiosError } from 'axios';
import InlineSpinner from '../../components/common/InlineSpinner';

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
  Filler
);

interface AnalyticsSection {
  title: string;
  chartType?: string;
  period?: string;
  insight?: string;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | undefined)[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const Analytics = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'streams',
    'downloads',
  ]);
  const [dynamicChartType, setDynamicChartType] = useState('line');
  const [isMobile, setIsMobile] = useState(false);
  const [dashboardSummary, setDashboardSummary] =
    useState<DashboardSummary | null>(null);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [genreAnalysis, setGenreAnalysis] = useState<GenreAnalysis[]>([]);
  const [countryAnalysis, setCountryAnalysis] = useState<CountryAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('resize', checkMobile);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          summary,
          monthlySales,
          genreAnalysis,
          countryAnalysis,
        ] = await Promise.all([
          dashboardApi.getDashboardSummary(),
          dashboardApi.getSalesOverview(),
          dashboardApi.getGenreAnalysis(),
          dashboardApi.getCountryAnalysis(),
        ]);

        setDashboardSummary(summary);
        setMonthlySales(monthlySales);
        setGenreAnalysis(genreAnalysis);
        setCountryAnalysis(countryAnalysis);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as any)?.message ||
            axiosError.message ||
            'An unexpected error occurred.'
        );
        console.error('Error fetching analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        position: isMobile ? ('bottom' as const) : ('top' as const),
        align: 'center' as const,
        labels: {
          boxWidth: isMobile ? 10 : 16,
          padding: isMobile ? 10 : 20,
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12,
          },
        },
      },
      tooltip: {
        mode: isMobile ? ('nearest' as const) : ('index' as const),
        intersect: isMobile ? true : false,
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        titleFont: {
          size: isMobile ? 11 : 14,
        },
        boxPadding: isMobile ? 4 : 8,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            let value = context.raw;
            if (isMobile && value > 1000) {
              value =
                value >= 1000000
                  ? (value / 1000000).toFixed(1) + 'M'
                  : (value / 1000).toFixed(1) + 'K';
            }
            return label + ': ' + value;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: isDarkMode
            ? 'rgba(71, 85, 105, 0.3)'
            : 'rgba(226, 232, 240, 0.5)',
          display: !isMobile,
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          callback: function (value: number | string): string {
            if (isMobile) {
              const numValue = Number(value);
              if (numValue >= 1000000) return numValue / 1000000 + 'M';
              if (numValue >= 1000) return numValue / 1000 + 'K';
              return String(value);
            }
            return String(value);
          },
          font: {
            size: isMobile ? 9 : 11,
          },
          maxTicksLimit: isMobile ? 5 : 8,
          padding: isMobile ? 4 : 8,
        },
      },
      x: {
        grid: {
          color: isDarkMode
            ? 'rgba(71, 85, 105, 0.3)'
            : 'rgba(226, 232, 240, 0.5)',
          display: !isMobile,
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          font: {
            size: isMobile ? 9 : 11,
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
          maxTicksLimit: isMobile ? 6 : 10,
          padding: isMobile ? 2 : 5,
          callback: function (value: any, index: number, values: any[]): string {
            let label = String(this.getLabelForValue(value));
            if (isMobile) {
              if (values.length > 6) {
                if (index % 2 !== 0) return '';
              }
              if (label.length > 8) {
                return label.substring(0, 6) + '...';
              }
            }
            return label;
          },
        },
      },
    },
    elements: {
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6,
      },
      line: {
        borderWidth: isMobile ? 1.5 : 2,
        tension: 0.4,
      },
      arc: {
        borderWidth: isMobile ? 0.5 : 1,
      },
      bar: {
        borderWidth: isMobile ? 0.5 : 1,
      },
    },
    animation: {
      duration: isMobile ? 800 : 1200,
    },
    layout: {
      padding: isMobile ? 10 : 20,
    },
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'performance', label: 'Performance' },
    { id: 'audience', label: 'Audience' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'platforms', label: 'Platforms' },
  ];

  const timeRanges = [
    { id: '7days', label: '7d' },
    { id: '30days', label: '30d' },
    { id: '90days', label: '90d' },
    { id: '1year', label: '1y' },
  ];

  const metricOptions = [
    { id: 'streams', label: 'Streams' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'revenue', label: 'Revenue' },
  ];

  const chartTypeOptions = [
    { id: 'line', label: 'Line' },
    { id: 'bar', label: 'Bar' },
    { id: 'area', label: 'Area' },
  ];

  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter((id) => id !== metricId));
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  const filteredSections: AnalyticsSection[] = [
    {
      title: 'Monthly Sales Overview',
      chartType: 'bar',
      chartData: {
        labels: monthlySales.map((item) => item.period),
        datasets: [
          {
            label: 'Total Sales',
            data: monthlySales.map((item) => item.total_sales),
            backgroundColor: '#4f46e5',
            borderColor: '#4f46e5',
          },
          {
            label: 'Total Orders',
            data: monthlySales.map((item) => item.total_orders),
            backgroundColor: '#10b981',
            borderColor: '#10b981',
          },
        ],
      },
    },
    {
      title: 'Genre Sales Distribution',
      chartType: 'doughnut',
      chartData: {
        labels: genreAnalysis.map((item) => item.genre_name),
        datasets: [
          {
            label: 'Sales by Genre',
            data: genreAnalysis.map((item) => item.total_sales),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#58508D',
              '#BC5090',
              '#FF6361',
              '#003F5C',
            ],
            borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          },
        ],
      },
    },
    {
      title: 'Sales by Country',
      chartType: 'bar',
      chartData: {
        labels: countryAnalysis.map((item) => item.country),
        datasets: [
          {
            label: 'Total Sales',
            data: countryAnalysis.map((item) => item.total_sales),
            backgroundColor: '#f97316',
            borderColor: '#f97316',
          },
          {
            label: 'Customer Count',
            data: countryAnalysis.map((item) => item.customer_count),
            backgroundColor: '#8b5cf6',
            borderColor: '#8b5cf6',
          },
        ],
      },
    },
  ].filter((section) => {
    if (activeFilter === 'all') return true;
    return section.chartType === activeFilter;
  });

  const getDynamicChartData = () => {
    return {
      labels: monthlySales.map((item) => item.period),
      datasets: [
        ...(selectedMetrics.includes('streams')
          ? [
              {
                label: 'Total Sales',
                data: monthlySales.map((item) => item.total_sales),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
              },
            ]
          : []),
        ...(selectedMetrics.includes('downloads')
          ? [
              {
                label: 'Total Orders',
                data: monthlySales.map((item) => item.total_orders),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
              },
            ]
          : []),
      ],
    };
  };

  const renderChart = (section: AnalyticsSection) => {
    const chartType = section.chartType || 'bar';
    let optimizedData = section.chartData;

    switch (chartType) {
      case 'line':
        return (
          <Line
            data={optimizedData}
            options={{ ...baseOptions, elements: { line: { tension: 0.4 } } }}
          />
        );
      case 'bar':
        return <Bar data={optimizedData} options={baseOptions} />;
      case 'doughnut':
      case 'pie':
        return (
          <Doughnut
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
                  },
                },
              },
            }}
          />
        );
      case 'radar':
        return (
          <Radar
            data={optimizedData}
            options={{
              ...baseOptions,
              scales: {
                r: {
                  pointLabels: {
                    color: isDarkMode ? '#CBD5E1' : '#1F2937',
                    font: {
                      size: isMobile ? 8 : 10,
                    },
                  },
                  ticks: {
                    backdropColor: 'transparent',
                    maxTicksLimit: isMobile ? 4 : 8,
                    font: {
                      size: isMobile ? 8 : 10,
                    },
                    display: !isMobile,
                  },
                  grid: {
                    color: isDarkMode
                      ? 'rgba(71, 85, 105, 0.3)'
                      : 'rgba(226, 232, 240, 0.5)',
                    circular: true,
                    lineWidth: isMobile ? 0.5 : 1,
                  },
                  angleLines: {
                    color: isDarkMode
                      ? 'rgba(71, 85, 105, 0.3)'
                      : 'rgba(226, 232, 240, 0.5)',
                    lineWidth: isMobile ? 0.5 : 1,
                  },
                },
              },
            }}
          />
        );
      default:
        return (
          <div className="h-full flex items-center justify-center text-muted">
            <p>Chart type not specified</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <InlineSpinner />
        <p className="text-muted mt-4">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-themed mb-8">Analytics</h1>
        <div className="surface rounded-xl shadow-themed-md p-8 border border-themed/10 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardSummary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-themed mb-8">Analytics</h1>
        <div className="surface rounded-xl shadow-themed-md p-8 border border-themed/10 text-center">
          <p className="text-muted">No analytics data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-5 sm:mb-8">
        Analytics Dashboard
      </h1>

      <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 mb-5 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-themed mb-3 lg:mb-0">
              Analytics Controls
            </h2>
          </div>

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

      <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 mb-5 sm:mb-8">
        <div className="flex flex-col mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-themed">
            Performance Overview
          </h2>

          <div className="flex flex-wrap gap-y-3 gap-x-2">
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

            {!isMobile && (
              <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-1"></div>
            )}

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

        <div className="h-60 sm:h-80">
          {dynamicChartType === 'line' && (
            <Line
              data={getDynamicChartData()}
              options={{ ...baseOptions, elements: { line: { tension: 0.4 } } }}
            />
          )}
          {dynamicChartType === 'bar' && (
            <Bar data={getDynamicChartData()} options={baseOptions} />
          )}
          {dynamicChartType === 'area' && (
            <Line
              data={{
                ...getDynamicChartData(),
                datasets: getDynamicChartData().datasets.map((dataset) => ({
                  ...dataset,
                  fill: true,
                })),
              }}
              options={{
                ...baseOptions,
                elements: { line: { tension: 0.4 } },
              }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {filteredSections.map((section) => {
          return (
            <div
              key={section.title}
              className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="text-base sm:text-xl font-semibold text-themed">
                  {section.title}
                </h3>
                {section.period && (
                  <span className="text-[10px] sm:text-xs text-muted bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {section.period}
                  </span>
                )}
              </div>

              <div className="h-52 sm:h-64">
                {section.chartData ? (
                  renderChart(section)
                ) : (
                  <div className="h-full flex items-center justify-center text-muted">
                    No chart data available
                  </div>
                )}
              </div>

              {section.insight && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                    Insight
                  </h4>
                  <p>{section.insight}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-themed mb-4 sm:mb-6">
          Performance Summary
        </h2>
        <div className="surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="text-blue-700 dark:text-blue-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Total Customers
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {dashboardSummary.total_customers}
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
              <h4 className="text-green-700 dark:text-green-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Total Revenue
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                ${dashboardSummary.total_revenue?.toFixed(2)}
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
              <h4 className="text-purple-700 dark:text-purple-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Total Orders
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {dashboardSummary.total_orders}
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/50">
              <h4 className="text-yellow-700 dark:text-yellow-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Average Order Value
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                ${dashboardSummary.average_order_value?.toFixed(2)}
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
              <h4 className="text-red-700 dark:text-red-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Total Artists
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {dashboardSummary.total_artists}
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
              <h4 className="text-indigo-700 dark:text-indigo-300 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                Total Albums
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {dashboardSummary.total_albums}
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-themed mb-3">
              Recent Orders
            </h3>
            {dashboardSummary.recent_orders &&
            dashboardSummary.recent_orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-themed/20">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-themed/20">
                    {dashboardSummary.recent_orders.map((order) => (
                      <tr key={order.invoice_id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-themed">
                          {order.invoice_id}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-themed">
                          {order.customer_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-themed">
                          ${order.total?.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-themed">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-sm">No recent orders available.</p>
            )}
          </div>

          <div className="mt-4 sm:mt-6 text-right">
            <a
              href="/reports"
              className="text-primary text-xs sm:text-sm hover:underline inline-flex items-center"
            >
              View detailed reports
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
