import api from "../index";
import type { ApiResponse } from "../types";
import { useAuth } from "../../../contexts/UserContext";
import type { User } from "../../../types/user";

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

export interface UserData extends User {
  role: UserRole;
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
  role: UserRole;
}

interface BackendRegisterResponse {
  access: string; // JWT access token
  refresh: string; // JWT refresh token
  user_id: string;
  username: string;
  email: string;
  role: UserRole;
}

export const useAuthService = () => {
  const { setUser, setToken, logout: contextLogout } = useAuth();

  const login = async (
    credentials: AuthCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      console.log("Attempting login with:", credentials.email);

      const response = await api.post<BackendAuthResponse>(
        "/users/auth/jwt/token/",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );

      const backendData = response.data;
      console.log("Login response received:", backendData);

      const userData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: backendData.role || "user",
      };

      const authResponse: AuthResponse = {
        token: backendData.access,
        refresh_token: backendData.refresh,
        user: userData,
        user_id: backendData.user_id,
      };

      console.log("Login successful, setting session...");
      setToken(authResponse.token);
      setUser(authResponse.user);

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
  };

  const register = async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const apiData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.password_confirm,
      };

      console.log("Registering user with data:", apiData);

      const response = await api.post<BackendRegisterResponse>(
        "/users/auth/register/",
        apiData
      );

      const backendData = response.data;

      const newUserData: UserData = {
        id: backendData.user_id,
        username: backendData.username,
        email: backendData.email,
        role: "user",
      };

      const authResponse: AuthResponse = {
        token: backendData.access,
        refresh_token: backendData.refresh,
        user: newUserData,
        user_id: backendData.user_id,
      };

      console.log("Registration successful:", authResponse);
      setToken(authResponse.token);
      setUser(authResponse.user);

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
  };

  const logout = async (): Promise<ApiResponse<null>> => {
    try {
      await api.post("/users/auth/logout/");
    } catch (error) {
      console.error("Backend logout failed, proceeding with client-side logout.", error);
    } finally {
      contextLogout();
    }

    return {
      data: null,
      status: 200,
      message: "Logged out successfully",
    };
  };

  const refreshToken = async (refreshToken: string): Promise<string | null> => {
    try {
      const response = await api.post<{ access: string }>("/users/auth/jwt/token/refresh/", {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      setToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      await api.post("/users/auth/jwt/token/verify/", { token });
      return true;
    } catch (error) {
      console.error("Token verification failed", error);
      return false;
    }
  };

  return { login, register, logout, refreshToken, verifyToken };
};