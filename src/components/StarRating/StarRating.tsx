import { useState } from "react";
import styles from "./StarRating.module.css";
import axios from "axios";

// StarRating 컴포넌트의 props 타입 정의
interface IRating {
  star: number;
  contentId: number;
  memberId: number;
  id: number;
}
interface StarRatingProps {
  novelId: number;
  myRating: IRating | null;
}

function StarRating({ myRating }: StarRatingProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [clickedItem, setClickedItem] = useState<number | null>(
    myRating ? myRating.star : 0
  );
  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (itemId: number) => {
    const postNewStar = async (star: number) => {
      try {
        const response = await axios.post(
          "http://52.78.121.235:8080/star/new",
          {
            memberId: 152,
            contentId: 1,
            star: star,
          },
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
    const modifyStar = async (star: number, starId: number) => {
      try {
        const response = await axios.put(
          `http://52.78.121.235:8080/star/id/${starId}`,
          {
            memberId: 152,
            contentId: 1,
            star: star,
          },
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
    setClickedItem(itemId);
    if (myRating) {
      modifyStar(itemId, myRating.id);
    } else {
      postNewStar(itemId);
    }
  };

  //console.log(hoveredItem, clickedItem);

  return (
    <div className={styles.star__container}>
      <div className={styles.stars__wrapper}>
        {[0, 2, 4, 6, 8].map((i) => (
          <div key={i}>
            <div className={styles.star__wrapper}>
              <div className={styles.star__inner__wrapper}>
                {(hoveredItem && i + 1 <= hoveredItem) ||
                (clickedItem && i + 1 <= clickedItem) ? (
                  <>
                    <div
                      className={`${styles.star} ${styles.star__left}`}
                      id={styles.star__clicked}
                      onMouseEnter={() => handleMouseEnter(i + 1)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i + 1)}
                    >
                      ★
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${styles.star} ${styles.star__left}`}
                      id={styles.star__nonClicked}
                      onMouseEnter={() => handleMouseEnter(i + 1)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i + 1)}
                    >
                      ★
                    </div>
                  </>
                )}
              </div>
              <div className={styles.star__inner__wrapper}>
                {(hoveredItem && i + 2 <= hoveredItem) ||
                (clickedItem && i + 2 <= clickedItem) ? (
                  <>
                    <div
                      className={`${styles.star} ${styles.star__right}`}
                      id={styles.star__clicked}
                      onMouseEnter={() => handleMouseEnter(i + 2)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i + 2)}
                    >
                      ★
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${styles.star} ${styles.star__right}`}
                      id={styles.star__nonClicked}
                      onMouseEnter={() => handleMouseEnter(i + 2)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(i + 2)}
                    >
                      ★
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.star__message__wrapper}>
        {!clickedItem
          ? "평가하기"
          : clickedItem === 10
          ? "최고예요!"
          : clickedItem === 9
          ? "훌륭해요!"
          : clickedItem === 8
          ? "재미있어요"
          : clickedItem === 7
          ? "볼만해요"
          : clickedItem === 6
          ? "보통이에요"
          : clickedItem === 5
          ? "부족해요"
          : clickedItem === 4
          ? "별로예요"
          : clickedItem === 3
          ? "재미없어요"
          : clickedItem === 2
          ? "싫어요"
          : "최악이에요"}
      </div>
      <div className={styles.rating}>★ {clickedItem}</div>
    </div>
  );
}

export default StarRating;
