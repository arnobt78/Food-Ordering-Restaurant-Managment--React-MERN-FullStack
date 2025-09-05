import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalCustomers: number;
  orderGrowth: number;
  revenueGrowth: number;
  topCities: { city: string; orders: number; revenue: number }[];
  topCuisines: { cuisine: string; orders: number; percentage: number }[];
  recentOrders: {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }[];
  monthlyData: { month: string; orders: number; revenue: number }[];
}

/**
 * Hook to fetch business insights data
 * Uses Auth0 authentication with automatic fallback to test endpoint
 */
export const useGetAnalytics = (timeRange: string = "30d") => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  return useQuery(
    ["analytics", timeRange],
    async (): Promise<AnalyticsData> => {
      // If user is authenticated, try with JWT token
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await fetch(
            `${API_BASE_URL}/api/business-insights?timeRange=${timeRange}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            return response.json();
          }
        } catch (error) {
          console.log("Authentication failed, falling back to test endpoint");
        }
      }

      // Fallback to test endpoint (no authentication required)
      const response = await fetch(
        `${API_BASE_URL}/api/business-insights/test?timeRange=${timeRange}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      return response.json();
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 30 * 1000, // 30 seconds
    }
  );
};
