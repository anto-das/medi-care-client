"use client";

import React, { useState } from "react";
import {
  Mail,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MedicareNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleSubmit = () => {
    window.location.href = "/cart/checkout";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
      {/* 🌟 প্রধান প্রফেশনাল টাইটেল বক্স */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/80 dark:border-emerald-900/30 backdrop-blur-sm">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          Join 10,000+ Healthcare Subscribers
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
          Stay Ahead with Expert{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
            Medical Insights
          </span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
          Subscribe to get curated clinical updates, medicine safety alerts, and
          premium wellness guides directly in your inbox.
        </p>
      </div>

      {/* 📬 ফ্যান্সি নিউজলেটার কন্টেইনার কার্ড */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-white via-slate-50/30 to-emerald-50/10 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/5 p-8 md:p-14 shadow-2xl shadow-slate-100/70 dark:shadow-none transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
        {/* হাই-এন্ড ব্যাকগ্রাউন্ড গ্লো ইফেক্টস */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/0 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-teal-400/10 to-emerald-400/0 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-8">
          {/* সাবমিশন স্টেট হ্যান্ডেলিং */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full pt-2">
              <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl sm:rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md focus-within:border-emerald-500 dark:focus-within:border-emerald-500/70 focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all duration-300">
                {/* ইনপুট ফিল্ড */}
                <div className="relative w-full flex items-center pl-3">
                  <Mail className="absolute left-3 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email address"
                    className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none border-none disabled:opacity-50"
                  />
                </div>

                {/* সাবস্ক্রাইব বাটন */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full sm:w-auto px-7 py-3.5 sm:py-3 rounded-xl sm:rounded-full text-sm font-extrabold bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-lg transition-all duration-200 shrink-0 inline-flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isLoading ? "Subscribing..." : "Subscribe Now"}
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          ) : (
            /* সাকসেস মেসেজ অ্যানিমেশন */
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-center gap-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  Subscription Confirmed!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Thank you for joining our medical newsletter network.
                </p>
              </div>
            </div>
          )}

          {/* ট্রাস্ট ফ্যাক্টর বা প্রাইভেসি নোট */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium pt-2 border-t border-slate-100 dark:border-slate-900/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
              <span>100% Privacy Protected</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-800">
              •
            </span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-500/70" />
              <span>Zero Spam. Unsubscribe Anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
