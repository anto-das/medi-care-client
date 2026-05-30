import { Routes } from "@/types";

export const sellerRoutes: Routes = {
  title: "seller menu",
  items: [
    {
      label: "📊 Dashboard",
      href: "/seller-dashboard",
    },
    {
      label: "💊My Medicines",
      href: "/seller-dashboard/medicine",
    },
    {
      label: "➕ Add Medicine",
      href: "/seller-dashboard/add-medicine",
    },
    {
      label: "📋 Orders",
      href: "/seller-dashboard/orders",
    },
    // {
    //   label: "💬 Reviews",
    //   href: "/seller-dashboard/reviews",
    // },
    // {
    //   label: "💳 Earnings",
    //   href: "/seller-dashboard/earnings",
    // },
    // {
    //   label: "👤 Profile",
    //   href: "/seller-dashboard/profile",
    // },
    {
      label: "🌐 Back to site",
      href: "/",
    },
  ],
};
