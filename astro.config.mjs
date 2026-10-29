import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The site is served from epwo.github.io/blog today. If epwo.fr ever points
// straight at GitHub Pages (CNAME), build with SITE_BASE=/ and it just works.
const site = process.env.SITE_URL ?? "https://epwo.github.io";
const base = process.env.SITE_BASE ?? "/blog";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      wrap: true,
    },
  },
});
