import { Button } from "@/components/ui/button";
import OrderTable from "@/components/ui/orderTable";
import Overview from "@/components/ui/overview";

const SellerDashboard = () => {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div
      data-aos="fade-up"
      className="min-h-screen bg-[#fbfbf9] p-10 font-sans text-slate-900"
    >
      {/* 1. Header Section */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {greeting} 👋
          </h1>

          <p className="mt-1 font-medium text-slate-500">
            Here's your store overview for today
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-slate-300 px-6 hover:bg-slate-50"
        >
          Seller Panel
        </Button>
      </header>

      {/* 2. Top Stats Section */}
      <Overview />

      {/* 3. Middle Section: Chart & Categories */}
      {/* <Chart /> */}

      {/* 4. Recent Orders Table */}
      <OrderTable />
    </div>
  );
};

export default SellerDashboard;