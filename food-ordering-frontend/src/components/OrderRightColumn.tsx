import { Order } from "@/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ShoppingBag, DollarSign, Hash } from "lucide-react";

type Props = {
  order: Order;
};

const OrderRightColumn = ({ order }: Props) => {
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount / 100);
  };
  // Helper function to format date and time
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

  // Helper function to get order number (last 6 characters of _id)
  const getOrderNumber = (orderId: string) => {
    return orderId.slice(-6).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Restaurant Image */}
      {/* <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Restaurant Image
        </div>
        <AspectRatio ratio={16 / 5}>
          <img
            src={order.restaurant.imageUrl}
            alt={order.restaurant.restaurantName}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="text-center text-sm text-muted-foreground">
          {order.restaurant.restaurantName}
        </div>
      </div> */}

      {/* Order Information */}
      <Card className="">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="h-5 w-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Order Number</div>
              <div className="font-mono font-medium">
                #{getOrderNumber(order._id)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Order Date</div>
              <div className="font-medium">
                {formatDateTime(order.createdAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.cartItems.map((item, idx) => (
              <div
                key={item.menuItemId || item.name + idx}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">
                    {item.quantity}
                  </Badge>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">
                {formatCurrency(order.restaurant.deliveryPrice)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  order.totalAmount + order.restaurant.deliveryPrice
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderRightColumn;
