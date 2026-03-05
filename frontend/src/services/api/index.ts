import axios from "axios";

// Get the base API URL from environment or default to local development
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle common errors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    // Add Bearer token to all requests except login/register and guest endpoints
    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      config.url &&
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register") &&
      !config.url.includes("/auth/jwt/token") &&
      !config.url.includes("/guest/")
    ) {
      // Use 'Bearer' for JWT authentication
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        `Adding Bearer token to request: ${config.method?.toUpperCase()} ${
          config.url
        }`
      );
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);



export default api;

// Export all API services
export * from "./types";
export * from "./auth";

// Admin services
export * from "./admin/auditLogs";

// User services
export * from "./user/dashboard";
export * from "./user/profile";
export * from "./user/bookmarks";
export * from "./user/reports";

// Shared services
export * from "./settings";
