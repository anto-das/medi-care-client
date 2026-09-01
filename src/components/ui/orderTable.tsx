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

import NoOrdersState from "./NoOrderState";

const OrderTable = async () => {
  const [orders] = await Promise.all([sellerService.getSellerOrders()]);
  const order = (await orders?.data) || [];
  if (order?.length === 0) {
    return <NoOrdersState />;
  }

  const pendingOrders = order?.filter((ord: any) =>
    ord.status === "PENDING" ? ord : [],
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
              {pendingOrders[0 - 6] && pendingOrders[0 - 6].order_id}
            </TableCell>
            <TableCell className="font-semibold text-slate-600">
              {pendingOrders[0 - 6] && pendingOrders[0 - 6].customer_name}
            </TableCell>
            <TableCell className="font-bold">
              {pendingOrders[0 - 6] && pendingOrders[0 - 6].total_bill}$
            </TableCell>
            <TableCell>
              <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-none px-3 py-1 font-bold">
                {pendingOrders[0] && pendingOrders[0].status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Link href={"/seller-dashboard/orders"}>
                <Button
                  size="sm"
                  className="bg-[#0b325e] hover:bg-[#1f4d92] px-6 font-bold shadow-md"
                >
                  Order Info
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default OrderTable;
