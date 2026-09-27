"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // আপনার ব্যাকএন্ড এপিআই লজিক এখানে যুক্ত করতে পারেন
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
          <Input 
            required 
            type="text" 
            placeholder="e.g. Rahat Khan" 
            className="rounded-xl border-slate-200 h-11 focus-visible:ring-[#009966]/20 focus-visible:border-[#009966]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
          <Input 
            required 
            type="tel" 
            placeholder="e.g. 017XXXXXXXX" 
            className="rounded-xl border-slate-200 h-11 focus-visible:ring-[#009966]/20 focus-visible:border-[#009966]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
        <Input 
          required 
          type="email" 
          placeholder="name@example.com" 
          className="rounded-xl border-slate-200 h-11 focus-visible:ring-[#009966]/20 focus-visible:border-[#009966]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
        <Input 
          required 
          type="text" 
          placeholder="How can our pharmacists help you?" 
          className="rounded-xl border-slate-200 h-11 focus-visible:ring-[#009966]/20 focus-visible:border-[#009966]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Message</label>
        <Textarea 
          required 
          placeholder="Describe your inquiry or order-related issue in detail..." 
          rows={5}
          className="rounded-xl border-slate-200 focus-visible:ring-[#009966]/20 focus-visible:border-[#009966] resize-none"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-11 bg-[#009966] hover:bg-[#008055] text-white font-bold rounded-xl transition-colors active:scale-[0.99]"
      >
        {loading ? "Sending Message..." : "Send Message"}
      </Button>
    </form>
  );
}
