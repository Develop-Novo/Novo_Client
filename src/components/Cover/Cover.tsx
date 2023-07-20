import React, { useEffect, useState } from "react";
import styles from "./Cover.module.css";

interface NovelProps {
	rankingNum: number;
	novelImage: string;
	novelTitle: string;
	novelRating: string;
}

const Cover: React.FC<{ novelProps: NovelProps }> = ({ novelProps }) => {
	const backgroundImage = {
		background: `url(${novelProps.novelImage})`,
		width: "280px",
		height: "408px",
		display: "flex",
	};
	return (
		<div>
			<div className={styles.cover_image} style={backgroundImage}>
				<div className={styles.content}>
					<span className={styles.rank_num}>
						{novelProps.rankingNum}
					</span>
				</div>
			</div>
			<div className={styles.cover_title}>{novelProps.novelTitle}</div>
			<div className={styles.cover_rating}>
				평균 ★ {novelProps.novelRating}
			</div>
		</div>
	);
};

export default Cover;
