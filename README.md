📋 Task Manager Full-Stack Application

A full-stack Role-Based Task Manager App built using:

📱 React Native (Expo) – Frontend
⚙️ Node.js + Express – Backend
🗄 MongoDB Atlas – Database
🔐 JWT Authentication – Security

This system supports Admin and User roles for task management and assignment.

🌐 Live Links
🔗 Backend API

👉 https://task-manager-roles.onrender.com/api

📱 Frontend Build (APK / Expo)

👉 https://expo.dev/accounts/renuka_srivalli/projects/mobile/builds/786d23ec-d9e4-4f8c-aee0-14d4deebef73

✨ Features Implemented
🔐 Authentication
User Registration & Login
JWT-based authentication
Secure session handling

🧑‍💼 Admin Features
Create tasks
Assign tasks to users
View all tasks
Manage task lifecycle

👤 User Features
View only assigned tasks
Update task status:
pending
in-progress
completed

📋 Task Management
Task title & description
Status tracking
Priority levels (low, medium, high)
Due date support

🔄 API Integration
Fully connected frontend & backend
Axios-based API handling
Error handling for all requests

📱 Mobile UI Features
Clean card-based UI
Status indicators
Role-based rendering
Loading & empty states handling

⚙️ Setup Instructions

🧠 1. Backend Setup
📂 Navigate to backend folder
cd backend

📦 Install dependencies
npm install

🔐 Create environment file
Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development


▶️ Start backend server
npm run dev
Server runs at:
http://localhost:5000

📱 2. Frontend Setup (React Native)
📂 Navigate to mobile folder
        cd mobile
📦 Install dependencies
        npm install
🚀 Start Expo app
        npx expo start
Then:
Scan QR using Expo Go 📱OR
Run Android emulator


🧱 Project Architecture

Frontend (React Native Expo)
        ↓
Axios API Calls
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas Database

👥 Role System

| Role  | Permissions                    |
| ----- | ------------------------------ |
| Admin | Create, assign, view all tasks |
| User  | View & update assigned tasks   |


🔐 Authentication Flow
User logs in
Backend generates JWT token
Token stored in mobile app
Token used for API requests

🧪 Test Credentials
Email: admin@gmail.com
Password: Renuka@2006

🛠 Tech Stack
Frontend:
        React Native (Expo)
        React Native Paper
        Axios
        AsyncStorage
Backend:
        Node.js
        Express.js
        MongoDB + Mongoose
        JWT
        bcryptjs

        
📂 Folder Structure
Task-Manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── mobile/
│   ├── src/
│   ├── screens/
│   ├── services/
│   └── App.js
│
└── README.md

📌 Notes
Backend must be running for app to work
Internet connection required
API is deployed on Render
Mobile app works via Expo Go or APK build

👨‍💻 Author
Renuka Srivalli


📋 Task Manager Full-Stack Application

A full-stack Role-Based Task Manager App built using:

📱 React Native (Expo) – Frontend
⚙️ Node.js + Express – Backend
🗄 MongoDB Atlas – Database
🔐 JWT Authentication – Security

This system supports Admin and User roles for task management and assignment.

🌐 Live Links
🔗 Backend API

👉 https://task-manager-roles.onrender.com/api

📱 Frontend Build (APK / Expo)

👉 https://expo.dev/accounts/renuka_srivalli/projects/mobile/builds/786d23ec-d9e4-4f8c-aee0-14d4deebef73

✨ Features Implemented
🔐 Authentication
User Registration & Login
JWT-based authentication
Secure session handling

🧑‍💼 Admin Features
Create tasks
Assign tasks to users
View all tasks
Manage task lifecycle

👤 User Features
View only assigned tasks
Update task status:
pending
in-progress
completed

📋 Task Management
Task title & description
Status tracking
Priority levels (low, medium, high)
Due date support

🔄 API Integration
Fully connected frontend & backend
Axios-based API handling
Error handling for all requests

📱 Mobile UI Features
Clean card-based UI
Status indicators
Role-based rendering
Loading & empty states handling

⚙️ Setup Instructions

🧠 1. Backend Setup
📂 Navigate to backend folder
    cd backend
📦 Install dependencies
    npm install
🔐 Create environment file
Create .env file:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    NODE_ENV=development
▶️ Start backend server
        npm run dev
Server runs at:
        http://localhost:5000

📱 2. Frontend Setup (React Native)
📂 Navigate to mobile folder
        cd mobile
📦 Install dependencies
        npm install
🚀 Start Expo app
        npx expo start
Then:
Scan QR using Expo Go 📱OR
Run Android emulator


🧱 Project Architecture

Frontend (React Native Expo)
        ↓
Axios API Calls
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas Database

👥 Role System

| Role  | Permissions                    |
| ----- | ------------------------------ |
| Admin | Create, assign, view all tasks |
| User  | View & update assigned tasks   |


🔐 Authentication Flow
User logs in
Backend generates JWT token
Token stored in mobile app
Token used for API requests

🧪 Test Credentials
Email: admin@gmail.com
Password: Renuka@2006

🛠 Tech Stack
Frontend:
        React Native (Expo)
        React Native Paper
        Axios
        AsyncStorage
Backend:
        Node.js
        Express.js
        MongoDB + Mongoose
        JWT
        bcryptjs

        
📂 Folder Structure
Task-Manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── mobile/
│   ├── src/
│   ├── screens/
│   ├── services/
│   └── App.js
│
└── README.md

📌 Notes
Backend must be running for app to work
Internet connection required
API is deployed on Render
Mobile app works via Expo Go or APK build

👨‍💻 Author
Renuka Srivalli

