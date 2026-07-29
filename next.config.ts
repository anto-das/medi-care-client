import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // FIX: Tailwind v4 stylesheet compilation build latency dynamically reduce korbe
    optimizeCss: true,
  },
  // better-auth proxy
  async rewrites() {
    return [
      {
        // Explicitly map auth requests
        source: "/api/auth/:path*",
        destination: process.env.BACKEND_URL + "/api/auth/:path*",
      },
      {
        // Explicitly map v1 API requests
        source: "/api/:path*",
        destination: process.env.BACKEND_URL + "/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
