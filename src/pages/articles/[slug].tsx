import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import ArticleDetail from "@/components/ArticleDetail";

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = path.join(process.cwd(), "src/articles");
  const files = fs.readdirSync(articlesDir);

  const paths = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      params: {
        slug: file.replace(/\.md$/, ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
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
  } catch {
    return {
      notFound: true,
    };
  }
};

interface ArticlePageProps {
  title: string;
  date: string;
  content: string;
  image: string;
  theme: string;
  summary: string;
}

export default function ArticlePage({
  title,
  date,
  content,
  image,
  theme,
  summary,
}: ArticlePageProps) {
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
