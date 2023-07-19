import React, { useEffect, useState } from "react";
import styles from "./Cover.module.css";

function Cover() {
	return (
		<div>
			<div className={styles.cover_image}>
				<div className={styles.content}>
					<span className={styles.rank_num}>1</span>
				</div>
			</div>
			<div className={styles.cover_title}>데뷔 못하면 죽는 병 걸림</div>
			<div className={styles.cover_rating}>평균 ★ 10.0</div>
		</div>
	);
}

export default Cover;
