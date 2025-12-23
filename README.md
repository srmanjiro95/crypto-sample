# 🪙 Crypto Dashboard

A simple and dynamic cryptocurrency dashboard built with **React Router (Framework mode)** and **TypeScript**, inspired by Remix v2 data APIs.  
It displays real-time crypto prices from the **Coinbase public API**, allowing users to filter, reorder, and personalize their dashboard.

This project was built as a technical demo focusing on clean architecture, SSR, and modern React patterns.

---

## 🚀 Tech Stack

- ⚛️ **React + TypeScript**
- 🧭 **React Router (Framework / Data APIs)**  
  Using loaders, actions, and SSR (successor of Remix v2 concepts)
- 🎨 **Tailwind CSS v4 (CSS-first)**
- 🖱️ **@dnd-kit** for drag & drop reordering
- 🌐 **Coinbase Public API** for real-time prices
- 🧪 **Vitest + Testing Library** for unit tests
- 🍪 Cookie-based sessions for authentication

> React Router framework supersedes Remix v2 while keeping the same mental model: loaders, actions, and server-side rendering.

---

## ✨ Features

### 📊 Real-time Crypto Dashboard
- Displays at least 10 cryptocurrencies (BTC, ETH, SOL, ADA, etc.)
- Shows:
  - USD price
  - BTC conversion rate
- Data fetched on the server using loaders.

### 🔄 Drag & Drop Reordering
- Reorder cards via drag & drop.
- Order is persisted in **localStorage** during the session.

### 🔍 Filtering
- Filter cryptos by name or symbol in real time.

### 🌗 Dark / Light Mode
- Toggle between light and dark themes.
- Implemented using Tailwind v4 with class-based dark mode.
- Theme preference stored in **localStorage**.

### 💾 Persistence
- Card order → localStorage  
- Theme → localStorage

### 🔐 Authentication (Demo Session)
- Cookie-based session auth using React Router actions.
- Routes are protected on the server.
- Includes login & logout flow.

**Dummy credentials:**

# 🪙 Crypto Dashboard

A simple and dynamic cryptocurrency dashboard built with **React Router (Framework mode)** and **TypeScript**, inspired by Remix v2 data APIs.  
It displays real-time crypto prices from the **Coinbase public API**, allowing users to filter, reorder, and personalize their dashboard.

This project was built as a technical demo focusing on clean architecture, SSR, and modern React patterns.

---

## 🚀 Tech Stack

- ⚛️ **React + TypeScript**
- 🧭 **React Router (Framework / Data APIs)**  
  Using loaders, actions, and SSR (successor of Remix v2 concepts)
- 🎨 **Tailwind CSS v4 (CSS-first)**
- 🖱️ **@dnd-kit** for drag & drop reordering
- 🌐 **Coinbase Public API** for real-time prices
- 🧪 **Vitest + Testing Library** for unit tests
- 🍪 Cookie-based sessions for authentication

> React Router framework supersedes Remix v2 while keeping the same mental model: loaders, actions, and server-side rendering.

---

## ✨ Features

### 📊 Real-time Crypto Dashboard
- Displays at least 10 cryptocurrencies (BTC, ETH, SOL, ADA, etc.)
- Shows:
  - USD price
  - BTC conversion rate
- Data fetched on the server using loaders.

### 🔄 Drag & Drop Reordering
- Reorder cards via drag & drop.
- Order is persisted in **localStorage** during the session.

### 🔍 Filtering
- Filter cryptos by name or symbol in real time.

### 🌗 Dark / Light Mode
- Toggle between light and dark themes.
- Implemented using Tailwind v4 with class-based dark mode.
- Theme preference stored in **localStorage**.

### 💾 Persistence
- Card order → localStorage  
- Theme → localStorage

### 🔐 Authentication (Demo Session)
- Cookie-based session auth using React Router actions.
- Routes are protected on the server.
- Includes login & logout flow.

**Dummy credentials:**
Email: demo@crypto.com
Password: demo