import React from "react";
import { 
  Search, 
  Truck, 
  CreditCard, 
  RefreshCw, 
  FileText, 
  User, 
  HelpCircle,
  Phone,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Minimalist Topics Data with custom properties
const helpTopics = [
  { icon: <Truck className="h-5 w-5 text-[#009966]" />, title: "Delivery & Tracking", count: "12 articles" },
  { icon: <CreditCard className="h-5 w-5 text-[#009966]" />, title: "Payments & Refunds", count: "8 articles" },
  { icon: <RefreshCw className="h-5 w-5 text-[#009966]" />, title: "Returns & Exchanges", count: "6 articles" },
  { icon: <FileText className="h-5 w-5 text-[#009966]" />, title: "Prescription Policy", count: "5 articles" },
  { icon: <User className="h-5 w-5 text-[#009966]" />, title: "Account & Profile", count: "9 articles" },
  { icon: <HelpCircle className="h-5 w-5 text-[#009966]" />, title: "General Safety & DGDA", count: "11 articles" },
];

const faqs = [
  { id: "faq-1", question: "How do I upload my prescription?", answer: "You can upload your prescription directly on the homepage or during checkout. Simply take a clear photo of your handwritten or digital prescription. Our registered pharmacists will verify it within 10-15 minutes before dispensing your medicine." },
  { id: "faq-2", question: "What are the delivery timelines?", answer: "For orders inside standard zones (Dhaka & Narayanganj), we deliver within 2 to 4 hours. For nationwide delivery across all districts, it typically takes 24 to 48 hours using temperature-controlled safety kits." },
  { id: "faq-3", question: "How do returns work for medicines?", answer: "We accept returns for unsealed medicine strips, bottles, or medical healthcare devices within 7 days of delivery. To request a return, go to your dashboard, click 'Return Order', or reach out to our team with your order reference." },
  { id: "faq-4", question: "Can I pay online or cash on delivery?", answer: "We support both. You can choose Cash on Delivery (COD) or pay securely online using bKash, Nagad, Visa, or Mastercard during the payment step." },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      
      {/* 1. HERO / SEARCH HEADER */}
      <section className="border-b border-slate-100 bg-slate-50/40 py-16">
        <div className="mx-auto w-11/12 max-w-4xl text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Help & Support
            </h1>
            <p className="text-base text-slate-500 max-w-md mx-auto font-medium">
              Find instant answers regarding your orders, prescriptions, and deliveries.
            </p>
          </div>

          {/* Search Bar wrapped with brand colors on focus */}
          <div className="relative max-w-xl mx-auto flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm transition-all focus-within:border-[#009966] focus-within:ring-1 focus-within:ring-[#009966]/20">
            <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
            <Input 
              type="text" 
              placeholder="Search topics, keywords, or questions..." 
              className="w-full h-11 bg-transparent pl-11 pr-24 border-0 text-slate-800 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base font-normal"
            />
            <Button className="absolute right-1.5 h-9 bg-[#009966] hover:bg-[#008055] text-white font-semibold text-xs px-4 rounded-lg transition-colors">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="mx-auto w-11/12 max-w-5xl py-16">
        <h2 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">
          Browse Support Topics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpTopics.map((topic, i) => (
            <div 
              key={i}
              className="group flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-white hover:border-[#009966]/30 hover:bg-slate-50/30 transition-all duration-200 cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-[#009966]/5 border border-[#009966]/10 shrink-0 transition-colors group-hover:bg-[#009966]/10">
                {topic.icon}
              </div>
              <div className="space-y-0.5 text-left">
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#009966] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs font-medium text-slate-400">
                  {topic.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ACCORDION FAQS */}
      <section className="mx-auto w-11/12 max-w-3xl py-8 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-6 tracking-tight text-center sm:text-left">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-1">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id} 
              className="border-b border-slate-100 px-1 last:border-b-0 data-[state=open]:border-b-[#009966]/20"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold text-slate-700 hover:text-[#009966] hover:no-underline py-4 text-left transition-colors data-[state=open]:text-[#009966]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-500 font-normal leading-relaxed pb-4 pt-1 text-left">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 4. BRAND CONTACT METRICS BAR */}
      <section className="mx-auto w-11/12 max-w-5xl py-16 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-200/60 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-50/20">
          
          <div className="space-y-1.5 text-left max-w-md">
            <h3 className="text-base font-bold text-slate-900">Still need assistance?</h3>
            <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
              If you couldn't find the answers you need, please reach out directly to our dedicated medical support desk.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="flex flex-col sm:flex-row gap-6 shrink-0">
            {/* Phone */}
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-white border border-slate-100 text-[#009966] shadow-sm">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Call Support</p>
                <p className="text-sm font-bold text-slate-800 hover:text-[#009966] transition-colors">+880 1234-5678</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-white border border-slate-100 text-[#009966] shadow-sm">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                <p className="text-sm font-bold text-slate-800 hover:text-[#009966] transition-colors">help@medicare.com</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
