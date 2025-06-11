/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "", // no basePath because you deploy to root of subdomain
  assetPrefix: "", // no asset prefix
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
