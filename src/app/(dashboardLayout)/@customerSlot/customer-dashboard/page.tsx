import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";
import { Pill, ShieldCheck, AlertCircle } from "lucide-react";

const DashboardMedicinePage = async () => {
  // ১. ডাটা ফেচিং
  const { data } = await medicineService.getMedicines(undefined, {
    revalidate: 10,
  });

  // ২. ফিল্টারিং লজিক
  const filteredMedicines =
    data?.filter(
      (medicine: Medicine) => medicine.approval_status === "APPROVED",
    ) || [];

  return (
    <div
      data-aos="fade-up"
      className="bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-8 min-h-screen transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* 🌟 ড্যাশবোর্ড পেজ হেডার এবং ইনফো কাউন্টার */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-5 bg-emerald-500 rounded-full" />
              <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                Approved Medicines
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Manage and view all clinically verified medicines in the system.
            </p>
          </div>

          {/* লাইভ কাউন্ট ব্যাজ */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 w-fit">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Total Verified: {filteredMedicines.length}
          </div>
        </div>

        {/* 📦 মেডিসিন গ্রিড লেআউট */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMedicines.map((medicine: Medicine) => (
              <div
                key={medicine.medicine_id}
                className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl"
              >
                <MediCard medicine={medicine} />
              </div>
            ))}
          </div>
        ) : (
          /* 🔍 নো ডাটা বা এম্পটি স্টেট হ্যান্ডেলিং */
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base">
              No Medicines Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
              There are currently no approved medicines available in the list.
              Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMedicinePage;
