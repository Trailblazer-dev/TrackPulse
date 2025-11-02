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
  refresh_token?: string;
  user: UserData;
  user_id?: string;
}

// Backend response interfaces
interface BackendAuthResponse {
  access: string; // JWT access token
  refresh: string; // JWT refresh token
  user_id: string;
  username: string;
  email: string;
}

interface BackendRegisterResponse {
  access: string; // JWT access token
  refresh: string; // JWT refresh token
  user_id: string;
  username: string;
  email: string;
}

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
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
const USER_STORAGE_KEY = "user_data";

export const authService = {
  // Login user - UPDATED FOR JWT
  login: async (
    credentials: AuthCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      console.log("Attempting login with:", credentials.email);

      const response = await api.post<BackendAuthResponse>(
        "/users/auth/login/",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      const backendData = response.data;
      console.log("Login response received:", backendData);

      // Create frontend-compatible response
      const userData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: "user",
      };

      const authResponse: AuthResponse = {
        token: backendData.access, // JWT access token
        refresh_token: backendData.refresh, // JWT refresh token
        user: userData,
        user_id: backendData.user_id,
      };

      console.log("Login successful, setting session...");
      authService.setSession(userData, backendData.access, backendData.refresh);

      return {
        data: authResponse,
        status: response.status,
        message: "Login successful",
      };
    } catch (error: any) {
      console.error("Login error:", error);

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

  // Register new user - UPDATED FOR JWT
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      // Prepare data for backend
      const apiData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.password_confirm, // Use the actual confirm password
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
        token: backendData.access, // JWT access token
        refresh_token: backendData.refresh, // JWT refresh token
        user: newUserData,
        user_id: backendData.user_id,
      };

      console.log("Registration successful:", authResponse);
      authService.setSession(
        newUserData,
        backendData.access,
        backendData.refresh
      );

      return {
        data: authResponse,
        status: response.status,
        message: "Registration successful",
      };
    } catch (error: any) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed";
      if (error.response?.data) {
        const backendErrors = error.response.data;

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

  // Logout user - UPDATED FOR JWT
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      const token = authService.getToken();
      console.log("Logout initiated, token present:", !!token);

      // Call backend logout
      const response = await api.post("/users/auth/logout/");
      console.log("Backend logout response:", response.data);

      // Clear session data
      authService.clearSession();

      return {
        data: null,
        status: response.status,
        message: response.data?.message || "Logged out successfully",
      };
    } catch (error: any) {
      console.error("Logout process error:", error);

      // Always clear session, even if API call fails
      authService.clearSession();

      // For JWT, logout is client-side anyway
      return {
        data: null,
        status: 200,
        message: "Logged out successfully",
      };
    }
  },

  // Session management functions - UPDATED FOR JWT
  setSession: (
    userData: UserData,
    accessToken: string,
    refreshToken?: string
  ): void => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    }

    // Set default authorization header for future requests - USE Bearer FOR JWT
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // Dispatch event for components that need to react to auth changes
    window.dispatchEvent(
      new CustomEvent("auth_changed", { detail: { userData } })
    );
  },

  // Clear user session data
  clearSession: (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
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
      // Set default authorization header for future requests - USE Bearer FOR JWT
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  // Get refresh token
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
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

  // Refresh token method (for future use)
  refreshToken: async (): Promise<ApiResponse<{ access: string }>> => {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post<{ access: string }>(
        "/users/auth/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;

      // Update the stored access token
      localStorage.setItem(TOKEN_STORAGE_KEY, newAccessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

      return {
        data: response.data,
        status: response.status,
        message: "Token refreshed successfully",
      };
    } catch (error) {
      console.error("Token refresh error:", error);
      // Clear session if refresh fails
      authService.clearSession();
      throw error;
    }
  },
};

// Initialize auth when module loads
authService.initializeAuth();
