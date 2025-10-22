import api from "../index";
import type { ApiResponse } from "../types";

export type UserRole = "guest" | "user" | "admin";

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
  user_id?: string;
}

// Backend response interfaces
interface BackendAuthResponse {
  token: string;
  user_id: string;
  username: string;
  email: string;
}

interface BackendRegisterResponse {
  token: string;
  user_id: string;
  username: string;
  email: string;
}


// Add these missing interfaces at the top
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  password_confirm: string;
}

// Token storage keys
const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "user_data";

export const authService = {
  // Login user - FIXED
  login: async (
    credentials: AuthCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post<BackendAuthResponse>(
        "/users/auth/login/",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      const backendData = response.data;

      // Create frontend-compatible response
      const userData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: "user",
      };

      const authResponse: AuthResponse = {
        token: backendData.token,
        user: userData,
        user_id: backendData.user_id,
      };

      console.log("Login successful:", authResponse);
      authService.setSession(userData, backendData.token);

      return {
        data: authResponse,
        status: response.status,
        message: "Login successful",
      };
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle different error formats
      let errorMessage = "Login failed";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },

  // Register new user - FIXED
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      // Prepare data for backend (match your Django serializer)
      const apiData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.password, // For now, use same password
      };

      console.log("Registering user with data:", apiData);

      const response = await api.post<BackendRegisterResponse>(
        "/users/auth/register/",
        apiData
      );

      const backendData = response.data;

      // Create frontend-compatible response
      const newUserData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: "user",
      };

      const authResponse: AuthResponse = {
        token: backendData.token,
        user: newUserData,
        user_id: backendData.user_id,
      };

      console.log("Registration successful:", authResponse);
      authService.setSession(newUserData, backendData.token);

      return {
        data: authResponse,
        status: response.status,
        message: "Registration successful",
      };
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle backend validation errors
      let errorMessage = "Registration failed";
      if (error.response?.data) {
        const backendErrors = error.response.data;

        // Handle field-specific errors
        if (typeof backendErrors === "object") {
          const errorMessages = [];
          for (const [key, value] of Object.entries(backendErrors)) {
            if (Array.isArray(value)) {
              errorMessages.push(`${key}: ${value[0]}`);
            } else {
              errorMessages.push(`${key}: ${value}`);
            }
          }
          errorMessage = errorMessages.join(", ");
        } else if (typeof backendErrors === "string") {
          errorMessage = backendErrors;
        } else if (backendErrors.detail) {
          errorMessage = backendErrors.detail;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },

  // Logout user
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      // Call backend logout endpoint
      await api.post("/users/auth/logout/");

      // Clear session data
      authService.clearSession();

      return {
        data: null,
        status: 200,
        message: "Logged out successfully",
      };
    } catch (error) {
      console.error("Logout error:", error);
      // Clear session even if API call fails
      authService.clearSession();
      throw error;
    }
  },

  // Get current user info
  getCurrentUser: async (): Promise<ApiResponse<UserData>> => {
    try {
      const response = await api.get("/users/me/");
      const backendData = response.data;

      const userData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: "user",
        avatar: backendData.profile?.avatar,
      };

      return {
        data: userData,
        status: response.status,
        message: "User data retrieved successfully",
      };
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  },

  // Request password reset
  forgotPassword: async (
    data: PasswordResetRequest
  ): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/auth/forgot-password', data);
      // return response.data;

      // Mock response for now
      return {
        data: null,
        status: 200,
        message: "Password reset instructions sent to your email",
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (
    data: PasswordResetConfirm
  ): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/auth/reset-password', data);
      // return response.data;

      // Mock response for now
      return {
        data: null,
        status: 200,
        message: "Password reset successful",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },

  // Validate reset token
  validateToken: async (
    token: string
  ): Promise<ApiResponse<{ valid: boolean }>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<{ valid: boolean }>>('/auth/validate-token', { token });
      // return response.data;

      // Mock response for now
      return {
        data: { valid: true },
        status: 200,
        message: "Token is valid",
      };
    } catch (error) {
      console.error("Token validation error:", error);
      throw error;
    }
  },

  // Session management functions

  // Store user session data
  setSession: (userData: UserData, token: string): void => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    // Set default authorization header for future requests
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Dispatch event for components that need to react to auth changes
    window.dispatchEvent(
      new CustomEvent("auth_changed", { detail: { userData } })
    );
  },

  // Clear user session data
  clearSession: (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    // Remove authorization header
    delete api.defaults.headers.common["Authorization"];

    // Dispatch event for components that need to react to auth changes
    window.dispatchEvent(
      new CustomEvent("auth_changed", { detail: { userData: null } })
    );
  },

  // Initialize auth state from localStorage
  initializeAuth: (): void => {
    const token = authService.getToken();
    const userData = authService.getUserData();

    if (token && userData) {
      // Set authorization header for future requests
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
  },

  // Get current user data
  getUserData: (): UserData | null => {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        return JSON.parse(userData) as UserData;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
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
      console.error("Error parsing user data:", error);
    }
    return "guest";
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
  },
};

// Initialize auth when module loads
authService.initializeAuth();
