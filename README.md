# BigHungers - Food Ordering Management System - React, Express.js FullStack MERN Project

![Screenshot 2025-09-01 at 15 44 06](https://github.com/user-attachments/assets/ca1e8188-6070-4742-893b-c4e75f27286e)
![Screenshot 2025-09-01 at 15 45 22](https://github.com/user-attachments/assets/e07cdafd-b592-4232-9df7-2eaeaa0ae1b4)
![Screenshot 2025-09-01 at 15 45 47](https://github.com/user-attachments/assets/1d76489d-8c83-47d8-9482-06c737e7c0dd)
![Screenshot 2025-09-01 at 15 46 09](https://github.com/user-attachments/assets/4f754a71-b5c1-4f92-8cde-eaf71152631f)
![Screenshot 2025-09-01 at 15 47 13](https://github.com/user-attachments/assets/5038042a-684c-4c1d-8536-372142d8b102)
![Screenshot 2025-09-01 at 15 47 56](https://github.com/user-attachments/assets/4876c243-6f70-4f05-a3cc-58f9ec301005)
![Screenshot 2025-09-01 at 15 48 16](https://github.com/user-attachments/assets/815a1ea6-122e-4631-af15-68f00f3addd2)
![Screenshot 2025-09-01 at 15 48 25](https://github.com/user-attachments/assets/b4df32e9-21c6-4344-b457-aacbf51e696e)
![Screenshot 2025-09-01 at 15 48 34](https://github.com/user-attachments/assets/63632191-2c7b-4132-9897-47a11426230f)
![Screenshot 2025-09-01 at 15 49 24](https://github.com/user-attachments/assets/8805ed2a-991d-458d-8cac-51021c4f5b6a)
![Screenshot 2025-09-01 at 15 49 54](https://github.com/user-attachments/assets/5d726738-c14b-4eac-8d30-0ee8fbf02f10)
![Screenshot 2025-09-01 at 15 50 29](https://github.com/user-attachments/assets/05c0589d-3603-4da1-8584-57f29a553be3)
![Screenshot 2025-09-01 at 15 50 42](https://github.com/user-attachments/assets/7a024ad6-2cb6-4dea-a5b1-df85fa076d5d)

---

A comprehensive, modern food ordering platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time order management, payment processing, analytics dashboard, and advanced search capabilities.

- **Frontend-Live:** [https://mern-food-ordering.netlify.app/](https://mern-food-ordering.netlify.app/)
- **Backend-Live:** [https://mern-food-ordering-hnql.onrender.com](https://mern-food-ordering-hnql.onrender.com)

![Food Ordering Platform](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green)
![Stripe](https://img.shields.io/badge/Stripe-14.15.0-purple)
![Auth0](https://img.shields.io/badge/Auth0-2.2.4-orange)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Component Library](#-component-library)
- [Key Features Walkthrough](#-key-features-walkthrough)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🍽️ Core Functionality

- **Restaurant Management**: Complete CRUD operations for restaurants
- **Menu Management**: Dynamic menu creation and management
- **Order Processing**: Real-time order tracking and status updates
- **Payment Integration**: Secure Stripe payment processing
- **User Authentication**: Auth0-based secure authentication

### 📊 Advanced Features

- **Analytics Dashboard**: Business insights with charts and metrics
- **Advanced Search**: Multi-filter search with real-time results
- **API Documentation**: Interactive Swagger-like API docs
- **Performance Monitoring**: Real-time system health monitoring
- **Order Status Tracking**: Comprehensive order lifecycle management

### 🎨 User Experience

- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Shadcn/ui components with Tailwind CSS
- **Real-time Updates**: Live order status and notifications
- **Toast Notifications**: Professional status feedback
- **Dark/Light Mode**: Theme switching capability

---

## 🛠️ Technology Stack

### Frontend

- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.3.3** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **React Query** - Server state management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Auth0** - Authentication and authorization
- **Stripe** - Payment processing
- **Lucide React** - Beautiful icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Stripe** - Payment processing API
- **Auth0** - Authentication middleware
- **Cloudinary** - Image upload and management
- **Multer** - File upload handling
- **Express Validator** - Request validation
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-reload
- **Concurrently** - Run multiple commands simultaneously

---

## 📁 Project Structure

```bash
food-ordering/
├── food-ordering-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # Shadcn/ui components
│   │   │   ├── EnhancedOrdersTab.tsx
│   │   │   ├── OrderStatusDetail.tsx
│   │   │   ├── AdvancedSearchBar.tsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ManageRestaurantPage.tsx
│   │   │   ├── AnalyticsDashboardPage.tsx
│   │   │   └── ...
│   │   ├── api/                     # API integration
│   │   ├── auth/                    # Authentication logic
│   │   ├── config/                  # Configuration files
│   │   ├── forms/                   # Form components
│   │   ├── layouts/                 # Layout components
│   │   ├── lib/                     # Utility functions
│   │   ├── types.ts                 # TypeScript type definitions
│   │   └── AppRoutes.tsx           # Application routing
│   ├── package.json
│   └── vite.config.ts
│
├── food-ordering-backend/           # Node.js backend application
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   ├── middleware/              # Custom middleware
│   │   ├── models/                  # MongoDB schemas
│   │   ├── routes/                  # API routes
│   │   └── index.ts                 # Server entry point
│   ├── package.json
│   └── .env.example
│
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Auth0 account
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/food-ordering.git
cd food-ordering
```

2. **Install backend dependencies**

```bash
cd food-ordering-backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../food-ordering-frontend
npm install
```

4. **Set up environment variables** (see Environment Variables section)

5. **Start the development servers**

Backend:

```bash
cd food-ordering-backend
npm run dev
```

Frontend:

```bash
cd food-ordering-frontend
npm run dev
```

The application will be available at:

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:7001>

---

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in the `food-ordering-backend` directory:

```env
# MongoDB Connection
MONGODB_CONNECTION_STRING="mongodb+srv://username:password@cluster.mongodb.net/food-ordering?retryWrites=true&w=majority"

# Auth0 Configuration
AUTH0_AUDIENCE="your-auth0-api-identifier"
AUTH0_ISSUER_BASE_URL="https://your-domain.us.auth0.com/"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe Configuration
FRONTEND_URL="http://localhost:5173"
STRIPE_API_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

### Frontend (.env)

Create a `.env` file in the `food-ordering-frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL="http://localhost:7001"

# Auth0 Configuration
VITE_AUTH0_DOMAIN="your-domain.us.auth0.com"
VITE_AUTH0_CLIENT_ID="your-client-id"
VITE_AUTH0_CALLBACK_URL="http://localhost:5173/auth-callback"
```

### Setting Up Services

#### 1. MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace the placeholder in `.env`

#### 2. Auth0

1. Create an Auth0 account
2. Create a new application (Single Page Application)
3. Create a new API
4. Configure callback URLs
5. Get your domain, client ID, and audience

#### 3. Stripe

1. Create a Stripe account
2. Get your test API keys
3. Set up webhook endpoints
4. Configure webhook secrets

#### 4. Cloudinary

1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Configure upload presets

---

## 📚 API Documentation

### Authentication Endpoints

```typescript
// All protected routes require Auth0 JWT token
Authorization: Bearer<jwt_token>;
```

### Restaurant Endpoints

```typescript
// Get all restaurants
GET /api/restaurant/search
Query Parameters:
- city?: string
- cuisineType?: string
- searchQuery?: string
- sortOption?: string
- page?: number

// Get restaurant by ID
GET /api/restaurant/:restaurantId

// Create restaurant (Protected)
POST /api/my/restaurant
Content-Type: multipart/form-data

// Update restaurant (Protected)
PUT /api/my/restaurant
Content-Type: multipart/form-data

// Get my restaurant (Protected)
GET /api/my/restaurant
```

### Order Endpoints

```typescript
// Create order (Protected)
POST /api/order/checkout

// Get my orders (Protected)
GET /api/my/order

// Get restaurant orders (Protected)
GET /api/my/restaurant/order

// Update order status (Protected)
PATCH /api/my/restaurant/order/:orderId/status
Body: { status: OrderStatus }

// Stripe webhook
POST /api/order/checkout/webhook
```

### User Endpoints

```typescript
// Get current user (Protected)
GET / api / my / user;

// Update user profile (Protected)
PUT / api / my / user;
```

---

## 🧩 Component Library

### Core Components

#### EnhancedOrdersTab

```typescript
import EnhancedOrdersTab from "@/components/EnhancedOrdersTab";

<EnhancedOrdersTab orders={orders} showStatusSelector={true} />;
```

**Features:**

- Real-time order management
- Status filtering and search
- Dashboard statistics
- Responsive grid/list views
- Order status overview with progress bars

#### AdvancedSearchBar

```typescript
import AdvancedSearchBar from "@/components/AdvancedSearchBar";

<AdvancedSearchBar onSearch={handleSearch} filters={filters} />;
```

**Features:**

- Multi-filter search
- Real-time suggestions
- Price range slider
- Cuisine type filtering
- Advanced sorting options

#### OrderStatusToast

```typescript
import { showOrderStatusToast } from "@/components/OrderStatusToast";

showOrderStatusToast({
  status: "delivered",
  customerName: "John Doe",
  orderId: "order123",
});
```

**Features:**

- Dynamic status messages
- Color-coded notifications
- Professional styling
- Auto-dismiss functionality

### UI Components (Shadcn/ui)

All components are built on top of Shadcn/ui for consistency:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

---

## 🎯 Key Features Walkthrough

### 1. Restaurant Management

**Location:** `food-ordering-frontend/src/pages/ManageRestaurantPage.tsx`

**Features:**

- Complete restaurant CRUD operations
- Image upload with Cloudinary
- Menu item management
- Real-time order tracking
- Enhanced order status management

**Usage:**

```typescript
// Restaurant form with image upload
const handleSubmit = async (formData: FormData) => {
  await createRestaurant(formData);
};
```

### 2. Analytics Dashboard

**Location:** `food-ordering-frontend/src/pages/AnalyticsDashboardPage.tsx`

**Features:**

- Revenue analytics
- Order trends
- Customer insights
- Performance metrics
- Interactive charts

**Components:**

- Revenue charts
- Order statistics
- Customer demographics
- Performance indicators

### 3. Advanced Search

**Location:** `food-ordering-frontend/src/pages/SearchPage.tsx`

**Features:**

- Multi-criteria search
- Real-time filtering
- Price range selection
- Cuisine type filtering
- Sort and pagination

**Implementation:**

```typescript
const searchParams = {
  city: selectedCity,
  cuisineType: selectedCuisine,
  searchQuery: searchTerm,
  sortOption: sortBy,
  page: currentPage,
};
```

### 4. Order Status Tracking

**Location:** `food-ordering-frontend/src/pages/OrderStatusPage.tsx`

**Features:**

- Real-time order status
- Order history
- Delivery tracking
- Status notifications
- Order details

**Status Flow:**

```bash
placed → paid → inProgress → outForDelivery → delivered
```

### 5. Payment Processing

**Integration:** Stripe with webhook handling

**Features:**

- Secure payment processing
- Webhook verification
- Order confirmation
- Payment status tracking

**Implementation:**

```typescript
// Frontend checkout
const handleCheckout = async () => {
  const response = await createCheckoutSession({
    cartItems,
    deliveryDetails,
    restaurantId,
  });
  window.location.href = response.url;
};
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build the application**

   ```bash
   cd food-ordering-frontend
   npm run build
   ```

2. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

````

3. **Set environment variables in Vercel dashboard**

### Backend Deployment (Railway/Render)

1. **Prepare for production**

   ```bash
cd food-ordering-backend
npm run build
````

2. **Deploy to Railway/Render**

   ```bash

   ```

# Connect your GitHub repository

# Set environment variables

# Deploy automatically

````

3. **Update frontend API URL**

### Environment Variables for Production

```env
# Production URLs
FRONTEND_URL="https://your-app.vercel.app"
VITE_API_BASE_URL="https://your-api.railway.app"

# Production Stripe keys
STRIPE_API_KEY="sk_live_your-production-key"
````

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**

```bash
git commit -m 'Add amazing feature'
```

4. **Push to the branch**

```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎓 Learning Resources

### React & TypeScript

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest)

### Backend Development

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### UI/UX Design

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Payment Integration

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

### Authentication

- [Auth0 Documentation](https://auth0.com/docs)
- [JWT Tokens](https://jwt.io/)

---

## 🔑 Keywords

Food Delivery, Restaurant Management, Order Processing, Payment Integration, Real-time Tracking, Analytics Dashboard, Advanced Search, User Authentication, Responsive Design, TypeScript, React, Node.js, MongoDB, Stripe, Auth0, Cloudinary, Shadcn/ui, Tailwind CSS, MERN Stack, Full Stack Development, Web Application, E-commerce, Restaurant Technology, Order Management System, Customer Portal, Restaurant Dashboard, Payment Gateway, Image Upload, Real-time Notifications, Performance Monitoring, API Documentation

---

## 🎉 Happy Coding! 🎉

Feel free to use this project repository and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://arnob-mahmud.vercel.app/](https://arnob-mahmud.vercel.app/).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
