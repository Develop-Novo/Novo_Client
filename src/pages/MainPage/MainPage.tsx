import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import BannerButton from "../../components/Button/Button";
import Ranking from "../../components/Ranking/Ranking";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";

const MainPage = () => {
	const [rankingList, setRankingList] = useState([
		{
			rankingTitle: "노보 TOP 10",
			rankingNovels: [
				{
					rankingNum: 1,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/55de80ff-9cc3-403c-aba7-d477f3556c7a",
					novelTitle: "데뷔 못하면 죽는 병 걸림",
					novelRating: "10.0",
				},
				{
					rankingNum: 2,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "템빨",
					novelRating: "9.8",
				},
				{
					rankingNum: 3,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/ee2de63e-2974-4461-8410-2fc86a29fca3",
					novelTitle: "이계 검왕 생존기",
					novelRating: "9.9",
				},
				{
					rankingNum: 4,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "악녀가 사랑할 때",
					novelRating: "10.0",
				},
				{
					rankingNum: 5,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/be359686-128a-4603-96c4-ae1757443dd4",
					novelTitle: "당신의 이해를 돕기 위하여",
					novelRating: "9.6",
				},
				{
					rankingNum: 6,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "데뷔 못하면 죽는 병 걸림",
					novelRating: "10.0",
				},
				{
					rankingNum: 7,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "템빨",
					novelRating: "9.8",
				},
				{
					rankingNum: 8,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/ee2de63e-2974-4461-8410-2fc86a29fca3",
					novelTitle: "이계 검왕 생존기",
					novelRating: "9.9",
				},
				{
					rankingNum: 9,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "악녀가 사랑할 때",
					novelRating: "10.0",
				},
				{
					rankingNum: 10,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/be359686-128a-4603-96c4-ae1757443dd4",
					novelTitle: "당신의 이해를 돕기 위하여",
					novelRating: "9.6",
				},
			],
		},
		{
			rankingTitle: "그 드라마의 원작!",
			rankingNovels: [
				{
					rankingNum: 1,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/8a01e4ba-1070-47c8-939e-bf4091fb6fd5",
					novelTitle: "구르미 그린 달빛",
					novelRating: "9.7",
				},
				{
					rankingNum: 2,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/80595ffa-467d-4881-8b72-68538cf2bbdb",
					novelTitle: "사내맞선",
					novelRating: "9.1",
				},
				{
					rankingNum: 3,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/187a5135-5163-46a8-bce7-966b40831eeb",
					novelTitle: "재벌집 막내 아들",
					novelRating: "8.9",
				},
				{
					rankingNum: 4,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/895b4114-516f-4c1d-92b4-3b10ae5821a1",
					novelTitle: "김비서가 왜 그럴까",
					novelRating: "9.3",
				},
				{
					rankingNum: 5,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/42925edc-4773-4c3e-ac17-b17f57473a30",
					novelTitle: "그래서 나는 안티팬과 결혼했다",
					novelRating: "9.0",
				},
			],
		},
		{
			rankingTitle: "카카오페이지 TOP 10",
			rankingNovels: [
				{
					rankingNum: 1,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/6ab68d65-26a2-4eac-92c0-64adc6128601",
					novelTitle: "던전팜!",
					novelRating: "9.2",
				},
				{
					rankingNum: 2,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/9f2b3586-e262-41cf-9c18-0e8a0c11f30d",
					novelTitle: "독식하는 재벌 3세",
					novelRating: "8.8",
				},
				{
					rankingNum: 3,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/fe459eef-14a6-4257-8e6b-634cad5f816f",
					novelTitle: "아기님 캐시로 로판 달린다",
					novelRating: "9.0",
				},
				{
					rankingNum: 4,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "악역의 딸은 가출을 계획합니다",
					novelRating: "9.3",
				},
				{
					rankingNum: 5,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "의원, 다시 살다",
					novelRating: "9.1",
				},
			],
		},
		{
			rankingTitle: "네이버 시리즈 TOP 10",
			rankingNovels: [
				{
					rankingNum: 1,
					novelTitle: "화산귀환",
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelRating: "9.5",
				},
				{
					rankingNum: 2,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "오프 더 레코드",
					novelRating: "8.0",
				},
				{
					rankingNum: 3,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "게임 속 바바리안으로 살아남기",
					novelRating: "9.9",
				},
				{
					rankingNum: 4,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "미친 검사가 AI를 주웠다",
					novelRating: "8.4",
				},
				{
					rankingNum: 5,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/679dd7fd-d9ce-43cb-9009-11f320b0853e",
					novelTitle: "나 혼자 탑에서 농사",
					novelRating: "9.1",
				},
			],
		},
		{
			rankingTitle: "리디 TOP 10",
			rankingNovels: [
				{
					rankingNum: 1,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "상냥한 원수와의 정략결혼",
					novelRating: "10.0",
				},
				{
					rankingNum: 2,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "상수리 나무 아래",
					novelRating: "9.8",
				},
				{
					rankingNum: 3,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/87211a48-feb5-4122-a06f-326f8a98cbbe",
					novelTitle: "참아주세요, 대공",
					novelRating: "9.9",
				},
				{
					rankingNum: 4,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "흑막 용을 키우게 되었다",
					novelRating: "10.0",
				},
				{
					rankingNum: 5,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "품격을 배반한다",
					novelRating: "9.6",
				},
				{
					rankingNum: 6,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "상냥한 원수와의 정략결혼",
					novelRating: "10.0",
				},
				{
					rankingNum: 7,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "상수리 나무 아래",
					novelRating: "9.8",
				},
				{
					rankingNum: 8,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/87211a48-feb5-4122-a06f-326f8a98cbbe",
					novelTitle: "참아주세요, 대공",
					novelRating: "9.9",
				},
				{
					rankingNum: 9,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "흑막 용을 키우게 되었다",
					novelRating: "10.0",
				},
				{
					rankingNum: 10,
					novelImage:
						"https://github.com/Develop-Novo/Novo_Client/assets/40304565/48d0be83-ddd1-42f0-82f4-2e0dbf1a6675",
					novelTitle: "품격을 배반한다",
					novelRating: "9.6",
				},
			],
		},
	]);

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

	return (
		<>
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

			{rankingList.map((item) => (
				// Each ranking data is passed to the Ranking component
				<Ranking key={item.rankingTitle} rankingProps={item} />
			))}
			<Footer />
		</>
	);
};

export default MainPage;
