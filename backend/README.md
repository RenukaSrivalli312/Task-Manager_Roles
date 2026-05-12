# 📋 Task Manager Backend API

A production-ready REST API built using **Node.js, Express, MongoDB, and JWT Authentication** with full role-based access control.

This backend powers a React Native Task Manager application.

---

## 🌐 Live API

👉 https://task-manager-roles.onrender.com/api

---

## 🚀 Deployment

- Backend Hosted on: Render  
- Database: MongoDB Atlas  
- Authentication: JWT (JSON Web Token)

---

## 📁 Folder Structure
backend/
├── config/
│ ├── db.js
│ └── seed.js
├── controllers/
│ ├── authController.js
│ └── taskController.js
├── middleware/
│ ├── authMiddleware.js
│ ├── roleMiddleware.js
│ └── errorHandler.js
├── models/
│ ├── User.js
│ └── Task.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── server.js
└── package.json


---

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
npm install

2. Environment Setup

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development

3. Seed Admin User
npm run seed

Default admin:

Email: admin@gmail.com
Password: Renuka@2006


4. Run Server
npm run dev

Server runs at:

http://localhost:5000


🔑 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
Tasks
Method	Endpoint	Access	Description
GET	/api/tasks	Admin/User	Get tasks
POST	/api/tasks	Admin	Create task
PUT	/api/tasks/:id	Admin/User	Update task
DELETE	/api/tasks/:id	Admin	Delete task
👥 Role System
Role	Permissions
Admin	Create, assign, view all tasks
User	View & update assigned tasks only
🔐 Authentication

All protected routes require:

Authorization: Bearer <token>
🛠 Tech Stack
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
bcryptjs
dotenv
cors
📌 Task Status Values
pending
in-progress
completed
✨ Features
Role-based access control
Secure JWT authentication
Task assignment system
Admin dashboard APIs
Clean modular architecture
