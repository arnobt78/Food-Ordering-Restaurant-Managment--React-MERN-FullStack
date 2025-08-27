import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

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

  // Expand/collapse state for each date group
  const [expandedDates, setExpandedDates] = useState<{
    [date: string]: boolean;
  }>({});
  const [expandedPlacedDates, setExpandedPlacedDates] = useState<{
    [date: string]: boolean;
  }>({});

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
                    <div className="space-y-5">
                      {[...orders]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((order) => (
                          <OrderItemCard
                            key={order._id}
                            order={order}
                            showStatusSelector
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            });
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
            .map(([date, orders]) => {
              const expanded = expandedPlacedDates[date] ?? true;
              return (
                <div key={date} className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-lg font-bold">{date}</div>
                    <Badge variant="secondary">
                      Total placed: {orders.length}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={expanded ? "Collapse" : "Expand"}
                      onClick={() =>
                        setExpandedPlacedDates((prev) => ({
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
                    <div className="space-y-5">
                      {[...orders]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((order) => (
                          <OrderItemCard
                            key={order._id}
                            order={order}
                            showStatusSelector={false}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            });
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
