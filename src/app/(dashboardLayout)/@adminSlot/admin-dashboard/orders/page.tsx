import { orderType } from "@/constants/OrderStatus";
import { adminService } from "@/service/admin.service";
import { Order } from "@/types/order.type";

const page = async () => {
  const { data: orders } = await adminService.getAllOrders();
  //   console.log(data);
  return (
    <div className="w-full mx-auto p-6 bg-[#FAF8F5] min-h-screen">
      {/* Table Heading */}
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        All Platform Orders
      </h2>

      {/* Shadcn UI styled Table Container */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200/60 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-100 bg-white text-xs font-semibold uppercase tracking-wider text-gray-400">
              <th className="p-4 pl-6 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Seller</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 pr-6 font-medium">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {orders?.map((order: Order) => {
              //   const style = statusStyles[order.status];
              return (
                <tr
                  key={order.order_id}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  {/* Order ID */}
                  <td className="p-4 pl-6 font-bold text-gray-900">
                    {order.order_id}
                  </td>

                  {/* Customer */}
                  <td className="p-4 font-medium text-gray-600">
                    {order.customer_name}
                  </td>

                  {/* Seller */}
                  <td className="p-4 font-medium text-gray-600">
                    {order.seller_name}
                  </td>

                  {/* Total Amount formatted with Taka (৳) symbol */}
                  <td className="p-4 font-medium text-gray-900">
                    ${order.total_bill}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    {order.status === orderType.PENDING ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        {order.status}
                      </span>
                    ) : order.status === orderType.CANCELLED ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f7efeb] text-[#cc340d]">
                        <span className="w-1.5 h-1.5 rounded-full font-bold bg-[#7e291e]" />
                        {order.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EBF7EE] text-[#1E7E34]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E7E34]" />
                        {order.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
