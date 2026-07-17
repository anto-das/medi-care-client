// @/components/BannerAnimations.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} as any;

export function MotionContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full lg:w-[55%] flex flex-col space-y-6 text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

export function MotionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full lg:w-[45%] flex justify-center lg:justify-end items-center"
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
