import { useState } from "react";
import styles from "./StarRating.module.css";

// StarRating 컴포넌트의 props 타입 정의
interface StarRatingProps {
	rating: number|null;
}

function StarRating({rating}:StarRatingProps){
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [clickedItem, setClickedItem] = useState<number | null>(rating);
    const handleMouseEnter = (itemId: number) => {
        setHoveredItem(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleClick = (itemId: number) => {
        setClickedItem(itemId);
    }

    console.log(hoveredItem, clickedItem);

    return (<div className={styles.star__container}>
        <div className={styles.stars__wrapper}>
            {[0, 2, 4, 6, 8].map((i) => <div key={i}>
                <div className={styles.star__wrapper}>
                    <div className={styles.star__inner__wrapper}>
                        {(hoveredItem && i + 1 <= hoveredItem) || (clickedItem && i + 1 <= clickedItem) ? <>
                            <div className={`${styles.star} ${styles.star__left}`} id={styles.star__clicked}
                                onMouseEnter={() => handleMouseEnter(i + 1)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(i + 1)}
                            >
                                ★
                            </div></> : <>
                            <div className={`${styles.star} ${styles.star__left}`} id={styles.star__nonClicked}
                                onMouseEnter={() => handleMouseEnter(i + 1)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(i + 1)}
                            >
                                ★
                            </div></>
                        }
                    </div>
                    <div className={styles.star__inner__wrapper}>
                        {(hoveredItem && i + 2 <= hoveredItem) || (clickedItem && i + 2 <= clickedItem) ? <>
                            <div className={`${styles.star} ${styles.star__right}`} id={styles.star__clicked}
                                onMouseEnter={() => handleMouseEnter(i + 2)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(i + 2)}
                            >
                                ★
                            </div></> : <>
                            <div className={`${styles.star} ${styles.star__right}`} id={styles.star__nonClicked}
                                onMouseEnter={() => handleMouseEnter(i + 2)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(i + 2)}
                            >
                                ★
                            </div></>
                        }
                    </div>
                </div></div>)}
        </div>
        <div className={styles.star__message__wrapper}>
            {!clickedItem ? "평가하기" :
            clickedItem == 10 ? "최고예요!":
            clickedItem == 9 ? "훌륭해요!":
            clickedItem == 8 ? "재미있어요":
            clickedItem == 7 ? "볼만해요":
            clickedItem == 6 ? "보통이에요":
            clickedItem == 5 ? "부족해요":
            clickedItem == 4 ? "별로예요":
            clickedItem == 3 ? "재미없어요":
            clickedItem == 2 ? "싫어요":
            "최악이에요"}
        </div>
    </div>);
}

export default StarRating;