"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Edit2, Trash2, AlertTriangle } from "lucide-react";

import {
  deleteMedicine,
  getSellerMedicines,
} from "@/app/actions/seller.action";
import { Medicine } from "@/types";

import UpdateMedicineInfo from "@/components/ui/UpdateMedicineModal";
import { toast } from "sonner";

// ১. টাইপ ডেফিনিশন (Type Safety)
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export default function MyMedicines() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    const { data } = await getSellerMedicines({ cache: "no-store" });
    setMedicines(data || []);
  };

  useEffect(() => {
    (async () => {
      fetchData();
    })();
  }, []);

  // ৩. পারফরম্যান্স অপ্টিমাইজড ফিল্টারিং (Memoized Filter & Search)
  const filteredMedicines = useMemo(() => {
    // ধাপ ১: প্রথমে স্টক স্ট্যাটাস (Active Filter) অনুযায়ী ডাটা আলাদা করুন
    let result = medicines;
    if (activeFilter === "In Stock") {
      result = medicines.filter(
        (medicine) => Number(medicine.stock_quantity) > 5,
      );
    } else if (activeFilter === "Low Stock") {
      result = medicines.filter(
        (medicine) =>
          Number(medicine.stock_quantity) <= 5 &&
          Number(medicine.stock_quantity) > 0,
      );
    } else if (activeFilter === "Out") {
      result = medicines.filter(
        (medicine) => Number(medicine.stock_quantity) === 0,
      );
    }

    // ধাপ ২: এবার ফিল্টার হওয়া রেজাল্ট-এর ওপর সার্চ কোয়েরি চালান (যদি searchQuery থাকে)
    if (searchQuery.trim() !== "") {
      const cleanSearchQuery = searchQuery.trim().toLowerCase();

      result = result.filter((medicine) => {
        // যদি আপনার ডাটাবেজে category_name অবজেক্ট হয়, তবে medicine.category_name.name লিখবেন
        return medicine?.category_name
          ?.toLowerCase()
          .includes(cleanSearchQuery);
      });
    }

    return result;
  }, [medicines, activeFilter, searchQuery]);

  const handleDeleteMedicine = async (id: string) => {
    const res = await deleteMedicine(id);

    if (res.success) {
      // ডিলিট সফল হলে ডাটা রিফ্রেশ করুন
      toast.success("Medicine deleted successfully");
      fetchData();
    } else {
      console.error("Failed to delete medicine:", res.error);
      toast.error("Failed to delete medicine");
    }
  };

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-[#FCFCFA] min-h-screen text-[#1E293B]">
      {/* হেডার সেকশন */}

      {/* অ্যালার্ট ব্যানার */}
      <div className="mb-6 flex items-center gap-3 bg-[#FFF9E6] border border-[#FFEBA6] rounded-xl p-4 text-sm text-[#805B00]">
        <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
        <p>
          <span className="font-bold">
            {medicines.filter((m) => Number(m.stock_quantity) === 0).length}
          </span>{" "}
          medicines running out of stock. Restock soon.
        </p>
      </div>

      {/* ফিল্টার এবং সার্চ বার টপ কন্টেইনার */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* ফিল্টার বাটন গ্রুপ */}
        <div className="flex flex-wrap gap-2">
          {["All", "In Stock", "Low Stock", "Out"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-[#0F291E] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* সার্চ ইনপুট সেকশন */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-3 pr-10 py-2.5 bg-[#F9F9F6] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-200 transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
        </div>
      </div>

      {/* ডাটা টেবিল কন্টেইনার */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Medicine</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium">
              {filteredMedicines.map((medicine) => (
                <tr
                  key={medicine.medicine_id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* মেডিসিন ও জেনেরিক নাম */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 font-semibold text-lg">
                        💊
                      </div>
                      <div>
                        <p className="text-[#0F291E] font-bold text-sm">
                          {medicine.medicine_id}
                        </p>
                        <p className="text-xs text-gray-400 font-normal mt-0.5">
                          {medicine.generic_name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ক্যাটাগরি */}
                  <td className="py-4 px-6 text-gray-500 font-normal">
                    {medicine.category_name}
                  </td>

                  {/* প্রাইস (টাকা সাইন সহ) */}
                  <td className="py-4 px-6 text-[#0F291E] font-semibold">
                    ${medicine.price}
                  </td>

                  {/* স্টক সংখ্যা */}
                  <td className="py-4 px-6 text-gray-600 font-semibold">
                    {medicine.stock_quantity}
                  </td>

                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6">
                    {Number(medicine.stock_quantity) > 5 ? (
                      <span className="text-green-500 bg-green-50 px-3 py-1 rounded-xl font-bold capitalize">
                        in stock
                      </span>
                    ) : Number(medicine.stock_quantity) > 0 ? (
                      <span className="text-amber-500 bg-amber-50 px-3 py-1 rounded-xl font-bold capitalize">
                        low stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl text-red-500 font-bold bg-red-50 capitalize">
                        stock out
                      </span>
                    )}
                  </td>

                  {/* অ্যাকশন বাটনস */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMedicine(medicine)} // ক্লিক করলে সিলেক্টেড মেডিসিন সেট হবে
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-orange-500" />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteMedicine(medicine.medicine_id)
                        }
                        className="p-2 bg-[#FCE8E6] hover:bg-[#FAD2CD] text-[#C53030] rounded-xl transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {selectedMedicine && (
                        <UpdateMedicineInfo
                          open={!!selectedMedicine} // অবজেক্ট থাকলে true হবে
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              setSelectedMedicine(null); // মডাল বন্ধ হলে সিলেক্টেড মেডিসিন রিসেট হবে
                              fetchData(); // মডাল বন্ধ হলে ডাটা রিফ্রেশ হবে যাতে আপডেটেড ডাটা দেখা যায়
                            } // বন্ধ করলে স্টেট null হবে
                          }}
                          medicine={selectedMedicine} // সঠিক মেডিসিন অবজেক্ট পাস হবে
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
