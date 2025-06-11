import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: isProd ? "" : "",
  images: {
    unoptimized: true,
  },
  // Add this to ensure CSS modules work correctly with static exports
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
