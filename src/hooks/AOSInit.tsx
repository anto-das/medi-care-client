// components/AOSInit.tsx
"use client";

import { useEffect } from "react";

import "aos/dist/aos.css"; // Global styles
import AOS from "aos"
export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);

  return null; // This component registers listeners without rendering HTML
}
