/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  // Remove trailing slash to avoid path issues
  basePath: process.env.NODE_ENV === "production" ? "/blog" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/blog/" : "",
  images: {
    unoptimized: true, // Required for static export with images
  },
  // This is important for GitHub Pages
  trailingSlash: true,
  // Ensure environment variables are available
  env: {
    NEXT_PUBLIC_BASE_PATH: "/blog",
  },
};

module.exports = nextConfig;
