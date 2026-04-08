import { Routes } from "@/types";

export const customerRoutes: Routes = {
  title: "customer menu",
  items: [
    {
      label: "🏠 Browse",
      href: "/customer-dashboard",
    },
    {
      label: "🛒 My Cart",
      href: "/customer-dashboard/cart",
    },
    {
      label: "📦 My Orders",
      href: "/customer-dashboard/orders",
    },
    {
      label: "📋 Prescriptions",
      href: "/customer-dashboard/prescriptions",
    },

    {
      label: "❤️ Wishlist",
      href: "/customer-dashboard/wishlist",
    },
    {
      label: "👤 Profile",
      href: "/customer-dashboard/profile",
    },
  ],
};

// Browse
// 🛒
// My Cart
// 3
// 📦
// My Orders
// 📋
// Prescriptions
// ❤️
// Wishlist
// 👤
