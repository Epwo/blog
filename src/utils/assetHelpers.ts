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

  // In development or if no basePath is configured, return the path as is
  // In production with basePath, Next.js should handle this automatically
  return normalizedPath;
}
