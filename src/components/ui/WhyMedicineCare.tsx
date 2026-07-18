import React from "react";
import { Store, Bike, FileText, ShieldCheck, ArrowUpRight } from "lucide-react";

const featureData = [
  {
    icon: Store,
    emoji: "🏪",
    title: "300+ Verified Sellers",
    desc: "All pharmacies are DGDA-licensed and regularly audited for authenticity and quality.",
    color: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Bike,
    emoji: "🚴",
    title: "Same-Day Delivery",
    desc: "2-hour express delivery in Dhaka, Chittagong & Sylhet. Next-day across Bangladesh.",
    color: "from-blue-500 to-cyan-600",
    bgAccent: "bg-blue-50 text-blue-700 border-blue-100",
    isManrope: true,
  },
  {
    icon: FileText,
    emoji: "📋",
    title: "Prescription Upload",
    desc: "Upload your Rx and our licensed pharmacists review and fulfill your order safely.",
    color: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    icon: ShieldCheck,
    emoji: "🔒",
    title: "100% Genuine",
    desc: "Cold-chain storage, batch tracking, and anti-counterfeit verification on every order.",
    color: "from-purple-500 to-indigo-600",
    bgAccent: "bg-purple-50 text-purple-700 border-purple-100",
  },
];

const WhyMedicineCare = () => {
  return (
    <section className="w-full py-16 bg-slate-50/50 relative overflow-hidden select-none">
      <div className="mx-auto w-11/12 max-w-7xl space-y-12 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Patients Choose Medi<span className="text-[#0c705d]">Care</span>
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            Bangladesh's ultimate trusted healthcare pharmacy workspace
          </p>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-[#dde8e2] rounded-[24px] p-7 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(12,112,93,0.08)] flex flex-col justify-between overflow-hidden"
              >
                {/* Top Border Gradient Hover Glow Line */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="space-y-6">
                  {/* Floating Multi-layered Rounded Icon Frame */}
                  <div className="flex items-center justify-between">
                    <div className={`h-11 w-11 flex items-center justify-center rounded-2xl ${item.bgAccent} border transition-all duration-500 group-hover:scale-105 shadow-sm relative overflow-hidden`}>
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xl filter grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-105">
                      {item.emoji}
                    </span>
                  </div>

                  {/* Core Content Lines */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight transition-colors group-hover:text-slate-900">
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed text-[#8da197] font-medium group-hover:text-slate-500 transition-colors duration-300 ${item.isManrope ? 'font-manrope' : ''}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Subtle Interactive Link Arrow */}
                <div className="pt-4 mt-5 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-[#0c705d] transition-colors">
                    Verified Care
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-[#0c705d] transform translate-x-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyMedicineCare;
