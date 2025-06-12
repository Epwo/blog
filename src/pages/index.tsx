import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ArticleFeed from "../components/ArticleFeed";
import styles from "@/pages/page.module.css";
import NavBar from "@/components/NavBar";
import { GetStaticProps } from "next";

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  theme: string;
};

// Directory where markdown articles are stored
const articlesDir = path.join(process.cwd(), "src/articles");

function getArticles() {
  const files = fs.readdirSync(articlesDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(articlesDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title || file,
        date: data.date || "",
        excerpt: data.summary || "No summary provided.",
        theme: data.theme || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticles();

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
