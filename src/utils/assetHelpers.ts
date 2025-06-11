/**
 * Helper function to ensure asset paths include the correct basePath prefix
 * for both development and production environments.
 */
export function getAssetPath(path: string): string {
  // Check if we're in production to add the basePath
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/blog" : "";

  // Ensure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
