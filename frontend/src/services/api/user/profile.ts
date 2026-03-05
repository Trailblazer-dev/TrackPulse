import api from "../index";
import type { User, UserProfile } from "../../../types/user";

export const profileApi = {
  getMe: async (): Promise<User> => {
    const response = await api.get<User>("/users/me/");
    return response.data;
  },
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/users/profile/");
    return response.data;
  },
  updateProfile: async (profileData: UserProfile): Promise<UserProfile> => {
    const response = await api.put<UserProfile>("/users/profile/", profileData);
    return response.data;
  },
  getUserDetail: async (): Promise<User> => {
    const response = await api.get<User>("/users/detail/");
    return response.data;
  },
  updateUserDetail: async (userData: User): Promise<User> => {
    const response = await api.put<User>("/users/detail/", userData);
    return response.data;
  },
};
