import React from "react";
import styles from "./Ranking.module.css";
import Cover from "../Cover/Cover";

// 소설 정보에 대한 타입 정의
interface NovelInfo {
	rankingNum: number;
	novelImage: string;
	novelTitle: string;
	novelRating: string;
}

// 랭킹 정보에 대한 타입 정의
interface RankingInfo {
	rankingTitle: string;
	rankingNovels: NovelInfo[];
}

// Ranking 컴포넌트의 props 타입 정의
interface RankingProps {
	rankingProps: RankingInfo;
}

const Ranking: React.FC<RankingProps> = ({ rankingProps }) => {
	return (
		<div className={styles.ranking_container}>
			<div className={styles.ranking_title}>
				{rankingProps.rankingTitle}
			</div>
			<div className={styles.covers}>
				{rankingProps.rankingNovels.map((novel) => (
					<Cover
						key={novel.rankingNum.toString()}
						novelProps={novel}
					/>
				))}
			</div>
		</div>
	);
};

export default Ranking;
