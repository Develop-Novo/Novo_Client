import React, { useEffect, useState } from "react";
import styles from "./NovelPage.module.css";
import StarRating from "../../components/StarRating/StarRating";
import StarRatingChart from "../../components/StarRatingChart/StarRatingChart";
import Comment from "../../components/Comment/Comment";
import axios from "axios";

interface INovel {
	ageRating: string;
	genre: string;
	id: number;
	introduction: string;
	keyword: string[];
	platform: string;
	price: string;
	publishedAt: string;
	rating: number;
	serialDay: string;
	title: string;
	writer: string;
}
interface IRating {
	star: number;
	contentId: number;
	memberId: number;
	id: number;
}
interface IStarRating {
	count: number;
	data: IRating[];
}
function NovelPage() {
	const [novel, setNovel] = useState<INovel | null>(null);
	const [starRating, setStarRating] = useState<IStarRating | null>(null);
	const [myRating, setMyRating] = useState<IRating | null>(null);
	const [ratingsArr, setRatingsArr] = useState<number[]>([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);

	useEffect(() => {
		const getNovel = async () => {
			try {
				const response = await axios.get(
					"http://35.216.73.185:8080/content/id/1",
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				return response.data;
			} catch (error) {
				console.log(error);
			}
		};
		const getAllRating = async () => {
			try {
				const response = await axios.get(
					"http://35.216.73.185:8080/star/contentId/1",
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				return response.data;
			} catch (error) {
				console.log(error);
			}
		};
		function countStars(arr: IRating[]) {
			// 1부터 10까지의 개수를 저장할 배열 초기화
			const starCounts = Array(10).fill(0);

			// 입력 배열을 순회하면서 star 값이 1부터 10까지인 요소를 카운트
			arr.forEach((item) => {
				const star = item.star;
				if (star >= 1 && star <= 10) {
					starCounts[star - 1] += 1;
				}
			});

			return starCounts;
		}
		function filterByMemberId(arr: IRating[], memberId: number) {
			return arr.filter((item) => item.memberId === memberId);
		}
		getNovel().then((res) => {
			setNovel(res.data);
		});
		getAllRating().then((res) => {
			setStarRating(res);
			setRatingsArr(countStars(res.data));
			const tmp = filterByMemberId(res.data, 1)[0];
			if (tmp !== undefined) {
				setMyRating(tmp);
			}
		});
	}, []);

	return (
		novel &&
		starRating && (
			<>
				<div className={styles.container__wrapper}>
					<div className={styles.container}>
						<div className={styles.novel__info__wrapper}>
							<div className={styles.novel__cover}>
								<img
									className={styles.novel__cover__img}
									src="/images/상세페이지_표지/상세페이지-더는당신의악녀로살지않겠습니다.png"
									alt="novel__img"
								/>
							</div>
							<div className={styles.novel__contents}>
								<div className={styles.novel__contents__r1}>
									<StarRating myRating={myRating} />
									<button
										className={
											styles.novel__contents__button__comment
										}
									>
										<div
											className={
												styles.novel__contents__button__comment__text
											}
										>
											코멘트 남기기
										</div>
									</button>
								</div>
								<hr className={styles.novel__contents__hr} />
								<div className={styles.novel__contents__r2}>
									<StarRatingChart
										ratings={ratingsArr}
										rating={novel.rating}
										count={starRating.count}
									/>

									<div
										className={
											styles.novel__contents__keywords__wrapper
										}
									>
										<div
											className={
												styles.novel__contents__keywords__title
											}
										>
											작품 키워드
										</div>
										<div
											className={
												styles.novel__contents__keywords
											}
										>
											{novel.keyword.map((keyword) => (
												<div
													key={keyword}
													className={
														styles.novel__contents__keyword
													}
												>
													<div
														className={
															styles.novel__contents__keyword__text
														}
													>
														{`${keyword}`}
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.novel__comment__wrapper}>
							<div className={styles.novel__comment__info}>
								<span className={styles.novel__comment__title}>
									코멘트
								</span>{" "}
								<span className={styles.novel__comment__count}>
									100+
								</span>
								<span className={styles.novel__comment__more}>
									더보기
								</span>
							</div>

							<div className={styles.novel__comments}>
								<Comment />
								<Comment />
								<Comment />
								<Comment />
							</div>
						</div>
						<div className={styles.novel__basic_info__wrapper}>
							<span className={styles.novel__basic_info__title}>
								기본정보
							</span>

							<div className={styles.novel__basic_info}>
								<div
									className={
										styles.novel__basic_info__category
									}
								>
									<span>분류</span>
									<span>연재</span>
									<span>발행자</span>
									<span>연령등급</span>
									<span>전자책 정가</span>
									<span>글</span>
								</div>
								<div
									className={
										styles.novel__basic_info__contents
									}
								>
									<span>소설 | 현대판타지</span>
									<span>월,화,수,목,금</span>
									<span>JC미디어</span>
									<span>전체이용가</span>
									<span>100원/회차 당</span>
									<span>슬로프</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}

export default NovelPage;
