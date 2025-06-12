/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export", // Enable static exports
  trailingSlash: true, // Add trailing slashes to URLs for better compatibility with GitHub Pages
  images: {
    unoptimized: true, // For static export, images need to be unoptimized
  },
  basePath: "/blog",
  assetPrefix: "/blog/",

  // Optional: disable source maps in production for smaller output size
};

module.exports = nextConfig;
