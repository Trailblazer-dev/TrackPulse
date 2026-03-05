export interface Artist {
  artist_id: number;
  name: string;
}

export interface Genre {
  genre_id: number;
  name: string;
}

export interface Album {
  album_id: number;
  title: string;
  artist: Artist;
}

export interface Track {
  track_id: number;
  name: string;
  album: Album;
  genre: Genre;
  composer: string;
  milliseconds: number;
  duration_seconds: number;
  bytes: number;
  unit_price: number;
}

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  company: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  email: string;
}
