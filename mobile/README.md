--
# 📱 Task Manager Mobile App (React Native + Expo)

A full-featured **role-based task management mobile application** built using React Native (Expo) and integrated with a Node.js + MongoDB backend.

---

## 🚀 Live Backend API

👉 https://task-manager-roles.onrender.com/api

---

## 📦 Build (APK / App)

👉 https://expo.dev/accounts/renuka_srivalli/projects/mobile/builds/786d23ec-d9e4-4f8c-aee0-14d4deebef73

---

## ✨ Features

### 🔐 Authentication
- Secure login using JWT
- Persistent session storage

---

### 🧑 Admin Features
- Create tasks
- Assign tasks to users
- View all tasks
- Manage task lifecycle

---

### 👤 User Features
- View assigned tasks only
- Update task status
- Track progress (pending → in-progress → completed)

---

### 📋 Task Management
- Clean UI task cards
- Status indicators
- Priority labels
- Due date support

---

## 🧠 Tech Stack

- React Native (Expo)
- React Native Paper
- Axios (API communication)
- AsyncStorage (auth persistence)
- Node.js backend
- MongoDB database

---

## 🔌 API Configuration

Base URL:

https://task-manager-roles.onrender.com/api


---

## 📱 How to Run Locally


npm install
npx expo start

Then scan QR using Expo Go app.

📂 Project Structure
mobile/
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── theme/
├── App.js
├── app.json
└── eas.json


👥 Role System
Role	Access
Admin	Create & assign tasks
User	View & update assigned tasks

⚠️ Notes
Backend must be running (Render deployed)
Internet required for API calls
JWT authentication required
App works on Expo Go & APK build
