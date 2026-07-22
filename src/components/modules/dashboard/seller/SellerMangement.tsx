import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Star } from "lucide-react";
import { getTotalUsers } from "@/app/actions/admin.action";
import { Roles } from "@/constants/Roles";
import { adminService } from "@/service/admin.service";

export default async function SellerManagement() {
  const { data: allSeller } = await adminService.getAllSellers();
  const revenue = allSeller?.total_revenue;
  const filteredData = allSeller.sellers;

  // const pendingSeller = filteredData.filter((user :any) =>user.status === "")
  return (
    <div
      data-aos="fade-up"
      className="w-full mx-auto p-6 bg-[#FCF9F4] min-h-screen font-sans"
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Seller Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-700">
            {filteredData.length} active
          </span>{" "}
          {/* · <span className="text-gray-400">{} pending</span> */}
        </p>
      </div>

      {/* Warning/Notification Banner */}
      <div className="flex items-center gap-2 bg-[#FFF8E6] border border-[#FFEAB3] text-[#8A6D22] px-4 py-3.5 rounded-lg text-sm mb-6 shadow-sm">
        <AlertCircle className="w-4 h-4 text-[#E6A23C] fill-[#E6A23C] stroke-[#FFF8E6]" />
        <p>
          <span className="font-bold">12 new applications</span> awaiting DGDA
          verification.
        </p>
      </div>

      {/* Main Table/Grid Container */}
      <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-200 text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-gray-100 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                <th className="py-4 px-6 w-[35%]">Pharmacy</th>
                <th className="py-4 px-6 text-center w-[12%]">Products</th>
                <th className="py-4 px-6 text-center w-[15%]">Revenue</th>
                <th className="py-4 px-6 text-center w-[12%]">Rating</th>
                <th className="py-4 px-6 text-center w-[13%]">Status</th>
                <th className="py-4 px-6 text-center w-[13%]">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredData.map((seller: any) => (
                <tr
                  key={seller.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Pharmacy Name and Location */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600  text-xl font-bold flex items-center justify-center border border-gray-200 shadow-sm uppercase">
                        {seller.img || seller.name.slice(0, 2)}
                      </div>
                      <div>
                        <h2 className=" text-xl font-bold text-gray-900 leading-tight">
                          {seller.name}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {seller.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Products Count */}
                  <td className="py-4 px-6 text-center  text-xl font-bold text-gray-700">
                    {allSeller.total_medicine}
                  </td>

                  {/* Revenue Amount */}
                  <td className="py-4 px-6 text-center text-xl font-bold text-gray-700">
                    {revenue ? revenue : 0} $
                  </td>

                  {/* Rating Score */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700">
                      <Star className="w-4 h-4 fill-[#FFB800] stroke-[#FFB800]" />
                      <span>{seller.rating | 0}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    {seller.emailVerified ? (
                      <Badge className="bg-[#EBFBF3] hover:bg-[#EBFBF3] text-[#2F9E66] border border-[#D1F7E4] px-2.5 py-1 text-xs font-semibold rounded-full shadow-none uppercase">
                        • verified
                      </Badge>
                    ) : (
                      <Badge className="bg-[#fbebed] hover:bg-[#fbebeb] text-[#9e2f35] border border-[#D1F7E4] px-2.5 py-1 text-xs font-semibold rounded-full shadow-none uppercase">
                        • unverified
                      </Badge>
                    )}
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-6 text-center">
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold px-4 py-1.5 h-auto rounded-lg shadow-sm"
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
