"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDayWiseWeeklyRevenue } from "@/app/actions/seller.action";

// const chartData: any[] = [];

const Chart = () => {
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getDayWiseWeeklyRevenue();
      if (data.success) {
        setRevenue(data.data);
      }
    })();
  }, []);
  console.log(revenue);
  const maxRevenue = Math.max(
    ...revenue.map((item: any) => item.total_revenue),
  );
  // Data matching your image for the chart
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Sales This Week</CardTitle>
          <CardDescription className="font-medium">
            Daily revenue in BDT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenue}
                margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />

                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {revenue.map((entry: any, index) => (
                    <Cell
                      key={`cell-${index}`}
                      /* ২. যদি রেভিনিউ সর্বোচ্চ হয় তবে আপনার ব্র্যান্ড কালার, নাহলে নরমাল কালার */
                      fill={
                        entry.total_revenue === maxRevenue
                          ? "#0b5e4e"
                          : "#e2e8f0"
                      }
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Top Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {[
            { label: "Antibiotics", pct: "34%", dot: "bg-[#0b5e4e]" },
            { label: "Pain Relief", pct: "23%", dot: "bg-orange-400" },
            { label: "Vitamins", pct: "18%", dot: "bg-blue-500" },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${cat.dot}`} />
                <span className="font-semibold text-slate-700">
                  {cat.label}
                </span>
              </div>
              <span className="font-bold text-slate-900">{cat.pct}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
