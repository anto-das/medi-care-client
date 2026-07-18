import React from "react";
import { ArrowRightIcon, FileUp, Sparkles, ShieldCheck } from "lucide-react";

const Prescription = () => {
  return (
    <div className="w-11/12 mx-auto relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c594a] via-[#09473b] to-[#052b24] border border-emerald-900/40 p-8 py-14 lg:py-16 shadow-[0_30px_60px_-15px_rgba(12,112,93,0.15)] group select-none">
      
      {/* Dynamic Absolute Background Light Ambient Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transform translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-20 translate-y-20" />
      
      {/* Decorative Grid Line Textures */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Structural Layout Context Row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* Left Informational Content Blocks wrapper */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:max-w-3xl">
          
          {/* Floating Neon Animated Icon Badge Frame */}
          <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-xl relative overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:border-emerald-400/30">
            <span className="text-4xl absolute z-10 select-none">📋</span>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="space-y-3">
            {/* Minimal Upper Micro Tags */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" /> Rx Digital Verification Service
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-black tracking-tight leading-none">
              Have a prescription?
            </h2>
            
            <p className="text-emerald-100/60 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Upload your doctor's prescription and get medicines delivered within{" "}
              <span className="text-emerald-400 font-bold underline decoration-emerald-500/40 decoration-2 underline-offset-4">2 hours</span>{" "}
              in major cities. Our expert licensed pharmacists will review and fulfill your order safely.
            </p>
          </div>
        </div>

        {/* Right Click Call to Action Area */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col items-center gap-2.5">
          <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0c594a] rounded-xl w-full lg:w-auto px-6 py-4 text-xs font-black uppercase tracking-wider shadow-xl shadow-emerald-950/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/30 active:scale-[0.98] border border-white focus:outline-none cursor-pointer">
            <FileUp className="h-4 w-4 stroke-[2.5]" />
            <span>Upload Prescription</span> 
            <ArrowRightIcon className="h-3.5 w-3.5 stroke-[3] transition-transform group-hover:translate-x-1" />
          </button>
          
          {/* Small Trust Compliance Note line */}
          <span className="text-[10px] font-bold text-emerald-100/40 flex items-center gap-1 uppercase tracking-widest select-none">
            <ShieldCheck className="h-3 w-3 text-emerald-400/60" /> DGDA Protected Protocol
          </span>
        </div>

      </div>
    </div>
  );
};

export default Prescription;
