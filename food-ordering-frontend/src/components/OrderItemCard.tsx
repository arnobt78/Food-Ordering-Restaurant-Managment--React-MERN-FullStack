import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Clock,
  DollarSign,
  Package,
  CheckCircle,
  AlertCircle,
  Truck,
  ChefHat,
  Eye,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  order: Order;
  showStatusSelector?: boolean;
};

const OrderItemCard = ({ order, showStatusSelector = true }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      await updateRestaurantStatus({
        orderId: order._id as string,
        status: newStatus,
      });
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const getDateTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const year = orderDateTime.getFullYear();
    const month = String(orderDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(orderDateTime.getDate()).padStart(2, "0");
    const hours = String(orderDateTime.getHours()).padStart(2, "0");
    const minutes = String(orderDateTime.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{order.deliveryDetails.name}</span>
          </div>
          <Badge className={getStatusColor(status)}>
            {getStatusIcon(status)}
            <span className="ml-1">
              {ORDER_STATUS.find((s) => s.value === status)?.label}
            </span>
          </Badge>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{getDateTime()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>{order.cartItems.length} items</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order Items:
          </div>
          <div className="space-y-2">
            {order.cartItems.map((cartItem, idx) => (
              <div
                key={cartItem.menuItemId || cartItem.name + idx}
                className="flex items-center gap-2 text-sm"
              >
                <Badge variant="outline" className="text-xs">
                  {cartItem.quantity}
                </Badge>
                <span>{cartItem.name}</span>
              </div>
            ))}
          </div>
        </div>

        {showStatusSelector && (
          <div className="flex flex-col space-y-1.5 pt-3 border-t">
            <Label htmlFor="status" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Update Order Status
            </Label>
            <Select
              value={status}
              disabled={isLoading}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent position="popper">
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
          <Button variant="outline" size="sm" className="flex-1">
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
  );
};

export default OrderItemCard;
