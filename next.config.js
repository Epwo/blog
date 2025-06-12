/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  basePath: "/blog", // Matches your GitHub Pages subdirectory
  assetPrefix: "/blog", // Prefix for all asset URLs
  images: {
    unoptimized: true, // Required for static export with images
  },
  // ...existing code...
};

module.exports = nextConfig;
