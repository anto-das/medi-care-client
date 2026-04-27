import React from "react";
import { Button } from "./button";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const OrderSummary = () => {
  return (
    <div className="lg:col-span-1 lg:sticky lg:top-10">
      <Card className="border-none shadow-lg rounded-3xl bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-black italic">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                name: "Napa Extra ×3",
                price: 36,
                color: "bg-orange-400",
              },
              {
                name: "Amoxil 500mg ×2",
                price: 170,
                color: "bg-emerald-400",
              },
              { name: "Vit-D3 Plus ×1", price: 45, color: "bg-lime-400" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center group">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <p className="text-sm font-medium text-slate-700">
                    {item.name}
                  </p>
                </div>
                <span className="font-bold">৳{item.price}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-2 text-slate-500 text-sm font-medium">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳251.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳80.00</span>
            </div>
            <div className="flex justify-between text-rose-500 font-bold">
              <span>Discount</span>
              <span>-৳25.00</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-between items-baseline">
            <span className="text-xl font-bold">Total</span>
            <span className="text-3xl font-black tracking-tighter">
              ৳306.00
            </span>
          </div>

          <Button className="w-full h-14 text-lg font-bold bg-[#064E3B] hover:bg-[#043d2e] text-white rounded-2xl shadow-xl shadow-emerald-900/10">
            Place Order ৳306 →
          </Button>

          <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
