"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, AlertTriangle } from "lucide-react";

// ১. টাইপ ডেফিনিশন (Type Safety)
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Medicine {
  id: string;
  name: string;
  generic: string;
  category: string;
  price: number;
  stock: number;
  status: StockStatus;
}

// ২. মক ডাটা (Mock Data)
const initialMedicines: Medicine[] = [
  {
    id: "1",
    name: "Napa Extra 500mg",
    generic: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 12.0,
    stock: 4200,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Amoxil 500mg",
    generic: "Amoxicillin 500mg",
    category: "Antibiotics",
    price: 85.0,
    stock: 120,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Insulin Mixtard",
    generic: "Insulin 100IU/mL",
    category: "Diabetic",
    price: 620.0,
    stock: 0,
    status: "Out of Stock",
  },
];

export default function MedicineInventory() {
  const [medicines] = useState<Medicine[]>(initialMedicines);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ৩. পারফরম্যান্স অপ্টিমাইজড ফিল্টারিং (Memoized Filter & Search)
  const filteredMedicines = useMemo(() => {
    return medicines.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.generic.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === "All") return matchesSearch;
      if (activeFilter === "In Stock")
        return item.status === "In Stock" && matchesSearch;
      if (activeFilter === "Low Stock")
        return item.status === "Low Stock" && matchesSearch;
      if (activeFilter === "Out")
        return item.status === "Out of Stock" && matchesSearch;
      return matchesSearch;
    });
  }, [medicines, activeFilter, searchQuery]);

  // ৪. ডাইনামিক স্ট্যাটাস ব্যাজ রেন্ডারিং
  const renderStatusBadge = (status: StockStatus) => {
    const styles = {
      "In Stock": "bg-[#EBF7EE] text-[#1E7E34]",
      "Low Stock": "bg-[#FFF4E5] text-[#B76E00]",
      "Out of Stock": "bg-[#FCE8E6] text-[#C53030]",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${status === "In Stock" ? "bg-[#1E7E34]" : status === "Low Stock" ? "bg-[#B76E00]" : "bg-[#C53030]"}`}
        />
        {status}
      </span>
    );
  };

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-[#FCFCFA] min-h-screen text-[#1E293B]">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-serif text-[#0F291E]">
            Medicine Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {medicines.length.toLocaleString()} products
          </p>
        </div>
        {/* Shadcn Button এর মতো স্টাইল */}
        <button className="inline-flex items-center gap-2 bg-[#0F291E] hover:bg-[#163D2D] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          Add Medicine
        </button>
      </div>

      {/* অ্যালার্ট ব্যানার */}
      <div className="mb-6 flex items-center gap-3 bg-[#FFF9E6] border border-[#FFEBA6] rounded-xl p-4 text-sm text-[#805B00]">
        <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
        <p>
          <span className="font-bold">23 medicines</span> running low. Restock
          soon.
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
                  key={medicine.id}
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
                          {medicine.name}
                        </p>
                        <p className="text-xs text-gray-400 font-normal mt-0.5">
                          {medicine.generic}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ক্যাটাগরি */}
                  <td className="py-4 px-6 text-gray-500 font-normal">
                    {medicine.category}
                  </td>

                  {/* প্রাইস (টাকা সাইন সহ) */}
                  <td className="py-4 px-6 text-[#0F291E] font-semibold">
                    ৳{medicine.price.toFixed(2)}
                  </td>

                  {/* স্টক সংখ্যা */}
                  <td className="py-4 px-6 text-gray-600 font-semibold">
                    {medicine.stock.toLocaleString()}
                  </td>

                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6">
                    {renderStatusBadge(medicine.status)}
                  </td>

                  {/* অ্যাকশন বাটনস */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-all">
                        <Edit2 className="w-3.5 h-3.5 text-orange-500" />
                        Edit
                      </button>
                      <button className="p-2 bg-[#FCE8E6] hover:bg-[#FAD2CD] text-[#C53030] rounded-xl transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
