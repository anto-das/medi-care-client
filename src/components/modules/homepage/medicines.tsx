import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Sparkles } from "lucide-react";

import EmptyMedicineState from "@/components/ui/EmptyMedicine";
import MediCard from "@/components/ui/mediCard";
import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/types";

const Medicines = async () => {
  const { data } = await medicineService.getMedicines();
  const medicines = data || [];
  const filteredMedicines = medicines
    ?.filter((medicine: Medicine) => medicine.approval_status === "APPROVED")
    .slice(0, 10);

  if (filteredMedicines.length === 0) {
    return <EmptyMedicineState />;
  }

  return (
    <section className="w-full py-16 bg-linear-to-b from-white via-emerald-50/10 to-white border-y border-emerald-950/5 select-none overflow-hidden relative">
      {/* Soft Brand Glow Spheres */}
      <div className="absolute top-12 left-[-5%] w-[450px] h-[450px] bg-[#0c705d]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-12 right-[-5%] w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto w-11/12 max-w-7xl relative z-10">
        {/* Dynamic Header Wrapper matching with Project Theme */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/60 text-[10px] font-bold text-[#0c705d] uppercase tracking-wider">
              <Sparkles className="h-3 w-3 animate-pulse text-amber-500" />{" "}
              Trending Healthcare Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular Medicines
            </h2>
            <p className="text-xs font-semibold text-slate-400 leading-relaxed">
              Most ordered by customers this week • Verified prescription
              fulfillment
            </p>
          </div>

          {/* Fancy Responsive "View All" Button with Brand Border Glow */}
          <div className="shrink-0">
            <Link
              href="/medicine"
              className="inline-flex items-center gap-2 h-10 px-4 text-xs font-bold text-slate-600 hover:text-[#0c705d] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0c705d]/30 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] group"
            >
              <span>View All Collection</span>
              <FaArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-[#0c705d]" />
            </Link>
          </div>
        </div>

        {/* Premium Grid Layout Frame */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
          {filteredMedicines?.map((medicine: Medicine) => (
            <div
              key={medicine.medicine_id}
              className="group relative bg-white border border-slate-100 rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(12,112,93,0.05)] hover:border-[#0c705d]/10 overflow-hidden"
            >
              {/* Subtle top indicator hover line matched with branding */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0c705d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="p-0.5">
                <MediCard medicine={medicine} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Medicines;
