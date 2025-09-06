# backend-lumen-app

A minimal Express + MongoDB backend for the Lumen app. Includes environment configuration, health checks, security middleware, and a clean project structure.

## Tech Stack
- Express (API server)
- Mongoose (MongoDB ODM)
- Helmet, CORS, Compression, Morgan (security, CORS, gzip, logging)
- dotenv (env management)
- Nodemon + cross-env (dev experience)

## Getting Started

### 1) Prerequisites
- Node.js 18+
- MongoDB running locally, Docker, or a cloud URI

### 2) Install dependencies
```bash
npm install
```

### 3) Environment variables
Copy the example and edit as needed:
```bash
cp .env.example .env
```
Update `.env` if using a remote cluster URI.

### 4) Run in development
```bash
npm run dev
```
Server will attempt Mongo connection, then listen on `PORT` (default 4000).

### 5) Production run
```bash
npm start
```

## API

- GET `/` → service metadata
- GET `/health` → health and uptime info

Example:
```bash
curl http://localhost:4000/health
```

## Project Structure
```
src/
  config/
    db.js              # Mongo connection
  controllers/
    health.controller.js
  middleware/
    errorHandler.js
    notFound.js
  routes/
    health.routes.js
    index.js
  utils/
    logger.js
  server.js
```

## Scripts
- `npm run dev` – Dev server with nodemon
- `npm start` – Start server

## Notes
- Ensure `MONGODB_URI` is reachable.
- Logs verbosity depends on `NODE_ENV`.
