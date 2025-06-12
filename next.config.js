/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/blog" : "",
  assetPrefix: isProd ? "/blog/" : "",
  reactStrictMode: true,
  // Use trailingSlash: true if you want URLs to end with a /
  trailingSlash: false,
};
