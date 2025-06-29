import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import SalesChart from '../components/Dashboard/SalesChart';
import GenreChart from '../components/Dashboard/GenreChart';

const Analytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [sales, genres, countries] = await Promise.all([
          analyticsService.getSalesOverview(),
          analyticsService.getGenreAnalysis(),
          analyticsService.getCountryAnalysis(),
        ]);

        setSalesData(sales);
        setGenreData(genres);
        setCountryData(countries.slice(0, 10)); // Top 10 countries
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
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
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          Detailed insights into your music data
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Trends
            </h3>
          </div>
          <SalesChart data={salesData} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">
              Genre Distribution
            </h3>
          </div>
          <GenreChart data={genreData.slice(0, 5)} />
        </div>
      </div>

      {/* Country Analytics Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Countries by Revenue
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Total Sales</th>
                <th>Customers</th>
                <th>Avg Customer Value</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => (
                <tr key={country.country}>
                  <td>
                    <div className="flex items-center">
                      <span className="badge badge-primary mr-2">
                        #{index + 1}
                      </span>
                      {country.country}
                    </div>
                  </td>
                  <td className="font-medium">
                    ${country.total_sales.toLocaleString()}
                  </td>
                  <td>{country.customer_count}</td>
                  <td>${country.average_customer_value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
