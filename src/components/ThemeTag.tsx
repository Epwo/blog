
import React from "react";
import styles from "./ThemeTag.module.css";

type ThemeTagProps = {
  theme?: string;
};

// Helper to get display name and emoji for a theme
function getThemeInfo(theme: string) {
  const normalizedTheme = theme.trim().toLowerCase();
  if (normalizedTheme.includes("code") || normalizedTheme.includes("coding")) {
    return { display: "Coding", emoji: "💻" };
  } else if (normalizedTheme.includes("music")) {
    return { display: "Music", emoji: "🎵" };
  } else if (normalizedTheme.includes("misc")) {
    return { display: "Misc", emoji: "📌" };
  } else if (normalizedTheme.includes("ml")) {
    return { display: "ML", emoji: "🧠" };
  } else if (normalizedTheme.includes("devops")) {
    return { display: "DevOps", emoji: "🥽" };
  }
  return { display: theme.trim(), emoji: "" };
}

export default function ThemeTag({ theme }: ThemeTagProps) {
  if (!theme) return null;

  // Split themes by comma, handle multiple themes
  const themeList = theme.split(",").map(t => t.trim()).filter(Boolean);

  return (
    <span className={styles.themeTag}>
      {themeList.map((t, idx) => {
        const { display, emoji } = getThemeInfo(t);
        return (
          <span key={idx} className={styles.themeTag} style={{ marginRight: 6 }}>
            <span className={styles.emoji}>{emoji}</span>
            {display}
          </span>
        );
      })}
    </span>
  );
}
