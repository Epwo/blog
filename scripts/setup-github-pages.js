const fs = require("fs");
const path = require("path");

console.log("Setting up GitHub Pages with custom domain...");

// Ensure CNAME file is copied to the out directory
const cnamePath = path.join(__dirname, "..", "out", "CNAME");
fs.writeFileSync(cnamePath, "swagman.fr", "utf8");
console.log("Created CNAME file");

// Create a .nojekyll file to prevent GitHub Pages from using Jekyll
const nojekyllPath = path.join(__dirname, "..", "out", ".nojekyll");
fs.writeFileSync(nojekyllPath, "", "utf8");
console.log("Created .nojekyll file");

// Create a simple redirector at the root
const indexPath = path.join(__dirname, "..", "out", "index.html");
if (fs.existsSync(indexPath)) {
  console.log("Root index.html already exists");
} else {
  // Create an index.html that redirects to the blog directory if it doesn't exist
  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; URL=/">
  </head>
  <body>
    <p>Please wait while you're being redirected...</p>
  </body>
</html>
`;
  fs.writeFileSync(indexPath, htmlContent, "utf8");
  console.log("Created redirecting index.html");
}

console.log("GitHub Pages setup complete!");
