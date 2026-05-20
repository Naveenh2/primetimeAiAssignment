# PrimeTrade Task Manager

Production-ready full-stack Task Manager built for the PrimeTrade Backend Developer Internship assignment.

## Project Overview

This project demonstrates a scalable backend-first architecture with secure JWT authentication, role-based authorization, robust validation, and clean API practices.  
The frontend is a professional Next.js dashboard used to consume and validate the backend APIs.

## Features

- JWT access-token authentication (`USER` and `ADMIN`)
- Role-based access control for task ownership/admin override
- Task CRUD with pagination, search, and filters
- Prisma ORM with PostgreSQL, migrations, and seed script
- Security hardening: Helmet, CORS, rate limiting, input sanitization
- Swagger API documentation and Postman collection
- Jest + Supertest API tests
- Dockerized backend/frontend and compose-based local environment
- Deployment-ready configs for Vercel (frontend) and Render (backend)

## Tech Stack

### Backend
- Node.js 20 LTS
- Express.js
- PostgreSQL
- Prisma ORM
- JWT + bcrypt
- Zod
- Swagger
- Jest + Supertest

### Frontend
- Next.js 15 (App Router)
- Tailwind CSS
- Zustand
- Axios
- React Hook Form
- Sonner

## Folder Structure

```text
backenddevelopmentprimetrade/
├── backend/
│   ├── prisma/
│   ├── postman/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── docs/
│   │   ├── tests/
│   │   ├── app.js
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── middleware.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
├── vercel.json
├── render.yaml
└── README.md
```

## Environment Variables

### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://primetrade_user:primetrade_pass@localhost:5432/primetrade_db?schema=public
JWT_SECRET=replace_this_with_a_long_secure_secret
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## Local Setup

1. **Clone and enter project**
   ```bash
   git clone <your-repo-url>
   cd backenddevelopmentprimetrade
   ```
2. **Start PostgreSQL (Docker recommended)**
   ```bash
   docker compose up -d postgres
   ```
3. **Setup backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed
   npm run dev
   ```
4. **Setup frontend (new terminal)**
   ```bash
   cd frontend
   cp .env.example .env.local
   npm install
   npm run dev
   ```

## Prisma Setup / Migration Commands

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
npm run prisma:seed
```

Seeded admin credentials:

- Email: `admin@primetrade.ai`
- Password: `Admin@123`

## Running With Docker

From repository root:

```bash
docker compose up --build
```

- Backend: `http://localhost:5000`
- Swagger: `http://localhost:5000/api/v1/docs`
- Frontend: `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Tasks
- `GET /tasks` (pagination + filters)
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Sample API Requests

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Pass@1234"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@primetrade.ai","password":"Admin@123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"title":"Build API","description":"Add endpoint docs","status":"TODO","priority":"HIGH"}'
```

## Swagger & Postman

- Swagger URL: `http://localhost:5000/api/v1/docs`
- Postman collection: `backend/postman/primetrade-task-manager.postman_collection.json`

## Deployment Steps

### Backend on Render
1. Create PostgreSQL instance on Render (or external managed Postgres).
2. Create new Web Service and connect your GitHub repository.
3. Use `backend` as Root Directory.
4. Build command: `npm install && npx prisma generate`
5. Start command: `npm run start`
6. Add environment variables from `backend/.env.example`.
7. Run production migrations:
   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```

### Frontend on Vercel
1. Import GitHub repository into Vercel.
2. Set Root Directory to `frontend`.
3. Add env var: `NEXT_PUBLIC_API_URL=https://your-render-backend-url/api/v1`
4. Deploy.

## Screenshots

- Add screenshots of Home, Login, Dashboard, and Tasks pages here before final submission.

## Scalability Notes

- **Microservices path:** split auth, task, notifications, and analytics into independently deployable services.
- **Redis caching:** cache hot task lists/query responses and token blacklist/session metadata for fast lookups.
- **Load balancing:** place backend instances behind Nginx/Cloud load balancers with health checks.
- **Horizontal scaling:** run stateless API containers across multiple replicas with shared Postgres/Redis.
- **CI/CD:** implement test + lint + build + deploy pipelines using GitHub Actions.
- **Queue systems:** use RabbitMQ/Kafka/BullMQ for async jobs (emails, webhooks, reports).
- **Monitoring/logging:** centralize logs in ELK/Grafana Loki and metrics via Prometheus + Grafana + alerts.

## Future Improvements

- Refresh token rotation and secure HTTP-only cookie auth mode
- Fine-grained permissions policy engine
- OpenTelemetry tracing and distributed metrics
- Background task processing and notifications
- Full integration tests against ephemeral PostgreSQL in CI

## Code Quality Standards

- Clean modular structure (controllers/services/middleware/validators)
- Reusable utilities for async handling, API responses, and errors
- Consistent status codes and error handling
- Node.js 20 LTS compatible
- ESLint + Prettier setup

