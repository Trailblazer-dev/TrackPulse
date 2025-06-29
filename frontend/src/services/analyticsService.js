import api from './api';

export const analyticsService = {
  async getDashboardSummary() {
    const response = await api.get('/analytics/analytics/dashboard_summary/');
    return response.data;
  },

  async getSalesOverview() {
    const response = await api.get('/analytics/analytics/sales_overview/');
    return response.data;
  },

  async getGenreAnalysis() {
    const response = await api.get('/analytics/analytics/genre_analysis/');
    return response.data;
  },

  async getCountryAnalysis() {
    const response = await api.get('/analytics/analytics/country_analysis/');
    return response.data;
  },

  async getArtists(page = 1) {
    const response = await api.get(`/analytics/artists/?page=${page}`);
    return response.data;
  },

  async getAlbums(page = 1) {
    const response = await api.get(`/analytics/albums/?page=${page}`);
    return response.data;
  },

  async getTracks(page = 1) {
    const response = await api.get(`/analytics/tracks/?page=${page}`);
    return response.data;
  },

  async getTopTracks() {
    const response = await api.get('/analytics/tracks/top_tracks/');
    return response.data;
  },

  async getCustomers(page = 1) {
    const response = await api.get(`/analytics/customers/?page=${page}`);
    return response.data;
  },

  async getTopCustomers() {
    const response = await api.get('/analytics/customers/top_customers/');
    return response.data;
  },

  async getInvoices(page = 1) {
    const response = await api.get(`/analytics/invoices/?page=${page}`);
    return response.data;
  },

  async getGenres() {
    const response = await api.get('/analytics/genres/');
    return response.data;
  },
};
