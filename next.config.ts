/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // this replaces 'next export'

  basePath: "/blog",
  assetPrefix: "/blog/",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
