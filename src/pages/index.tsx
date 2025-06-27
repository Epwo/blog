import matter from "gray-matter";
import ArticleFeed from "../components/ArticleFeed";
import styles from "@/pages/page.module.css";
import NavBar from "@/components/NavBar";
import { GetStaticProps } from "next";

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

async function getArticlesFromGitHub(): Promise<Article[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}`);
    if (!res.ok) throw new Error("Failed to fetch articles list from GitHub");
    const files = await res.json();
    const mdFiles = files.filter((file: any) => file.name.endsWith(".md"));
    const articles: Article[] = await Promise.all(
      mdFiles.map(async (file: any) => {
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
    return articles.filter(Boolean).sort((a, b) => (a!.date < b!.date ? 1 : -1)) as Article[];
  } catch (error) {
    console.error("Error fetching articles from GitHub:", error);
    return [];
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticlesFromGitHub();
  return {
    props: {
      articles,
    },
  };
};

interface HomeProps {
  articles: Article[];
}

export default function Home({ articles }: HomeProps) {
  return (
    <div className={styles.page}>
      <NavBar></NavBar>
      <main className={styles.main}>
        <ArticleFeed articles={articles} />
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Ewann P</span>
      </footer>
    </div>
  );
}
