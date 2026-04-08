import { Routes } from "@/types";

export const sellerRoutes: Routes = {
  title: "seller menu",
  items: [
    {
      label: "📊 Dashboard",
      href: "/seller-dashboard",
    },
    {
      label: "💊 Medicines",
      href: "/seller-dashboard/medicines",
    },
    {
      label: "📋 Orders",
      href: "/seller-dashboard/orders",
    },
    {
      label: "💬 Reviews",
      href: "/seller-dashboard/reviews",
    },
    {
      label: "💳 Earnings",
      href: "/seller-dashboard/earnings",
    },
    {
      label: "👤 Profile",
      href: "/seller-dashboard/profile",
    },
  ],
};

