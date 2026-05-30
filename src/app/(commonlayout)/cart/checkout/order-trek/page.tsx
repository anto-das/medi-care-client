import React from "react";
import { Check, Package, Truck, Clock, FileText, Star } from "lucide-react";

const OrderStatus = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            "All Orders",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
                ${index === 0 ? "bg-[#f0f1eb] border-gray-300" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order Card 1 (Processing) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-sm">#ORD-8821</p>
              <p className="text-gray-400 text-xs">19 Mar 2026 • 2:34 PM</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full border border-orange-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                Processing
              </span>
              <button className="flex items-center gap-1 text-xs border rounded-md px-3 py-1 text-gray-600 hover:bg-gray-50">
                <FileText size={14} /> Invoice
              </button>
            </div>
          </div>

          {/* Stepper Logic */}
          <div className="relative flex justify-between mb-8 px-4">
            <div className="absolute top-4 left-8 right-8 h-[2px] bg-gray-100 -z-0">
              <div className="h-full bg-green-800 w-1/2"></div>{" "}
              {/* Progress Bar */}
            </div>

            {[
              { label: "Placed", icon: Check, active: true },
              { label: "Confirmed", icon: Check, active: true },
              { label: "Processing", icon: Clock, active: true, current: true },
              { label: "On Way", icon: Truck, active: false },
              { label: "Delivered", icon: Package, active: false },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${step.active ? "bg-green-800 border-green-800 text-white" : "bg-white border-gray-200 text-gray-300"}`}
                >
                  <step.icon size={16} />
                </div>
                <span
                  className={`text-[10px] mt-2 font-medium ${step.active ? "text-gray-800" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg p-2">💊</div>
                <div>
                  <h4 className="text-sm font-semibold">Napa Extra 500mg</h4>
                  <p className="text-xs text-gray-400">10 tablets</p>
                </div>
              </div>
              <p className="font-bold text-lg text-gray-800">$286.00</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg p-2">💊</div>
              <div>
                <h4 className="text-sm font-semibold">Amoxil 500mg</h4>
                <p className="text-xs text-gray-400">2 boxes</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-dashed">
            <div className="flex gap-2">
              <button className="bg-green-900 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-800">
                Track Live
              </button>
              <button className="border border-gray-200 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50">
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-400 italic">Est. Today 5:30 PM</p>
          </div>
        </div>

        {/* Order Card 2 (Delivered) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-80">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400 text-sm">
              #ORD-8750 <br />
              <span className="text-xs">10 Mar 2026</span>
            </p>
            <span className="text-gray-400 text-xs flex items-center gap-1">
              • Delivered
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center text-blue-500">
                🩺
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">
                  Metformin 500mg
                </h4>
                <p className="text-xs text-gray-400">10 tablets</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-green-600 font-medium">
                    Delivered 11 Mar
                  </span>
                  <div className="flex text-yellow-400">
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
            <p className="font-bold text-lg text-gray-700">$85.00</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-green-900 text-white px-6 py-1.5 rounded-lg text-xs font-medium">
              Reorder
            </button>
            <button className="border border-gray-200 px-6 py-1.5 rounded-lg text-xs font-medium">
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
