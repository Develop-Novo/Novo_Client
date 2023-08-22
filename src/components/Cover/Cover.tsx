import React, { useEffect, useState } from "react";
import styles from "./Cover.module.css";

interface NovelProps {
  novelID: number;
  rankingNum: number;
  novelImage: string;
  novelTitle: string;
  novelRating: number;
}

const Cover: React.FC<{ novelProps: NovelProps }> = ({ novelProps }) => {
  const backgroundImage = {
    background: `url(${novelProps.novelImage})`,
    width: "280px",
    height: "408px",
    display: "flex",
    backgroundSize: "cover" /*이미지 커버 크기에 맞게 수정*/,
  };
  return (
    <div>
      <div className={styles.cover_image} style={backgroundImage}>
        <div className={styles.content}>
          <span className={styles.rank_num}>{novelProps.rankingNum}</span>
        </div>
      </div>
      <div className={styles.cover_title}>{novelProps.novelTitle}</div>
      <div className={styles.cover_rating}>평균 ★ {novelProps.novelRating}</div>
    </div>
  );
};

export default Cover;
