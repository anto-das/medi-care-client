import React from "react";
import { Button } from "./button";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Link from "next/link";

const OrderSummary = ({
  subtotal,
  deliveryFee,
  discount,
  total,
}: {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}) => {
  return (
    <div className="lg:col-span-1 lg:sticky lg:top-10">
      <Card className="border-none shadow-lg rounded-3xl bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-black italic">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="pt-4 border-t border-slate-50 space-y-2 text-slate-500 text-sm font-medium">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${deliveryFee}</span>
            </div>
            <div className="flex justify-between text-rose-500 font-bold">
              <span>Discount</span>
              <span>-${discount}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-between items-baseline">
            <span className="text-xl font-bold">Total</span>
            <span className="text-3xl font-black tracking-tighter">
              ${total}
            </span>
          </div>

          

          <div className="flex items-center justify-center space-x-2 text-[10px]  font-bold uppercase tracking-widest pt-2 text-blue-500">
            <ShieldCheck className="w-4 h-4" />
            <span>Secured by stripe</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
