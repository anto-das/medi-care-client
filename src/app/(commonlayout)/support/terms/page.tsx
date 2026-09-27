import React from "react";
import { 
  FileText, 
  Scale, 
  ShieldAlert, 
  ShoppingBag, 
  Ban,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Core Terms Summaries
const termsHighlights = [
  { icon: <Scale className="h-5 w-5 text-[#009966]" />, title: "Legal Agreement", desc: "By accessing Medicare, you agree to comply with DGDA regulations and drug policies of Bangladesh." },
  { icon: <FileText className="h-5 w-5 text-[#009966]" />, title: "Prescription Policy", desc: "Orders for regulated medicines strictly require a valid, non-expired prescription upload." },
  { icon: <ShoppingBag className="h-5 w-5 text-[#009966]" />, title: "Partner Liability", desc: "Medicines are dispensed directly by licensed physical pharmacy partners across 64 districts." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased pb-20">
      
      {/* 1. HEADER SECTION */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#009966] bg-[#009966]/5 border border-[#009966]/10">
            Platform Regulations
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Last Updated: September 2026. Please read our operational agreements regarding user profiles, safety frameworks, and pharmacy distribution.
          </p>
        </div>
      </section>

      {/* 2. CORE TERMS HIGHLIGHT GRID */}
      <section className="mx-auto w-11/12 max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {termsHighlights.map((term, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
              <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
                {term.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{term.title}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {term.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DETAILED LEGAL CLAUSES */}
      <section className="mx-auto w-11/12 max-w-3xl py-8 border-t border-slate-100 text-left">
        <div className="space-y-10">
          
          {/* Clause 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">1</span>
              <h2 className="text-base font-bold text-slate-900">Platform Account Integrity</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              To utilize Medicare ordering services, users must provide complete identity attributes. You are responsible for ensuring the confidentiality of passwords, verification codes, and dynamic guest tokens. Multiple accounts created to exploit initial promotional offers will face immediate permanent suspension.
            </p>
          </div>

          {/* Clause 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">2</span>
              <h2 className="text-base font-bold text-slate-900">Prescription Verification & Law</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              Medicare acts strictly as a communication platform between registered patients and DGDA-licensed pharmacy networks. Under the drug acts of Bangladesh, any prescription uploaded must be authentic, issued by a BMDC-registered physician, and visible. Our partner pharmacists reserve full legal clearance to reject any order containing altered, fake, or suspicious prescription uploads.
            </p>
          </div>

          {/* Clause 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">3</span>
              <h2 className="text-base font-bold text-slate-900">Pricing and Order Cancellation</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              While we update stock catalogs daily, slight discrepancies in manufacturing retail pricing (MRP) might occur based on active pharmaceutical batches. Medicare retains authority to cancel orders if products become unavailable or priced incorrectly by vendor errors. Full refunds are processed swiftly if advance digital payments were collected.
            </p>
          </div>

          {/* Clause 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">4</span>
              <h2 className="text-base font-bold text-slate-900">Prohibited Activity & Violations</h2>
            </div>
            <div className="pl-8 space-y-2">
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Users are explicitly barred from using our interface to engage in:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-400 font-medium pl-2">
                <li className="flex items-start gap-2"><Ban className="h-3.5 w-3.5 text-rose-500 mt-0.5 shrink-0" /> Uploading fabricated or reused medical prescription sheets.</li>
                <li className="flex items-start gap-2"><Ban className="h-3.5 w-3.5 text-rose-500 mt-0.5 shrink-0" /> Reverse-engineering pharmacy location trackers or API codes.</li>
                <li className="flex items-start gap-2"><Ban className="h-3.5 w-3.5 text-rose-500 mt-0.5 shrink-0" /> Hoarding critical bulk drugs to simulate false market shortages.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CLEAN DISPUTE BAR */}
      <section className="mx-auto w-11/12 max-w-5xl py-8 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/30 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-[#009966]" /> Operational Compliance Desk
            </h3>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              For any clarification regarding platform agreements, medicine supplier liabilities, or active terms, please connect with our legal desk.
            </p>
          </div>
          <Button asChild className="h-10 bg-[#009966] hover:bg-[#008055] text-white font-semibold text-xs px-5 rounded-xl transition-colors shrink-0">
            <Link href="/help" className="flex items-center gap-1">
              Contact Compliance <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
