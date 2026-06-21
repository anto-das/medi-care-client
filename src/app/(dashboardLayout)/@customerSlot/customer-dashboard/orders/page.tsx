import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { orderService } from "@/service/order.service";
import { Order } from "@/types";
import Link from "next/link";
import EmptyOrder from "@/components/modules/dashboard/customer/orders/EmptyOrders";

export default async function OrderManagement() {
  const { data } = await orderService.getOrders();
  const orders = data?.data;
  if (orders.length === 0) {
    return <EmptyOrder />;
  }
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Manage Orders
          </h1>
          <p className="text-sm text-slate-500">
            {" "}
            {orders.length} active orders
          </p>
        </div>
        <div className="w-37.5">
          <Select defaultValue="all">
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-md border border-slate-100">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Order ID
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Customer Email
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Name
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Items
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Total
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Date
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Status
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Bill
              </TableHead>
              <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="my-9">
            {orders.map((order: Order) => (
              <TableRow key={order.order_id} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-slate-900">
                  {order.order_id}
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.customer_email}
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.customer_name}
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.orderItems.length}
                </TableCell>
                <TableCell className="text-slate-600">
                  ${order.total_bill}
                </TableCell>
                <TableCell className="text-slate-600">
                  {new Date(order.order_date).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 font-medium px-2 py-0.5 rounded-full"
                  >
                    <span className="mr-1 text-lg">•</span> {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.payment_status === "PAID" ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-100 font-medium px-2 py-0.5 rounded-full"
                    >
                      <span className="mr-1 text-lg">•</span>{" "}
                      {order.payment_status}
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-700 hover:bg-red-100 font-medium px-2 py-0.5 rounded-full"
                    >
                      <span className="mr-1 text-lg">•</span>{" "}
                      {order.payment_status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={"/cart/checkout/order-trek"}
                    className=" border text-gray-600 hover:border-green-700 font-serif py-2 px-4 rounded-md"
                  >
                    Trek
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
