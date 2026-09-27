import React from "react";
import {
  Truck,
  Search,
  Construction,
  Clock,
  Package,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderTrackPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased pb-20">
      {/* 1. HEADER HERO */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#009966] bg-[#009966]/5 border border-[#009966]/10">
            Live Shipment Updates
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Track Your Order
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Enter your order reference code or tracking ID to view real-time
            shipping milestones across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. CORE TRACKING INTERFACE SECTION */}
      <section className="mx-auto w-11/12 max-w-2xl py-12 text-center">
        <div className="space-y-8">
          {/* Mock Input View Group */}
          <div className="relative flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm opacity-60 pointer-events-none">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <Input
              disabled
              type="text"
              placeholder="e.g. MED-88492-DAC"
              className="w-full h-11 bg-transparent pl-11 pr-24 border-0 text-slate-400 placeholder:text-slate-300"
            />
            <Button
              disabled
              className="absolute right-1.5 h-9 bg-slate-200 text-slate-400 font-semibold text-xs px-4 rounded-lg"
            >
              Track
            </Button>
          </div>

          {/* FEATURE UNDER CONSTRUCTION NOTICE CONTAINER */}
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/30 p-6 sm:p-8 text-left space-y-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 shrink-0">
                <Construction className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Feature Coming Soon
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Under active development
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pl-1">
              Our automated{" "}
              <strong>
                temperature-controlled live shipment tracking system
              </strong>{" "}
              is currently being integrated with nationwide courier api
              networks. This feature has not been added to the live app yet.
            </p>

            <div className="pt-2 border-t border-amber-200/40 text-xs text-slate-400 font-medium">
              Need immediate updates? Please mention your order code directly to
              our support agents at{" "}
              <span className="text-[#009966] font-bold font-mono">
                +880 1234-5678
              </span>
              .
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMPLIFIED BACK TO DASHBOARD NAVIGATION BAR */}
      <section className="mx-auto w-11/12 max-w-5xl py-8 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/20 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Package className="h-4 w-4 text-[#009966]" /> View order context
              instead?
            </h3>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              You can check the general status of your medicine approvals
              directly inside your primary account panel.
            </p>
          </div>
          <Button
            asChild
            className="h-10 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs px-4 rounded-xl transition-colors shrink-0"
          >
            <Link href="/" className="flex items-center gap-1.5">
              <ArrowLeft className="h-3 w-3" /> Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
