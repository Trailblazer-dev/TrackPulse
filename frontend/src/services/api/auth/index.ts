import api from '../index';
import type { ApiResponse } from '../types';

export type UserRole = 'guest' | 'user' | 'admin';

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Token storage keys
const TOKEN_STORAGE_KEY = 'auth_token';
const USER_STORAGE_KEY = 'user_data';

export const authService = {
  // Login user
  login: async (credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      // authService.setSession(response.data.data.user, response.data.data.token);
      // return response.data;
      
      // Mock login for now
      const mockResponse: ApiResponse<AuthResponse> = {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '123',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'admin' : 'user',
            avatar: credentials.email.charAt(0).toUpperCase()
          }
        },
        status: 200,
        message: 'Login successful'
      };
      
      authService.setSession(mockResponse.data.user, mockResponse.data.token);
      return Promise.resolve(mockResponse);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register new user
  register: async (userData: RegisterData): Promise<ApiResponse<UserData>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<UserData>>('/auth/register', userData);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: 'user'
        },
        status: 201,
        message: 'Registration successful'
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // await api.post<ApiResponse<null>>('/auth/logout');
      
      // Clear session data
      authService.clearSession();
      
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear session even if API call fails
      authService.clearSession();
      throw error;
    }
  },

  // Request password reset
  forgotPassword: async (data: PasswordResetRequest): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/auth/forgot-password', data);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Password reset instructions sent to your email'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (data: PasswordResetConfirm): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/auth/reset-password', data);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Password reset successful'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Validate reset token
  validateToken: async (token: string): Promise<ApiResponse<{ valid: boolean }>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<{ valid: boolean }>>('/auth/validate-token', { token });
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: { valid: true },
        status: 200,
        message: 'Token is valid'
      });
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },
  
  // Session management functions
  
  // Store user session data
  setSession: (userData: UserData, token: string): void => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    
    // Dispatch event for components that need to react to auth changes
    window.dispatchEvent(new CustomEvent('auth_changed', { detail: { userData } }));
  },
  
  // Clear user session data
  clearSession: (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Dispatch event for components that need to react to auth changes
    window.dispatchEvent(new CustomEvent('auth_changed', { detail: { userData: null } }));
  },
  
  // Get current user data
  getUserData: (): UserData | null => {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        return JSON.parse(userData) as UserData;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return null;
  },
  
  // Get current user role
  getCurrentRole: (): UserRole => {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        const user = JSON.parse(userData) as UserData;
        return user.role;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return 'guest';
  },
  
  // Get authentication token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  
  // Check if user has required role
  hasRole: (requiredRole: UserRole | UserRole[]): boolean => {
    const currentRole = authService.getCurrentRole();
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(currentRole);
    }
    
    return currentRole === requiredRole;
  }
};
