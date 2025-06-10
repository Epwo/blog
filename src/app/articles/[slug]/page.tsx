import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";

// Generate static params for all articles
export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), "src/articles");
  const files = await fs.readdir(articlesDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articlePath = path.join(process.cwd(), "src/articles", `${slug}.md`);
  let fileContent: string;
  try {
    fileContent = await fs.readFile(articlePath, "utf8");
  } catch {
    notFound();
  }
  const { data, content } = matter(fileContent);

  return (
    <ArticleDetail
      title={data.title || slug}
      date={data.date || ""}
      content={content}
      image={data.image || ""}
      theme={data.theme || ""}
      summary={data.summary || ""}
    />
  );
}
