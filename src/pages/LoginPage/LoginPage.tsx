import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

interface IData {
	email: string;
	password: string;
}

function LoginPage() {
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
				<div className={styles.container}>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onValid)}
					>
						<img
							className={styles.novo__logo}
							src="/images/novo__logo.png"
							alt="novo__logo"
						/>
						<h1 id={styles.form__title}>로그인</h1>
						<input
							className={styles.input}
							id={styles.input__email}
							{...register("email", {
								required: "정확하지 않은 아이디입니다.",
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
						<input
							className={styles.input}
							id={styles.input__password}
							{...register("password", {
								required: "정확하지 않은 비밀번호입니다.",
								minLength: {
									value: 6,
									message:
										"비밀번호는 최소 6자리 이상입니다.",
								},
							})}
							placeholder="비밀번호"
							type="password"
						/>
						{errors?.password && (
							<div
								className={styles.error__message}
								id={styles.error__message__password}
							>
								{errors?.password?.message}
							</div>
						)}
						<button className={styles.button__submit} type="submit">
							<div className={styles.button__submit__text}>
								로그인
							</div>
						</button>
						<Link to={`${process.env.PUBLIC_URL}/register`}>
							<div className={styles.reset__password__link}>
								비밀번호를 잃어버리셨나요?
							</div>
							<div className={styles.register__link}>
								계정이 없으신가요?{" "}
								<span id={styles.register__link__highlight}>
									회원가입
								</span>
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
				</div>
				{/* <div className={styles.cover} />
            <div className={styles.popup}>
                <div className={styles.success__message}>회원가입이 완료되었습니다!</div>
                <div className={styles.popup__hr} />
                <span className={styles.popup__button}>로그인하기</span>
            </div> */}
			</div>
		</>
	);
}

export default LoginPage;
