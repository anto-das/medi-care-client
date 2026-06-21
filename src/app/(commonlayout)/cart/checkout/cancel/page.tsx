"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4 dark:bg-slate-950">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="border-slate-200/80 shadow-lg dark:border-slate-800">
          {/* Header Area with Animated Alert Icon */}
          <CardHeader className="flex flex-col items-center text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: "easeInOut",
                // type: "spring",
                // stiffness: 200,
                // damping: 15,
              }}
              className="rounded-full bg-red-50 p-4 dark:bg-red-950/40"
            >
              <XCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Payment Cancelled
              </CardTitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Your transaction was not completed and no money was charged.
              </CardDescription>
            </motion.div>
          </CardHeader>

          {/* Details / Summary Area */}
          <CardContent className="space-y-4 pt-4">
            <motion.div
              variants={itemVariants}
              className="rounded-lg bg-slate-100 p-4 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50"
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Possible Reasons
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Clicked the back button during checkout</li>
                <li>Session timed out or form closed manually</li>
                <li>The payment process was intentionally aborted</li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Need help? Contact our support team.</span>
            </motion.div>
          </CardContent>

          {/* Action Buttons using Shadcn Button tokens */}
          <CardFooter className="flex flex-col gap-2 pt-2">
            <motion.div variants={itemVariants} className="w-full">
              <Button
                asChild
                className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Return to Cart & Retry
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button
                asChild
                variant="outline"
                className="w-full border-slate-200 dark:border-slate-800"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home Page
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
