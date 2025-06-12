/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export", // Enable static exports
  trailingSlash: true, // Add trailing slashes to URLs for better compatibility with GitHub Pages
  images: {
    unoptimized: true, // For static export, images need to be unoptimized
  },
  basePath: "/blog", // Use '/blog' in production
  assetPrefix: "/blog", // Use '/blog' in production

  // Optional: disable source maps in production for smaller output size
  productionBrowserSourceMaps: false,

  // Handle GitHub Pages 404s by ensuring we generate a 404.html file
  generateBuildId: async () => {
    return "build-id"; // Consistent build ID
  },
};

module.exports = nextConfig;
