import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "@/pages/page.module.css";
import ArticleNavBar from "./ArticleNavBar";
import HeaderImage from "./HeaderImage";
import ThemeTag from "./ThemeTag";
import { formatDate } from "@/utils/dateFormatter";

type Props = {
  title: string;
  date: string;
  content: string;
  image?: string;
  theme?: string;
  summary?: string;
};

export default function ArticleDetail({
  title,
  date,
  content,
  image,
  theme,
  summary,
}: Props) {
  const formattedDate = formatDate(date);

  return (
    <>
      <HeaderImage imageUrl={image} title={title} />
      <ArticleNavBar title={title} />
      <article className={styles.articleDetail}>
        <div className={styles.articleHeader}>
          <h1>{title}</h1>
          <div className={styles.articleMeta}>
            {date && <p className={styles.date}>{formattedDate}</p>}
            {theme && <ThemeTag theme={theme} />}
          </div>
          {summary && <p className={styles.summary}>{summary}</p>}
        </div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </>
  );
}
