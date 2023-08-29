import React, { useEffect, useState } from "react";
import styles from "./NovelPage.module.css";
import StarRating from "../../components/StarRating/StarRating";
import StarRatingChart from "../../components/StarRatingChart/StarRatingChart";
import Comment from "../../components/Comment/Comment";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import Button__Shortcut from "../../components/Button/Button__Shortcut/Button__Shortcut";
import Button__Comment from "../../components/Button/Button__Comment/Button__Comment";
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
  memberId: string;
  starId: number;
  message: string;
  like_count: number;
  createdAt: string;
  id: number;
}

interface UserProps {
  id: number;
  name: string;
  profileImg: string;
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
  const [userDatas, setUserDatas] = useState<UserProps[]>([]);
  const [userRatingDatas, setUserRatingDatas] = useState<IRating[]>([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await apiClient.get(`review/contentId/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    getComments().then((res) => {
      setComments(res.data);
      //해당 코멘트 안의 memberID에 대한 api 호출 후 사용자의 이름, 프로필 사진 정보 등 가져옴
      async function fetchUserData() {
        try {
          const userDatasApi = [];
          for (var i = 0; i < res.data.length; i++) {
            const response = await apiClient.get(
              `member/id/${res.data[i].memberId}`
            );
            const userData = {
              id: response.data.data.id,
              name: response.data.data.name,
              profileImg: response.data.data.profileImg,
            };
            userDatasApi.push(userData);
          }
          setUserDatas(userDatasApi);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserData();
      //해당 코멘트 안의 starID에 대한 api 호출 후 별점 정보 등 가져옴
      async function fetchUserRatingData() {
        try {
          const ratingDatasApi = [];
          for (var i = 0; i < res.data.length; i++) {
            const response = await apiClient.get(
              `star/id/${res.data[i].starId}`
            );
            const ratingData = {
              star: response.data.data.star,
              contentId: response.data.data.contentId,
              memberId: response.data.data.memberId,
              id: response.data.data.id,
            };
            ratingDatasApi.push(ratingData);
          }
          setUserRatingDatas(ratingDatasApi);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserRatingData();
    });
  }, []);

  useEffect(() => {
    //해당 id의 novel 정보를 가져옴
    const getNovel = async () => {
      try {
        const response = await apiClient.get(`content/id/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    //////////////////////////////////////////////////////////////
    //전체 별점 데이터를 가져오기//////////////////////////////////
    const getAllRating = async () => {
      try {
        const response = await apiClient.get(`star/contentId/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    //////////////////////////////////////////////////////////////
    //StarRatingChart 구성을 위한 연산/////////////////////////////
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
    //////////////////////////////////////////////////////////////
    //전체 별점 데이터에서 사용자의 별점을 찾기 위한 연산/////////////
    function filterByMemberId(arr: IRating[], memberId: number) {
      return arr.filter((item) => item.memberId === memberId);
    }
    //////////////////////////////////////////////////////////////
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
            <div
              className={styles.novel__banner__wrapper}
              style={{
                backgroundImage: `url(${novel.detailImg})`,
              }}
            >
              <h2 className={styles.blind}>상세페이지 배너</h2>
              <Header normal={false} />
              <div className={styles.novel__banner__info}>
                <div className={styles.novel__banner__info__title}>
                  {novel.title}
                </div>
                <div className={styles.novel__banner__info__genre}>
                  {novel.genre}
                </div>
                <div className={styles.novel__banner__info__introduction}>
                  {novel.introduction}
                </div>
                <Link to={novel.link}>
                  <Button__Shortcut novel={novel} />
                </Link>
              </div>
            </div>

            <section className={styles.novel__info__wrapper}>
              <h2 className={styles.blind}>상세페이지 소설 정보</h2>
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
                  <Button__Comment
                    commentButtonProps={{
                      width: "220px",
                      marginLeft: "72px",
                    }}
                  />
                </div>
                <hr className={styles.novel__contents__hr} />
                <div className={styles.novel__contents__r2}>
                  <StarRatingChart
                    ratings={ratingsArr}
                    rating={novel.rating}
                    count={starRating.count}
                  />
                  <div className={styles.novel__contents__keywords__wrapper}>
                    <h4 className={styles.novel__contents__keywords__title}>
                      작품 키워드
                    </h4>
                    <div className={styles.novel__contents__keywords}>
                      {novel.keyword.map(
                        (keyword) =>
                          keyword !== "" && (
                            <div
                              key={keyword}
                              className={styles.novel__contents__keyword}
                            >
                              <div
                                className={
                                  styles.novel__contents__keyword__text
                                }
                              >
                                {`${keyword}`}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.novel__comment__wrapper}>
              <div className={styles.novel__comment__info}>
                <span className={styles.novel__comment__title}>코멘트</span>
                <span className={styles.novel__comment__count}>
                  {comments.length > 100 ? `100+` : comments.length}
                </span>
                {comments.length >= 5 && (
                  <span className={styles.novel__comment__more}>더보기</span>
                )}
              </div>

              {comments.length === 0 ? (
                <div className={styles.novel__comments__none__wrapper}>
                  <div className={styles.novel__comments__none}>
                    <Comment
                      commentProps={{
                        writerName: "unname",
                        writerImg: "/images/user_white__icon.png",
                        commentRating: 0.0,
                        commentContent: "댓글내용입니다",
                        commentComment: 0,
                        commentLikes: 0,
                        commentID: 0,
                      }}
                    />
                    <Comment
                      commentProps={{
                        writerName: "unname",
                        writerImg: "/images/user_white__icon.png",
                        commentRating: 0.0,
                        commentContent: "댓글내용입니다",
                        commentComment: 0,
                        commentLikes: 0,
                        commentID: 0,
                      }}
                    />
                    <Comment
                      commentProps={{
                        writerName: "unname",
                        writerImg: "/images/user_white__icon.png",
                        commentRating: 0.0,
                        commentContent: "댓글내용입니다",
                        commentComment: 0,
                        commentLikes: 0,
                        commentID: 0,
                      }}
                    />
                    <Comment
                      commentProps={{
                        writerName: "unname",
                        writerImg: "/images/user_white__icon.png",
                        commentRating: 0.0,
                        commentContent: "댓글내용입니다",
                        commentComment: 0,
                        commentLikes: 0,
                        commentID: 0,
                      }}
                    />
                  </div>
                  <div className={styles.novel__comments__none__notice}>
                    <span className={styles.novel__comments__none__text}>
                      첫 코멘트를 작성해주세요!
                    </span>
                    <span className={styles.novel__comments__none__button}>
                      <Button__Comment
                        commentButtonProps={{
                          width: "295px",
                          marginLeft: "10px",
                        }}
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <div className={styles.novel__comments}>
                  {comments.map((item, index) => {
                    return (
                      <span key={index} className={styles.novel__comment}>
                        <Comment
                          commentProps={{
                            writerName:
                              userDatas[index] && userDatas[index].name,
                            writerImg:
                              userDatas[index] &&
                              (userDatas[index].profileImg === null
                                ? "/images/user_white__icon.png"
                                : userDatas[index].profileImg),
                            commentRating:
                              userRatingDatas[index] &&
                              userRatingDatas[index].star,
                            commentContent: item.message,
                            commentComment: 9,
                            commentLikes: item.like_count,
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
              <span className={styles.novel__basic_info__title}>기본정보</span>

              <div className={styles.novel__basic_info}>
                <div className={styles.novel__basic_info__category}>
                  <span>분류</span>
                  <span>연재</span>
                  <span>발행자</span>
                  <span>연령등급</span>
                  <span>전자책 정가</span>
                  <span>글</span>
                </div>
                <div className={styles.novel__basic_info__contents}>
                  <span>소설 | {novel.genre}</span>
                  <span>{novel.serialDay}</span>
                  <span>{novel.publishedAt}</span>
                  <span>{novel.ageRating}</span>
                  <span>{novel.price}</span>
                  <span>{novel.writer}</span>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    )
  );
}

export default NovelPage;
