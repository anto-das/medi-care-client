import { Card, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";
import Link from "next/link";
import { sellerService } from "@/service/seller.service";
import { getSellerOrders } from "@/app/actions/seller.action";
import { useEffect, useState } from "react";
import { Order, OrderItem } from "@/types";
import { Status } from "@/app/(dashboardLayout)/@sellerSlot/seller-dashboard/orders/page";

const OrderTable = () => {
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      const { data }: any = await getSellerOrders({ cache: "no-store" });
      setOrder(data);
    })();
  }, []);
  const pendingOrders = order.filter(
    (ord: any) => ord.status === Status.PENDING,
  );
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
        <Link
          href={"/seller-dashboard/orders"}
          className="font-semibold border p-2 border-[#0b5e4e] hover:text-[#0b5e4e] rounded-lg text-slate-500"
        >
          View All
        </Link>
      </CardHeader>
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Order ID
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Customer
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Total
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-xs tracking-widest">
              Status
            </TableHead>
            <TableHead className="text-right font-bold text-slate-400 uppercase text-xs tracking-widest">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">
              {pendingOrders[0] && pendingOrders[0].order_id}
            </TableCell>
            <TableCell className="font-semibold text-slate-600">
              {pendingOrders[0] && pendingOrders[0].customer_name}
            </TableCell>
            <TableCell className="font-bold">
              {pendingOrders[0] && pendingOrders[0].total_bill}৳
            </TableCell>
            <TableCell>
              <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-none px-3 py-1 font-bold">
                {pendingOrders[0] && pendingOrders[0].status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                className="bg-[#0b5e4e] hover:bg-[#084a3d] px-6 font-bold shadow-md"
              >
                Confirm
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default OrderTable;
