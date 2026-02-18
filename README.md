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

## Supabase (PostgREST) Error Codes

These are error codes returned by Supabase's PostgREST layer when database operations fail.

### Common Query Errors

| Code      | Meaning                        | Description                                                        |
|-----------|--------------------------------|--------------------------------------------------------------------|
| PGRST000  | Connection error               | Could not connect to the database                                  |
| PGRST001  | Connection pool timeout        | Timed out waiting for a connection from the pool                   |
| PGRST002  | Schema not found               | The requested schema does not exist                                |
| PGRST003  | JWT expired                    | The JWT token has expired                                          |

### Request Errors

| Code      | Meaning                        | Description                                                        |
|-----------|--------------------------------|--------------------------------------------------------------------|
| PGRST100  | Parse error                    | Failed to parse the request (invalid syntax)                       |
| PGRST102  | Invalid request body           | Request body is not valid JSON                                     |
| PGRST105  | Invalid column                 | Column specified in the query does not exist                       |
| PGRST106  | Schema cache miss              | Table or view not found in the schema cache                        |
| PGRST108  | Invalid range                  | Requested range is not satisfiable                                 |
| PGRST109  | Invalid limit/offset           | Limit or offset value is invalid                                   |

### Row-Level Errors

| Code      | Meaning                        | Description                                                        |
|-----------|--------------------------------|--------------------------------------------------------------------|
| PGRST116  | No rows found                  | `.single()` or `.maybeSingle()` returned 0 rows (used for 404)    |
| PGRST117  | Multiple rows found            | `.single()` returned more than 1 row                              |

### Permission / Auth Errors

| Code      | Meaning                        | Description                                                        |
|-----------|--------------------------------|--------------------------------------------------------------------|
| PGRST200  | Insufficient privilege         | Role does not have permission for the operation                    |
| PGRST201  | Invalid JWT                    | JWT token is malformed or signature is invalid                     |
| PGRST202  | Missing JWT                    | No JWT provided but required by the endpoint                       |
| PGRST204  | JWT role not found             | Role claim in JWT does not match any database role                 |

### Database Constraint Errors (PostgreSQL)

These are standard PostgreSQL error codes Supabase passes through:

| Code  | Meaning                        | Description                                                        |
|-------|--------------------------------|--------------------------------------------------------------------|
| 23502 | NOT NULL violation             | A required column was given a null value                           |
| 23503 | Foreign key violation          | Referenced row does not exist in the parent table                  |
| 23505 | Unique violation               | Duplicate value violates a unique constraint (e.g., duplicate email)|
| 23514 | Check constraint violation     | Value does not satisfy a CHECK constraint                          |
| 42501 | Insufficient privilege         | User does not have permission for this operation                   |
| 42P01 | Table not found                | The referenced table does not exist                                |
