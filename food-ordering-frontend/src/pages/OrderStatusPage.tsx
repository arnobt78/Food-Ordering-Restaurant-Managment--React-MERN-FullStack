import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

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

  // Group visible orders by date
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
          .map(([date, orders]) => (
            <div key={date} className="mb-8">
              <div className="text-lg font-bold mb-4">{date}</div>
              <div className="space-y-10">
                {orders.map((order) => (
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
            </div>
          ));
      })()}
    </div>
  );
};

export default OrderStatusPage;
