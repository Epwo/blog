import { useEffect, useState } from "react";
import matter from "gray-matter";
import ArticleFeed from "../components/ArticleFeed";
import styles from "@/pages/page.module.css";
import NavBar from "@/components/NavBar";
import packageJson from '../../package.json'

const GITHUB_OWNER = "epwo";
const GITHUB_REPO = "articles";
const GITHUB_BRANCH = "main";
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/articles`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/articles`;

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  theme: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticlesFromGitHub = async () => {
      try {
        const res = await fetch(`${GITHUB_API_BASE}`);
        if (!res.ok) {
          const errorBody = await res.text();
          console.error("GitHub API error:", res.status, errorBody);
          throw new Error("Failed to fetch articles list from GitHub");
        }
        const files = await res.json();
        const mdFiles = files.filter((file: { name: string }) => file.name.endsWith(".md"));
        const articles: Article[] = await Promise.all(
          mdFiles.map(async (file: { name: string }) => {
            const rawUrl = `${GITHUB_RAW_BASE}/${file.name}`;
            const mdRes = await fetch(rawUrl);
            if (!mdRes.ok) return null;
            const content = await mdRes.text();
            const { data } = matter(content);
            return {
              slug: file.name.replace(/\.md$/, ""),
              title: data.title || file.name,
              date: data.date || "",
              excerpt: data.summary || "No summary provided.",
              theme: data.theme || "",
            };
          })
        );
        setArticles(
          articles.filter(Boolean).sort((a, b) => (a!.date < b!.date ? 1 : -1)) as Article[]
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles from GitHub:", error);
        setError("Could not fetch articles from GitHub.");
        setLoading(false);
      }
    };
    getArticlesFromGitHub();
  }, []);

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        {loading && <div style={{ padding: "2rem" }}>Loading articles...</div>}
        {error && <div style={{ color: "red", padding: "2rem" }}>{error}</div>}
        {!loading && !error && <ArticleFeed articles={articles} />}
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Ewann P | contact me ! ewann.postic@hotmail.fr </span>
        <span>
          v{
            (() => {
              try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // @ts-ignore
          return packageJson?.version ?? "0.0.0";
              } catch {
          return "0.0.0";
              }
            })()
          }
        </span>
      </footer>
    </div>
  );
}
