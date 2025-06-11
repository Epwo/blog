/**
 * Helper function to ensure correct asset paths
 * For root domain deployment, we just need to ensure paths start with '/'
 */
export function getAssetPath(path: string): string {
  // Make sure path starts with a slash
  return path.startsWith("/") ? path : `/${path}`;
}
