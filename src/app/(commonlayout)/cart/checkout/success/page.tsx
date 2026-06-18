"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // shadcn/ui card
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSessionData } from "@/app/actions/payment.action";

interface ISession {
  id: string;
  amount: number;
  status: string;
}

export default function PaymentSuccessPage() {
  const [sessionData, setSessionData] = useState<ISession>();
  const searchParam = useSearchParams();
  const session_id = searchParam.get("session_id");

  useEffect(() => {
    (async () => {
      const { data } = await getSessionData(session_id as string);
      setSessionData(data.data);
    })();
  }, []);

  const orderDetails = {
    id: sessionData?.id,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amount: sessionData?.amount,
    status: sessionData?.status,
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 antialiased">
      {/* ১. পুরো কার্ডের জন্য ফ্রেমার মোশন অ্যানিমেশন */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-100 shadow-xl bg-white overflow-hidden relative">
          {/* টপ ডেকোরেশন লাইন (মেডিকেল ব্লু কালার) */}
          <div className="h-2 w-full bg-blue-600" />

          <CardHeader className="text-center pt-8 pb-4">
            {/* ২. সাকসেস আইকনের জন্য পপ-আপ অ্যানিমেশন */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="rounded-full bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/20"
              >
                <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
              </motion.div>
            </div>

            <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
              Payment Successful!
            </CardTitle>
            <p className="text-sm text-slate-500 mt-2 max-w-[300px] mx-auto">
              Your prescription order has been confirmed and forwarded to our
              pharmacy.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6">
            {/* ৩. অর্ডার সামারি বক্স */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3"
            >
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200/60">
                <span>Order Details</span>
                <FileText className="h-3.5 w-3.5" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-medium text-slate-900">
                    {orderDetails.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-900 font-medium">
                    {orderDetails.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-900 font-medium">
                    {orderDetails.status}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-base font-semibold">
                  <span className="text-slate-900">Amount Paid:</span>
                  <span className="text-blue-600">{orderDetails.amount}$</span>
                </div>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-6 pb-8">
            {/* ৪. অ্যাকশন বাটনসমূহ (shadcn/ui Button) */}
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-sm font-medium rounded-xl group transition-all duration-200"
            >
              <Link href="/orders">
                Track Medicine Delivery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-slate-200 text-slate-600 h-11 text-sm font-medium rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
            >
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>

            <p className="text-[11px] text-center text-slate-400 mt-2">
              A copy of your invoice and prescription verification has been sent
              to your email.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
