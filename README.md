# Products API

A RESTful API built with Express.js and Supabase for managing products and categories.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js v5
- **Database:** Supabase (PostgreSQL)
- **Validation:** Joi
- **Package Manager:** pnpm

## Project Structure

```
products-api/
├── middleware/
│   ├── asyncHandler.js      # Async error wrapper for route handlers
│   ├── errorHandler.js      # Global error handling middleware
│   ├── loggerHandler.js     # Request logging middleware
│   └── validate.js          # Request body validation middleware (Joi)
├── routes/
│   ├── categories.js        # Category routes (CRUD)
│   └── products.js          # Product routes (CRUD)
├── .env                     # Environment variables (not tracked)
├── .gitignore               # Git ignore rules
├── index.js                 # Entry point
├── package.json             # Project metadata and dependencies
├── pnpm-lock.yaml           # Dependency lock file
├── server.js                # Express app setup and middleware registration
├── sql.md                   # SQL schema reference
└── supabaseClient.js        # Supabase client initialization
```

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Server

```bash
node index.js
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Health Check

- `GET /api/health` — Server health status

### Categories

- `GET /api/categories` — Get all categories
- `GET /api/categories/:id` — Get category by ID
- `POST /api/categories` — Create a category
- `PUT /api/categories/:id` — Update a category
- `DELETE /api/categories/:id` — Delete a category

### Products

- `GET /api/products` — Get all products (optional `?category_id=` filter)
- `GET /api/products/:id` — Get product by ID
- `POST /api/products` — Create a product
- `PUT /api/products/:id` — Update a product
- `DELETE /api/products/:id` — Delete a product

## HTTP Status Codes

| Code | Meaning                 | Description                                          |
|------|-------------------------|------------------------------------------------------|
| 200  | OK                      | Request succeeded                                    |
| 201  | Created                 | Resource created successfully                        |
| 400  | Bad Request             | Invalid or missing input from client                 |
| 401  | Unauthorized            | Not authenticated (missing or invalid token)         |
| 403  | Forbidden               | Authenticated but lacks permission                   |
| 404  | Not Found               | Requested resource doesn't exist                     |
| 409  | Conflict                | Resource already exists (e.g., duplicate email)      |
| 422  | Unprocessable Entity    | Request body failed validation                       |
| 500  | Internal Server Error   | Unexpected server-side error                         |
