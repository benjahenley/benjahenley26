import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import Cookies from "js-cookie";

// Define the types for our hook
interface UseAuthenticatedFetchOptions {
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

interface UseAuthenticatedFetchReturn {
  fetch: (url: string, options?: FetchOptions) => Promise<any>;
  storeAuthTokens: (loginResponse: {
    accessToken: string;
    refreshToken: string;
    userData: any;
  }) => {
    accessToken: string;
    refreshToken: string;
    userData: any;
  };
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

// Cookie names for storing tokens
const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

/**
 * Custom hook for making authenticated API requests
 * Automatically adds the token from cookies to Authorization header
 * Handles token refresh if necessary using NestJS backend endpoints
 */
const useAuthenticatedFetch = (
  defaultOptions: UseAuthenticatedFetchOptions = {}
): UseAuthenticatedFetchReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  // Check for token in cookies on mount
  useEffect(() => {
    const tokenFromCookie = Cookies.get(ACCESS_TOKEN_COOKIE);
    if (tokenFromCookie && !accessToken) {
      setAccessToken(tokenFromCookie);
    }
  }, [accessToken, setAccessToken]);

  /**
   * Handles the refresh token process
   * @returns A new access token if successful
   */
  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        // If refresh fails, clear all tokens
        Cookies.remove(ACCESS_TOKEN_COOKIE);
        Cookies.remove(REFRESH_TOKEN_COOKIE);
        setAccessToken(null);
        return null;
      }

      const data = await response.json();

      // Store the new access token
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        Cookies.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        // If we received a new refresh token, store it too
        if (data.refreshToken) {
          Cookies.set(REFRESH_TOKEN_COOKIE, data.refreshToken, {
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
          });
        }

        return data.accessToken;
      }

      return null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const fetchWithAuth = useCallback(
    async (url: string, options: FetchOptions = {}): Promise<any> => {
      try {
        setLoading(true);
        setError(null);

        // Get the token from the atom or try to get it from cookies again
        let token = accessToken || Cookies.get(ACCESS_TOKEN_COOKIE);

        // Create headers with auth token if not explicitly skipping auth
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(defaultOptions.headers || {}),
          ...((options.headers as Record<string, string>) || {}),
        };

        if (!options.skipAuth && token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Prepare the fetch options
        const fetchOptions: RequestInit = {
          ...options,
          headers,
          credentials:
            options.credentials || defaultOptions.credentials || "include",
        };

        // Make the request
        let response = await fetch(url, fetchOptions);

        // If unauthorized, try to refresh the token
        if (response.status === 401 && !options.skipAuth) {
          const newToken = await refreshAccessToken();

          // If we got a new token, retry the original request
          if (newToken) {
            headers["Authorization"] = `Bearer ${newToken}`;
            response = await fetch(url, {
              ...fetchOptions,
              headers,
            });
          } else {
            // If refresh failed and we're not already at the login page, redirect
            if (
              typeof window !== "undefined" &&
              !window.location.pathname.includes("login")
            ) {
              // Optional: Redirect to login
              // window.location.href = '/login';
            }

            throw new Error("Authentication failed. Please log in again.");
          }
        }

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Request failed with status ${response.status}`
          );
        }

        // Parse and return the response data
        const data = await response.json();
        return data;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [accessToken, defaultOptions, setAccessToken]
  );

  /**
   * Stores authentication tokens from a login response
   * @param loginResponse The response from the login endpoint
   */
  const storeAuthTokens = useCallback(
    (loginResponse: {
      accessToken: string;
      refreshToken: string;
      userData: any;
    }) => {
      const { accessToken, refreshToken } = loginResponse;

      // Store in cookies
      Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      // Update global state
      setAccessToken(accessToken);

      return loginResponse;
    },
    [setAccessToken]
  );

  /**
   * Clears all authentication tokens (for logout)
   */
  const logout = useCallback(async () => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

    // Call the revoke endpoint if we have a refresh token
    if (refreshToken) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/revoke-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
            credentials: "include",
          }
        );
      } catch (error) {
        console.error("Error revoking token:", error);
      }
    }

    // Clear cookies regardless of revoke success
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);

    // Clear global state
    setAccessToken(null);
  }, [setAccessToken]);

  return {
    fetch: fetchWithAuth,
    storeAuthTokens,
    logout,
    loading,
    error,
  };
};

export default useAuthenticatedFetch;
