import React from "react";
import Link from "next/link";
import styles from "./ArticleLinkItem.module.css";
import { formatDate } from "@/utils/dateFormatter";
import ThemeTag from "./ThemeTag";

type Article = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  theme?: string;
};

type Props = {
  article: Article;
};

const ArticleLinkItem = ({ article }: Props) => {
  const { title, date, excerpt, slug, theme } = article;
  const formattedDate = formatDate(date);

  return (
    <article className={styles.article}>
      <div className={styles.metadata}>
        {date && <time className={styles.date}>{formattedDate}</time>}
        {theme && <ThemeTag theme={theme} />}
      </div>

      <h2 className={styles.title}>
        <Link href={`/articles/${slug}`} className={styles.link}>
          {title}
        </Link>
      </h2>

      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default ArticleLinkItem;
