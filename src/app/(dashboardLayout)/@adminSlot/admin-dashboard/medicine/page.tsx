"use client";
import { updateMedicineApprovalStatus } from "@/app/actions/admin.action";
import { getCategories } from "@/app/actions/category.action";
import { getMedicine } from "@/app/actions/medicine.action";
import MedicineCategoriesGrid from "@/components/ui/categoryType";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [medicines, setMedicines] = useState([]);
 
  const fetchMedicines = async () => {
    try {
      const { data } = await getMedicine();
      setMedicines(data);
      
    } catch (error) {
      console.error("Error fetching medicines in page component:", error);
    }
  };
 
  useEffect(() => {
    fetchMedicines();
  }, []);
  const statusStyles = {
    APPROVED: {
      bg: "bg-[#EBFBF2]",
      text: "text-[#10B981]",
    },
    PENDING: {
      bg: "bg-[#FFF3E0]",
      text: "text-[#D97706]",
    },
    REJECTED: {
      bg: "bg-[#FEE2E2]",
      text: "text-[#EF4444]",
    },
  };

  const handleApprovalStatus = async (
    medicineId: string,
    newStatus: string,
  ) => {
    const loadingId = toast.loading("Updating approval status...");
    try {
      const { data } = await updateMedicineApprovalStatus(
        medicineId,
        newStatus,
      );
      toast.success("Approval status updated successfully!", {
        id: loadingId,
      });
      fetchMedicines();
    } catch (error) {
      console.error("Error updating medicine approval status:", error);
      toast.error("Failed to update approval status.", {
        id: loadingId,
      });
    }
  };

  return (
    <div data-aos="fade-up" className="w-full mx-auto p-8 bg-[#FAF8F5] min-h-screen text-gray-700">
      {/* হেডার সেকশন এবং এক্সপোর্ট বাটন */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-black text-gray-950">
          All Medicines
        </h1>
        <button className="px-4 py-2 text-sm font-medium border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm">
          Export CSV
        </button>
      </div>

      {/* ফ্ল্যাগড রিভিউ অ্যালার্ট ব্যানার */}
      <div className="mb-6 flex items-center gap-2 bg-[#FFF9E6] border border-[#FFEBA6] text-[#A67300] px-4 py-3.5 rounded-xl text-sm font-medium">
        <AlertTriangle className="w-4 h-4 text-[#D97706]" />
        <span>
          <strong className="text-amber-900 font-bold">
            {" "}
            {medicines?.length} medicines
          </strong>{" "}
          flagged for review.
        </span>
      </div>

      {/* মূল টেবিল কন্টেইনার */}
      <div className="flex lg:flex-row flex-col justify-between items-center gap-5">
        <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            {/* টেবিল হেডার */}
            <thead>
              <tr className="border-b border-gray-100 bg-white text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4 pl-6 font-medium">Medicine</th>
                <th className="p-4 font-medium">Manufacturer</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Approval</th>
                <th className="p-4 pr-6 font-medium text-center">Actions</th>
              </tr>
            </thead>

            {/* টেবিল বডি */}
            <tbody className="divide-y divide-gray-50">
              {medicines.map((medicine: any) => {
                const currentStatus = medicine.approval_status;
                const style =
                  statusStyles[currentStatus as keyof typeof statusStyles];

                return (
                  <tr
                    key={medicine.medicine_id}
                    className="hover:bg-gray-50/40 transition-colors duration-150 align-middle"
                  >
                    {/* মেডিসিন নেম, ইমেজ এবং জেনেরিক নেম */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1.5 overflow-hidden">
                          <img
                            src={medicine.medi_img}
                            alt={medicine.medicine_name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-950 text-[15px]">
                            {medicine.medicine_name}{" "}
                            <span className="text-xs font-normal text-gray-500 ml-1">
                              {medicine.strength}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {medicine.generic_name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* সেলার বা ম্যানুফ্যাকচারার */}
                    <td className="p-4 font-medium text-gray-600">
                      {medicine.manufacturer}
                    </td>

                    {/* মূল্য (৳ সাইন সহ ফর্ম্যাটেড) */}
                    <td className="p-4 font-bold text-gray-950 text-[15px]">
                      ${Number(medicine.price).toFixed(2)}
                    </td>

                    {/* অ্যাপ্রুভাল স্ট্যাটাস ব্যাজ */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text}`}
                      >
                        • {currentStatus}
                      </span>
                    </td>

                    {/* অ্যাকশন বাটনসমূহ (স্ট্যাটাস অনুযায়ী ডাইনামিক ডিজাইন) */}
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleApprovalStatus(
                              medicine.medicine_id,
                              "APPROVED",
                            )
                          }
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#0A472E] rounded-lg hover:bg-[#073622] transition shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApprovalStatus(
                              medicine.medicine_id,
                              "REJECTED",
                            )
                          }
                          className="px-4 py-1.5 text-xs font-bold text-red-500 bg-[#FFF1F1] border border-[#FFE2E2] rounded-lg hover:bg-red-100/60 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
