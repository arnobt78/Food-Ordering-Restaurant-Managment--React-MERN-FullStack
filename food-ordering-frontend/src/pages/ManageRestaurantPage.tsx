import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  const visibleStatuses = ["paid", "inProgress", "outForDelivery", "delivered"];
  const visibleOrders = orders?.filter((order) =>
    visibleStatuses.includes(order.status)
  );
  const placedOrders = orders?.filter((order) => order.status === "placed");

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="placed-orders">
          Orders Placed but Not Paid
        </TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {visibleOrders?.length} active orders
        </h2>
        {/* Group orders by date */}
        {(() => {
          if (!visibleOrders || visibleOrders.length === 0) return null;
          // Group orders by date string (YYYY-MM-DD)
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
                <div className="space-y-5">
                  {orders.map((order) => (
                    <OrderItemCard
                      key={order._id}
                      order={order}
                      showStatusSelector
                    />
                  ))}
                </div>
              </div>
            ));
        })()}
      </TabsContent>
      <TabsContent
        value="placed-orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {placedOrders?.length || 0} orders placed but not paid
        </h2>
        {placedOrders?.length === 0 && <div>No placed (unpaid) orders.</div>}
        {/* Group placed orders by date */}
        {(() => {
          if (!placedOrders || placedOrders.length === 0) return null;
          // Group orders by date string (YYYY-MM-DD)
          const grouped: { [date: string]: typeof placedOrders } = {};
          placedOrders.forEach((order) => {
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
                <div className="space-y-5">
                  {orders.map((order) => (
                    <OrderItemCard
                      key={order._id}
                      order={order}
                      showStatusSelector={false}
                    />
                  ))}
                </div>
              </div>
            ));
        })()}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
