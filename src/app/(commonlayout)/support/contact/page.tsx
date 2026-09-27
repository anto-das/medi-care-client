import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/contactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased pb-20">
      {/* 1. HEADER HERO */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#009966] bg-[#009966]/5 border border-[#009966]/10">
            Get in Touch
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact Our Medical Desk
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Have questions about a medicine, generic substitution, prescription
            status, or active bulk orders? Contact us anytime.
          </p>
        </div>
      </section>

      {/* 2. CORE CONTENT LAYOUT */}
      <section className="mx-auto w-11/12 max-w-5xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Information Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Contact Information
              </h2>
              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                Reach out via any of our channels or submit the form. Our
                support team responds within 15 minutes during work hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone Channel */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="p-3 rounded-xl bg-[#009966]/5 border border-[#009966]/10 text-[#009966] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Hotline
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    +880 1234-5678
                  </p>
                </div>
              </div>

              {/* Email Channel */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="p-3 rounded-xl bg-[#009966]/5 border border-[#009966]/10 text-[#009966] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Helpdesk
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    support@medicare.com
                  </p>
                </div>
              </div>

              {/* Location Channel */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="p-3 rounded-xl bg-[#009966]/5 border border-[#009966]/10 text-[#009966] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Corporate Office
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Narayanganj, Bangladesh
                  </p>
                </div>
              </div>

              {/* Availability Info */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="p-3 rounded-xl bg-slate-200/50 text-slate-500 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Operation Hours
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    Saturday – Thursday: 9:00 AM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Interactive Form Box */}
          <div className="lg:col-span-7 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm text-left">
            <div className="mb-6 space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-[#009966]" /> Send a
                Direct Message
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Fill out the secure compliance form below to contact our
                pharmacist support network.
              </p>
            </div>

            {/* Injecting the Client-side Interactive Form Component */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
