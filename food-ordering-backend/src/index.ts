import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";
import analyticsRoute from "./routes/AnalyticsRoute";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Track server start time for uptime calculation
const serverStartTime = Date.now();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://mern-food-ordering.netlify.app",
      "https://mern-food-ordering-hnql.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

// Root route for Render deployment
app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1>🍔 BigHungers Food Ordering Backend is Running!</h1><p>Welcome to the API server. See <a href='https://github.com/arnobt78/MERN-Food-Ordering--React-FullStack'>project docs</a> for usage.</p>`
  );
});

app.get("/health", async (req: Request, res: Response) => {
  const uptime = Math.floor((Date.now() - serverStartTime) / 1000);
  res.json({
    message: "health OK!",
    uptime: uptime,
    timestamp: new Date().toISOString(),
    serverStartTime: new Date(serverStartTime).toISOString(),
  });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);
app.use("/api/business-insights", analyticsRoute);

app.listen(7001, () => {
  console.log("server started on localhost:7001");
});
