import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://thesuperchefs.com",
  ],
};

export default nextConfig;
