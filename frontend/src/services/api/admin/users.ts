import api from '../index';
import type { ApiResponse, PaginatedResponse, SortParams, FilterParams } from '../types';
import { adminUsersManagement } from '../../../utils/admin/admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  dateJoined: string;
  lastLogin: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export const usersApi = {
  getUsers: async (
    filters: FilterParams = {}, 
    pagination = { page: 1, limit: 10 },
    sort: SortParams = { sortBy: 'name', sortDirection: 'asc' }
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<PaginatedResponse<User>>>('/admin/users', {
      //   params: { ...pagination, ...filters, ...sort }
      // });
      // return response.data;
      
      // Mock data
      const mockUsers = [
        { id: '001', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', dateJoined: '2023-05-10', lastLogin: '2023-10-15' },
        { id: '002', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-04-22', lastLogin: '2023-10-18' },
        { id: '003', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', dateJoined: '2023-06-15', lastLogin: '2023-09-30' },
        { id: '004', name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', dateJoined: '2023-07-03', lastLogin: '2023-10-17' },
        { id: '005', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending', dateJoined: '2023-10-01', lastLogin: 'Never' },
      ];
      
      return Promise.resolve({
        data: {
          items: mockUsers,
          pagination: {
            currentPage: pagination.page,
            totalPages: Math.ceil(mockUsers.length / pagination.limit),
            totalItems: mockUsers.length,
            itemsPerPage: pagination.limit
          }
        },
        status: 200,
        message: 'Users retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  getUserById: async (userId: string): Promise<ApiResponse<User>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<User>>(`/admin/users/${userId}`);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'User',
          status: 'Active',
          dateJoined: '2023-05-10',
          lastLogin: '2023-10-15'
        },
        status: 200,
        message: 'User retrieved successfully'
      });
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  createUser: async (userData: CreateUserData): Promise<ApiResponse<User>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<User>>('/admin/users', userData);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          id: Date.now().toString(),
          ...userData,
          dateJoined: new Date().toISOString().split('T')[0],
          lastLogin: 'Never'
        },
        status: 201,
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  updateUser: async (userId: string, userData: UpdateUserData): Promise<ApiResponse<User>> => {
    try {
      // When API is ready:
      // const response = await api.put<ApiResponse<User>>(`/admin/users/${userId}`, userData);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          id: userId,
          name: userData.name || 'John Doe',
          email: userData.email || 'john@example.com',
          role: userData.role || 'User',
          status: userData.status || 'Active',
          dateJoined: '2023-05-10',
          lastLogin: '2023-10-15'
        },
        status: 200,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.delete<ApiResponse<null>>(`/admin/users/${userId}`);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  exportUsers: async (format: 'CSV' | 'Excel' | 'JSON'): Promise<ApiResponse<{ url: string }>> => {
    try {
      // When API is ready:
      // const response = await api.get<ApiResponse<{ url: string }>>('/admin/users/export', {
      //   params: { format }
      // });
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: {
          url: `/exports/users-${Date.now()}.${format.toLowerCase()}`
        },
        status: 200,
        message: 'Users exported successfully'
      });
    } catch (error) {
      console.error('Error exporting users:', error);
      throw error;
    }
  }
};
