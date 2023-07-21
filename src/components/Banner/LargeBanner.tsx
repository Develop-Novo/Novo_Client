import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

interface BannerInfo {
	bannerImage: string;
	bannerTitle: string;
	bannerSubtitle: string;
}

const LargeBanner: React.FC<{ bannerProps: BannerInfo }> = ({
	bannerProps,
}) => {
	const backgroundImage = {
		background: `url(${bannerProps.bannerImage}) center no-repeat`,
		width: "1480px",
		height: "560px",
		display: "flex",
		margin: "auto",
	};

	return (
		<>
			<div className={styles.background_wrap} style={backgroundImage}>
				<div className={styles.content}>
					<span className={styles.keyword}>NEW</span>
					<span className={styles.banner_title}>
						{bannerProps.bannerTitle}
					</span>
					<span className={styles.banner_subtitle}>
						{bannerProps.bannerSubtitle}
					</span>
				</div>
			</div>
		</>
	);
};
export default LargeBanner;
