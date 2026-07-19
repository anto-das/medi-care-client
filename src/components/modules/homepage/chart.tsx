"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCategories } from "@/app/actions/category.action";
import { getMedicine } from "@/app/actions/medicine.action";
import { CategoryType, Medicine } from "@/types";

export function ChartBarDemoLegend() {
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const fetchCategory = async () => {
    const result = await getCategories({ cache: "no-store" });
    setCategories(result?.data || []);
  };
  const fetchMedicines = async () => {
    const result = await getMedicine();
    setMedicines(result.data || []);
  };
  useEffect(() => {
    fetchCategory();
    fetchMedicines();
  }, []);

  const medicineCountMap: Record<string, number> = {};

  medicines.forEach((medi: Medicine) => {
    medicineCountMap[medi.category_name] =
      (medicineCountMap[medi.category_name] || 0) + 1;
  });

  const data = categories.map((cate: CategoryType) => ({
    category: cate.category_type,
    medicineCount: medicineCountMap[cate.category_type] || 0,
  }));

  console.log(data);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "July", desktop: 186, mobile: 80 },
    { month: "August", desktop: 305, mobile: 200 },
    { month: "September", desktop: 237, mobile: 120 },
    { month: "October", desktop: 73, mobile: 190 },
    { month: "November", desktop: 209, mobile: 130 },
    { month: "December", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Stock In",
      color: "#10b981", // মেডিকেল থিমের সাথে মিলিয়ে Emerald Green করা হলো
    },
    mobile: {
      label: "Stock Out",
      color: "#ef4444", // স্টক আউটের জন্য Red কালার
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      {/* ফ্যান্সি মেইন কার্ড কন্টেইনার */}
      <Card className="border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl shadow-slate-100/40 dark:shadow-none rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-100/60 dark:hover:border-slate-700/60">
        {/* হেডার সেকশন */}
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-6 border-b border-slate-100 dark:border-slate-900 p-6">
          <div className="flex flex-col items-start space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-5 bg-emerald-500 rounded-full animate-pulse" />
              <CardTitle className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Medicine Analytics
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Total Available Medicine Categories Overview
            </CardDescription>
          </div>

          {/* লাইভ কাউন্ট ব্যাজ (ফ্যান্সি লুকের জন্য) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Categories: 12
          </div>
        </CardHeader>

        {/* চার্ট এরিয়া উইথ রেসপন্সিভ স্ক্রোলবার */}
        <div className="p-6 pt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <div className="min-w-150 w-full">
            <ChartContainer config={chartConfig} className="h-[320px] w-full">
              <BarChart accessibilityLayer data={data} barGap={4}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-800/60"
                />

                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={12}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
                />

                <ChartTooltip
                  cursor={{ fill: "rgba(241, 245, 249, 0.4)", radius: 6 }}
                  content={
                    <ChartTooltipContent className="bg-slate-900 text-white dark:bg-slate-900 border-none rounded-xl shadow-lg" />
                  }
                />

                <ChartLegend
                  className="mt-4"
                  content={<ChartLegendContent />}
                />

                {/* স্টাইলিশ রাউন্ডেড বার্স */}
                <Bar
                  dataKey="medicineCount"
                  fill="var(--color-desktop)"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
