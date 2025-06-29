import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import StatCard from '../components/Dashboard/StatCard';
import SalesChart from '../components/Dashboard/SalesChart';
import GenreChart from '../components/Dashboard/GenreChart';
import TopTracksTable from '../components/Dashboard/TopTracksTable';
import {
  UserGroupIcon,
  MusicalNoteIcon,
  MicrophoneIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summary, sales, genres, tracks] = await Promise.all([
          analyticsService.getDashboardSummary(),
          analyticsService.getSalesOverview(),
          analyticsService.getGenreAnalysis(),
          analyticsService.getTopTracks(),
        ]);

        setDashboardData(summary);
        setSalesData(sales);
        setGenreData(genres.slice(0, 5)); // Top 5 genres
        setTopTracks(tracks.slice(0, 10)); // Top 10 tracks
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your music analytics dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${dashboardData?.total_revenue?.toLocaleString() || 0}`}
          icon={CurrencyDollarIcon}
          color="green"
        />
        <StatCard
          title="Total Customers"
          value={dashboardData?.total_customers?.toLocaleString() || 0}
          icon={UserGroupIcon}
          color="blue"
        />
        <StatCard
          title="Total Artists"
          value={dashboardData?.total_artists?.toLocaleString() || 0}
          icon={MicrophoneIcon}
          color="purple"
        />
        <StatCard
          title="Total Tracks"
          value={dashboardData?.total_tracks?.toLocaleString() || 0}
          icon={MusicalNoteIcon}
          color="yellow"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Overview
            </h3>
          </div>
          <SalesChart data={salesData} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Genres by Revenue
            </h3>
          </div>
          <GenreChart data={genreData} />
        </div>
      </div>

      {/* Top Tracks Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Selling Tracks
          </h3>
        </div>
        <TopTracksTable tracks={topTracks} />
      </div>
    </div>
  );
};

export default Dashboard;
