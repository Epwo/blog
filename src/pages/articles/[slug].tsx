import matter from "gray-matter";
import ArticleDetail from "@/components/ArticleDetail";
import { GetStaticProps, GetStaticPaths } from "next";

const GITHUB_OWNER = "epwo";
const GITHUB_REPO = "articles";
const GITHUB_BRANCH = "main"; // Change if your default branch is not main
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/articles`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/articles`;

// Get static paths for all articles from GitHub
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`${GITHUB_API_BASE}`);
    if (!res.ok) throw new Error("Failed to fetch articles list from GitHub");
    const files = await res.json();
    const paths = files
      .filter((file: any) => file.name.endsWith(".md"))
      .map((file: any) => ({
        params: { slug: file.name.replace(/\.md$/, "") },
      }));
    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching article list from GitHub:", error);
    return { paths: [], fallback: false };
  }
};

// Get static props for the specific article from GitHub
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const url = `${GITHUB_RAW_BASE}/${slug}.md`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch article from GitHub");
    const fileContent = await res.text();
    const { data, content } = matter(fileContent);
    return {
      props: {
        title: data.title || slug,
        date: data.date || "",
        content,
        image: data.image || "",
        theme: data.theme || "",
        summary: data.summary || "",
        error: null,
      },
    };
  } catch (error) {
    console.error(`Error fetching article ${slug} from GitHub:`, error);
    return {
      props: {
        title: slug,
        date: "",
        content: "",
        image: "",
        theme: "",
        summary: "",
        error: "Could not fetch article from GitHub.",
      },
    };
  }
};

// Article page component using props
export default function ArticlePage({
  title,
  date,
  content,
  image,
  theme,
  summary,
  error,
}: {
  title: string;
  date: string;
  content: string;
  image: string;
  theme: string;
  summary: string;
  error?: string | null;
}) {
  if (error) {
    return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  }
  return (
    <ArticleDetail
      title={title}
      date={date}
      content={content}
      image={image}
      theme={theme}
      summary={summary}
    />
  );
}
