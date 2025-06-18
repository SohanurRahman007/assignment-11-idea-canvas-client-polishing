# 📝 Blog Website

A modern, responsive blog website built using **React**, **Firebase**, and **MongoDB**. This site enables users to read blogs, post their own, interact through wishlists and comments, and manage their content securely.

---

## 🔗 Live Website

👉 [https://idea-canvas-88aaf.web.app]

---

## 🎯 Project Purpose

This project is part of **Assignment-11** where the goal is to create a full-stack blog website with dynamic routing, secure authentication, user interactions (like wishlist & comments), and responsive design that attracts recruiters.

---

## 🚀 Features

### ✅ Authentication

- Firebase Email/Password authentication
- Google OAuth login
- JWT-based private route protection

### 🏠 Home Page

- Banner (Hero section)
- Recent blogs (shows latest 6)
- Newsletter subscription (toast notification)
- Two extra creative sections (like tips, stats)
- Framer Motion animation

### 📖 Blog Functionality

- Add blog (Private route)
- All blogs page with:
  - Search by title (MongoDB text index)
  - Filter by category
- Blog details page:
  - Full details
  - Comment system (with restriction to avoid commenting on own blogs)
  - Update button for blog owner only
- Update blog page with pre-filled form
- Wishlist page (add/remove blogs per user)

### 📊 Featured Blogs Page

- Top 10 blogs based on word count
- Implemented using **TanStack Table** with sortable columns

### 🔐 Security

- JWT token verification on private API routes
- Firebase & MongoDB credentials secured using `.env` files
- Proper CORS handling

### 🎨 UI & UX

- Fully responsive (mobile, tablet, desktop)
- Eye-pleasing color contrast
- Clean and aligned layout
- Error pages (404 Not Found)

---

## 🧪 Extra Enhancements

- Image preview using `react-photo-view`
- Section animation using `react-intersection-observer`
- Skeleton loading using `react-loading-skeleton`

---

## 🧰 Tech Stack

### 🖥️ Frontend

- React
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Framer Motion
- TanStack Table
- Axios
- React Hot Toast

### 🛠️ Backend

- Node.js
- Express.js
- MongoDB (no mongoose)
- JWT
- dotenv
- CORS

---

## 📦 NPM Packages Used

### Client
