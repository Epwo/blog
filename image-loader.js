export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Handle absolute URLs
  if (src.startsWith("http")) {
    return src;
  }

  // Handle relative paths with base path
  const path = src.startsWith("/") ? src.slice(1) : src;
  return `${basePath}/${path}${width ? `?w=${width}` : ""}${
    quality ? `&q=${quality}` : ""
  }`;
}
