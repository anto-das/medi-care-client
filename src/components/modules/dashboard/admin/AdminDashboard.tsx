import AdminOverview from "@/components/ui/adminOverview";
import { Button } from "@/components/ui/button";
import Chart from "@/components/ui/chartbar";
import OrderTable from "@/components/ui/orderTable";

const AdminDashboard = () => {
  return (
    <div
      data-aos="fade-up"
      className="min-h-screen bg-[#fbfbf9] p-10 font-sans text-slate-900"
    >
      {/* 1. Header Section */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Platform Overview
          </h1>
          <p className="mt-1 text-slate-500 font-medium">
            April 9, 2026 · All systems ✅
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full px-6 border-slate-300 hover:bg-slate-50"
        >
          Super Admin
        </Button>
      </header>

      {/* 2. Top Stats Section */}
      <AdminOverview />

      {/* 3. Middle Section: Chart & Categories */}
      <Chart />

      {/* 4. Recent Orders Table */}
      <OrderTable />
    </div>
  );
};

export default AdminDashboard;
