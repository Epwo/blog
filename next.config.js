/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS || false;
const repo = isGitHubPages ? "/blog" : "";

const nextConfig = {
  output: "export", // Required for static export
  distDir: "out",
  // Remove trailing slash to avoid path issues
  basePath: repo,
  assetPrefix: repo,
  images: {
    unoptimized: true, // Required for static export with images
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
  // This is important for GitHub Pages
  trailingSlash: true,
  // Ensure environment variables are available
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
  // Fix for GitHub Pages asset paths
  webpack: (config) => {
    // SVGR configuration for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
