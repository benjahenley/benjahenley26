import { useState } from "react";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

// Define types for API responses to improve type safety
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  email: string;
  handle: string;
  userFirstName: string;
  userLastName: string;
  // Add other user fields as needed
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userData: UserData;
}

/**
 * A higher-level hook that provides methods for common API operations
 * using the authenticated fetch hook
 */
const useAuthenticatedApi = () => {
  const {
    fetch,
    storeAuthTokens,
    logout: logoutFetch,
    loading,
    error,
  } = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<Error | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Base API URL from environment variable
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  /**
   * Login user with email and password
   */
  const login = async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<UserData>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        skipAuth: true, // Skip auth for login request
      });

      // Store tokens and user data
      const authData = storeAuthTokens(response as AuthResponse);
      setUserData(authData.userData);

      return {
        data: authData.userData,
        success: true,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null as unknown as UserData,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<ApiResponse<null>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      await logoutFetch();
      setUserData(null);
      return { data: null, success: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generic GET request
   */
  const get = async <T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Build URL with query parameters
      const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const data = await fetch(url.toString());
      return { data, success: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null as unknown as T,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generic POST request
   */
  const post = async <T, D = any>(
    endpoint: string,
    body: D
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const data = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      return { data, success: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null as unknown as T,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generic PUT request
   */
  const put = async <T, D = any>(
    endpoint: string,
    body: D
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const data = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      return { data, success: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null as unknown as T,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generic DELETE request
   */
  const del = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    setIsLoading(true);
    setApiError(null);

    try {
      const data = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
      });
      return { data, success: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setApiError(error);
      return {
        data: null as unknown as T,
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Custom API methods specific to your application
  const createComment = async (tweetId: string, content: string) => {
    return post<{ id: string }>("/api/comments", { tweetId, content });
  };

  const getTweets = async (language: string, category: string) => {
    return get<any[]>("/api/tweets", { language, category });
  };

  return {
    get,
    post,
    put,
    delete: del,
    login,
    logout,
    userData,
    createComment,
    getTweets,
    loading: isLoading || loading,
    error: apiError || error,
  };
};

export default useAuthenticatedApi;
