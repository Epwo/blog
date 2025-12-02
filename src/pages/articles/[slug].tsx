import { GetStaticProps, GetStaticPaths } from "next";
import ArticleDetail from "@/components/ArticleDetail";
import matter from "gray-matter";

const GITHUB_OWNER = "epwo";
const GITHUB_REPO = "articles";
const GITHUB_BRANCH = "main";
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/articles`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/articles`;

interface ArticlePageProps {
  article: {
    title: string;
    date: string;
    content: string;
    image: string;
    theme: string;
    summary: string;
  };
}

export default function ArticlePage({ article }: ArticlePageProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`${GITHUB_API_BASE}`);
    if (!res.ok) throw new Error("Failed to fetch articles from GitHub");
    const files = await res.json();
    const mdFiles = files.filter((file: { name: string }) => file.name.endsWith(".md"));

    const paths = mdFiles.map((file: { name: string }) => ({
      params: {
        slug: file.name.replace(/\.md$/, ""),
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching article slugs from GitHub:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (context) => {
  const slug = context.params?.slug as string;

  try {
    const url = `${GITHUB_RAW_BASE}/${slug}.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch article from GitHub");

    const fileContent = await res.text();
    const { data, content } = matter(fileContent);

    return {
      props: {
        article: {
          title: data.title || slug,
          date: data.date || "",
          content,
          image: data.image || "",
          theme: data.theme || "",
          summary: data.summary || "",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
}