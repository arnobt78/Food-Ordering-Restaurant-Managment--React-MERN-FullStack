import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  // Group visible orders by date with expand/collapse
  const [expandedDates, setExpandedDates] = useState<{
    [date: string]: boolean;
  }>({});

  if (isLoading) {
    return "Loading...";
  }

  const visibleStatuses = [
    "placed",
    "paid",
    "inProgress",
    "outForDelivery",
    "delivered",
  ];
  const visibleOrders = orders?.filter((order) =>
    visibleStatuses.includes(order.status)
  );

  if (!visibleOrders || visibleOrders.length === 0) {
    return "No orders found";
  }

  return (
    <div className="space-y-10">
      {(() => {
        if (!visibleOrders || visibleOrders.length === 0) return null;
        const grouped: { [date: string]: typeof visibleOrders } = {};
        visibleOrders.forEach((order) => {
          const d = new Date(order.createdAt);
          const dateStr = `${d.getFullYear()}-${String(
            d.getMonth() + 1
          ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (!grouped[dateStr]) grouped[dateStr] = [];
          grouped[dateStr].push(order);
        });
        return Object.entries(grouped)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([date, orders]) => {
            const expanded = expandedDates[date] ?? true;
            return (
              <div key={date} className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-lg font-bold">{date}</div>
                  <Badge variant="secondary">
                    Total ordered: {orders.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={expanded ? "Collapse" : "Expand"}
                    onClick={() =>
                      setExpandedDates((prev) => ({
                        ...prev,
                        [date]: !expanded,
                      }))
                    }
                  >
                    <ChevronUp
                      className={`transition-transform duration-300 ${
                        expanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Button>
                </div>
                {expanded && (
                  <div className="space-y-10">
                    {[...orders]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .map((order) => (
                        <div
                          key={order._id}
                          className="space-y-10 bg-gray-50 p-10 rounded-lg"
                        >
                          <OrderStatusHeader order={order} />
                          {order.status === "placed" && (
                            <div className="text-red-600 font-semibold">
                              The order is placed but not paid, so the order is
                              cancelled or invalid.
                            </div>
                          )}
                          <div className="grid gap-10 md:grid-cols-2">
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 5}>
                              <img
                                src={order.restaurant.imageUrl}
                                className="rounded-md object-cover h-full w-full"
                              />
                            </AspectRatio>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          });
      })()}
    </div>
  );
};

export default OrderStatusPage;
