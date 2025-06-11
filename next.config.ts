import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Important: Include the basePath for correct URL handling
  basePath: isProd ? "/blog" : "",
  // Use the same base path for assets
  assetPrefix: isProd ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  // Ensure paths are generated correctly
  trailingSlash: true,
};

export default nextConfig;
