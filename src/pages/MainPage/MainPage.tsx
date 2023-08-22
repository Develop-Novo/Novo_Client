import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import Ranking from "../../components/Ranking/Ranking";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import axios from "axios";

interface NovelInfo {
	rankingNum: number;
	novelImage: string;
	novelTitle: string;
	novelRating: number;
}
interface BannerInfo {
	bannerImage: string;
	bannerTitle: string;
	bannerSubtitle: string;
	bannerKeyword: string;
}

const MainPage = () => {
	//랭킹 작품 api연결
	const [novoNovels, setNovoNovels] = useState<NovelInfo[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const novels = [];
				var rankingNum = 1;
				for (var contentId = 7; contentId <= 16; contentId++) {
					const response = await axios.get(
						`http://52.78.121.235:8080/content/id/${contentId}`
					);

					const rankingData = {
						novelTitle: response.data.data.title,
						novelRating: response.data.data.rating.toFixed(1),
						rankingNum: rankingNum,
						novelImage: response.data.data.coverImg,
					};

					novels.push(rankingData);
					rankingNum++;
				}
				setNovoNovels(novels);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);
	console.log(novoNovels);
	//배너 작품 api연결
	const [bannerList, setBannerList] = useState<BannerInfo[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const banners = [];

				for (var contentId = 1; contentId < 4; contentId++) {
					const response = await axios.get(
						`http://52.78.121.235:8080/content/id/${contentId}`
					);

					const bannerData = {
						bannerImage: response.data.data.detailImg,
						bannerTitle: response.data.data.title,
						bannerSubtitle: response.data.data.title,
						bannerKeyword: "NEW",
					};

					banners.push(bannerData);
				}
				setBannerList(banners);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	//배너 슬라이드 구현
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleNextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerList.length);
	};

	const handlePreviousSlide = () => {
		setCurrentSlide(
			(prevSlide) =>
				(prevSlide - 1 + bannerList.length) % bannerList.length
		);
	};

	useEffect(() => {
		const slideListElement = document.getElementById(styles.slideList);
		if (slideListElement != null) {
			slideListElement.style.transition = "transform 0.3s ease-in-out";
			slideListElement.style.transform = `translateX(-${
				currentSlide * 100
			}%)`;

			const handleTransitionEnd = () => {
				slideListElement.style.transition = "";
			};
			slideListElement.addEventListener(
				"transitionend",
				handleTransitionEnd
			);

			return () => {
				slideListElement.removeEventListener(
					"transitionend",
					handleTransitionEnd
				);
			};
		}
	}, [currentSlide]);

	const rankingList = [
		{
			rankingTitle: "노보 TOP 10",
			rankingNovels: novoNovels,
		},
		{
			rankingTitle: "그 드라마의 원작!",
			rankingNovels: novoNovels,
		},
		{
			rankingTitle: "카카오페이지 TOP 10",
			rankingNovels: novoNovels,
		},
		{
			rankingTitle: "네이버 시리즈 TOP 10",
			rankingNovels: novoNovels,
		},
		{
			rankingTitle: "리디 TOP 10",
			rankingNovels: novoNovels,
		},
	];
	console.log("rankingList:", rankingList);

	return (
		novoNovels && (
			<>
				<Header normal={true} />

				<div id={styles.banner_container}>
					<Button
						buttonType="left"
						buttonTop="382px"
						buttonLeft="201px"
						onClick={handlePreviousSlide}
					/>
					<div id={styles.slideList}>
						{bannerList.map((item, index) => (
							<span key={index} className={styles.banner}>
								<Banner bannerProps={item} />
							</span>
						))}
					</div>
					<Button
						buttonType="right"
						buttonTop="382px"
						buttonLeft="1683px"
						onClick={handleNextSlide}
					/>
				</div>
				<span className={styles.showSlideNum}>
					{currentSlide + 1} / {bannerList.length}
				</span>

				{rankingList.map((item, index) => (
					<Ranking key={index} rankingProps={item} />
				))}
				<Footer />
			</>
		)
	);
};

export default MainPage;
