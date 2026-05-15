import type { NextConfig } from "next";
import "./src/env";
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 👈 ১ মেগাবাইট থেকে বাড়িয়ে ১০ মেগাবাইট করা হলো
    },
  },
};

export default nextConfig;
