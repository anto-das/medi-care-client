import { getSellerOrders } from "@/app/actions/seller.action";
import {
  handleConfirmOrder,
  handleDeleteOrder,
} from "@/app/utilis/handleConfirmOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NoOrdersState from "@/components/ui/NoOrderState";
import { orderType } from "@/constants/OrderStatus";
import { Order } from "@/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrder = async () => {
    const res = await getSellerOrders({ cache: "no-store" });
    setOrders(res.data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  if (orders.length === 0) {
    return <NoOrdersState />;
  }
  return (
    <div className="w-full max-w-full mx-auto p-6 bg-[#FCFCFB] min-h-screen">
      {/* Table Container with shadcn-like Card Styling */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Top Filter & Search Bar */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          {/* Status Dropdown Trigger (simulating shadcn Select) */}
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">
            All Status
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Search Input (simulating shadcn Input) */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search order..."
              className="w-full pl-3 pr-10 py-2 border border-gray-100 rounded-lg text-sm bg-[#F9F9F8] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[11px] tracking-wider font-semibold text-gray-400 uppercase">
                <th className="py-3 px-6 font-medium">Order ID</th>
                <th className="py-3 px-6 font-medium">Customer</th>
                <th className="py-3 px-6 font-medium">Total</th>
                <th className="py-3 px-6 font-medium">Date</th>
                <th className="py-3 px-6 font-medium">Status</th>
                <th className="py-3 px-6 font-medium">Bill</th>
                <th className="py-3 px-6 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {orders?.map((ord: any) => (
                <tr
                  key={ord.order_id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Order ID */}
                  <td className="py-4 px-6 text-[#1E3A2B] font-semibold">
                    {ord.order_id}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-6 text-gray-500 font-normal">
                    {ord.customer_name}
                  </td>

                  {/* Total */}
                  <td className="py-4 px-6 font-semibold">{ord.total_bill}$</td>

                  {/* Date */}
                  <td className="py-4 px-6 text-gray-500 font-normal">
                    {new Date(ord.order_date).toLocaleDateString("en-US", {
                      timeZone: "Asia/Dhaka",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  {/* Status (simulating shadcn Badge) */}
                  <td className="py-4 px-6">
                    {ord.status === orderType.PENDING ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        {ord.status}
                      </span>
                    ) : ord.status === orderType.CANCELLED ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f7efeb] text-[#cc340d]">
                        <span className="w-1.5 h-1.5 rounded-full font-bold bg-[#7e291e]" />
                        {ord.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EBF7EE] text-[#1E7E34]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E7E34]" />
                        {ord.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {ord.payment_status === "PAID" ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-100 font-medium px-2 py-0.5 rounded-full"
                      >
                        <span className="mr-1 text-lg">•</span>{" "}
                        {ord.payment_status}
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-700 hover:bg-red-100 font-medium px-2 py-0.5 rounded-full"
                      >
                        <span className="mr-1 text-lg">•</span>{" "}
                        {ord.payment_status}
                      </Badge>
                    )}
                  </td>

                  {/* Action (simulating shadcn Button) */}
                  <td className="py-4 px-6">
                    {ord.status === orderType.PENDING ? (
                      <Button
                        onClick={() => {
                          handleConfirmOrder(ord?.order_id, "DELIVERED");
                          fetchOrder();
                        }}
                        size="sm"
                        className="bg-[#0b5e4e] hover:bg-[#084a3d] px-6 font-bold shadow-md"
                      >
                        Confirm
                      </Button>
                    ) : ord.status === orderType.CANCELLED ? (
                      <Button
                        onClick={() => {
                          handleDeleteOrder(ord?.order_id);
                          fetchOrder();
                        }}
                        size="sm"
                        className="bg-[#b30909] hover:bg-[#880f19] px-6 font-bold shadow-md"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleConfirmOrder(ord?.order_id, "CANCELLED");
                          fetchOrder();
                        }}
                        size="sm"
                        className="bg-[#5e0b0b] hover:bg-[#880f19] px-6 font-bold shadow-md"
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
