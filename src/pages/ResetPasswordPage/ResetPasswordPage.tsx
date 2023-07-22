import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "./ResetPasswordPage.module.css";

interface IData {
    email: string;
}

function ResetPasswordPage() {
    ////////////////
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IData>();
    const onValid = (data: IData) => {
        console.log("submit");
    }

    return <>
        <div className={styles.container__wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onValid)}>
                    <img className={styles.novo__logo} src="/images/novo__logo.png" alt="novo__logo" />
                    <h1 id={styles.form__title}>
                        비밀번호 재설정
                    </h1>
                    <div id={styles.form__text}>
                        가입했던 이메일을 적어주세요<br />
                        입력하신 이메일 주소로 비밀번호 변경 메일을 보낼게요.
                    </div>
                    <input className={styles.input} id={styles.input__email}
                        {...register("email", { required: "정확하지 않은 아이디입니다." })}
                        placeholder="이메일"
                        type="email"
                    />
                    {errors?.email && <div className={styles.error__message} id={styles.error__message__email}>{errors?.email?.message}</div>}
                    <button className={styles.button__submit} type="submit">
                        <div className={styles.button__submit__text}>
                            이메일 보내기
                        </div>
                    </button>
                </form>
            </div>
            {/* <div className={styles.cover} />
            <div className={styles.popup}>
                <div className={styles.success__message}>회원가입이 완료되었습니다!</div>
                <div className={styles.popup__hr} />
                <span className={styles.popup__button}>로그인하기</span>
            </div> */}
        </div>
    </>
}

export default ResetPasswordPage;
