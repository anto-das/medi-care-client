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

    // {
    //   label: "👤 Profile",
    //   href: "/customer-dashboard/profile",
    // },
    {
      label: "🌐 Back to site",
      href: "/",
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
