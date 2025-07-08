import { useEffect, useState } from "react";
import ArticleDetail from "@/components/ArticleDetail";
import { useRouter } from "next/router";
import matter from "gray-matter";

const GITHUB_OWNER = "epwo";
const GITHUB_REPO = "articles";
const GITHUB_BRANCH = "main";
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/articles`;

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<{
    title: string;
    date: string;
    content: string;
    image: string;
    theme: string;
    summary: string;
    error?: string | null;
  } | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      const url = `${GITHUB_RAW_BASE}/${slug}.md`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch article from GitHub");
        const fileContent = await res.text();
        const { data, content } = matter(fileContent);
        setArticle({
          title: data.title || slug as string,
          date: data.date || "",
          content,
          image: data.image || "",
          theme: data.theme || "",
          summary: data.summary || "",
          error: null,
        });
      } catch (error) {
        setArticle({
          title: slug as string,
          date: "",
          content: "",
          image: "",
          theme: "",
          summary: "",
          error: "Could not fetch article from GitHub.",
        });
      }
    };
    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }
  if (article.error) {
    return <div style={{ color: "red", padding: "2rem" }}>{article.error}</div>;
  }
  return (
    <ArticleDetail
      title={article.title}
      date={article.date}
      content={article.content}
      image={article.image}
      theme={article.theme}
      summary={article.summary}
    />
  );
}