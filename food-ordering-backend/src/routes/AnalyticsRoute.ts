import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import AnalyticsController from "../controllers/AnalyticsController";
import Order from "../models/order";
import Restaurant from "../models/restaurant";

const router = express.Router();

// /api/business-insights
router.get("/", jwtCheck, jwtParse, AnalyticsController.getAnalyticsData);

// Development endpoint for testing (remove in production)
router.get("/test", AnalyticsController.getAnalyticsData);

// Simple test endpoint to check database connection
router.get("/db-test", async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.json({
      message: "Database connection OK",
      orderCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log("DB test error:", error);
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Debug endpoint to check raw order data
router.get("/debug-orders", async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("restaurant", "restaurantName cuisines")
      .sort({ createdAt: -1 });
    const orderData = orders.map((order: any) => ({
      id: order._id,
      city: order.deliveryDetails?.city || "NO CITY",
      amount: order.totalAmount || 0,
      createdAt: order.createdAt,
      restaurant: order.restaurant
        ? {
            id: order.restaurant._id,
            name: order.restaurant.restaurantName,
            cuisines: order.restaurant.cuisines,
          }
        : null,
    }));
    res.json({
      totalOrders: orders.length,
      orders: orderData,
    });
  } catch (error) {
    console.log("Debug orders error:", error);
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Debug endpoint to check restaurants and their cuisines
router.get("/debug-restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    const restaurantData = restaurants.map((restaurant: any) => ({
      id: restaurant._id,
      name: restaurant.restaurantName,
      cuisines: restaurant.cuisines,
      city: restaurant.city,
    }));
    res.json({
      totalRestaurants: restaurants.length,
      restaurants: restaurantData,
    });
  } catch (error) {
    console.log("Debug restaurants error:", error);
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
