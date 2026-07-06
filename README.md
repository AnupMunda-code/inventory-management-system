# Inventory Management System — Backend API

A production-ready REST API for a full-featured **Inventory Management System**, built with **Node.js, Express, and MongoDB**. It powers warehouse, stock, purchase, sales, valuation, invoicing, finance, and reporting workflows behind a single secured API, with JWT authentication and Cloudinary-backed document uploads.

> This repository contains the **backend** only. It is designed to pair with a separate Next.js frontend but works as a standalone API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Reference](#api-reference)
  - [API Base URL](#api-base-url)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Security](#security)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- 🔐 **JWT authentication** — admin login with hashed passwords (bcrypt) and token-protected routes.
- 🏬 **Warehouse management** — warehouses, bins/racks, capacity, and setup.
- 📦 **Item catalog** — items, categories, subcategories, HSN/SAC codes, batch & serial tracking, low-stock lookup.
- 🔁 **Stock control** — transactions, batches, stock in/out, opening stock, real-time stock, and transfers.
- 🛒 **Purchasing** — purchase orders, returns, cost tracking, goods receipt notes, and pending orders.
- 💰 **Sales & orders** — sales orders, returns, delivery challans, and order tracking.
- 📊 **Inventory valuation** — valuation, dead stock, COGS, and FIFO/LIFO/Weighted-Average methods.
- 🧾 **Invoicing & finance** — invoices with payment status, plus expense/income tracking.
- 📈 **Reporting** — stock summary, item-wise sales, stock aging, and valuation reports (global and per-warehouse).
- ☁️ **File uploads** — staff documents uploaded to Cloudinary.
- 🛡️ **Hardened defaults** — Helmet security headers, rate limiting, configurable CORS, and gzip compression.

---

## Tech Stack

| Layer            | Technology                                   |
| ---------------- | -------------------------------------------- |
| Runtime          | Node.js (ES Modules)                         |
| Framework        | Express 5                                    |
| Database         | MongoDB + Mongoose                           |
| Authentication   | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| File storage     | Cloudinary + Multer                          |
| Security         | Helmet, express-rate-limit, CORS             |
| Performance      | compression (gzip)                           |
| Config           | dotenv                                       |
| Dev tooling      | nodemon                                      |

---

## Project Structure

```
backend/
├── index.js                    # App entry point: middleware, DB connect, routes
├── package.json
├── render.yaml                 # Render deployment blueprint
├── .env.example                # Sample environment variables
├── LICENSE
├── README.md
└── src/
    ├── config/
    │   └── cloudinary.js        # Cloudinary SDK configuration
    ├── controllers/            # Request handlers (one file per domain)
    ├── db/
    │   └── mongo-db-connect.js  # Mongoose connection + admin seeding
    ├── middleware/
    │   ├── auth.js              # JWT verification middleware
    │   └── staffUpload.js       # Multipart/form-data upload handling
    ├── models/                 # Mongoose schemas (one file per collection)
    ├── routes/
    │   └── routes.js            # All API routes mounted under /api
    ├── seedData/
    │   ├── createAdmin.js       # Seeds the default super admin on first run
    │   └── seed.js              # Seed data
    └── utils/
        └── uploadToCloudinary.js # Helper to stream buffers to Cloudinary
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A **Cloudinary** account (for document uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/AnupMunda-code/inventory-management-system.git
cd inventory-management-system

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable                 | Required | Description                                                        |
| ------------------------ | :------: | ------------------------------------------------------------------ |
| `PORT`                   |    No    | Port to run on (default `8000`; hosts like Render set this).       |
| `MONGO_URI`              |   Yes    | MongoDB connection string.                                         |
| `JWT_SECRET`             |   Yes    | Secret used to sign JWTs (use a long random string).               |
| `CLOUDINARY_CLOUD_NAME`  |   Yes    | Cloudinary cloud name.                                             |
| `CLOUDINARY_API_KEY`     |   Yes    | Cloudinary API key.                                                |
| `CLOUDINARY_API_SECRET`  |   Yes    | Cloudinary API secret.                                             |
| `CORS_ORIGIN`            |    No    | Comma-separated allowed origins. Unset = allow all (dev).          |

### Running Locally

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:8000`. A health check is served at `GET /`.

> **First run:** a default super-admin is seeded automatically — `superadmin@gmail.com` / `admin`. **Change this password immediately** in any real deployment.

---

## Deployment

This project ships with a **`render.yaml`** blueprint for one-click deployment on [Render](https://render.com):

1. Push the repository to GitHub.
2. On Render, create a **New → Blueprint** and select this repo.
3. Render reads `render.yaml` and provisions a Node web service:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/`
   - **Auto Deploy:** enabled
4. Add the secret environment variables (`MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`, optional `CORS_ORIGIN`) in the dashboard.
5. Ensure your MongoDB Atlas **Network Access** allows connections from anywhere (`0.0.0.0/0`) or from Render's IPs.

The same app runs on any Node host (Railway, Fly.io, a VM, etc.) using `npm start`.

---

## API Reference

### API Base URL

```
# Local
http://localhost:8000/api

# Production (example)
https://<your-service>.onrender.com/api
```

### Authentication

All endpoints **except `POST /auth/admin/login`** require a valid JWT.

1. Obtain a token:

   ```http
   POST /api/auth/admin/login
   Content-Type: application/json

   { "email": "superadmin@gmail.com", "password": "admin" }
   ```

2. Send it on subsequent requests via the `Authorization` header:

   ```http
   Authorization: Bearer <your-token>
   ```

Tokens are signed with `JWT_SECRET` and expire after **7 days**.

### Endpoints

Base path: `/api`. All routes below (except login) require the `Authorization: Bearer <token>` header.

#### Auth
| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/auth/admin/login`  | Admin login (JWT). |

#### Staff
| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | `/staff`      | List all staff.                      |
| POST   | `/staff`      | Create staff (supports file upload). |
| GET    | `/staff/:id`  | Get staff by ID.                     |
| PUT    | `/staff/:id`  | Update staff (supports file upload). |
| DELETE | `/staff/:id`  | Delete staff.                        |

#### Warehouses, Bins, Capacity
| Method | Endpoint                                    | Description                     |
| ------ | ------------------------------------------- | ------------------------------- |
| GET/POST      | `/warehouses`                        | List / create warehouses.       |
| GET/PUT/DELETE| `/warehouses/:id`                    | Get / update / delete.          |
| POST          | `/warehouses/:warehouseId/bins`      | Add a bin to a warehouse.       |
| GET/POST      | `/bin-racks`                         | List / create bin-racks.        |
| GET/PUT/DELETE| `/bin-racks/:id`                     | Get / update / delete.          |
| GET           | `/bin-racks/warehouse/:warehouseId`  | Bin-racks for a warehouse.      |
| GET/POST      | `/warehouse-capacities`              | List / create capacities.       |
| GET/PUT/DELETE| `/warehouse-capacities/:id`          | Get / update / delete.          |
| GET           | `/warehouse-capacities/warehouse/:warehouseId` | Capacity for a warehouse. |

#### Suppliers & Customers
| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| GET/POST       | `/suppliers`     | List / create suppliers.   |
| GET/PUT/DELETE | `/suppliers/:id` | Get / update / delete.     |
| GET/POST       | `/customers`     | List / create customers.   |
| GET/PUT/DELETE | `/customers/:id` | Get / update / delete.     |

#### Items, Categories, Subcategories, HSN/SAC, Batch/Serial
| Method | Endpoint                          | Description                       |
| ------ | --------------------------------- | --------------------------------- |
| GET/POST       | `/items`                 | List / create items.              |
| GET/PUT/DELETE | `/items/:id`             | Get / update / delete.            |
| GET            | `/items/category/:category` | Items by category.             |
| GET            | `/item/low-stock`        | Low-stock items.                  |
| GET/POST       | `/categories`            | List / create categories.         |
| GET/PUT/DELETE | `/categories/:id`        | Get / update / delete.            |
| GET/POST       | `/subcategories`         | List / create subcategories.      |
| GET/PUT/DELETE | `/subcategories/:id`     | Get / update / delete.            |
| GET/POST       | `/hsn-sac-codes`         | List / create HSN/SAC codes.      |
| GET/PUT/DELETE | `/hsn-sac-codes/:id`     | Get / update / delete.            |
| GET/POST       | `/batch-serial`          | List / create batch-serial records.|
| GET/PUT/DELETE | `/batch-serial/:id`      | Get / update / delete.            |
| GET            | `/batch-serial/item/:itemId` | Records for an item.          |

#### Stock
| Method | Endpoint                        | Description                       |
| ------ | ------------------------------- | --------------------------------- |
| GET/POST       | `/stock/transactions`  | List / create stock transactions. |
| GET/PUT/DELETE | `/stock/transactions/:id` | Get / update / delete.         |
| GET            | `/stock/warehouse/:warehouse` | Stock by warehouse.          |
| GET            | `/stock/item/:itemId`  | Stock by item.                    |
| GET/POST + `/:id` | `/stock/batches`    | Stock batches CRUD.               |
| GET/POST + `/:id` | `/stock/in-out`     | Stock in/out CRUD.                |
| GET/POST + `/:id` | `/stock/opening`    | Opening stock CRUD.               |
| GET/POST + `/:id` | `/stock/real-time`  | Real-time stock CRUD.             |
| GET/POST + `/:id` | `/stock/transfers`  | Stock transfers CRUD.             |

#### Purchases
| Method | Endpoint                             | Description                    |
| ------ | ------------------------------------ | ------------------------------ |
| GET/POST + `/:id` | `/purchase/orders`          | Purchase orders CRUD.          |
| GET/POST + `/:id` | `/purchase/returns`         | Purchase returns CRUD.         |
| GET/POST + `/:id` | `/purchase/cost-tracking`   | Cost tracking CRUD.            |
| GET/POST + `/:id` | `/purchase/goods-receipt-notes` | Goods receipt notes CRUD.  |
| GET/POST + `/:id` | `/purchase/pending-orders`  | Pending orders CRUD.           |

#### Sales
| Method | Endpoint                            | Description                     |
| ------ | ----------------------------------- | ------------------------------- |
| GET/POST + `/:id` | `/sales/orders`            | Sales orders CRUD.              |
| GET/POST + `/:id` | `/sales/returns`           | Sales returns CRUD.            |
| GET/POST + `/:id` | `/sales/delivery-challans` | Delivery challans CRUD.       |
| GET/POST + `/:id` | `/sales/order-tracking`    | Order tracking CRUD.           |

#### Valuation & Costing
| Method | Endpoint                                  | Description                  |
| ------ | ----------------------------------------- | ---------------------------- |
| GET/POST + `/:id` | `/valuation`                     | Valuation CRUD.              |
| GET/POST + `/:id` | `/valuation/dead-stock`          | Dead stock CRUD.             |
| GET/POST + `/:id` | `/valuation/cogs`                | COGS CRUD.                   |
| GET/POST + `/:id` | `/valuation/fifo-lifo-weighted`  | FIFO/LIFO/Weighted CRUD.     |

#### Damage Tracking
| Method | Endpoint                          | Description                    |
| ------ | --------------------------------- | ------------------------------ |
| GET/POST + `/:id` | `/damage`                | Damage records CRUD.           |
| GET            | `/damage/warehouse/:warehouseId` | Damage by warehouse.        |
| GET            | `/damage/status/:status` | Damage by status.              |
| GET/POST + `/:id` | `/damage/receipts`       | Damage receipts CRUD.          |
| GET/POST + `/:id` | `/damage/write-offs`     | Write-offs CRUD.               |

#### Invoices
| Method | Endpoint                                   | Description                 |
| ------ | ------------------------------------------ | --------------------------- |
| GET/POST + `/:id` | `/invoices`                       | Invoices CRUD.              |
| GET            | `/invoices/customer/:customerId`  | Invoices by customer.       |
| GET            | `/invoices/payment-status/:paymentStatus` | Invoices by pay status. |
| PUT            | `/invoices/:id/payment-status`    | Update payment status.      |

#### Finance
| Method | Endpoint                                 | Description                  |
| ------ | ---------------------------------------- | ---------------------------- |
| GET/POST + `/:id` | `/finance/expenses`             | Expenses CRUD.               |
| GET            | `/finance/expenses/warehouse/:warehouse` | Expenses by warehouse.  |
| GET/POST + `/:id` | `/finance/income`               | Income CRUD.                 |
| GET            | `/finance/income/warehouse/:warehouse`   | Income by warehouse.    |

#### Reports
| Method | Endpoint                                        | Description               |
| ------ | ----------------------------------------------- | ------------------------- |
| GET/POST | `/reports/stock-summary`                      | Stock summary report.     |
| GET      | `/reports/stock-summary/warehouse/:warehouse` | Per-warehouse.            |
| GET/POST | `/reports/item-sales`                         | Item-wise sales report.   |
| GET      | `/reports/item-sales/warehouse/:warehouse`    | Per-warehouse.            |
| GET/POST | `/reports/stock-aging`                        | Stock aging report.       |
| GET      | `/reports/stock-aging/warehouse/:warehouse`   | Per-warehouse.            |
| GET/POST | `/reports/valuation`                          | Valuation report.         |
| GET      | `/reports/valuation/warehouse/:warehouse`     | Per-warehouse.            |

---

## Error Handling

All endpoints return a consistent JSON envelope.

**Success**

```json
{ "success": true, "data": { /* ... */ } }
```

**Error**

```json
{ "success": false, "message": "Human-readable reason", "error": "details" }
```

Common status codes:

| Code | Meaning                                       |
| ---- | --------------------------------------------- |
| 200  | OK                                            |
| 201  | Created                                       |
| 400  | Bad request / upload error                    |
| 401  | Missing or invalid token / invalid credentials|
| 404  | Resource not found                            |
| 429  | Too many requests (rate limited)              |
| 500  | Internal server error                         |

---

## Security

- **Helmet** sets secure HTTP response headers and hides `X-Powered-By`.
- **JWT auth** protects every route except login; passwords are hashed with **bcrypt**.
- **Rate limiting** (`express-rate-limit`) throttles abusive clients.
- **Configurable CORS** — lock the API to your frontend origin via `CORS_ORIGIN`.
- **Secrets** are read from environment variables only; `.env` is git-ignored and never committed.

---

## Future Improvements

- Add automated tests (Jest + Supertest) and CI (GitHub Actions).
- Centralize error handling in a dedicated Express error middleware.
- Add request validation (e.g. Zod / Joi / express-validator) on all write routes.
- Introduce role-based access control (beyond a single admin).
- Add pagination, filtering, and sorting to list endpoints.
- Generate interactive API docs (Swagger / OpenAPI).
- Add structured logging (pino/winston) and request tracing.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "feat: add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a Pull Request describing your change.

Please keep changes focused and follow the existing code style.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## Author

**Anup Munda**
GitHub: [@AnupMunda-code](https://github.com/AnupMunda-code)
