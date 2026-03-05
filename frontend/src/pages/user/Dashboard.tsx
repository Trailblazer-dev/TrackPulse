import { useState, useEffect } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';
import { dashboardApi } from '../../services/api/user/dashboard';
import type {
  TopArtist,
  TopAlbum,
  TopTrack,
  TopCustomer,
  RecentOrder,
  MonthlySales,
  GenreAnalysis,
  CountryAnalysis,
  DashboardSummary,
  YearlyComparison,
} from '../../types/analytics';
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
  Title
);

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [topArtists, setTopArtists] = useState<TopArtist[]>([]);
  const [topAlbums, setTopAlbums] = useState<TopAlbum[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [genreAnalysis, setGenreAnalysis] = useState<GenreAnalysis[]>([]);
  const [countryAnalysis, setCountryAnalysis] = useState<CountryAnalysis[]>([]);
  const [yearlyComparison, setYearlyComparison] = useState<YearlyComparison[]>(
    []
  );

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

    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          summaryRes,
          topArtistsRes,
          topAlbumsRes,
          topTracksRes,
          topCustomersRes,
          recentOrdersRes,
          monthlySalesRes,
          genreAnalysisRes,
          countryAnalysisRes,
          yearlyComparisonRes,
        ] = await Promise.all([
          dashboardApi.getDashboardSummary(),
          dashboardApi.getTopArtists(),
          dashboardApi.getTopAlbums(),
          dashboardApi.getTopTracks(),
          dashboardApi.getTopCustomers(),
          dashboardApi.getRecentOrders(),
          dashboardApi.getSalesOverview(),
          dashboardApi.getGenreAnalysis(),
          dashboardApi.getCountryAnalysis(),
          dashboardApi.getYearlyComparison(),
        ]);

        setSummary(summaryRes);
        setTopArtists(topArtistsRes);
        setTopAlbums(topAlbumsRes);
        setTopTracks(topTracksRes);
        setTopCustomers(topCustomersRes);
        setRecentOrders(recentOrdersRes);
        setMonthlySales(monthlySalesRes);
        setGenreAnalysis(genreAnalysisRes);
        setCountryAnalysis(countryAnalysisRes);
        setYearlyComparison(yearlyComparisonRes);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? ('bottom' as const) : ('right' as const),
        align: isMobile ? ('center' as const) : ('center' as const),
        labels: {
          boxWidth: isMobile ? 12 : 20,
          padding: isMobile ? 10 : 20,
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        titleFont: {
          size: isMobile ? 12 : 14,
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          boxWidth: 15,
        },
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12,
        },
        titleFont: {
          size: isMobile ? 12 : 14,
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
          callback: function (this: any, tickValue: number | string): string {
            return String(tickValue);
          },
          font: {
            size: 11,
          },
          maxTicksLimit: 8,
        },
      },
      x: {
        grid: {
          color: isDarkMode
            ? 'rgba(71, 85, 105, 0.3)'
            : 'rgba(226, 232, 240, 0.5)',
          display: false,
        },
        ticks: {
          color: isDarkMode ? '#94A3B8' : '#64748B',
          font: {
            size: isMobile ? 9 : 11,
          },
          maxTicksLimit: isMobile ? 4 : 6,
        },
      },
    },
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
            size: isMobile ? 9 : 11,
          },
          maxTicksLimit: isMobile ? 5 : 8,
        },
      },
    },
    barThickness: isMobile ? 20 : 30,
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <InlineSpinner />
        <p className="text-muted mt-4">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-4 sm:mb-8">
        Your Dashboard
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-10">
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 flex flex-col items-center text-center border border-themed/10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-themed-lg">
          <span className="text-xs sm:text-sm text-muted mb-1">
            Total Revenue
          </span>
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-themed truncate w-full">
            ${summary?.total_revenue.toLocaleString()}
          </span>
        </div>
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 flex flex-col items-center text-center border border-themed/10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-themed-lg">
          <span className="text-xs sm:text-sm text-muted mb-1">
            Total Tracks
          </span>
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-themed truncate w-full">
            {summary?.total_tracks.toLocaleString()}
          </span>
        </div>
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 flex flex-col items-center text-center border border-themed/10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-themed-lg">
          <span className="text-xs sm:text-sm text-muted mb-1">
            Total Customers
          </span>
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-themed truncate w-full">
            {summary?.total_customers.toLocaleString()}
          </span>
        </div>
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-3 sm:p-6 flex flex-col items-center text-center border border-themed/10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-themed-lg">
          <span className="text-xs sm:text-sm text-muted mb-1">
            Total Artists
          </span>
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-themed truncate w-full">
            {summary?.total_artists.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">
            Genre Distribution
          </h3>
          <div className="h-48 sm:h-64 flex items-center justify-center">
            <Pie
              data={{
                labels: genreAnalysis.map((g) => g.genre_name),
                datasets: [
                  {
                    data: genreAnalysis.map((g) => g.total_sales),
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9F40',
                    ],
                  },
                ],
              }}
              options={pieChartOptions}
            />
          </div>
        </div>

        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">
            Top Tracks
          </h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-themed/10">
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-left">
                    #
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-left">
                    Track
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-muted text-right">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topTracks.slice(0, isMobile ? 3 : 5).map((track, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-themed/5 transition-colors border-b border-themed/5"
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">
                      <span
                        className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
                          idx === 0
                            ? 'bg-yellow-500'
                            : idx === 1
                            ? 'bg-gray-300'
                            : idx === 2
                            ? 'bg-amber-700'
                            : 'bg-gray-100 dark:bg-gray-700'
                        } text-white text-[10px] sm:text-xs`}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-themed font-medium text-xs sm:text-base truncate max-w-[100px] sm:max-w-none">
                      {track.name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-primary font-medium text-xs sm:text-base">
                      ${track.total_revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 col-span-1 md:col-span-2 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">
            Sales Trends
          </h3>
          <div className="h-56 sm:h-72">
            <Line
              data={{
                labels: monthlySales.map((s) => s.period),
                datasets: [
                  {
                    label: 'Sales',
                    data: monthlySales.map((s) => s.total_sales),
                    fill: false,
                    borderColor: '#4BC0C0',
                  },
                ],
              }}
              options={lineChartOptions}
            />
          </div>
        </div>

        <div className="surface rounded-lg sm:rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10 col-span-1 md:col-span-2 hover:shadow-themed-lg transition-shadow">
          <h3 className="text-base sm:text-xl font-semibold text-themed mb-2 sm:mb-4">
            Sales by Country
          </h3>
          <div className="h-56 sm:h-72">
            <Bar
              data={{
                labels: countryAnalysis.map((c) => c.country),
                datasets: [
                  {
                    label: 'Sales',
                    data: countryAnalysis.map((c) => c.total_sales),
                    backgroundColor: '#FF6384',
                  },
                ],
              }}
              options={barChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;