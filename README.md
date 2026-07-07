# Meridian — MERN E-Commerce Starter

A full-stack e-commerce store built with **MongoDB, Express, React, Node.js**, and **Tailwind CSS**.

## Features

- **Auth**: JWT-based register/login, protected routes, admin role
- **Products**: browse, search, filter by category, sort, product detail with reviews
- **Cart**: persisted in localStorage, quantity control
- **Checkout**: shipping address, order creation with server-side price + stock validation
- **Orders**: order history, order detail, status tracking
- **Admin dashboard**: create/edit/delete products, view all orders, update order status

## Project structure

```
ecommerce-app/
├── backend/            Express + MongoDB API
│   ├── config/          DB connection
│   ├── controllers/      Route logic
│   ├── middleware/      Auth + error handling
│   ├── models/          Mongoose schemas (User, Product, Order)
│   ├── routes/          API routes
│   ├── seed.js          Sample data + admin user
│   └── server.js         App entry point
└── frontend/            React (Vite) + Tailwind CSS
    └── src/
        ├── api/          Axios instance with auth interceptor
        ├── context/      Auth + Cart context providers
        ├── components/   Navbar, Footer, ProductCard, etc.
        └── pages/        Home, ProductDetail, Cart, Checkout, Orders, Admin...
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — local MongoDB (`mongodb://127.0.0.1:27017/ecommerce`) or a MongoDB Atlas connection string
- `JWT_SECRET` — any long random string

Seed sample products + an admin account (`admin@example.com` / `admin123`):

```bash
npm run seed
```

Start the API server (runs on `http://localhost:5000`):

```bash
npm run dev
```

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. Vite is configured to proxy `/api` requests to the backend on port 5000, so no extra config is needed in dev.

## 3. Try it out

1. Visit `http://localhost:5173` — you'll see the seeded product catalog.
2. Register a new account, or sign in as admin (`admin@example.com` / `admin123`).
3. Add products to your cart, check out with a shipping address, and view your order.
4. Sign in as admin and visit `/admin` to manage products and order statuses.

## API overview

| Method | Route                        | Description                  | Auth        |
|--------|-------------------------------|-------------------------------|-------------|
| POST   | `/api/auth/register`          | Create account                | Public      |
| POST   | `/api/auth/login`             | Log in                        | Public      |
| GET    | `/api/auth/profile`           | Get own profile               | User        |
| PUT    | `/api/auth/profile`           | Update own profile            | User        |
| GET    | `/api/products`               | List products (filters, search, sort, pagination) | Public |
| GET    | `/api/products/:id`           | Product detail                | Public      |
| GET    | `/api/products/categories`    | Distinct categories           | Public      |
| POST   | `/api/products`               | Create product                | Admin       |
| PUT    | `/api/products/:id`           | Update product                | Admin       |
| DELETE | `/api/products/:id`           | Delete product                | Admin       |
| POST   | `/api/products/:id/reviews`   | Add review                    | User        |
| POST   | `/api/orders`                 | Place order                   | User        |
| GET    | `/api/orders/mine`            | Own order history             | User        |
| GET    | `/api/orders/:id`             | Order detail                  | Owner/Admin |
| GET    | `/api/orders`                 | All orders                    | Admin       |
| PUT    | `/api/orders/:id/status`      | Update order status           | Admin       |

## Notes / next steps

This is a solid, working foundation — not a "batteries fully included" production app. If you want to extend it:
- Wire in a real payment processor (Stripe) instead of the demo payment method dropdown
- Add image upload (e.g. Cloudinary) instead of pasting image URLs in the admin form
- Add pagination controls in the UI (the API already supports `page`/`limit`)
- Add email confirmations on order placement
- Add automated tests (Jest + Supertest for the API, React Testing Library for the frontend)
