import React, { useEffect, useState } from "react";
import styles from "./NovelPage.module.css";
import StarRating from "../../components/StarRating/StarRating";
import StarRatingChart from "../../components/StarRatingChart/StarRatingChart";
import axios from "axios";

interface INovel{
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
function NovelPage() {
    const [novel, setNovel] = useState<INovel | null>(null);
    const [rating, setRating] = useState<any>(null);
    const [clickedItem, setClickedItem] = useState<number | null>(null);

    useEffect(()=>{
        const getNovel = async () => {
			try {
				const response = await axios.get('http://35.216.73.185:8080/content/id/1', {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				return response.data;
			} catch (error) {
				console.log(error);
			}
		};
        // const getRating = async () => {
		// 	try {
		// 		const response = await axios.get('http://35.216.73.185:8080/star/id/1', {
		// 			headers: {
		// 				'Content-Type': 'application/json'
		// 			}
		// 		})
		// 		return response.data;
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };

        getNovel().then((res) => {
            setNovel(res.data);
        });
        // getRating().then((res)=>{
        //     console.log(res);
        // })
    },[]);

    return (novel && <>
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
                            <StarRating rating={clickedItem} />
                            <div className={styles.novel__contents__rating}>
                                ★ {novel.rating}
                            </div>
                            <button className={styles.novel__contents__button__comment}>
                                <div className={styles.novel__contents__button__comment__text}>
                                    코멘트 남기기
                                </div>
                            </button>
                        </div>
                        <hr className={styles.novel__contents__hr} />
                        <div className={styles.novel__contents__r2}>
                            <StarRatingChart ratings={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                            <div className={styles.novel__contents__keywords__wrapper}>
                                <div className={styles.novel__contents__keywords__title}>
                                    작품 키워드
                                </div>
                                <div className={styles.novel__contents__keywords}>
                                    {novel.keyword.map((keyword) => <div key={keyword} className={styles.novel__contents__keyword}>
                                        <div className={styles.novel__contents__keyword__text}>
                                            {`${keyword}`}
                                        </div>
                                    </div>)}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default NovelPage;