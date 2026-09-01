import {
  AlertTriangle,
  Banknote,
  Package,
  ShoppingCart,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sellerService } from "@/service/seller.service";
import { Medicine } from "@/types";
import { calculatePercentage } from "@/lib/utils";

const Overview = async () => {
  const [products, orders] = await Promise.all([
    sellerService.getSellerMedicines({ revalidate: 60 }),
    sellerService.getSellerOrders({ revalidate: 60 }),
  ]);

  const medicines: Medicine[] = products.data || [];
  const order = orders.data || [];

  // ==============================
  // Current Stats
  // ==============================

  const totalProducts = medicines.length;

  const totalOrders = order.length;

  const revenue = order.reduce((acc: number, ord: any) => {
    if (ord.status !== "DELIVERED") {
      return acc;
    }

    return acc + Number(ord.total_bill || 0);
  }, 0);

  const lowStock = medicines.filter(
    (medicine: Medicine) => Number(medicine.stock_quantity) <= 5,
  );

  const totalLowStock = lowStock.length;

  // ==============================
  // Date Calculation
  // ==============================

  const now = new Date();

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(now.getDate() - 60);

  // ==============================
  // Previous Period Data
  // ==============================

  const currentOrders = order.filter((ord: any) => {
    const date = new Date(ord.createdAt || ord.order_date);

    return date >= thirtyDaysAgo && date <= now;
  });

  const previousOrders = order.filter((ord: any) => {
    const date = new Date(ord.createdAt || ord.order_date);

    return date >= sixtyDaysAgo && date < thirtyDaysAgo;
  });

  // ==============================
  // Current Revenue
  // ==============================

  const currentRevenue = currentOrders.reduce(
    (acc: number, ord: any) => {
      if (ord.status !== "DELIVERED") {
        return acc;
      }

      return acc + Number(ord.total_bill || 0);
    },
    0,
  );

  // ==============================
  // Previous Revenue
  // ==============================

  const previousRevenue = previousOrders.reduce(
    (acc: number, ord: any) => {
      if (ord.status !== "DELIVERED") {
        return acc;
      }

      return acc + Number(ord.total_bill || 0);
    },
    0,
  );


  const orderGrowth = calculatePercentage(
    currentOrders.length,
    previousOrders.length,
  );

  const revenueGrowth = calculatePercentage(
    currentRevenue,
    previousRevenue,
  );

  // Low stock comparison
  // Current low-stock products বনাম previous period-এর ধারণা
  // Since medicine stock history নেই, এখানে শুধু current count দেখানো হচ্ছে.
  const lowStockChange = 0;

  // ==============================
  // Format Percentage
  // ==============================

  const formatPercentage = (value: number) => {
    const rounded = Number(value.toFixed(1));

    if (rounded > 0) {
      return `+${rounded}%`;
    }

    return `${rounded}%`;
  };

  // ==============================
  // Overview Data
  // ==============================

  const overviewData = [
    {
      title: "Products",
      val: totalProducts,
      up: "+0%",
      icon: Package,
      border: "border-[#0b5e4e]",
      badge: "bg-green-50",
    },

    {
      title: "Total Orders",
      val: totalOrders,
      up: formatPercentage(orderGrowth),
      icon: ShoppingCart,
      border: "border-orange-400",
      badge: "bg-orange-50",
    },

    {
      title: "Revenue",
      val: `$${revenue.toLocaleString()}`,
      up: formatPercentage(revenueGrowth),
      icon: Banknote,
      border: "border-blue-500",
      badge: "bg-blue-50",
    },

    {
      title: "Low Stock",
      val: totalLowStock,
      up: formatPercentage(lowStockChange),
      icon: AlertTriangle,
      border: "border-red-500",
      badge: "bg-red-50",
    },
  ];

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((stat, i) => {
        const isNegative = stat.up.startsWith("-");

        return (
          <Card
            key={i}
            className={`border-x-0 border-b-0 border-t-4 ${stat.border} shadow-sm`}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div className={`rounded-xl ${stat.badge} p-2.5`}>
                  <stat.icon className="h-5 w-5 text-slate-600" />
                </div>

                <Badge
                  variant="secondary"
                  className={`text-md font-bold ${
                    stat.title === "Low Stock"
                      ? "bg-red-100 text-red-500"
                      : isNegative
                        ? "bg-red-100 text-red-500"
                        : "bg-green-50 text-[#0b5e4e]"
                  }`}
                >
                  {stat.up}
                </Badge>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-black">{stat.val}</p>

                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default Overview;