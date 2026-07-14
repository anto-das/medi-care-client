# MediCare Client 🏥

This is the frontend web application for the **MediCare** project, built using **Next.js**. It is a **Multi-Vendor E-Pharmacy & Healthcare Marketplace** featuring Role-Based Access Control (RBAC) and automated payment workflows. It connects seamlessly with the [MediCare Server API]([https://medicare-three-hazel.vercel.app/]).

---

## 🚀 Core Features

*   **🛒 E-Pharmacy Marketplace:** Users can browse, filter, and securely purchase medicines uploaded by verified sellers.
*   **👥 Role-Based Access Control (RBAC):** Strict route protection and distinct UI dashboards based on user permissions.
*   **💳 Secure Payment Flow:** Integrated with Stripe Checkout for crisp, safe digital transactions.
*   **⚡ Automated Fulfillment:** Processes real-time transaction states utilizing secure Stripe Webhooks on the backend.
*   **📈 Next.js Performance:** Built with the App Router, offering rapid loading speeds through Server-Side Rendering (SSR).
*   **🔒 Secure Authentication:** User registration, login, and token/cookie management powered by Better Auth.

---

## 👥 Multi-Role Dashboard Management

The system dynamically adapts its workflow depending on who signs in:

*   **🛒 General User Dashboard:** Accessible upon authentication. Allows users to purchase medicine, track live orders, review transaction invoices, and manage personal medical details.
*   **🏪 Seller Dashboard:** A dedicated space for pharmacy vendors to manage product listings, track medicine inventories, monitor sales analytics, and update fulfillment metrics.
*   **🔑 Admin Command Center:** The master control panel to oversee global marketplace statistics, verify/approve new marketplace sellers, and handle platform management.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js (App Router)
*   **Runtime:** Node.js (v18+)
*   **Styling:** Tailwind CSS / Shadcn UI
*   **Data Fetching:** Axios / TanStack Query (React Query)
*   **Payments:** Stripe Client SDK
*   **Auth Integration:** Better Auth Client Hooks

---

## 📋 Prerequisites

Before setting up the frontend, ensure you have:
*   **Node.js** (v18.0.0 or higher)
*   **MediCare Server API** running locally or deployed ([Backend Setup Guide](https://github.com))

---

## ⚙️ Local Setup Guide

Follow these steps to run the application locally:

### 1. Clone the Project
```bash
git clone https://github.com
cd medicare-client
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a file named `.env.local` in the root directory and configure the environment variables:

```env
# Backend Server API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth Configuration for Client
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000

# Stripe Public Key for Frontend Checkout
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key_here
```

### 4. Start the Application Server
```bash
# Run in development mode
npm run dev

# Build the project for production
npm run build

# Start the production build server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the live dashboard and marketplace.

---

## 📁 Next.js Project Architecture

```text
├── public/              # Static assets (images, logos, icons)
├── src/
│   ├── app/             # Next.js App Router 
│   │   ├── (auth)/      # Login, Registration, Verification layouts
│   │   ├── admin/       # Admin control center and user verification panels
│   │   ├── seller/      # Seller inventory management and sales tools
│   │   ├── user/        # Patient/Buyer purchase history and profile panels
│   │   ├── checkout/    # Stripe payment handling page
│   │   └── page.js      # Main marketplace homepage
│   ├── components/      # Shared components (Navbar, Sidebar, ProductCards)
│   ├── hooks/           # Custom React hooks & Auth state hooks
│   ├── lib/             # API client services (Axios instances with credentials)
│   └── styles/          # Tailwind setup & global CSS themes
├── .env.local           # Local environmental variables
├── next.config.js       # Custom configurations
└── package.json         # Scripts and system packages
```

---

## 🔒 Security & Route Guards

*   **🌍 Public Access:** Anyone can view medicine listings and read public info.
*   **🔐 Auth Gatekeeping:** Checkout flows and personal dashboards are locked behind **Better Auth**.
*   **🛡️ Role Protection:** Advanced Next.js middleware or layout-level route checks actively block users from crossing into `seller` or `admin` routes.
