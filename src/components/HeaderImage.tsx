import React from "react";
import Image from "next/image";
import styles from "./HeaderImage.module.css";
import { getAssetPath } from "@/utils/assetHelpers";

type HeaderImageProps = {
  imageUrl?: string;
  title: string;
};

// Default image path - now starts with a slash
const DEFAULT_IMAGE = "/images/default.jpg";

export default function HeaderImage({ imageUrl, title }: HeaderImageProps) {
  // Use the asset helper to get the correct path
  const displayImage = imageUrl ? getAssetPath(imageUrl) : DEFAULT_IMAGE;

  return (
    <div className={styles.headerImageContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={displayImage}
          alt={`Header image for ${title}`}
          fill
          sizes="100vw"
          priority
          className={styles.headerImage}
        />
        <div className={styles.imageFadeOverlay} />
      </div>
    </div>
  );
}
