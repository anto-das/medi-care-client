import React from "react";
import { 
  KeyRound, 
  Mail, 
  Construction, 
  ArrowLeft,
  ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[85vh] bg-white text-slate-800 antialiased flex flex-col justify-center items-center py-12">
      <div className="w-11/12 max-w-md mx-auto space-y-6">
        
        {/* BACK TO LOGIN SHORTCUT LINK */}
        <div className="text-left">
          <Link 
            href="/sign-in" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#009966] transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Sign In
          </Link>
        </div>

        {/* 1. CORE CARD INTERFACE CONTAINER */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm shadow-slate-100/60 text-left space-y-6">
          
          {/* Header Copywriting blocks */}
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-[#009966]/5 border border-[#009966]/10 w-fit text-[#009966]">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Reset Your Password
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
              Enter your registered medical account email address to receive a secure, one-time verification link.
            </p>
          </div>

          {/* 2. DISABLED FORMS BLOCK */}
          <div className="space-y-4 opacity-50 pointer-events-none select-none">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center bg-slate-50/50 rounded-xl border border-slate-200 p-0.5">
                <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <Input 
                  disabled
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full h-11 bg-transparent pl-10 border-0 text-slate-400 placeholder:text-slate-300 focus-visible:ring-0"
                />
              </div>
            </div>

            <Button 
              disabled 
              className="w-full h-11 bg-slate-200 text-slate-400 font-bold rounded-xl"
            >
              Send Reset Link
            </Button>
          </div>

          {/* 3. UNDER CONSTRUCTION ADVISORY BOX */}
          <div className="rounded-xl border border-amber-200/60 bg-amber-50/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
              <Construction className="h-4 w-4 shrink-0 text-amber-600" />
              <span>Authentication Module Update</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
              Our secure SMS/Email OTP routing infrastructure is currently undergoing internal maintenance. This credential recovery function has not been added to the live platform yet.
            </p>
            <div className="pt-1.5 border-t border-amber-200/40 text-[10px] text-slate-400 font-medium">
              Immediate credential lockout issue? Connect via <span className="text-[#009966] font-bold font-mono">support@medicare.com</span>.
            </div>
          </div>

        </div>

        {/* BOTTOM METRIC TRADEMARK FOOTER */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-[#009966]/60" />
          <span>100% Secure Encrypted Connection</span>
        </div>

      </div>
    </div>
  );
}
