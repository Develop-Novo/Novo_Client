import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import BannerButton from "../../components/Button/Button";
import Ranking from "../../components/Ranking/Ranking";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import axios from "axios";

//서영수정/////////////////////////////////
interface NovelInfo {
	rankingNum: number;
	novelImage: string;
	novelTitle: string;
	novelRating: number;
}
//////////////////////////////////////////
const MainPage = () => {
	//서영수정/////////////////////////////////
	//빈 배열일 때 문제가 발생하는 것 같아서 수정했습니다..!
	const [novoNovels, setNovoNovels] = useState<NovelInfo[]>([]);
	//////////////////////////////////////////
	useEffect(() => {
		async function fetchData() {
			try {
				const novels = [];

				const response = await axios.get(
					`http://35.216.73.185:8080/content/id/1`
				);

				const rankingData = {
					novelTitle: response.data.data.title,
					novelRating: response.data.data.rating,
					rankingNum: response.data.data.id,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/0a7532ab-ce13-4405-8a90-16a87ed02756",
				};

				novels.push(rankingData);
				
				setNovoNovels(novels);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	console.log(novoNovels);

	const [bannerList, setBannerList] = useState([
		{
			bannerImage:
				"https://github.com/Develop-Novo/Novo_Client/assets/40304565/0a7532ab-ce13-4405-8a90-16a87ed02756",
			bannerTitle: "더는 당신의 악녀로 살지 않겠습니다",
			bannerSubtitle:
				"괴물이라 손가락질 받았으니 진짜 괴물이 되어주겠어.",
		},
		{
			bannerImage:
				"https://github.com/Develop-Novo/Novo_Client/assets/40304565/203a6943-f890-4da1-897b-abdb1889f387",
			bannerTitle: "데뷔 못하면 죽는 병 걸림",
			bannerSubtitle: "데뷔 못하면 죽는 병 걸림 진짜로",
		},
		{
			bannerImage:
				"https://github.com/Develop-Novo/Novo_Client/assets/40304565/b40b23d1-04f6-43f8-b2b6-ce8c2968c9d4",
			bannerTitle: "던전팜!",
			bannerSubtitle: "던전던전팜팜22",
		},
	]);
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
		// Apply transition style to the slideList element
		const slideListElement = document.getElementById(styles.slideList);
		if (slideListElement != null) {
			slideListElement.style.transition = "transform 0.3s ease-in-out";
			slideListElement.style.transform = `translateX(-${
				currentSlide * 100
			}%)`;

			// Clean up the transition style after the animation is finished
			const handleTransitionEnd = () => {
				slideListElement.style.transition = "";
			};
			slideListElement.addEventListener(
				"transitionend",
				handleTransitionEnd
			);

			return () => {
				// Clean up the event listener
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
		novoNovels && <>
			<Header />

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
				<Ranking key={index} rankingProps={item} /> //여기에서 props넘겨줄 때 타입이 안맞아서 계속 오류가 나요ㅠㅠ 일단 console.log로 테스트 데이터 확인해보시라구 주석처리 해놨습니당!
			))}
			<Footer />
		</>
	);
};

export default MainPage;
