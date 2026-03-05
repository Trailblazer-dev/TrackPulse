export interface TopArtist {
  artist_id: number;
  name: string;
  total_sales: number;
  total_tracks: number;
  total_albums: number;
}

export interface TopAlbum {
  album_id: number;
  title: string;
  artist_id: number; // Assuming artist_id is part of AlbumSerializer
  total_sales: number;
  track_count: number;
}

export interface TopTrack {
  track_id: number;
  name: string;
  album_id: number; // Assuming album_id is part of TrackSerializer
  total_sold: number;
  total_revenue: number;
}

export interface TrackByGenre {
  track_id: number;
  name: string;
  // ... other track details
}

export interface TopCustomer {
  customer_id: number;
  first_name: string;
  last_name: string;
  total_spent: number;
  total_orders: number;
}

export interface CustomerByCountry {
  customer_id: number;
  first_name: string;
  last_name: string;
  country: string;
  // ... other customer details
}

export interface RecentOrder {
  invoice_id: number;
  customer_name: string;
  total: number;
  date: string;
}

export interface MonthlySales {
  period: string; // YYYY-MM
  total_sales: number;
  total_orders: number;
  average_order_value: number;
}

export interface GenreAnalysis {
  genre_name: string;
  total_sales: number;
  track_count: number;
  percentage: number;
}

export interface CountryAnalysis {
  country: string;
  total_sales: number;
  customer_count: number;
  average_customer_value: number;
}

export interface DashboardSummary {
  total_customers: number;
  total_tracks: number;
  total_artists: number;
  total_albums: number;
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  recent_orders: RecentOrder[];
}

export interface YearlyComparison {
  year: string; // YYYY
  total_sales: number;
  total_orders: number;
  average_order_value: number;
}

import type { Artist, Album, Track, Customer } from './models';

export interface SearchResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  customers: Customer[];
  total_results: number;
}
