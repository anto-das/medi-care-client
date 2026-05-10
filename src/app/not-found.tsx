"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center overflow-hidden">
      {/* Animated Stethoscope Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-12"
      >
        {/* Pulsing background circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 rounded-full bg-[#0b5e4e] blur-2xl"
        ></motion.div>

        {/* Floating Icon Card */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-white shadow-2xl border border-slate-100"
        >
          <Stethoscope className="h-14 w-14 text-[#0b5e4e]" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Text Content with Staggered Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-slate-900">
          Record Not Found
        </h1>
        <p className="mb-10 max-w-lg text-lg text-slate-600 leading-relaxed">
          The medical page or patient record you are looking for isn't
          available. It might have been moved or archived.
        </p>
      </motion.div>

      {/* Buttons with Hover Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <Button
          asChild
          size="lg"
          className="bg-[#0b5e4e] hover:bg-[#084a3d] px-8 py-7 text-lg transition-transform active:scale-95 shadow-lg"
        >
          <Link href="/">Return to Dashboard</Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          asChild
          className="px-8 py-7 text-lg border-slate-300 hover:bg-slate-100 transition-transform active:scale-95"
        >
          <Link href="/help">Contact Support</Link>
        </Button>
      </motion.div>

      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-[20vw] font-black text-[#0b5e4e]/5 select-none">
          404
        </div>
      </div>
    </div>
  );
}
