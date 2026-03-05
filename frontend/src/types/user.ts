export interface UserProfile {
  bio: string;
  location: string;
  birth_date: string;
  avatar: string;
  phone_number: string;
  timezone: string;
  theme_preference: string;
  default_date_range: string;
}

export interface User {
  id: number;
  user_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  date_joined: string;
  profile: UserProfile;
}
