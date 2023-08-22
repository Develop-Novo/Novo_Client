import React, { useState } from "react";
import styles from "./Ranking.module.css";
import Cover from "../Cover/Cover";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

// 소설 정보에 대한 타입 정의
interface NovelInfo {
	novelID: number;
	rankingNum: number;
	novelImage: string;
	novelTitle: string;
	novelRating: number;
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
	const [startIndex, setStartIndex] = useState(0);
	const [showPreviousBtn, setShowPreviousBtn] = useState(false);
	const coversPerPage = 5;

	const handleNextSlide = () => {
		if (rankingProps.rankingNovels.length > 5) {
			setStartIndex((prevStartIndex) =>
				Math.min(
					prevStartIndex + coversPerPage,
					rankingProps.rankingNovels.length - coversPerPage
				)
			);
			setShowPreviousBtn(true);
		}
	};

	const handlePreviousSlide = () => {
		setStartIndex((prevStartIndex) =>
			Math.max(prevStartIndex - coversPerPage, 0)
		);
		setShowPreviousBtn(false);
	};

	return (
		<div className={styles.ranking_container}>
			<div className={styles.ranking_title}>
				{rankingProps.rankingTitle}
			</div>
			<div className={styles.covers}>
				<span
					className={styles.cover_previous_button}
					style={{
						display: showPreviousBtn === false ? "none" : "inline",
					}}
				>
					<Button
						buttonType="left"
						buttonLeft="201px"
						onClick={handlePreviousSlide}
					/>
				</span>
				{rankingProps.rankingNovels
					.slice(startIndex, startIndex + coversPerPage)
					.map((novel, index) => (
						<div
							key={novel.rankingNum.toString()}
							className={styles.coverWrapper}
							style={{
								marginRight:
									index === coversPerPage - 1 ? "0" : "20px",
								transition: "transform 0.3s ease-in-out",
							}}
						>
							<Link to={`/novel/${novel.novelID}`}>
								<Cover novelProps={novel} />
							</Link>
						</div>
					))}
				<span className={styles.cover_next_button}>
					<Button
						buttonType="right"
						buttonLeft="1684px"
						onClick={handleNextSlide}
					/>
				</span>
			</div>
		</div>
	);
};

export default Ranking;
