const fs = require("fs");
const path = require("path");

console.log("Preparing deployment for GitHub Pages at /blog path...");

// Ensure CNAME file is in the out directory
fs.writeFileSync(
  path.join(__dirname, "..", "out", "CNAME"),
  "swagman.fr",
  "utf8"
);
console.log("Created CNAME file");

// Create .nojekyll file to prevent GitHub Pages from processing with Jekyll
fs.writeFileSync(path.join(__dirname, "..", "out", ".nojekyll"), "", "utf8");
console.log("Created .nojekyll file");

// Create a 404.html file that redirects to the blog subdirectory
const notFoundHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Check if URL already includes /blog, if not redirect
      const path = window.location.pathname;
      if (!path.startsWith('/blog/')) {
        window.location.replace('/blog' + path);
      }
    </script>
  </head>
  <body>
    <p>Page not found. Redirecting...</p>
  </body>
</html>
`;
fs.writeFileSync(
  path.join(__dirname, "..", "out", "404.html"),
  notFoundHtml,
  "utf8"
);
console.log("Created 404.html with redirection logic");

// Create a root index.html that redirects to /blog
const indexHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to blog</title>
    <meta http-equiv="refresh" content="0; URL=/blog/">
    <link rel="canonical" href="https://swagman.fr/blog/">
  </head>
  <body>
    <p>Redirecting to blog...</p>
  </body>
</html>
`;
fs.writeFileSync(
  path.join(__dirname, "..", "out", "../index.html"),
  indexHtml,
  "utf8"
);
console.log("Created root index.html with redirection to /blog/");

console.log("Deployment preparation complete!");
