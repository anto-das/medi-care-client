"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquarePlus, Star, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoReviewsStateProps {
  productName?: string;
  onWriteReview?: () => void;
}

export default function EmptyReview({
  productName = "this medicine",
  onWriteReview,
}: NoReviewsStateProps) {
  return (
    <div className="relative flex items-center justify-center min-h-[500px] w-full p-6 overflow-hidden rounded-2xl bg-slate-50/40">
      {/* --- Medi-Care Brand Background Ambient Glows --- */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e6f4f1] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#1f6b5d]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- Main Clinical Elegant Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full"
      >
        <Card className="border-[#1f6b5d]/10 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(31,107,93,0.04)] overflow-hidden">
          {/* Top aesthetic Medi-Care brand color line indicator */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-[#1f6b5d]" />

          <CardContent className="flex flex-col items-center justify-center text-center p-8 sm:p-12">
            {/* --- Animated Review Icon Showcase --- */}
            <div className="relative mb-6">
              {/* Outer Rotating Dashed Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-3 rounded-full border border-dashed border-[#1f6b5d]/20 bg-[#e6f4f1]/30"
              />

              {/* Twinkling sparkle element */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 text-amber-400"
              >
                <Star className="w-5 h-5 fill-amber-400" />
              </motion.div>

              {/* Core Icon Box - Message Square */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e6f4f1] text-[#1f6b5d] shadow-md shadow-[#1f6b5d]/5"
              >
                <MessageSquarePlus className="w-7 h-7" />

                {/* Micro active status indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#1f6b5d]" />
                </span>
              </motion.div>
            </div>

            {/* --- Typography Stack --- */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 mb-2">
                No Reviews Yet
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="text-sm text-slate-500 max-w-xs mb-8 leading-relaxed font-normal">
                Share your clinical experience! Be the very first customer to
                drop a review and help the Medi-Care community.
              </p>
            </motion.div>

            {/* --- Customer-Centric Action Buttons --- */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full"
            >
              {/* Primary Action: Trigger review modal form or navigate to form */}
              <Button
                onClick={onWriteReview}
                className="relative group w-full sm:flex-1 bg-[#1f6b5d] hover:bg-[#175247] text-white font-medium py-5 rounded-lg transition-all duration-200 shadow-sm shadow-[#1f6b5d]/20 cursor-pointer"
              >
                <Link href="/cart/checkout">
                  <span className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 transition-transform group-hover:scale-110 duration-200" />
                    <span>Write a Review</span>
                  </span>
                </Link>
              </Button>

              {/* Secondary Action: Keep exploring other medicines */}
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-[#1f6b5d]/10 bg-[#e6f4f1]/40 text-[#1f6b5d] hover:text-[#175247] hover:bg-[#e6f4f1]/80 py-5 px-5 rounded-lg transition-all duration-200 group cursor-pointer"
              >
                <Link
                  href="/customer-dashboard"
                  className="flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Other Products</span>
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
