import {
  Banknote,
  BriefcaseMedical,
  BriefcaseMedicalIcon,
  Package,
} from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

import { getTotalUsers } from "@/app/actions/admin.action";
import { Roles } from "@/constants/Roles";
import { getAllOrders } from "@/app/actions/order.action";
import { getMedicine } from "@/app/actions/medicine.action";

const AdminOverview = async () => {
  const [usersRes, ordersRes, medicineRes] = await Promise.all([
    getTotalUsers(),
    getAllOrders(),
    getMedicine(),
  ]);

  const users = usersRes.data || [];
  const orders = ordersRes.data?.data || [];
  const medicines = medicineRes.data || [];

  // console.log(medicines);

  const totalUsers = users?.filter((user: any) => user.role === Roles.CUSTOMER);
  const totalSeller = users?.filter((user: any) => user.role === Roles.SELLER);
  const totalRevenue = orders?.reduce((acc: any, order: any) => {
    if (order.status === "DELIVERED") {
      return acc + Number(order.total_bill);
    }
    return acc;
  }, 0);
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total users",
          val: totalUsers?.length || 0,
          up: "+12%",
          icon: Package,
          border: "border-[#0b5e4e]",
          badge: "bg-green-50",
        },
        {
          title: "sellers",
          val: totalSeller?.length || 0,
          up: "+28%",
          icon: BriefcaseMedical,
          border: "border-orange-400",
          badge: "bg-orange-50",
        },
        {
          title: "revenue",
          val: `${totalRevenue || 0}$`,
          up: "+8.4%",
          icon: Banknote,
          border: "border-blue-500",
          badge: "bg-blue-50",
        },
        {
          title: "medicines",
          val: medicines.length,
          up: "+5%",
          icon: BriefcaseMedicalIcon,
          badge: "bg-green-50",
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
                className={`text-md font-bold text-[#0b5e4e] hover:${stat.badge}`}
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

export default AdminOverview;
