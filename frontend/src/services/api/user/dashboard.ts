import api from "../index";
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
  SearchResult,
} from "../../../types/analytics";

export const dashboardApi = {
  getTopArtists: async (): Promise<TopArtist[]> => {
    const response = await api.get<TopArtist[]>("/analytics/artists/top_artists/");
    return response.data;
  },

  getTopAlbums: async (): Promise<TopAlbum[]> => {
    const response = await api.get<TopAlbum[]>("/analytics/albums/top_albums/");
    return response.data;
  },

  getTopTracks: async (): Promise<TopTrack[]> => {
    const response = await api.get<TopTrack[]>("/analytics/tracks/top_tracks/");
    return response.data;
  },

  getTracksByGenre: async (genreId: number): Promise<TopTrack[]> => {
    const response = await api.get<TopTrack[]>(`/analytics/tracks/by_genre/?genre_id=${genreId}`);
    return response.data;
  },

  getTopCustomers: async (): Promise<TopCustomer[]> => {
    const response = await api.get<TopCustomer[]>("/analytics/customers/top_customers/");
    return response.data;
  },

  getCustomersByCountry: async (country: string): Promise<TopCustomer[]> => {
    const response = await api.get<TopCustomer[]>(`/analytics/customers/by_country/?country=${country}`);
    return response.data;
  },

  getRecentOrders: async (limit: number = 10): Promise<RecentOrder[]> => {
    const response = await api.get<RecentOrder[]>(`/analytics/invoices/recent_orders/?limit=${limit}`);
    return response.data;
  },

  getSalesOverview: async (startDate?: string, endDate?: string): Promise<MonthlySales[]> => {
    let url = "/analytics/analytics/sales_overview/";
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await api.get<MonthlySales[]>(url);
    return response.data;
  },

  getGenreAnalysis: async (): Promise<GenreAnalysis[]> => {
    const response = await api.get<GenreAnalysis[]>("/analytics/analytics/genre_analysis/");
    return response.data;
  },

  getCountryAnalysis: async (): Promise<CountryAnalysis[]> => {
    const response = await api.get<CountryAnalysis[]>("/analytics/analytics/country_analysis/");
    return response.data;
  },

  getDashboardSummary: async (): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>("/analytics/analytics/dashboard_summary/");
    return response.data;
  },

  getYearlyComparison: async (): Promise<YearlyComparison[]> => {
    const response = await api.get<YearlyComparison[]>("/analytics/analytics/yearly_comparison/");
    return response.data;
  },

  searchAnalytics: async (query: string): Promise<SearchResult> => {
    const response = await api.get<SearchResult>(`/analytics/analytics/search_analytics/?q=${query}`);
    return response.data;
  },
};