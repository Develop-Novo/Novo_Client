import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import Ranking from "../../components/Ranking/Ranking";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button__arrow/Button__arrow";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiClient } from "../..";

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
interface NovelInfo {
  novelID: number;
  rankingNum: number;
  novelImage: string;
  novelTitle: string;
  novelRating: number;
}
interface BannerInfo {
  novelID: number;
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerKeyword: string;
}
const MainPage = () => {
  const [novoNovels, setNovoNovels] = useState<NovelInfo[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const novels = [];
        var rankingNum = 1;
        for (var contentId = 1; contentId <= 5; contentId++) {
          const response = await apiClient.get(`content/id/${contentId}`);
          const rankingData = {
            novelID: response.data.data.id,
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
  //배너 작품 api연결
  const [bannerList, setBannerList] = useState<BannerInfo[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const banners = [];
        for (var contentId = 1; contentId < 4; contentId++) {
          const response = await apiClient.get(`content/id/${contentId}`);
          const bannerData = {
            novelID: response.data.data.id,
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
      (prevSlide) => (prevSlide - 1 + bannerList.length) % bannerList.length
    );
  };
  useEffect(() => {
    const slideListElement = document.getElementById(styles.slideList);
    if (slideListElement != null) {
      slideListElement.style.transition = "transform 0.3s ease-in-out";
      slideListElement.style.transform = `translateX(-${currentSlide * 100}%)`;
      const handleTransitionEnd = () => {
        slideListElement.style.transition = "";
      };
      slideListElement.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        slideListElement.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      };
    }
  }, [currentSlide]);
  //플랫폼별 작품 조회/////////////////////////////////////////////////////
  //카카오, 네이버, 리디북스, 문피아, 조아라////////////////////////////////
  const [kakaoNovels, setKakaoNovels] = useState<NovelInfo[]>([]);
  const [naverNovels, setNaverNovels] = useState<NovelInfo[]>([]);
  const [ridiNovels, setRidiNovels] = useState<NovelInfo[]>([]);
  const [munpiaNovels, setMunpiaNovels] = useState<NovelInfo[]>([]);
  const [joaraNovels, setJoaraNovels] = useState<NovelInfo[]>([]);
  useEffect(() => {
    const getKakaoNovels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get(
          "content/platform/all?platform=kakao"
        );
        for (let idx = 0; idx < response.data.count; idx++) {
          const rankingData = {
            novelID: response.data.data[idx].id,
            novelTitle: response.data.data[idx].title,
            novelRating: response.data.data[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: response.data.data[idx].coverImg,
          };
          novels.push(rankingData);
          rankingNum++;
        }
        setKakaoNovels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    const getNaverNovels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get(
          "content/platform/all?platform=naver"
        );
        for (let idx = 0; idx < response.data.count; idx++) {
          const rankingData = {
            novelID: response.data.data[idx].id,
            novelTitle: response.data.data[idx].title,
            novelRating: response.data.data[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: response.data.data[idx].coverImg,
          };
          novels.push(rankingData);
          rankingNum++;
        }
        setNaverNovels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    const getRidiNovels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get(
          "content/platform/all?platform=ridi"
        );
        for (let idx = 0; idx < response.data.count; idx++) {
          const rankingData = {
            novelID: response.data.data[idx].id,
            novelTitle: response.data.data[idx].title,
            novelRating: response.data.data[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: response.data.data[idx].coverImg,
          };
          novels.push(rankingData);
          rankingNum++;
        }
        setRidiNovels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    const getMunpiaNovels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get(
          "content/platform/all?platform=munpia"
        );
        for (let idx = 0; idx < response.data.count; idx++) {
          const rankingData = {
            novelID: response.data.data[idx].id,
            novelTitle: response.data.data[idx].title,
            novelRating: response.data.data[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: response.data.data[idx].coverImg,
          };
          novels.push(rankingData);
          rankingNum++;
        }
        setMunpiaNovels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    const getJoaraNovels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get(
          "content/platform/all?platform=joara"
        );
        for (let idx = 0; idx < response.data.count; idx++) {
          const rankingData = {
            novelID: response.data.data[idx].id,
            novelTitle: response.data.data[idx].title,
            novelRating: response.data.data[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: response.data.data[idx].coverImg,
          };
          novels.push(rankingData);
          rankingNum++;
        }
        setJoaraNovels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    getKakaoNovels();
    getNaverNovels();
    getRidiNovels();
    getMunpiaNovels();
    getMunpiaNovels();
    getJoaraNovels();
  }, []);
  //플랫폼별 작품 조회 끝/////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //Novo Top 10/////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  const [top10Novels, setTop10Novels] = useState<NovelInfo[]>([]);

  useEffect(() => {
    const getTop10Novels = async () => {
      const novels = [];
      var rankingNum = 1;
      try {
        const response = await apiClient.get("content/all");
        // rating을 기준으로 내림차순으로 정렬
        const data = response.data.data.sort(
          (a: INovel, b: INovel) => b.rating - a.rating
        );
        const top10 = response.data.count >= 10 ? data.slice(0, 10) : data;

        for (let idx = 0; idx < top10.length; idx++) {
          const rankingData = {
            novelID: top10[idx].id,
            novelTitle: top10[idx].title,
            novelRating: top10[idx].rating.toFixed(1),
            rankingNum: rankingNum,
            novelImage: top10[idx].coverImg,
          };

          novels.push(rankingData);
          rankingNum++;
        }

        setTop10Novels(novels);
      } catch (error) {
        console.log(error);
      }
    };
    getTop10Novels();
  }, []);
  //Novo Top 10 조회 끝/////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const rankingList = [
    {
      rankingTitle: "노보 TOP 10",
      rankingNovels: top10Novels,
    },
    {
      rankingTitle: "그 드라마의 원작!",
      rankingNovels: novoNovels,
    },
    {
      rankingTitle: "카카오페이지 BEST",
      rankingNovels: kakaoNovels,
    },
    {
      rankingTitle: "네이버 시리즈 BEST",
      rankingNovels: naverNovels,
    },
    {
      rankingTitle: "리디 BEST",
      rankingNovels: ridiNovels,
    },
    {
      rankingTitle: "문피아 BEST",
      rankingNovels: munpiaNovels,
    },
    {
      rankingTitle: "조아라 BEST",
      rankingNovels: joaraNovels,
    },
  ];
  return (
    novoNovels && (
      <div className={styles.container__wrapper}>
        <div className={styles.container}>
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
                <Link to={`/novel/${item.novelID}`}>
                  <span key={index} className={styles.banner}>
                    <Banner bannerProps={item} />
                  </span>
                </Link>
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
        </div>
      </div>
    )
  );
};
export default MainPage;
