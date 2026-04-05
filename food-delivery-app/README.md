# 🍔 FoodRush - Online Food Delivery App

**Stack:** React + Node.js/Express + MySQL (Sequelize ORM)

---

## 📁 Project Structure
```
food-delivery-app/
├── backend/         → Node.js + Express + Sequelize
└── frontend/        → React + Vite
```

---

## ⚙️ MySQL Setup

1. Install MySQL and start the service
2. Create a database:
```sql
CREATE DATABASE fooddelivery;
```
3. Update `backend/.env` with your MySQL credentials

---

## 🚀 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server starts at: **http://localhost:5000**
Tables are auto-created via Sequelize `sync({ alter: true })`

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at: **http://localhost:5173**

---

## 🌱 Seed Sample Data

Once both servers are running:
1. Open http://localhost:5173
2. Click the green **"🌱 Seed Sample Data"** button
3. 4 restaurants will appear

---

## 🔑 Environment Variables (`backend/.env`)

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fooddelivery
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_super_secret_key_here
```

---

## ✅ Features

- JWT Authentication (Register / Login)
- Browse & Search Restaurants
- Filter by Cuisine
- Food Menu with Cart
- Place Orders
- Order History & Status Tracking
- User Dashboard with Stats
- Responsive UI
