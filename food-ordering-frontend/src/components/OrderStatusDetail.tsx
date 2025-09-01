import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, MapPin, User, Mail, Clock } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-6">
      {/* Restaurant Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" />
            Restaurant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="space-y-0">
              <div className="text-muted-foreground text-sm">
                Restaurant Name
              </div>
              <div className="font-medium">
                {order.restaurant.restaurantName}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0 text-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {order.restaurant.city}, {order.restaurant.country}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Estimated delivery: {order.restaurant.estimatedDeliveryTime}{" "}
                  minutes
                </span>
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-2">
              {order.restaurant.cuisines.map((cuisine, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cuisine}
                </Badge>
              ))}
            </div> */}

            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt={order.restaurant.restaurantName}
                className="rounded-md object-cover h-full w-full mt-2"
              />
            </AspectRatio>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            Delivery Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column - Customer Info */}
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-muted-foreground text-sm">
                  Customer Name
                </div>
                <div className="font-medium">{order.deliveryDetails.name}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>{order.deliveryDetails.email}</span>
              </div>
            </div>

            {/* Right Column - Delivery Address */}
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-muted-foreground text-sm">
                  Delivery Address
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium">
                      {order.deliveryDetails.addressLine1}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.deliveryDetails.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatusDetail;
