import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Add basePath back as we're using /blog path on the domain
  basePath: isProd ? "/blog" : "",
  assetPrefix: isProd ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  // Add this to ensure CSS modules work correctly with static exports
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
