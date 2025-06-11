import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Ensure basePath is set correctly for the custom domain
  basePath: "",
  // Don't use assetPrefix with custom domain
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
  // Set this to ensure paths are generated correctly
  trailingSlash: true,
};

export default nextConfig;
