import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  MapPin,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react";
import { useGetAnalytics } from "../api/BusinessInsightsApi";

interface AnalyticsData {
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

const AnalyticsDashboardPage = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const {
    data: analyticsData,
    isLoading,
    error,
    refetch,
  } = useGetAnalytics(timeRange);

  const refreshData = async () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [timeRange, refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "outForDelivery":
        return "bg-blue-100 text-blue-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "placed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Business Insights Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Business insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading business insights data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading business insights data
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Please try refreshing the page or contact support if the
                  problem persists.
                </p>
              </div>
            </div>
          </div>
        ) : analyticsData ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(analyticsData.totalOrders)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analyticsData.orderGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    {Math.abs(analyticsData.orderGrowth)}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData.totalRevenue)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {analyticsData.revenueGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    {Math.abs(analyticsData.revenueGrowth)}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Order Value
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData.averageOrderValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Per order average
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(analyticsData.totalCustomers)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active customers
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
                <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Orders Trend</CardTitle>
                      <CardDescription>
                        Order volume over the past 12 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analyticsData.monthlyData.map(
                          (data: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm font-medium">
                                {data.month}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (data.orders /
                                          Math.max(
                                            ...analyticsData.monthlyData.map(
                                              (d: any) => d.orders
                                            )
                                          )) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12">
                                  {data.orders}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Growth</CardTitle>
                      <CardDescription>
                        Revenue trends and projections
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analyticsData.monthlyData
                          .slice(-6)
                          .map((data: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm font-medium">
                                {data.month}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (data.revenue /
                                          Math.max(
                                            ...analyticsData.monthlyData.map(
                                              (d: any) => d.revenue
                                            )
                                          )) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-16">
                                  {formatCurrency(data.revenue)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="geography" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Top Cities by Orders
                    </CardTitle>
                    <CardDescription>
                      Most active cities in terms of orders and revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topCities.map((city: any, index: any) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-orange-600">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{city.city}</p>
                              <p className="text-sm text-gray-600">
                                {formatNumber(city.orders)} orders
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatCurrency(city.revenue)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {(
                                (city.revenue / analyticsData.totalRevenue) *
                                100
                              ).toFixed(1)}
                              % of total
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cuisines" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Popular Cuisines
                    </CardTitle>
                    <CardDescription>
                      Order distribution by cuisine type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topCuisines.map(
                        (cuisine: any, index: any) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor: `hsl(${
                                    index * 60
                                  }, 70%, 50%)`,
                                }}
                              ></div>
                              <span className="font-medium">
                                {cuisine.cuisine}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">
                                {formatNumber(cuisine.orders)} orders
                              </span>
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${cuisine.percentage}%`,
                                    backgroundColor: `hsl(${
                                      index * 60
                                    }, 70%, 50%)`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-12">
                                {cuisine.percentage}%
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Orders
                    </CardTitle>
                    <CardDescription>
                      Latest orders and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.recentOrders.map(
                        (order: any, index: any) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-600">
                                  #{index + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-gray-600">
                                  {order.id}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">
                                {formatCurrency(order.amount)}
                              </span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {order.date}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
