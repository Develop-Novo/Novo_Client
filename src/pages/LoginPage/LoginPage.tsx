import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button__Submit from "../../components/Button/Button__Submit/Button__Submit";
import Buttons__SocialLogin from "../../components/Button/Buttons__SocialLogin/Buttons__SocialLogin";
import Popup from "../../components/Popup/Popup";
import { apiClient } from "../..";

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
        const response = await apiClient.get(`member/email/${data.email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    };
    const postLogin = async () => {
      try {
        const response = await apiClient.post(
          "member/login",
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

  const closePopup = () => {
    setPopupOpen(false);
    navigate(`${process.env.PUBLIC_URL}/main`);
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
            <Buttons__SocialLogin />
          </form>
        </section>
        {popupOpen && (
          <Popup
            closePopup={closePopup}
            popupMsg={popupMsg}
            onPopupBtn={closePopup}
            btnMsg="닫기"
          />
        )}
      </div>
    </>
  );
}

export default LoginPage;
