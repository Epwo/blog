import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Ensure basePath is always set for production
  basePath: isProd ? "/blog" : "",
  // Make sure assetPrefix ends with a slash for proper path resolution
  assetPrefix: isProd ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  // Ensure public assets are correctly prefixed
  webpack: (config) => {
    return config;
  },
  // Add trailingSlash to ensure consistent URL handling
  trailingSlash: true,
  // Explicitly set the build directory
  distDir: "out",
};

export default nextConfig;
