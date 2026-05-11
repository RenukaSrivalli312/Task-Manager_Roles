# 📋 Task Manager Backend API

A production-ready REST API built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. Supports role-based access control for Admin and User roles.

---

## 📁 Folder Structure

```
backend/
├── config/
│   ├── db.js            # MongoDB connection
│   └── seed.js          # Seeds a default admin user
├── controllers/
│   ├── authController.js  # Register, Login, Get Me
│   └── taskController.js  # Task CRUD logic
├── middleware/
│   ├── authMiddleware.js  # JWT token verification
│   ├── roleMiddleware.js  # Role-based access control
│   └── errorHandler.js    # Global error handler
├── models/
│   ├── User.js            # User Mongoose model
│   └── Task.js            # Task Mongoose model
├── routes/
│   ├── authRoutes.js      # /api/auth/*
│   └── taskRoutes.js      # /api/tasks/*
├── .env.example           # Sample environment variables
├── package.json
└── server.js              # App entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

> ⚠️ Change `JWT_SECRET` to a long random string in production!

### 3. Seed Admin User

```bash
npm run seed
```

This creates a default admin account:
- **Email:** admin@example.com
- **Password:** Admin@123

### 4. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

---

## 🔑 API Endpoints

### Auth Routes

| Method | Endpoint              | Access  | Description              |
|--------|-----------------------|---------|--------------------------|
| POST   | `/api/auth/register`  | Public  | Create a new user account |
| POST   | `/api/auth/login`     | Public  | Login and get JWT token  |
| GET    | `/api/auth/me`        | Private | Get current user info    |

### Task Routes

| Method | Endpoint          | Access      | Description                                |
|--------|-------------------|-------------|--------------------------------------------|
| GET    | `/api/tasks`      | Private     | Admin: all tasks / User: assigned tasks    |
| GET    | `/api/tasks/:id`  | Private     | Get a single task                          |
| POST   | `/api/tasks`      | Admin only  | Create a new task                          |
| PUT    | `/api/tasks/:id`  | Private     | Admin: full update / User: status only     |
| DELETE | `/api/tasks/:id`  | Admin only  | Delete a task                              |

---

## 🔐 Authentication

All protected routes require a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📬 Example API Requests

### Register a User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Create a Task (Admin)
```json
POST /api/tasks
Authorization: Bearer <admin_token>

{
  "title": "Fix login bug",
  "description": "The login page throws an error on mobile",
  "status": "pending",
  "assignedTo": "<user_id>"
}
```

### Update Task Status (User)
```json
PUT /api/tasks/:id
Authorization: Bearer <user_token>

{
  "status": "in-progress"
}
```

---

## 🧑‍💻 Roles & Permissions

| Action                    | Admin | User |
|---------------------------|-------|------|
| Create task               | ✅    | ❌   |
| View all tasks            | ✅    | ❌   |
| View assigned tasks       | ✅    | ✅   |
| Assign task to user       | ✅    | ❌   |
| Update any task field     | ✅    | ❌   |
| Update own task status    | ✅    | ✅   |
| Delete task               | ✅    | ❌   |

---

## 📦 Tech Stack

| Package     | Purpose                        |
|-------------|--------------------------------|
| express     | Web framework                  |
| mongoose    | MongoDB ODM                    |
| bcryptjs    | Password hashing               |
| jsonwebtoken| JWT auth tokens                |
| dotenv      | Environment variable loading   |
| cors        | Cross-origin request handling  |
| nodemon     | Auto-reload in development     |

---

## 📌 Task Status Values

- `pending` (default)
- `in-progress`
- `completed`
