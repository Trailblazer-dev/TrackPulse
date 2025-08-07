import api from '../index';
import type { ApiResponse } from '../types';

export interface AuthCredentials {
  email: string;
  password: string;
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
  role: 'ADMIN' | 'USER' | 'MODERATOR';
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

export const authApi = {
  login: async (credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      // localStorage.setItem('accessToken', response.data.data.token);
      // return response.data;
      
      // Mock login for now
      const mockResponse: ApiResponse<AuthResponse> = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '123',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'ADMIN' : 'USER'
          }
        },
        status: 200,
        message: 'Login successful'
      };
      
      localStorage.setItem('accessToken', mockResponse.data.token);
      return Promise.resolve(mockResponse);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
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
          role: 'USER'
        },
        status: 201,
        message: 'Registration successful'
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // await api.post<ApiResponse<null>>('/auth/logout');
      
      // Clear local storage either way
      localStorage.removeItem('accessToken');
      
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear token even if API call fails
      localStorage.removeItem('accessToken');
      throw error;
    }
  },

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
  }
};
