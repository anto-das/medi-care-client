import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  Server, 
  Key,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

// Minimalist Core Principles Data
const privacyPrinciples = [
  { icon: <Lock className="h-5 w-5 text-[#009966]" />, title: "Data Encryption", desc: "All medical prescriptions and personal profiles are strictly encrypted via secure SSL layers." },
  { icon: <Eye className="h-5 w-5 text-[#009966]" />, title: "No Third-Party Selling", desc: "We never monetize, trade, or share your healthcare history with unauthorized insurance or marketing firms." },
  { icon: <UserCheck className="h-5 w-5 text-[#009966]" />, title: "Patient Control", desc: "You retain full rights to edit your profiles, clear prescription history, or request account deactivation." },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased pb-20">
      
      {/* 1. HEADER SECTIONS */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#009966] bg-[#009966]/5 border border-[#009966]/10">
            Security & Compliance
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Effective Date: September 2026. Learn how Medicare securely protects your digital prescriptions, personal profiles, and health records.
          </p>
        </div>
      </section>

      {/* 2. CORE SECURITY PRINCIPLES GRID */}
      <section className="mx-auto w-11/12 max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {privacyPrinciples.map((principle, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-100 bg-white space-y-3">
              <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
                {principle.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{principle.title}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DETAILED POLICY ARTICLES */}
      <section className="mx-auto w-11/12 max-w-3xl py-8 border-t border-slate-100 text-left">
        <div className="space-y-10">
          
          {/* Article 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">1</span>
              <h2 className="text-base font-bold text-slate-900">Information We Collect</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              To process pharmacy orders smoothly across Bangladesh, we securely gather:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-400 font-medium pl-10">
              <li>Personal Identity (Name, Phone number, Delivery address, Email address).</li>
              <li>Medical Verification Data (Uploaded prescription images, doctor reference parameters).</li>
              <li>Transaction Context (Initial order history, digital platform guest tracking codes).</li>
            </ul>
          </div>

          {/* Article 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">2</span>
              <h2 className="text-base font-bold text-slate-900">How Your Data is Utilized</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              Your details are exclusive to operational fulfillment. We allocate data to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-400 font-medium pl-10">
              <li>Share uploaded files safely with our 300+ DGDA-verified pharmacy partner networks for legal authentication.</li>
              <li>Dispatch continuous shipping triggers or text route notifications to delivery courier riders.</li>
              <li>Prevent prescription processing frauds and handle rapid financial claim refunds securely.</li>
            </ul>
          </div>

          {/* Article 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">3</span>
              <h2 className="text-base font-bold text-slate-900">Prescription Retention & Storage</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              Medical records are stored on protected server instances. Prescription data stays active inside your encrypted database dashboard to enable instant chronic refill options. You can officially request permanent deletion of past diagnostic uploads at any stage.
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#009966]/10 text-xs font-bold text-[#009966]">4</span>
              <h2 className="text-base font-bold text-slate-900">Updates to Our Privacy Framework</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed pl-8">
              Medicare reserves the right to refine privacy standards to adapt to upcoming DGDA legal frameworks or digital compliance requirements in Bangladesh. We recommend keeping a periodic check on this page for active structure developments.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CLEAN BOTTOM COMPLIANCE BAR */}
      <section className="mx-auto w-11/12 max-w-5xl py-8 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/30 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#009966]" /> Legal & Privacy Desk
            </h3>
            <p className="text-xs text-slate-400 font-medium max-w-md">
              Have serious compliance inquiries or wish to clear your entire medical data file? Reach our privacy desk via <span className="text-[#009966] font-bold">privacy@medicare.com</span>.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
