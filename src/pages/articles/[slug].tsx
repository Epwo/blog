import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ArticleDetail from "@/components/ArticleDetail";
import { GetStaticProps, GetStaticPaths } from "next";

// Get static paths for all articles
export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = path.join(process.cwd(), "src/articles");
  const files = fs.readdirSync(articlesDir);

  const paths = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      params: { slug: file.replace(/\.md$/, "") },
    }));

  return {
    paths,
    fallback: false,
  };
};

// Get static props for the specific article
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const articlePath = path.join(process.cwd(), "src/articles", `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(articlePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      props: {
        title: data.title || slug,
        date: data.date || "",
        content,
        image: data.image || "",
        theme: data.theme || "",
        summary: data.summary || "",
      },
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return {
      notFound: true,
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
}: {
  title: string;
  date: string;
  content: string;
  image: string;
  theme: string;
  summary: string;
}) {
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
