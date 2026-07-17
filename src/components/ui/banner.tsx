// @/components/Banner.tsx
import React from "react";
import { ArrowRight, Search, Upload, ShieldCheck, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeaturedProduct from "./bannerFeaturedProd";
import { MotionCard, MotionContainer, MotionItem } from "./BannerAnimation";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[75vh] w-full bg-linear-to-br from-emerald-50/50 via-white to-teal-50/30 overflow-hidden flex items-center py-12 md:py-16 lg:py-0">
      {/* Premium Medical Grid Background & Soft Glow Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-200/20 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-10 w-100 h-100 bg-teal-200/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_0.8px,transparent_0.8px)] bg-size-[24px_24px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Side: Copywriting & Actions (Animated safely via Client Wrapper) */}
        <MotionContainer>
          {/* Trust Badge */}
          <MotionItem>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              🇧🇩 Bangladesh's Trusted Pharmacy Platform
            </span>
          </MotionItem>

          {/* Heading */}
          <MotionItem>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your Health, <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 italic pr-2 font-black">
                Delivered
              </span>{" "}
              to Your Door.
            </h1>
          </MotionItem>

          {/* Description */}
          <MotionItem>
            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Order genuine medicines from{" "}
              <span className="font-semibold text-slate-800">
                300+ DGDA-verified
              </span>{" "}
              pharmacies. Fast, trackable delivery across all 64 districts.
            </p>
          </MotionItem>

          {/* Search bar and Actions */}
          <MotionItem>
            <div className="flex flex-col gap-4 w-full max-w-xl">
              {/* Shadcn UI Search Input Field Box */}
              <div className="group relative flex items-center p-1.5 rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-100/80 transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                <div className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-200">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  disabled
                  placeholder="Search medicine name, brand, or generic..."
                  className="w-full h-12 bg-transparent pl-11 pr-36 border-0 text-slate-800 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base font-medium"
                />

                <Link
                  href={"/medicine"}
                  className="absolute right-1.5 h-11 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold px-5 rounded-xl shadow-md transition-all flex items-center gap-1.5 group/btn"
                >
                  Search
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Action Buttons Group */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Link href={"/medicine"}>
                  <Button
                    size="lg"
                    className="flex-1 sm:flex-initial h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm"
                  >
                    Browse Medicines
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-initial h-12 px-6 rounded-xl border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50 hover:text-emerald-700 font-bold text-emerald-600 transition-all gap-2"
                >
                  <Upload className="h-4 w-4 text-emerald-500" />
                  Upload Prescription
                </Button>
              </div>
            </div>
          </MotionItem>

          {/* Micro Trust Signs */}
          <MotionItem>
            <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>100% DGDA Genuine Medicine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Nationwide Safe Delivery</span>
              </div>
            </div>
          </MotionItem>
        </MotionContainer>

        {/* Right Side: Featured Product Card (Width fixed perfectly) */}
        <MotionCard>
          <div className="w-full  transition-all duration-300 hover:-translate-y-1 drop-shadow-xl flex justify-center items-center">
            <FeaturedProduct />
          </div>
        </MotionCard>
      </div>
    </section>
  );
}
