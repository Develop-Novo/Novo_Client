import styles from "./Buttons__SocialLogin.module.css";

function Buttons__SocialLogin() {
  return (
    <>
      <hr className={styles.form__hr} />
      <div className={styles.form__hr__or__text}>OR</div>
      <div className={styles.logos}>
        <button className={styles.logo__button}>
          <img
            className={styles.logo}
            src="/images/naver__icon.png"
            alt="naver__icon"
          />
        </button>
        <button className={styles.logo__button}>
          <img
            className={styles.logo}
            src="/images/kakao__icon.png"
            alt="kakao__icon"
          />
        </button>
        <button className={styles.logo__button}>
          <img
            className={styles.logo}
            src="/images/google__icon.png"
            alt="google__icon"
          />
        </button>
        <button className={styles.logo__button}>
          <img
            className={styles.logo}
            src="/images/twitter__icon.png"
            alt="twitter__icon"
          />
        </button>
        <button className={styles.logo__button}>
          <img
            className={styles.logo}
            src="/images/apple__icon.png"
            alt="apple__icon"
          />
        </button>
      </div>
    </>
  );
}

export default Buttons__SocialLogin;
