import React from "react";
import Image from "next/image";
import styles from "./HeaderImage.module.css";

type HeaderImageProps = {
  imageUrl?: string;
  title: string;
};

// Update to use absolute path without base path
const DEFAULT_IMAGE = "/images/default.jpg";

export default function HeaderImage({ imageUrl, title }: HeaderImageProps) {
  // Ensure imageUrl is properly formatted for the custom domain
  const displayImage = imageUrl || DEFAULT_IMAGE;

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
