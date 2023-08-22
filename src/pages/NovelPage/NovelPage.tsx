import React, { useEffect, useState } from "react";
import styles from "./NovelPage.module.css";
import StarRating from "../../components/StarRating/StarRating";
import StarRatingChart from "../../components/StarRatingChart/StarRatingChart";
import Comment from "../../components/Comment/Comment";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";

interface INovel {
	ageRating: string;
	coverImg: string;
	detailImg: string;
	genre: string;
	id: number;
	introduction: string;
	keyword: string[];
	link: string;
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

interface CommentProps {
	memberId: number;
	starId: number;
	message: string;
	like_count: number;
	createdAt: string;
	id: number;
}

function NovelPage() {
	const [memberId, setMemberId] = useState<string | null>(null);
	const [novel, setNovel] = useState<INovel | null>(null);
	const [starRating, setStarRating] = useState<IStarRating | null>(null);
	const [myRating, setMyRating] = useState<IRating | null>(null);
	const [ratingsArr, setRatingsArr] = useState<number[]>([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);
	const [comments, setComments] = useState<CommentProps[]>([]);

	const { id } = useParams();

	useEffect(() => {
		const getNovel = async () => {
			try {
				const response = await axios.get(
					`http://52.78.121.235:8080/content/id/${id}`,
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
					`http://52.78.121.235:8080/star/contentId/${id}`,
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
		const getComments = async () => {
			try {
				const response = await axios.get(
					`http://52.78.121.235:8080/review/contentId/${id}`,
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
			if (memberId) {
				const tmp = filterByMemberId(res.data, parseInt(memberId))[0];
				if (tmp !== undefined) {
					setMyRating(tmp);
				}
			}
		});
		getComments().then((res) => {
			setComments(res.data);
		});
	}, [memberId]);

	useEffect(() => {
		setMemberId(localStorage.getItem("memberId"));
	}, []);

	return (
		novel &&
		starRating && (
			<>
				<div className={styles.container__wrapper}>
					<div className={styles.container}>
						<div className={styles.novel__banner__wrapper}>
							<div
								className={styles.novel__banner__background}
								style={{
									backgroundImage: `url(${novel.detailImg})`,
								}}
							>
								<div className={styles.novel__banner__info}>
									<div
										className={
											styles.novel__banner__info__title
										}
									>
										{novel.title}
									</div>
									<div
										className={
											styles.novel__banner__info__genre
										}
									>
										{novel.genre}
									</div>
									<div
										className={
											styles.novel__banner__info__introduction
										}
									>
										{novel.introduction}
									</div>
									<Link to={novel.link}>
										<button
											className={
												styles.novel__banner__info__btn
											}
											id={
												novel.platform ===
												"네이버 시리즈"
													? styles.naver__series
													: novel.platform ===
													  "카카오 페이지"
													? styles.kakao__page
													: novel.platform ===
													  "리디북스"
													? styles.ridiBooks
													: novel.platform ===
													  "문피아"
													? styles.munpia
													: styles.joara
											}
										>
											<img
												className={
													styles.novel__banner__info__btn__icon
												}
												src={
													novel?.platform ===
													"네이버 시리즈"
														? "./images/naverSeries__icon.png"
														: novel.platform ===
														  "카카오 페이지"
														? "./images/kakaoPage__icon.png"
														: novel.platform ===
														  "리디북스"
														? "./images/ridiBooks__icon.png"
														: novel.platform ===
														  "문피아"
														? "./images/munpia__icon.png"
														: "./images/joara__icon.png"
												}
											/>
											<div
												className={
													styles.novel__banner__info__btn__text
												}
												id={
													novel.platform ===
													"네이버 시리즈"
														? styles.naver__series__text
														: novel.platform ===
														  "카카오 페이지"
														? styles.kakao__page__text
														: novel.platform ===
														  "리디북스"
														? styles.ridiBooks__text
														: novel.platform ===
														  "문피아"
														? styles.munpia__text
														: styles.joara__text
												}
											>
												{novel.platform ===
												"카카오 페이지"
													? "카카오페이지 보러가기"
													: `${novel.platform} 보러가기`}
											</div>
										</button>
									</Link>
								</div>
								<Header normal={false} />
							</div>
						</div>
						<div className={styles.novel__info__wrapper}>
							<div className={styles.novel__cover}>
								<img
									className={styles.novel__cover__img}
									src={novel.coverImg}
									alt="novel__img"
								/>
							</div>
							<div className={styles.novel__contents}>
								<div className={styles.novel__contents__r1}>
									<StarRating
										memberId={memberId}
										contentId={novel.id}
										myRating={myRating}
									/>
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
								</span>
								<span className={styles.novel__comment__count}>
									{comments.length}
								</span>
							</div>

							{comments && (
								<div className={styles.novel__comments}>
									{comments.map((item, index) => {
										return (
											<span
												key={index}
												className={
													styles.novel__comment
												}
											>
												<Comment
													commentProps={{
														writerName:
															item.memberId,
														writerImg:
															"/images/user_white__icon.png",
														commentRating:
															item.starId,
														commentContent:
															item.message,
														commentComment: 9,
														commentLikes:
															item.like_count,
														commentID: item.id,
													}}
												/>
											</span>
										);
									})}
								</div>
							)}
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
									<span>소설 | {novel.genre}</span>
									<span>{novel.serialDay}</span>
									<span>{novel.publishedAt}</span>
									<span>{novel.ageRating}</span>
									<span>{novel.price}</span>
									<span>{novel.writer}</span>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</>
		)
	);
}

export default NovelPage;
