# BigHungers Food Ordering Frontend - React, Express.js MERN Project

---

BigHungers frontend is a modern, responsive, and feature-rich React application for food ordering. It connects seamlessly to the backend API, providing users with a smooth experience for browsing restaurants, searching by city/cuisine, managing carts, placing orders, and tracking order status in real time. Built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, React Query, and Auth0, it is modular, scalable, and easy to extend or reuse in other projects.

- **Frontend-Live:** [https://mern-food-ordering.netlify.app/](https://mern-food-ordering.netlify.app/)
- **Backend-Live:** [https://mern-food-ordering-hnql.onrender.com](https://mern-food-ordering-hnql.onrender.com)

---

## Table of Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Pages & Routing](#pages--routing)
- [API Integration](#api-integration)
- [Environment Variables (.env)](#environment-variables-env)
- [How to Run](#how-to-run)
- [Code Snippets & Reusability](#code-snippets--reusability)
- [Keywords](#keywords)
- [Conclusion](#conclusion)

---

## Project Summary

BigHungers frontend delivers a delightful food ordering experience. Users can search and filter restaurants, view menus, add items to cart, checkout with Stripe, and track their orders. Restaurant owners can manage their restaurant, menu, and orders. The UI is built for speed, accessibility, and mobile-friendliness, with reusable components and best practices throughout.

---

## Features

- Modern, responsive UI with Tailwind CSS and shadcn/ui
- City/cuisine search, filtering, and pagination
- Restaurant and menu browsing
- Cart management with quantity controls
- Secure Auth0 authentication (login, logout, protected routes)
- Stripe-powered checkout and payment
- Real-time order status and history
- Admin/owner dashboard for restaurant and order management
- Toast notifications and loading states
- Modular, reusable React components

---

## Technology Stack

- **React 18** (with Vite)
- **TypeScript**
- **Tailwind CSS** & **shadcn/ui**
- **React Query** (data fetching/caching)
- **React Router v6**
- **Auth0** (authentication)
- **Stripe** (checkout)
- **Radix UI** (accessible primitives)
- **Zod** (form validation)

---

## Project Structure

```bash
food-ordering-frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API hooks (React Query)
│   ├── assets/              # Images, icons
│   ├── auth/                # Auth0 provider, protected route
│   ├── components/          # UI and app components
│   ├── config/              # App config (order status, etc.)
│   ├── forms/               # Form components
│   ├── layouts/             # Layout components
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route pages (Home, Detail, etc.)
│   ├── types.ts             # TypeScript types
│   ├── AppRoutes.tsx        # App routing
│   └── main.tsx             # App entry point
├── global.css               # Tailwind base styles
├── tailwind.config.js       # Tailwind config
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
└── README.md
```

---

## Key Components

- `Header`, `Footer`, `MainNav`, `MobileNav`, `UsernameMenu`: Navigation and layout
- `SearchBar`, `CityDropdown`, `CuisineFilter`, `SortOptionDropdown`: Search/filter UI
- `RestaurantInfo`, `MenuItem`, `OrderSummary`, `OrderItemCard`: Restaurant/menu/order display
- `CheckoutButton`, `LoadingButton`: Actions and feedback
- `OrderStatusHeader`, `OrderStatusDetail`: Order tracking
- `PaginationSelector`: Pagination controls
- `ui/`: shadcn/ui and Radix UI-based primitives (button, card, dialog, etc.)

---

## Pages & Routing

- `/` — Home page, search/filter restaurants
- `/detail/:restaurantId` — Restaurant detail, menu, add to cart
- `/order-status` — User order status/history
- `/manage-restaurant` — Owner dashboard (manage restaurant/menu/orders)
- `/user-profile` — User profile
- `/auth-callback` — Auth0 login callback

Routing is handled by React Router v6 in `AppRoutes.tsx`.

---

## API Integration

- All API calls are managed via React Query hooks in `src/api/`
- Uses `VITE_API_BASE_URL` from `.env` for backend URL
- Authenticated requests use Auth0 access tokens
- Handles errors and loading states with toasts and spinners

---

## Environment Variables (.env)

Create a `.env` file in the root of `food-ordering-frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:7001 # or your deployed backend URL
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/auth-callback # or your deployed frontend URL
```

- Get Auth0 values from your Auth0 dashboard (Applications > SPA)
- Set VITE_API_BASE_URL to your backend's base URL

---

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up your `.env` file** as described above.
3. **Start the dev server:**

   ```bash
   npm run dev
   ```

   - App runs at <http://localhost:5173> by default

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**

   ```bash
   npm run preview
   ```

---

## Code Snippets & Reusability

### Example: Using an API Hook

```tsx
import { useGetMyOrders } from "@/api/OrderApi";
const { orders, isLoading } = useGetMyOrders();
```

### Example: Protected Route

```tsx
import ProtectedRoute from "@/auth/ProtectedRoute";
<Route
  path="/user-profile"
  element={
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  }
/>;
```

### Example: Custom Button (shadcn/ui)

```tsx
import { Button } from "@/components/ui/button";
<Button onClick={handleClick}>Click me</Button>;
```

- All components are modular and can be reused in other React projects
- UI primitives (button, card, etc.) are based on shadcn/ui and Radix UI
- API hooks are decoupled and easy to adapt

---

## Keywords

food ordering, frontend, React, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Query, Auth0, Stripe, Radix UI, modular, reusable, SPA, MERN, restaurant, order, delivery

---

## Conclusion

BigHungers frontend is a production-ready, extensible React SPA for food ordering and delivery. It demonstrates best practices in UI/UX, authentication, API integration, and modular component design. Use it as a learning resource or as a base for your own projects.

---

## Happy Coding! 🎉

Feel free to use this project repository and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://arnob-mahmud.vercel.app/](https://arnob-mahmud.vercel.app/).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
