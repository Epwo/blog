import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { parseDate } from "@/lib/date";

const base = process.env.ARTICLES_DIR ?? ".articles";

const articles = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: `${base}/articles`,
    // Keep the file name as the URL so old links (/articles/GestureControl) keep working.
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.string().transform((value, ctx) => {
      const date = parseDate(value);
      if (!date) {
        ctx.addIssue({ code: "custom", message: `Unreadable date "${value}"` });
        return z.NEVER;
      }
      return date;
    }),
    summary: z.string().default(""),
    theme: z
      .string()
      .default("")
      .transform((t) => t.split(",").map((s) => s.trim()).filter(Boolean)),
    image: z.string().optional(),
    status: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
