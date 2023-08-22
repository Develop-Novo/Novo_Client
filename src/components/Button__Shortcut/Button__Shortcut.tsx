import styles from "./Button__Shortcut.module.css";

//novel 타입 정의
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
//Button__Shortcut props 타입 정의
interface IButton__Shortcut {
  novel: INovel;
}
function Button__Shortcut({ novel }: IButton__Shortcut) {
  return novel.platform === "카카오 페이지" ? (
    <button className={styles.novel__banner__info__btn} id={styles.kakao__page}>
      <img
        className={styles.novel__banner__info__btn__icon}
        src="../images/kakaoPage__icon.png"
        alt="카카오페이지 아이콘"
      />
      <div
        className={styles.novel__banner__info__btn__text}
        id={styles.kakao__page__text}
      >
        카카오페이지 보러가기
      </div>
    </button>
  ) : novel.platform === "네이버 시리즈" ? (
    <button
      className={styles.novel__banner__info__btn}
      id={styles.naver__series}
    >
      <img
        className={styles.novel__banner__info__btn__icon}
        src="../images/naverSeries__icon.png"
        alt="네이버 시리즈 아이콘"
      />
      <div
        className={styles.novel__banner__info__btn__text}
        id={styles.naver__series__text}
      >
        {novel.platform} 보러가기
      </div>
    </button>
  ) : novel.platform === "리디북스" ? (
    <button className={styles.novel__banner__info__btn} id={styles.ridiBooks}>
      <img
        className={styles.novel__banner__info__btn__icon}
        src="../images/ridiBooks__icon.png"
        alt="리디북스 아이콘"
      />
      <div
        className={styles.novel__banner__info__btn__text}
        id={styles.ridiBooks__text}
      >
        {novel.platform} 보러가기
      </div>
    </button>
  ) : novel.platform === "문피아" ? (
    <button className={styles.novel__banner__info__btn} id={styles.munpia}>
      <img
        className={styles.novel__banner__info__btn__icon}
        src="../images/munpia__icon.png"
        alt="문피아 아이콘"
      />
      <div
        className={styles.novel__banner__info__btn__text}
        id={styles.munpia__text}
      >
        {novel.platform} 보러가기
      </div>
    </button>
  ) : (
    <button className={styles.novel__banner__info__btn} id={styles.joara}>
      <img
        className={styles.novel__banner__info__btn__icon}
        src="../images/joara__icon.png"
        alt="조아라 아이콘" // 대체 텍스트 추가
      />
      <div
        className={styles.novel__banner__info__btn__text}
        id={styles.joara__text}
      >
        {novel.platform} 보러가기
      </div>
    </button>
  );
}

export default Button__Shortcut;
