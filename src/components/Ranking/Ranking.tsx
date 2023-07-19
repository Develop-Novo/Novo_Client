import React, { useEffect, useState } from "react";
import styles from "./Ranking.module.css";
import Cover from "../Cover/Cover";

function Ranking() {
	return (
		<div className={styles.ranking_container}>
			<div className={styles.ranking_title}>노보 TOP 10</div>
			<div className={styles.covers}>
				<Cover />
				<Cover />
				<Cover />
				<Cover />
				<Cover />
			</div>
		</div>
	);
}

export default Ranking;
