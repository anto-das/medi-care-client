import React from "react";
import { 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  FileText, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased pb-20">
      
      {/* 1. MINIMALIST HEADER */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#009966] bg-[#009966]/5 border border-[#009966]/10">
            Trust & Transparency
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Return & Refund Policy
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Please read our guidelines regarding medicine returns, cancellations, and refund timelines across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. CORE POLICY HIGHLIGHTS */}
      <section className="mx-auto w-11/12 max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
            <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">7-Day Return Window</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Medicines and healthcare devices can be returned within 7 days from the delivery date.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
            <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">100% Genuine Check</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Returned products undergo validation by our licensed pharmacists to maintain inventory safety.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
            <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
              <RefreshCcw className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Fast Refund Processing</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Once approved, refunds are securely issued to your original bKash, Nagad, or Bank account within 3 days.
            </p>
          </div>

        </div>
      </section>

      {/* 3. POLICY ELIGIBILITY BREAKDOWN */}
      <section className="mx-auto w-11/12 max-w-4xl py-8 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          
          {/* Acceptable Returns */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-[#009966]" />
              <h2>Conditions We Accept For Returns</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-500 font-medium pl-1">
              <li className="flex items-start gap-2">
                <span className="text-[#009966] font-bold mt-0.5">•</span>
                <span>Product was damaged, crushed, or leaked during transit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#009966] font-bold mt-0.5">•</span>
                <span>Incorrect medicine brand, variant, or dosage was delivered.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#009966] font-bold mt-0.5">•</span>
                <span>The product has an expiration date of less than 3 months (unless specified before purchase).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#009966] font-bold mt-0.5">•</span>
                <span>Full strips or boxes remain completely unsealed and intact.</span>
              </li>
            </ul>
          </div>

          {/* Non-Acceptable Returns */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <XCircle className="h-5 w-5 text-rose-500" />
              <h2>Items Exempt From Returns</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-500 font-medium pl-1">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Partially consumed medicine strips, opened bottles, or broken seals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Temperature-sensitive products requiring strict cold-chain handling (e.g., Insulin, certain vaccines).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Personal hygiene items, surgical masks, or opened wellness wearables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Returns requested after the standard 7-day expiration window.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. HOW TO STEP GUIDE */}
      <section className="mx-auto w-11/12 max-w-4xl py-12 border-t border-slate-100 text-left">
        <h2 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">
          How to Initiate a Return Order
        </h2>
        <div className="relative border-l border-slate-200 ml-3 pl-6 space-y-8">
          
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-[#009966] bg-white" />
            <h4 className="text-sm font-bold text-slate-800">Step 1: Submit Request</h4>
            <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
              Navigate to your Customer Dashboard, view your Order History, and select 'Request Return' on the specific items.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-[#009966] bg-white" />
            <h4 className="text-sm font-bold text-slate-800">Step 2: Pack & Handover</h4>
            <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
              Keep the medicine in its original pharmacy packaging. Our delivery rider will pick up the package within 24-48 hours.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-[#009966] bg-white" />
            <h4 className="text-sm font-bold text-slate-800">Step 3: Verification & Refund</h4>
            <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
              Once verified by our pharmacy partner network, your refund will be disbursed instantly via your initial payment option.
            </p>
          </div>

        </div>
      </section>

      {/* 5. MINIMAL BOTTOM HELP FOOTER */}
      <section className="mx-auto w-11/12 max-w-5xl py-8 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/30 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-[#009966]" /> Have specific disputes?
            </h3>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              If your return does not fit into standard parameters, please contact our medical dispute officers.
            </p>
          </div>
          <Button asChild className="h-10 bg-[#009966] hover:bg-[#008055] text-white font-semibold text-xs px-5 rounded-xl transition-colors shrink-0">
            <Link href="/support/help" className="flex items-center gap-1">
              Visit Help Center <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
