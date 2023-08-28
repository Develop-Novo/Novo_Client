import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button__Submit from "../../components/Button/Button__Submit/Button__Submit";
import Buttons__SocialLogin from "../../components/Button/Buttons__SocialLogin/Buttons__SocialLogin";

interface IData {
  name: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  //nativgate/////
  const navigate = useNavigate();
  //regex/////////
  const regex = /^(?=.*[A-Za-z])(?=.*\d|.*[\W_]).{6,}$/;
  ////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IData>({ mode: "onChange" });
  const onValid = (data: IData) => {
    console.log(data.password);
    console.log(regex.test(data.password));
    //console.log("Backend에 전송");
    const postMember = async () => {
      try {
        const response = await axios.post(
          "http://52.78.121.235:8080/member/new",
          {
            name: data.name,
            email: data.email,
            password: data.password,
            authority: "ROLE_USER",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    postMember();
    setPopupOpen(true);
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
            <h2 id={styles.form__title}>회원가입</h2>
            <div
              className={styles.input__wrapper}
              id={styles.input__wrapper__name}
            >
              <input
                className={styles.input}
                {...register("name", { required: "정확하지 않은 이름입니다." })}
                placeholder="이름"
                type="text"
              />
              {errors?.name ? (
                <div className={styles.input__error}>☒</div>
              ) : watch("name") && watch("name")?.length !== 0 ? (
                <div className={styles.input__valid}>☑</div>
              ) : null}
            </div>
            {errors?.name && (
              <div
                className={styles.error__message}
                id={styles.error__message__name}
              >
                {errors?.name?.message}
              </div>
            )}

            <div
              className={styles.input__wrapper}
              id={styles.input__wrapper__email}
            >
              <input
                className={styles.input}
                id={styles.input__email}
                {...register("email", {
                  required: "정확하지 않은 이메일입니다.",
                })}
                placeholder="이메일"
                type="email"
              />
              {errors?.email ? (
                <div className={styles.input__error}>☒</div>
              ) : watch("email") && watch("email")?.length !== 0 ? (
                <div className={styles.input__valid}>☑</div>
              ) : null}
            </div>
            {errors?.email && (
              <div
                className={styles.error__message}
                id={styles.error__message__email}
              >
                {errors?.email?.message}
              </div>
            )}

            <div
              className={styles.input__wrapper}
              id={styles.input__wrapper__password}
            >
              <input
                className={styles.input}
                id={styles.input__password}
                {...register("password", {
                  required: "정확하지 않은 비밀번호입니다.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d|.*[\W_]).{6,}$/,
                    message:
                      "비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 6자리 이상이어야 합니다.",
                  },
                })}
                placeholder="비밀번호"
                type="password"
              />
              {errors?.password ? (
                <div className={styles.input__error}>☒</div>
              ) : watch("password") && watch("password")?.length !== 0 ? (
                <div className={styles.input__valid}>☑</div>
              ) : null}
            </div>
            {errors?.password && (
              <div
                className={styles.error__message}
                id={styles.error__message__password}
              >
                {errors?.password?.message}
              </div>
            )}
            <Button__Submit text="회원가입" />
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <div className={styles.login__link}>
                이미 가입하셨나요?{" "}
                <span id={styles.login__link__highlight}>로그인</span>
              </div>
            </Link>
            <Buttons__SocialLogin />
          </form>
          {popupOpen && (
            <>
              <div
                className={styles.cover}
                onClick={() => setPopupOpen(false)}
              />
              <div className={styles.popup__wrapper}>
                <div className={styles.popup}>
                  <div className={styles.success__message}>
                    회원가입이 완료되었습니다!
                  </div>
                  <div className={styles.popup__hr} />
                  <span className={styles.popup__button}>
                    <Link to={`${process.env.PUBLIC_URL}/`}>로그인하기</Link>
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default RegisterPage;
