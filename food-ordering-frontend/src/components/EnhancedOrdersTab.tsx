import { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import {
  Search,
  Filter,
  Clock,
  User,
  MapPin,
  DollarSign,
  Package,
  CheckCircle,
  AlertCircle,
  Truck,
  ChefHat,
  Calendar,
  Eye,
  Phone,
  Mail,
  TrendingUp,
  BarChart3,
} from "lucide-react";

interface EnhancedOrdersTabProps {
  orders: Order[];
  showStatusSelector?: boolean;
}

const EnhancedOrdersTab = ({
  orders,
  showStatusSelector = true,
}: EnhancedOrdersTabProps) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Local state to track order status changes
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  // Update local orders when props change
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Calculate order statistics from local orders
  const totalOrders = localOrders.length;
  const totalRevenue = localOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusCounts = localOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return "bg-gray-100 text-gray-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "outForDelivery":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return <AlertCircle className="h-4 w-4" />;
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "inProgress":
        return <ChefHat className="h-4 w-4" />;
      case "outForDelivery":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount / 100);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${weekday}, ${day}.${month}.${year}`;
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await updateRestaurantStatus({
        orderId,
        status: newStatus,
      });

      // Update local state immediately after successful API call
      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Update selected order if it's the same order
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const filteredOrders = localOrders.filter((order) => {
    const matchesSearch =
      order.deliveryDetails.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.deliveryDetails.addressLine1
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedOrders = filteredOrders.reduce((acc, order) => {
    const d = new Date(order.createdAt);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  // Sort orders within each date group by creation time (newest first)
  Object.keys(groupedOrders).forEach((date) => {
    groupedOrders[date].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  // Create sorted entries for rendering (newest dates first) - using the same logic as OrderStatusPage
  const sortedGroupedOrders = Object.entries(groupedOrders).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  // Debug logging for date grouping
  console.log("Filtered orders:", filteredOrders);
  console.log("Grouped orders:", groupedOrders);
  console.log("Sorted grouped orders:", sortedGroupedOrders);
  console.log(
    "Order dates:",
    filteredOrders.map((order) => ({
      id: order._id,
      createdAt: order.createdAt,
      formattedDate: `${new Date(order.createdAt).getFullYear()}-${String(
        new Date(order.createdAt).getMonth() + 1
      ).padStart(2, "0")}-${String(
        new Date(order.createdAt).getDate()
      ).padStart(2, "0")}`,
      status: order.status,
      customer: order.deliveryDetails.name,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground">Per order average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {localOrders.filter((o) => o.status !== "delivered").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Order Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ORDER_STATUS.map((status) => (
              <div key={status.value} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon(status.value)}
                </div>
                <div className="text-2xl font-bold">
                  {statusCounts[status.value] || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  {status.label}
                </div>
                <Progress
                  value={
                    totalOrders > 0
                      ? ((statusCounts[status.value] || 0) / totalOrders) * 100
                      : 0
                  }
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-6">
        {sortedGroupedOrders.map(([date, dateOrders]) => (
          <Card key={date}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDateForDisplay(date)}
                </CardTitle>
                <Badge variant="secondary">{dateOrders.length} orders</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {dateOrders.map((order) => (
                  <Card
                    key={order._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {order.deliveryDetails.name}
                          </span>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {
                              ORDER_STATUS.find((s) => s.value === order.status)
                                ?.label
                            }
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {order.deliveryDetails.addressLine1},{" "}
                          {order.deliveryDetails.city}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDateTime(order.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Order Items:</div>
                        <div className="space-y-1">
                          {order.cartItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Badge variant="outline" className="text-xs">
                                {item.quantity}
                              </Badge>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {showStatusSelector && (
                        <div className="pt-3 border-t">
                          <Select
                            value={order.status}
                            disabled={isLoading}
                            onValueChange={(value) =>
                              handleStatusChange(
                                order._id,
                                value as OrderStatus
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              {ORDER_STATUS.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                  disabled={status.value === "placed"}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Details</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Name:</strong> {selectedOrder.deliveryDetails.name}
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    {selectedOrder.deliveryDetails.email}
                  </div>
                  <div>
                    <strong>Address:</strong>{" "}
                    {selectedOrder.deliveryDetails.addressLine1},{" "}
                    {selectedOrder.deliveryDetails.city}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Order ID:</strong> {selectedOrder._id}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {formatDateTime(selectedOrder.createdAt)}
                  </div>
                  <div>
                    <strong>Total:</strong>{" "}
                    {formatCurrency(selectedOrder.totalAmount)}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <Badge
                      className={`ml-2 ${getStatusColor(selectedOrder.status)}`}
                    >
                      {
                        ORDER_STATUS.find(
                          (s) => s.value === selectedOrder.status
                        )?.label
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Order Items</h3>
              <div className="space-y-2">
                {selectedOrder.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span>{item.name}</span>
                    <Badge variant="outline">Qty: {item.quantity}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {showStatusSelector && (
              <div>
                <h3 className="font-medium mb-2">Update Status</h3>
                <Select
                  value={selectedOrder.status}
                  disabled={isLoading}
                  onValueChange={(value) => {
                    handleStatusChange(selectedOrder._id, value as OrderStatus);
                    setSelectedOrder({
                      ...selectedOrder,
                      status: value as OrderStatus,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUS.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value}
                        disabled={status.value === "placed"}
                      >
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedOrdersTab;
