import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "./RegisterPage.module.css";

interface IData {
    name: string;
    email: string;
    password: string;
}

function RegisterPage() {
    //regex/////////
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,}$/;
    ////////////////
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IData>();
    const onValid = (data: IData) => {
        console.log(data.password);
        console.log(regex.test(data.password));
        if (!regex.test(data.password)) {
            setError(
                "password", //에러 이름. 기존에 있는 것과 겹칠시 그쪽으로 에러 들어감
                { message: "비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 6자리 이상이어야 합니다." }, //errors에 넣을 에러 메시지
                { shouldFocus: true } //에러 발생시 해당 구간에 포커스하게 하는 설정
            );
        } else {
            console.log("Backend에 전송");
            // fetch('http://localhost:8080/members/add', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         "name": data.name,
            //         "email": data.email,
            //         "password": data.password,
            //     }),
            // }).then(res => {
            //     if(res.ok){
            //         alert("회원가입이 완료되었습니다.");
            //         navigate(`${process.env.PUBLIC_URL}/login`);
            //     }
            // }).catch(error => {
            //     console.log(error);
            // });
        }
    }

    return <>
        <div className={styles.container__wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onValid)}>
                    <h1 id={styles.form__title}>
                        회원가입
                    </h1>
                    <input className={styles.input} id={styles.input__name}
                        {...register("name", { required: "정확하지 않은 이름입니다." })}
                        placeholder="이름"
                        type="text"
                    />
                    {errors?.name && <div className={styles.error__message} id={styles.error__message__name}>{errors?.name?.message}</div>}
                    <input className={styles.input} id={styles.input__email}
                        {...register("email", { required: "정확하지 않은 이메일입니다." })}
                        placeholder="이메일"
                        type="email"
                    />
                    {errors?.email && <div className={styles.error__message} id={styles.error__message__email}>{errors?.email?.message}</div>}
                    <input className={styles.input} id={styles.input__password}
                        {...register("password", { required: "정확하지 않은 비밀번호입니다." })}
                        placeholder="비밀번호"
                        type="password"
                    />
                    {errors?.password && <div className={styles.error__message} id={styles.error__message__password}>{errors?.password?.message}</div>}
                    <button className={styles.button__submit} type="submit">
                        <div className={styles.button__submit__text}>
                            회원가입
                        </div>
                    </button>
                    <div className={styles.login__link}>
                        이미 가입하셨나요? <span id={styles.login__link__highlight}>로그인</span>
                    </div>

                    <hr className={styles.form__hr} />
                    <div className={styles.form__hr__or__text}>OR</div>
                    <div className={styles.logos}>
                        <div className={styles.logo} />
                        <div className={styles.logo} />
                        <div className={styles.logo} />
                        <div className={styles.logo} />
                        <div className={styles.logo} />
                    </div>
                </form>
            </div>
            <div className={styles.cover} />
            <div className={styles.popup}>
                <div className={styles.success__message}>회원가입이 완료되었습니다!</div>
                <div className={styles.popup__hr} />
                <span className={styles.popup__button}>로그인하기</span>
            </div>
        </div>
    </>
}

export default RegisterPage;
