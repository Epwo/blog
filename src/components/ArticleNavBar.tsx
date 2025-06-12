"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./ArticleNavBar.module.css";

type ArticleNavBarProps = {
  title: string;
};

const ArticleNavBar = ({ title }: ArticleNavBarProps) => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={18} />
        </Link>
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbItem}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleNavBar;
