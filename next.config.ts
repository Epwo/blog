import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};
// next.config.js
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: "/blog",
  assetPrefix: isProd ? "/blog/" : "",
};

export default nextConfig;
