import Link from "next/link";
import styles from "./ArticleLinkItem.module.css";
import { formatDate } from "@/utils/dateFormatter";
import ThemeTag from "./ThemeTag";

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  theme?: string;
};

export default function ArticleLinkItem({ article }: { article: Article }) {
  const formattedDate = formatDate(article.date);

  // This Link component will automatically handle the basePath configuration
  return (
    <Link href={`/articles/${article.slug}`} className={styles.articleLink}>
      <div className={styles.articleItem}>
        <div className={styles.articleHeader}>
          <h2 className={styles.title}>{article.title}</h2>
          <div className={styles.meta}>
            {article.theme && <ThemeTag theme={article.theme} />}
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>
        <p className={styles.excerpt}>{article.excerpt}</p>
      </div>
    </Link>
  );
}
