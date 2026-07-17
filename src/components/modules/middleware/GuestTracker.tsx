// @/components/providers/GuestTracker.tsx
"use client";

import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export function GuestTracker({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // সেফটি চেক: উইন্ডো অবজেক্ট অ্যাভেইলেবল কিনা
    if (typeof window !== "undefined") {
      const existingId = localStorage.getItem("guest_id");
      if (!existingId) {
        localStorage.setItem("guest_id", uuid());
      }
    }
  }, []);

  return <>{children}</>;
}
