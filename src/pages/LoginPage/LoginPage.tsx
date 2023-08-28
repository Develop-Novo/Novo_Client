import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button__Submit from "../../components/Button/Button__Submit/Button__Submit";

interface IData {
  email: string;
  password: string;
}

function LoginPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const navigate = useNavigate();
  ////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IData>({ mode: "onChange" });

  const onValid = (data: IData) => {
    //console.log("Backend에 전송");
    const getMemberByEmail = async () => {
      try {
        const response = await axios.get(
          `http://52.78.121.235:8080/member/email/${data.email}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    };
    const postLogin = async () => {
      try {
        const response = await axios.post(
          "http://52.78.121.235:8080/member/login",
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response;
      } catch (error) {
        setPopupMsg("비밀번호가 일치하지 않습니다.");
        console.log(error);
      }
    };

    postLogin().then((res) => {
      getMemberByEmail().then((res__member) => {
        localStorage.setItem("memberId", res__member.id);
        setPopupMsg("로그인이 완료되었습니다!");
        setPopupOpen(true);
      });
    });
  };

  const closePopUp = () => {
    setPopupOpen(false);
    navigate("/main");
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
            <h2 id={styles.form__title}>로그인</h2>
            <div
              className={styles.input__wrapper}
              id={styles.input__wrapper__email}
            >
              <input
                className={styles.input}
                {...register("email", {
                  required: "정확하지 않은 아이디입니다.",
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
                {...register("password", {
                  required: "정확하지 않은 비밀번호입니다.",
                  minLength: {
                    value: 6,
                    message: "비밀번호는 최소 6자리 이상입니다.",
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
            <Button__Submit text="로그인" />
            <Link to={`${process.env.PUBLIC_URL}/resetpassword`}>
              <div className={styles.reset__password__link}>
                비밀번호를 잃어버리셨나요?
              </div>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/register`}>
              <div className={styles.register__link}>
                계정이 없으신가요?{" "}
                <span id={styles.register__link__highlight}>회원가입</span>
              </div>
            </Link>
            <hr className={styles.form__hr} />
            <div className={styles.form__hr__or__text}>OR</div>
            <div className={styles.logos}>
              <img
                className={styles.logo}
                src="/images/naver__icon.png"
                alt="naver__icon"
              />
              <img
                className={styles.logo}
                src="/images/kakao__icon.png"
                alt="kakao__icon"
              />
              <img
                className={styles.logo}
                src="/images/google__icon.png"
                alt="google__icon"
              />
              <img
                className={styles.logo}
                src="/images/twitter__icon.png"
                alt="twitter__icon"
              />
              <img
                className={styles.logo}
                src="/images/apple__icon.png"
                alt="apple__icon"
              />
            </div>
          </form>
        </section>
        {popupOpen && (
          <>
            <div className={styles.cover} onClick={closePopUp} />
            <div className={styles.popup}>
              <div className={styles.success__message}>{popupMsg}</div>
              <div className={styles.popup__hr} />
              <span className={styles.popup__button} onClick={closePopUp}>
                닫기
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;
