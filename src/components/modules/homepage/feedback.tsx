import React from "react";
import { Sparkles, MessageSquare } from "lucide-react";
import Prescription from "@/components/ui/prescription";
import Testimonial from "@/components/ui/testimonial";

const CustomerVoiceSection = () => {
  return (
    <div className="w-full my-16 py-20 bg-linear-to-b from-white via-emerald-50/15 to-white border-y border-emerald-950/5 select-none relative overflow-hidden space-y-20">
      {/* Premium Aurora Background Light Rays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-[400px] bg-[#0c705d]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Prescription Upload Area Wrapper Container */}
      <div className="relative z-10">
        <Prescription />
      </div>

      {/* Testimonials Framework Division Block */}
      <div className="mx-auto w-11/12 max-w-7xl relative z-10 space-y-10">
        {/* Fancy Clean Typography Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/60 text-[10px] font-bold text-[#0c705d] uppercase tracking-wider">
              <MessageSquare className="h-3 w-3 text-[#0c705d]" /> Real Patient
              Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Customers Say
            </h2>
            <p className="text-xs font-semibold text-slate-400 leading-relaxed">
              Trusted by 2 million+ Bangladeshis for verified clinical logistics
              fulfillment
            </p>
          </div>

          {/* Side Small Analytical Context Badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-emerald-950/5 border border-emerald-900/10 px-3 py-1.5 rounded-full text-[11px] font-bold text-[#0c705d]">
            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" /> 4.9/5
            Overall Service Rating
          </div>
        </div>

        {/* Testimonials Component Mapping Area */}
        <div className="w-full relative group">
          {/* Subtle frame glow border highlights */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/0 via-[#0c705d]/5 to-teal-500/0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

          <div className="relative z-10 bg-white/40 backdrop-blur-md border border-white/60 p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerVoiceSection;
