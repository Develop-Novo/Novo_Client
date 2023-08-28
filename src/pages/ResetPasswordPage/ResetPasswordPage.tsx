import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ResetPasswordPage.module.css";
import { Link } from "react-router-dom";
import Button__Submit from "../../components/Button/Button__Submit/Button__Submit";

interface IData {
  email: string;
}

function ResetPasswordPage() {
  ////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IData>();
  const onValid = (data: IData) => {
    console.log("submit");
  };

  return (
    <>
      <div className={styles.container__wrapper}>
        <section className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(onValid)}>
            <img
              className={styles.novo__logo}
              src="/images/novo__logo.png"
              alt="novo__logo"
            />
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <button className={styles.button__back}>
                <img
                  className={styles.button__back__img}
                  src="/images/arrow_left__icon.png"
                  alt="button__back"
                />
              </button>
            </Link>
            <h2 id={styles.form__title}>비밀번호 재설정</h2>
            <div id={styles.form__text}>
              가입했던 이메일을 적어주세요
              <br />
              입력하신 이메일 주소로 비밀번호 변경 메일을 보낼게요.
            </div>
            <input
              className={styles.input}
              id={styles.input__email}
              {...register("email", {
                required: "정확하지 않은 이메일입니다.",
              })}
              placeholder="이메일"
              type="email"
            />
            {errors?.email && (
              <div
                className={styles.error__message}
                id={styles.error__message__email}
              >
                {errors?.email?.message}
              </div>
            )}
            <Button__Submit text="이메일 보내기" />
          </form>
        </section>
      </div>
    </>
  );
}

export default ResetPasswordPage;
