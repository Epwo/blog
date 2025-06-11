/**
 * Helper function to ensure asset paths include the correct prefix
 * for both development and production environments.
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // With custom domain on GitHub pages, we can use absolute paths
  return normalizedPath;
}
