'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MedicareLoading() {
  // আপনার কাস্টম গ্রিন কালার হেক্স কোড: #0B5E4E
  const brandColor = "#0B5E4E";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background px-4 z-50 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      />

      {/* মূল অ্যানিমেশন এরিয়া */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        
        {/* ১. বাইরে ঘুরতে থাকা ক্ষতিকর ব্যাকটেরিয়া ও ভাইরাসের কণা */}
        <motion.div 
          className="absolute inset-0 border-2 border-dashed rounded-full opacity-20"
          style={{ borderColor: brandColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* ব্যাকটেরিয়া ডট ১ (যা ক্যাপসুলের কাছে এসে ভ্যানিশ হবে) */}
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-destructive/40 blur-[1px]"
          animate={{
            scale: [1, 0.2, 1],
            opacity: [0.8, 0, 0.8],
            x:0,
            y: [-40, 0, -40],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ব্যাকটেরিয়া ডট ২ */}
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-destructive/60"
          animate={{
            scale: [0.3, 1, 0.3],
            opacity: [0, 0.7, 0],
            x: [-50, 0, -50],
            y:0,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* ২. ক্যাপসুল থেকে বের হওয়া অ্যান্টি-ব্যাকটেরিয়াল শিল্ড/পালস */}
        <motion.div
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 opacity-30"
          style={{ borderColor: brandColor }}
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />

        {/* ৩. সেন্টারে ফ্যান্সি মেডিসিন ক্যাপসুল (Floating & Rotating) */}
        <motion.div
          className="z-10 cursor-pointer"
          animate={{
            y: [-6, 6, -6],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* SVG এর মাধ্যমে কাস্টম ক্যাপসুল ডিজাইন */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://w3.org"
            className="drop-shadow-[0_0_15px_rgba(11,94,78,0.6)]"
          >
            {/* ক্যাপসুলের উপরের অংশ (আপনার ব্র্যান্ড কালার #0B5E4E) */}
            <path
              d="M6 11V9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9V11H6Z"
              fill={brandColor}
            />
            {/* ক্যাপসুলের নিচের অংশ (সাদা বা হালকা থিম কালার) */}
            <path
              d="M18 13V15C18 18.3137 15.3137 21 12 21C8.68629 21 6 18.3137 6 15V13H18Z"
              fill="#E2E8F0"
              className="dark:fill-slate-700"
            />
            {/* মাঝখানের চকচকে গ্লাস ইফেক্ট লাইন */}
            <line
              x1="6"
              y1="12"
              x2="18"
              y2="12"
              stroke="#000"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      {/* টেক্সট এরিয়া */}
      <div className="mt-4 flex flex-col items-center max-w-xs w-full text-center">
        <motion.h2 
          className="text-xl font-bold tracking-widest uppercase text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MediCare
        </motion.h2>
        
        {/* ডায়নামিক স্টাইলের সাবটাইটেল */}
        <motion.p 
          className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground mt-1 mb-5 h-5"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Destroying bacteria & loading dashboard...
        </motion.p>

        {/* ৪. মেডিকেল ইসিজি (ECG) / হার্টবিট স্টাইলের প্রোগ্রেস বার */}
        <div className="h-[2px] w-32 bg-muted rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full w-12 rounded-full absolute"
            style={{ backgroundColor: brandColor }}
            animate={{
              left: ["-40%", "110%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </div>
  );
}
