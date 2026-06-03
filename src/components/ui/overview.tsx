import { AlertTriangle, Banknote, Package, ShoppingCart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sellerService } from "@/service/seller.service";
import { Medicine, Order } from "@/types";

const Overview = async () => {
  const [products, orders] = await Promise.all([
    sellerService.getSellerMedicines({ revalidate: 60 }),
    sellerService.getSellerOrders({ revalidate: 60 }),
  ]);
  // console.log(products, orders);
  const medicines = products.data || [];
  const order = orders.data;
  const revenue = order?.reduce((acc: number, ord: any) => {
    if (ord.status !== "DELIVERED") {
      return acc;
    }
    return acc + Number(ord.total_bill);
  }, 0);
  const lowStock = medicines?.filter(
    (medicine: Medicine) => Number(medicine.stock_quantity) <= 5,
  );
  const overviewData = [
    {
      title: "Products",
      val: medicines?.length || 0,
      up: "+12%",
      icon: Package,
      border: "border-[#0b5e4e]",
      badge: "bg-green-50",
    },
    {
      title: "total orders",
      val: order?.length || 0,
      up: "+28%",
      icon: ShoppingCart,
      border: "border-orange-400",
      badge: "bg-orange-50",
    },
    {
      title: "Revenue",
      val: `$${revenue || 0}`,
      up: "+8.4%",
      icon: Banknote,
      border: "border-blue-500",
      badge: "bg-blue-50",
    },
    {
      title: "Low Stock",
      val: lowStock?.length || 0,
      up: "+5%",
      icon: AlertTriangle,
      border: "border-red-500",
      badge: "bg-red-50",
    },
  ];
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {overviewData?.map((stat, i) => (
        <Card
          key={i}
          className={`border-t-4 ${stat.border} shadow-sm border-x-0 border-b-0`}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div className={`rounded-xl ${stat.badge} p-2.5`}>
                <stat.icon className="h-5 w-5 text-slate-600 " />
              </div>
              <Badge
                variant="secondary"
                className={`text-md font-bold ${stat.title === "Low Stock" ? "text-red-500 bg-red-100" : "text-[#0b5e4e] bg-green-50"} hover:${stat.badge}`}
              >
                {stat.up}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black">{stat.val}</p>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {stat.title}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Overview;
