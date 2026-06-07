"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function EmailVerifiedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      {/* Animated Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-100 shadow-xl">
          {/* Logo / Header section */}
          <CardHeader className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-teal-600 font-bold text-lg">
              <ShieldCheck className="h-6 w-6" />
              <span>Medicare Portal</span>
            </div>

            {/* Animated Success Checkmark Ring */}
            <div className="flex justify-center pt-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200"
              >
                {/* Checkmark icon with fill path animation */}
                <svg
                  className="h-10 w-10 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Accessible Heading */}
            <CardTitle className="text-2xl font-extrabold text-slate-800 tracking-tight pt-2">
              Email Verified Successfully!
            </CardTitle>

            {/* Plain text description for older adults */}
            <CardDescription className="text-base text-slate-600 font-normal leading-relaxed pt-1">
              Thank you for confirming your email. Your secure healthcare portal
              account is now active and ready to use.
            </CardDescription>
          </CardHeader>

          {/* Action Button Section */}
          <CardContent className="pt-0">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                asChild
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold h-12 rounded-xl text-base shadow-md cursor-pointer transition-colors"
              >
                <Link href="/customer-dashboard">Go to My Dashboard</Link>
              </Button>
            </motion.div>
          </CardContent>

          {/* Accessible Human Support Footer */}
          <CardFooter className="flex flex-col items-center justify-center border-t border-slate-100 bg-slate-50/50 p-6 rounded-b-xl">
            <p className="text-xs text-slate-400 font-normal flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-slate-400" />
              Need help? Contact Medicare Support at
            </p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              1-800-555-0199
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
