"use client";

import { getMedicine } from "@/app/actions/medicine.action";
import {
  Pill,
  HeartPulse,
  Thermometer,
  Wind,
  Flame,
  Activity,
  Droplet,
  ShieldAlert,
  Sparkles,
  Brain,
  Zap,
  Waves,
  ArrowDownCircle,
  ShieldCheck,
  Stethoscope,
  Moon,
  VolumeX,
  EyeOff,
  HelpCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

// ১. প্রথমে প্রপস-এর ইন্টারফেসটি তৈরি করুন
interface MedicineCategoriesGridProps {
  fetchCategoryType: () => Promise<any>;
  category: any[];
}

// ২. কম্পোনেন্টে সেটি ব্যবহার করুন
export default function MedicineCategoriesGrid({
  fetchCategoryType,
  category,
}: MedicineCategoriesGridProps) {
  const [medicines, setMedicines] = useState<any[]>([]);

  const fetchMedicines = async () => {
    const { data } = await getMedicine();
    setMedicines(data);
  };
  useEffect(() => {
    fetchCategoryType();
    fetchMedicines();
  }, []);

  // console.log(category)

  const categoryStyleMap: Record<
    string,
    { color: string; bgLight: string; icon: any; count: number }
  > = {
    ANTIBIOTICS: {
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-700",
      icon: Pill,
      count: 0,
    },
    ANALGESICS: {
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-700",
      icon: HeartPulse,
      count: 0,
    },
    ANTIPYRETICS: {
      color: "from-orange-500 to-red-600",
      bgLight: "bg-orange-50 text-orange-700",
      icon: Thermometer,
      count: 0,
    },
    ANTIHISTAMINES: {
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 text-cyan-700",
      icon: Wind,
      count: 0,
    },
    ANTACIDS: {
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-700",
      icon: Flame,
      count: 0,
    },
    ANTIHYPERTENSIVES: {
      color: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50 text-rose-700",
      icon: Activity,
      count: 0,
    },
    ANTIDIABETICS: {
      color: "from-teal-500 to-cyan-600",
      bgLight: "bg-teal-50 text-teal-700",
      icon: Droplet,
      count: 0,
    },
    ANTICOAGULANTS: {
      color: "from-red-500 to-rose-600",
      bgLight: "bg-red-50 text-red-700",
      icon: ShieldAlert,
      count: 0,
    },
    BRONCHODILATORS: {
      color: "from-sky-500 to-blue-600",
      bgLight: "bg-sky-50 text-sky-700",
      icon: Wind, // Assumed Lucide icon
      count: 0,
    },
    ANTIVIRALS: {
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50 text-violet-700",
      icon: Sparkles,
      count: 0,
    },
    ANTIFUNGALS: {
      color: "from-fuchsia-500 to-pink-600",
      bgLight: "bg-fuchsia-50 text-fuchsia-700",
      icon: Pill,
      count: 0,
    },
    // 🔽 Added remaining 9 categories below 🔽
    ANTIDEPRESSANTS: {
      color: "from-indigo-500 to-purple-600",
      bgLight: "bg-indigo-50 text-indigo-700",
      icon: Brain, // Lucide icon for mental health
      count: 0,
    },
    ANTICONVULSANTS: {
      color: "from-purple-600 to-deepPurple-700",
      bgLight: "bg-purple-50 text-purple-700",
      icon: Zap, // Lucide icon for electric brain impulses
      count: 0,
    },
    DIURETICS: {
      color: "from-lime-500 to-green-600",
      bgLight: "bg-lime-50 text-lime-700",
      icon: Waves, // Lucide icon representing water balancing
      count: 0,
    },
    LAXATIVES: {
      color: "from-yellow-600 to-amber-700",
      bgLight: "bg-yellow-50 text-yellow-800",
      icon: ArrowDownCircle, // Lucide icon representing clearing/flow
      count: 0,
    },
    STATINS: {
      color: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50 text-green-700",
      icon: ShieldCheck, // Lucide icon representing cardiovascular safety
      count: 0,
    },
    CORTICOSTEROIDS: {
      color: "from-violet-600 to-indigo-700",
      bgLight: "bg-violet-50 text-violet-800",
      icon: Stethoscope, // Lucide icon for medical strength
      count: 0,
    },
    ANESTHETICS: {
      color: "from-slate-500 to-gray-700",
      bgLight: "bg-slate-100 text-slate-700",
      icon: Moon, // Lucide icon representing sleep/numbness
      count: 0,
    },
    ANTITUSSIVES: {
      color: "from-emerald-400 to-teal-500",
      bgLight: "bg-emerald-50 text-emerald-800",
      icon: VolumeX, // Lucide icon representing stopping the cough noise
      count: 0,
    },
    SEDATIVES: {
      color: "from-blue-600 to-slate-700",
      bgLight: "bg-blue-50 text-blue-900",
      icon: EyeOff, // Lucide icon representing rest/sleepiness
      count: 0,
    },
  };

  // ডিফল্ট স্টাইলেও কাউন্ট ফিল্ড যোগ করা হয়েছে সেফটির জন্য
  const defaultStyle = {
    color: "from-slate-500 to-slate-600",
    bgLight: "bg-slate-50 text-slate-700",
    icon: HelpCircle,
    count: 0,
  };

  return (
    <div data-aos="fade-up" className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Medicine Categories
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Select a clinical classification category below to manage or view
              stored inventory.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm inline-fit w-fit">
            Total Classifications:{" "}
            <span className="text-teal-600 font-bold">{category?.length}</span>
          </div>
        </div>

        {/* Categories Flex/Grid Div Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {category?.map((cate) => {
            const style =
              categoryStyleMap[cate?.category_type.toUpperCase()] ||
              defaultStyle;
            const IconComponent = style.icon;

            return (
              <div
                key={cate.category_id}
                className="group relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Top Decorative Accent line seen on Hover */}
                <div
                  className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${style.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Icon & Count Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2.5 rounded-lg ${style.bgLight} border border-current/10 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200/60">
                      {style.count} Items
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-slate-900 transition-colors">
                    {cate.category_type}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-[2rem]">
                    {cate.category_description}
                  </p>
                </div>

                {/* Bottom Call to Action Text link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Explore Inventory
                  </span>
                  <span className="text-slate-300 group-hover:text-slate-600 transition-transform duration-300 transform group-hover:translate-x-1 text-sm font-bold">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
