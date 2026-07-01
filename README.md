# JewelVault ERP – Jewellery Management System

## 🚀 Overview

JewelVault ERP is a complete jewellery management system with **dual‑environment** (White / Black) support, unified login, profile with password change, interactive charts, and custom UI components.

## ✨ Key Features

- **Unified Login** – one page for all users; environment determined by username.
- **Black Data Wipe** – any black login attempt (even with wrong password) silently wipes all black transactions.
- **Profile Dropdown** – change password and sign out from the navbar.
- **Interactive Charts** – line, bar, area, and pie charts with time‑range selectors.
- **Custom Selects & Date Picker** – consistent, branded form controls.
- **Toaster Notifications** – success/error messages for all actions.
- **Hidden Scrollbars** – clean UI on modals and dropdowns.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router, Recharts, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.

## 🚦 Getting Started

1. Install dependencies: `npm install`
1. Seed the database: `npm run seed`
1. Start backend: `npm run server`
1. Start frontend: `npm run dev`

**Default Credentials**

- White: `admin` / `admin@2026`, `manager` / `manager@2026`, `employee` / `employee@2026`
- Black: `blackadmin` / `black@2026`

## 📁 Project Structure

```
├── server/               # Backend (Express + MongoDB)
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   └── seed.js
├── src/                  # Frontend (React + Vite)
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── lib/
│   ├── providers/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── ...
```

## 📄 License

Proprietary – all rights reserved.