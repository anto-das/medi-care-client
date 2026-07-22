"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, PlusCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui card
import Link from "next/link";

interface NoOrdersStateProps {
  onRefresh?: () => void;
  onNavigateToMedicines?: () => void;
}

export default function NoOrdersState({
  onRefresh,
  onNavigateToMedicines,
}: NoOrdersStateProps) {
  return (
    <div
      data-aos="fade-up"
      className="flex items-center justify-center min-h-full w-full p-4"
    >
      <Card className="w-full max-w-md border-dashed border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          {/* Animated Illustration/Icon Area */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mb-6"
          >
            {/* Background Pulse Effect */}
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/20"
            />
            <ShoppingBag className="w-10 h-10 relative z-10 animate-pulse" />
          </motion.div>

          {/* Text Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              No Orders Found Yet
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-[320px] mx-auto">
              Your Medi Care shop hasn't received any orders at the moment. Keep
              your inventory updated and wait for new requests.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 w-full mt-8"
          >
            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="flex-1 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <RefreshCw className="w-4 h-4 mr-2 text-slate-500" />
              Check Updates
            </Button>

            {/* Medicine Management Button */}
            <Link href={"/seller-dashboard/medicine"}>
              <Button
                size="sm"
                onClick={onNavigateToMedicines}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm shadow-emerald-600/10"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Manage Inventory
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
