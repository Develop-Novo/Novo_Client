import { useEffect, useState } from "react";
import styles from "./StarRatingChart.module.css";

interface barProps {
  barHeight: string;
  highlight: boolean;
}
function Bar({ barHeight, highlight }: barProps) {
  const barStyle: React.CSSProperties = {
    height: barHeight,
    background: highlight
      ? "#FF6B01 0% 0% no-repeat padding-box"
      : "#FFAD76 0% 0% no-repeat padding-box",
  };
  return (
    <>
      <div className={styles.chart__bar} style={barStyle} />
    </>
  );
}

interface StarRatingChartProps {
  ratings: number[];
  rating: number;
  count: number;
}
function StarRatingChart({ ratings, rating, count }: StarRatingChartProps) {
  const [total, setTotal] = useState<number>(0);
  const [maxIdx, setMaxIdx] = useState<number | null>(null);
  useEffect(() => {
    function sumArray(arr: number[]) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    }
    function getMaxIndex(arr: number[]) {
      let max = arr[0];
      let maxIndex = 0;

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
          maxIndex = i;
        }
      }

      return maxIndex;
    }
    setTotal(sumArray(ratings));
    setMaxIdx(getMaxIndex(ratings));
  }, []);

  return (
    <>
      <div className={styles.chart__wrapper}>
        <div className={styles.chart__title}>별점그래프</div>
        <div className={styles.chart__rating__wrapper}>
          <div id={styles.chart__rating__avg}>평균 ★{rating.toFixed(1)}</div>
          <div id={styles.chart__rating__cnt}>({count}명)</div>
        </div>
        <div className={styles.chart}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
            i !== 10 ? (
              <div key={i} className={styles.chart__bar__wrapper}>
                <div className={styles.chart__bar__inner__wrapper}>
                  <Bar
                    highlight={maxIdx ? i === maxIdx + 1 : false}
                    barHeight={`${(ratings[i - 1] / total) * 312}px`}
                  />
                </div>
                <div className={styles.chart__xlabel}>
                  <p className={styles.chart__xlabel__text}>{`${i}`}</p>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className={styles.chart__bar__wrapper}
                id={styles.chart__bar__wrapper__last}
              >
                <div className={styles.chart__bar__inner__wrapper}>
                  <Bar
                    highlight={maxIdx ? i === maxIdx + 1 : false}
                    barHeight={`${(ratings[i - 1] / total) * 312}px`}
                  />
                </div>
                <div className={styles.chart__xlabel}>
                  <p className={styles.chart__xlabel__text}>{`${i}`}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default StarRatingChart;
