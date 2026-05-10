"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { Package, ShoppingCart, Banknote, AlertTriangle } from "lucide-react";
import Chart from "@/components/ui/chartbar";
import Overview from "@/components/ui/overview";
import OrderTable from "@/components/ui/orderTable";

// Data matching your image for the chart
const chartData = [
  { day: "Sun", revenue: 80 },
  { day: "Mon", revenue: 110 },
  { day: "Tue", revenue: 95 },
  { day: "Wed", revenue: 210 }, // Highlighted peak
  { day: "Thu", revenue: 140 },
  { day: "Fri", revenue: 100 },
  { day: "Sat", revenue: 70 },
];

export default function MedicareProDashboard() {
  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));
  return (
    <div className="min-h-screen bg-[#fbfbf9] p-10 font-sans text-slate-900">
      {/* 1. Header Section */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Good morning 👋
          </h1>
          <p className="mt-1 text-slate-500 font-medium">
            Here's your store overview for today
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full px-6 border-slate-300 hover:bg-slate-50"
        >
          Seller Panel
        </Button>
      </header>

      {/* 2. Top Stats Section */}
      <Overview />

      {/* 3. Middle Section: Chart & Categories */}
      <Chart />

      {/* 4. Recent Orders Table */}
      <OrderTable />
    </div>
  );
}
