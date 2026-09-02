# TechShop - E-commerce Demo (Fullstack React & Node.js)

> **Note:** This repository contains the source code for the public demo version of my production e-commerce project, **[Smartek Store](https://smartekua.store/)**.
> For security and privacy reasons, the actual branding, logos, and sensitive configuration files have been replaced or removed. The core architecture, features, and logic remain identical to the live production site.

## 🚀 Live Production Site

**[Visit the actual project here: smartekua.store](https://smartekua.store/)**

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express.js, AdminJS
- **Database:** MongoDB, Mongoose

## ✨ Key Features

- **Responsive UI:** Fully adaptive design for mobile devices, including performance optimization for rendering 3D elements.
- **Modern Navigation:** Product catalog, modal windows, and smooth scrolling.
- **Admin Dashboard:** Integrated AdminJS panel for managing inventory (products, generations, condition) and processing customer orders.
- **SEO Optimized:** Configured meta tags, web manifests, and favicons for better search engine visibility.
- **Architecture:** Modular codebase with a clear separation of concerns (models, routes, controllers).

## 💻 How to Run Locally

### 1. Clone the repository

```bash
git clone [https://github.com/MishaTomash/smartek-store-demo.git](https://github.com/MishaTomash/smartek-store-demo.git)
```

### 2. Install dependencies

Install dependencies for both frontend and backend:

```bash
# In the root directory (frontend)
npm install

# In the server directory (backend)
cd server
npm install
```

### 3. Environment Setup

Create a `.env` file in the `/server` directory based on the provided `.env.example`:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=your_secret_key
```

### 4. Start the Application

You will need two terminal windows to run the frontend and backend concurrently.

**Terminal 1 (Backend):**

```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**

```bash
npm run dev
```
