/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
console.log("isProd:", isProd);
module.exports = {
  output: "export",
  //   basePath: isProd ? "/blog" : "",
  images: {
    unoptimized: true,
  },
};
