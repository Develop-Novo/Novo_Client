import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

function Banner() {
	return (
		<>
			<div className={styles.background_wrap}>
				<div className={styles.content}>
					<span className={styles.keyword}>NEW</span>
					<span className={styles.banner_title}>
						더는 당신의 악녀로 살지 않겠습니다
					</span>
					<span className={styles.banner_subtitle}>
						괴물이라 손가락질 받았으니 진짜 괴물이 되어주겠어.
					</span>
				</div>
			</div>
		</>
	);
}
export default Banner;
