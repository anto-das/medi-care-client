import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Percent, Ticket, Tag, Calendar, ChevronRight } from "lucide-react";

export default function EmptyOffersPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header & Coupon Input */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            MediCare Offers & Discounts
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Save on health checkups, prescription refills, and specialist
            consultations.
          </p>
          <div className="flex w-full max-w-md mx-auto items-center space-x-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Have a promo code? Enter it here"
                className="pl-9 bg-white uppercase font-medium tracking-wider"
              />
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">Apply</Button>
          </div>
        </div>

        {/* Empty State Core Component */}
        <Card className="border-dashed border-2 bg-white flex flex-col items-center justify-center text-center p-12 md:p-20">
          <div className="h-16 w-16 rounded-full bg-teal-50 flex items-center justify-center mb-6">
            <Percent className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            No Active Offers Right Now
          </h2>
          <p className="text-slate-500 max-w-sm mb-6 text-sm">
            We are working with our medical partners to bring you the best deals
            on care. Check back later.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            View Standard Pricing
          </Button>
        </Card>

        {/* Skeleton Placeholders for Future Coupons */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Upcoming Deals Layout
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40 pointer-events-none select-none">
            {[1, 2].map((i) => (
              <Card
                key={i}
                className="bg-white flex border-l-4 border-l-slate-300 relative overflow-hidden"
              >
                {/* Visual Coupon Notch Indicator */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-50 rounded-full border border-slate-200" />

                <div className="p-4 flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="w-fit">
                      Discount
                    </Badge>
                    <div className="h-4 bg-slate-200 rounded w-16 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
                  </div>
                  <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-dashed">
                    <div className="h-3 bg-slate-200 rounded w-24 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-12 animate-pulse" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
