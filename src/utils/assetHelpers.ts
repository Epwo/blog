/**
 * Helper function to prefix asset paths when needed
 */
export function getAssetPath(path: string): string {
  // If path already starts with http/https, it's an external URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Make sure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Check if we're running on GitHub Pages (in production)
  if (process.env.NODE_ENV === "production") {
    // For GitHub Pages deployment
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/blog";

    // Only add the basePath if the path doesn't already include it
    if (!normalizedPath.startsWith(basePath + "/")) {
      return `${basePath}${normalizedPath}`;
    }
  }

  return normalizedPath;
}
