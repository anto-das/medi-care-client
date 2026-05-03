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
import { Button } from "@/components/ui/button";
import { orderService } from "@/service/order.service";
import { Order } from "@/types";

export default async function OrderManagement() {
  const { data } = await orderService.getOrders();
  const orders = data?.data;
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Manage Orders
          </h1>
          <p className="text-sm text-slate-500">384 active orders</p>
        </div>
        <div className="w-[150px]">
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
                Customer
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
              {/* <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Action
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.order_id} className="hover:bg-slate-50/50">
                <TableCell className="text-slate-600">
                  {order.customer_email}
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.orderItems.length}
                </TableCell>
                <TableCell className="text-slate-600">
                  ৳{order.total_bill}
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.order_date}
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
                  <Button className="bg-[#00695C] hover:bg-[#004D40] font-serif text-white h-8 px-4 rounded-md">
                    Confirm
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
