import styles from "./ArticleFeed.module.css";
import ArticleLinkItem from "./ArticleLinkItem";
import React from "react";

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  theme?: string;
};

export default function ArticleFeed({ articles }: { articles: Article[] }) {
  return (
    <div className={styles.feedContainer}>
      <div className={styles.feed}>
        {articles.map((article, index) => (
          <React.Fragment key={article.slug}>
            <ArticleLinkItem article={article} />
            {index < articles.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
