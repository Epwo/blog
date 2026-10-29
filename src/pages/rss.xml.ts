import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getArticles, url } from "@/lib/articles";

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: "Epwo",
    description: "Ewann's notes on code, ML, self-hosting and side projects.",
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.summary,
      categories: a.data.theme,
      link: url(`articles/${a.id}/`),
    })),
  });
}
