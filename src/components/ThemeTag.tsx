import React from "react";
import styles from "./ThemeTag.module.css";

type ThemeTagProps = {
  theme?: string;
};

export default function ThemeTag({ theme }: ThemeTagProps) {
  if (!theme) return null;

  // Normalize the theme string for comparison
  const normalizedTheme = theme.toLowerCase();

  // Default to Misc if theme doesn't match any known category
  let displayTheme = "Misc";
  let emoji = "📌"; // Default emoji

  // Assign appropriate emoji based on theme
  if (normalizedTheme.includes("code") || normalizedTheme.includes("coding")) {
    displayTheme = "Coding";
    emoji = "💻";
  } else if (normalizedTheme.includes("music")) {
    displayTheme = "Music";
    emoji = "🎵";
  } else if (normalizedTheme.includes("misc")) {
    displayTheme = "Misc";
    emoji = "📌";
  } else if (normalizedTheme.includes("ml")) {
    displayTheme = "ML";
    emoji = "🧠";
  } else if (normalizedTheme.includes("devops")) {
    displayTheme = "DevOps";
    emoji = "🥽";
  }

  else{
    displayTheme = normalizedTheme
    emoji = ""
  }

  return (
    <span className={styles.themeTag}>
      <span className={styles.emoji}>{emoji}</span>
      {displayTheme}
    </span>
  );
}
