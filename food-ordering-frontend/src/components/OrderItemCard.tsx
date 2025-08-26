import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Date & Time:
            <span className="ml-2 font-normal">{getDateTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              £{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem, idx) => (
            <span key={cartItem.menuItemId || cartItem.name + idx}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        {showStatusSelector && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">What is the status of this order?</Label>
            <Select
              value={status}
              disabled={isLoading}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
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
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
