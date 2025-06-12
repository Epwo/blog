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

  // For GitHub Pages deployment with the blog subdirectory
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Handle client-side execution vs server-side
  const isBrowser = typeof window !== "undefined";
  const isProduction =
    process.env.NODE_ENV === "production" ||
    (isBrowser && window.location.hostname !== "localhost");

  if (isProduction && basePath) {
    // Make sure we don't add the base path multiple times
    if (!normalizedPath.startsWith(basePath)) {
      return `${basePath}${normalizedPath}`;
    }
  }

  return normalizedPath;
}
