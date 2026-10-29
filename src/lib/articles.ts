import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;

/** Published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection("articles", ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const isWip = (a: Article) => /progress|wip/i.test(a.data.status ?? "");

/** Rough reading time from the raw markdown, in minutes. */
export function readingTime(a: Article): number {
  const words = (a.body ?? "").replace(/```[\s\S]*?```|!\[.*?\]\(.*?\)/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const TAGS: Record<string, string> = {
  code: "Coding",
  coding: "Coding",
  ml: "ML",
  devops: "DevOps",
  music: "Music",
  misc: "Misc",
};

export const tagLabel = (tag: string) => TAGS[tag.toLowerCase()] ?? tag;

/** Prefixes a site path with the configured base (e.g. /blog). */
export const url = (path = "") =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
