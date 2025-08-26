# BigHungers Food Ordering Website - React, MongoDB, Express.js, Node.js MERN Project

---

BigHungers is a fullstack food ordering platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a modern, scalable, and production-ready solution for online food ordering, restaurant management, and real-time order tracking. The project is split into a robust backend REST API and a feature-rich, responsive frontend SPA, both designed for extensibility, modularity, and ease of learning or reuse.

- **Frontend-Live:** [https://mern-food-ordering.netlify.app/](https://mern-food-ordering.netlify.app/)
- **Backend-Live:** [https://mern-food-ordering-hnql.onrender.com](https://mern-food-ordering-hnql.onrender.com)

---

## Table of Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [API & Routing](#api--routing)
- [Environment Variables (.env)](#environment-variables-env)
- [How to Run](#how-to-run)
- [Code Snippets & Reusability](#code-snippets--reusability)
- [Keywords](#keywords)
- [Conclusion](#conclusion)

---

## Project Summary

BigHungers is a complete MERN stack application for food ordering and delivery. Users can browse restaurants, search/filter by city or cuisine, add items to cart, checkout with Stripe, and track orders in real time. Restaurant owners can manage their restaurant, menu, and orders. The project demonstrates best practices in fullstack development, authentication, payment integration, and modular code organization.

---

## Features

- Modern, responsive UI (React, Tailwind CSS, shadcn/ui)
- City/cuisine search, filtering, and pagination
- Restaurant and menu browsing
- Cart management with quantity controls
- Secure Auth0 authentication (login, logout, protected routes)
- Stripe-powered checkout and payment
- Real-time order status and history
- Admin/owner dashboard for restaurant and order management
- Image upload via Cloudinary
- Toast notifications and loading states
- Modular, reusable code structure (frontend & backend)

---

## Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Query, React Router, Auth0, Stripe, Radix UI, Zod
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, Stripe, Auth0, Cloudinary

---

## Project Structure

```bash
food-ordering/
├── food-ordering-backend/    # Backend REST API (Node.js, Express, MongoDB)
├── food-ordering-frontend/   # Frontend SPA (React, Vite, Tailwind CSS)
└── README.md                 # Full project documentation
```

---

## Backend Overview

- RESTful API for user, restaurant, menu, and order management
- Auth0 JWT authentication middleware
- Stripe integration for payments and webhooks
- Cloudinary for image uploads
- Modular controllers, models, middleware, and routes
- See `food-ordering-backend/README.md` for full backend docs

---

## Frontend Overview

- Responsive SPA with React, Vite, and Tailwind CSS
- Auth0 authentication and protected routes
- Stripe checkout integration
- Real-time order status with React Query
- Modular, reusable UI and form components
- See `food-ordering-frontend/README.md` for full frontend docs

---

## API & Routing

- Backend API endpoints are documented in `food-ordering-backend/README.md`
- Frontend routes are managed in `src/AppRoutes.tsx` (React Router v6)
- Example API usage and protected routes are shown in both subproject READMEs

---

## Environment Variables (.env)

Both backend and frontend require their own `.env` files. See the respective subproject README for full details.

### Backend (`food-ordering-backend/.env`)

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_API_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_ISSUER_BASE_URL=your_auth0_issuer_base_url
FRONTEND_URL=http://localhost:5173 # or your deployed frontend URL
```

### Frontend (`food-ordering-frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:7001 # or your deployed backend URL
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/auth-callback # or your deployed frontend URL
```

---

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/food-ordering.git
   cd food-ordering
   ```

2. **Set up backend and frontend `.env` files** as described above.
3. **Install dependencies for both projects:**

   ```bash
   cd food-ordering-backend && npm install
   cd ../food-ordering-frontend && npm install
   ```

4. **Start the backend:**

   ```bash
   cd ../food-ordering-backend
   npm run dev
   ```

5. **Start the frontend:**

   ```bash
   cd ../food-ordering-frontend
   npm run dev
   ```

   - Frontend runs at <http://localhost:5173>, backend at <http://localhost:7001>

---

## Code Snippets & Reusability

### Example: Backend Auth Middleware

```ts
import { jwtCheck, jwtParse } from "../middleware/auth";
router.get("/protected", jwtCheck, jwtParse, (req, res) => { ... });
```

### Example: Frontend API Hook

```tsx
import { useGetMyOrders } from "@/api/OrderApi";
const { orders, isLoading } = useGetMyOrders();
```

- All controllers, middleware, and components are modular and reusable
- UI primitives and API hooks are decoupled and easy to adapt

---

## Keywords

food ordering, MERN, fullstack, React, Node.js, Express, MongoDB, TypeScript, Tailwind CSS, shadcn/ui, Stripe, Auth0, Cloudinary, REST API, SPA, modular, reusable, restaurant, order, delivery

---

## Conclusion

BigHungers is a production-ready, extensible MERN stack project for food ordering and delivery. It demonstrates best practices in fullstack development, authentication, payment integration, and modular code design. Use it as a learning resource or as a base for your own projects.

---

## Happy Coding! 🎉

Feel free to use this project repository and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://arnob-mahmud.vercel.app/](https://arnob-mahmud.vercel.app/).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
