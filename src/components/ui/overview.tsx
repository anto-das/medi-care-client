import { AlertTriangle, Banknote, Package, ShoppingCart } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import {
  getSellerMedicines,
  getSellerOrders,
} from "@/app/actions/seller.action";
import { Medicine, Order } from "@/types";

enum Status {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

const Overview = () => {
  const [medicines, setMedicines] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const pendingOrders = orders.filter(
    (order: any) => order.status === Status.PENDING,
  );
  useEffect(() => {
    (async () => {
      const { data } = await getSellerMedicines({ revalidate: 60 });
      if (data.length > 0) {
        setMedicines(data);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data: orders } = await getSellerOrders({ revalidate: 60 });
      if (orders.length > 0) {
        setOrders(orders);
      }
    })();
  }, []);
  const overview = useMemo(() => {
    const stock_quantity = medicines?.map(
      (medicine: Medicine) => Number(medicine.stock_quantity) < 5,
    );
    return { stock_quantity };
  }, [medicines?.length]);
  const revenue = orders?.reduce((acc: number, order: Order) => {
    const { status, total_bill } = order;
    // console.log("status: ", status.toString());
    if (status.toString() === Status.DELIVERED) {
      console.log("hello status");
      return acc + Number(total_bill);
    }
    return acc;
  }, 0);

  // console.log("revenue: ",revenue)

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Products",
          val: medicines?.length.toString() || 0,
          up: "+12%",
          icon: Package,
          border: "border-[#0b5e4e]",
          badge: "bg-green-50",
        },
        {
          title: "Active Orders",
          val: pendingOrders.length.toString() || 0,
          up: "+28%",
          icon: ShoppingCart,
          border: "border-orange-400",
          badge: "bg-orange-50",
        },
        {
          title: "Revenue",
          val: `${revenue}৳`,
          up: "+8.4%",
          icon: Banknote,
          border: "border-blue-500",
          badge: "bg-blue-50",
        },
        {
          title: "Low Stock",
          val: overview.stock_quantity?.length.toString() || 0,
          up: "+5%",
          icon: AlertTriangle,
          border: "border-red-500",
          badge: "bg-red-50",
        },
      ].map((stat, i) => (
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
