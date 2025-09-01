import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import EnhancedOrdersTab from "@/components/EnhancedOrdersTab";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "react-query";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const {
    orders,
    isLoading: ordersLoading,
    refetch,
  } = useGetMyRestaurantOrders();
  const queryClient = useQueryClient();

  const isEditing = !!restaurant;

  const visibleStatuses = ["paid", "inProgress", "outForDelivery", "delivered"];
  const visibleOrders = orders?.filter((order) =>
    visibleStatuses.includes(order.status)
  );
  const placedOrders = orders?.filter((order) => order.status === "placed");

  // Debug logging to see what orders we're getting
  console.log("All orders:", orders);
  console.log("Visible orders (paid+):", visibleOrders);
  console.log("Placed orders:", placedOrders);
  console.log(
    "Order statuses:",
    orders?.map((order) => ({
      id: order._id,
      status: order.status,
      customer: order.deliveryDetails.name,
      date: order.createdAt,
    }))
  );

  const handleRefreshOrders = () => {
    queryClient.invalidateQueries("fetchMyRestaurantOrders");
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Restaurant</h1>
        <Button
          onClick={handleRefreshOrders}
          disabled={ordersLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${ordersLoading ? "animate-spin" : ""}`}
          />
          Refresh Orders
        </Button>
      </div>

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
          {ordersLoading ? (
            <div className="text-center py-8">
              <div className="text-lg font-medium">Loading orders...</div>
            </div>
          ) : (
            <EnhancedOrdersTab
              orders={visibleOrders || []}
              showStatusSelector={true}
            />
          )}
        </TabsContent>
        <TabsContent
          value="placed-orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          {ordersLoading ? (
            <div className="text-center py-8">
              <div className="text-lg font-medium">Loading orders...</div>
            </div>
          ) : (
            <EnhancedOrdersTab
              orders={placedOrders || []}
              showStatusSelector={false}
            />
          )}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurantPage;
