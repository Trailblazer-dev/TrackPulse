import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/users/auth/login/', { email, password });
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/users/auth/register/', userData);
    return response.data;
  },

  async logout() {
    await api.post('/users/auth/logout/');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  },

  async getCurrentUser() {
    const response = await api.get('/users/me/');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.patch('/users/update_profile/', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  async changePassword(passwords) {
    const response = await api.post('/users/change_password/', passwords);
    return response.data;
  },

  getCurrentUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
