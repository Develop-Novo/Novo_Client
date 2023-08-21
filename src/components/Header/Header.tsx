import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

interface IHeader {
	normal: boolean;
}
function Header({ normal }: IHeader) {
	return (
		<div
			id={
				normal
					? styles.header_container
					: styles.header__container__transparent
			}
		>
			<span id={styles.logo_container}>
				<a href="/main">
					{normal ? (
						<img
							src="../images/novo__logo.png"
							className={styles.logo}
						/>
					) : (
						<img
							src="../images/novo__logo__white.png"
							className={styles.logo}
						/>
					)}
				</a>
			</span>
			<span
				className={normal ? styles.search : styles.search__transparent}
			>
				<img
					src="../images/search__icon.png"
					className={styles.search_icon}
				/>
				<input
					type="text"
					className={
						normal
							? styles.search_input
							: styles.search_input__transparent
					}
				/>
			</span>
			<span className={styles.icons}>
				{normal ? (
					<>
						<img
							src="../images/books_orange__icon.png"
							className={styles.top_icon}
						/>
						<img
							src="../images/bell_orange__icon.png"
							className={styles.top_icon}
						/>
						<img
							src="../images/user_orange__icon.png"
							className={styles.top_icon}
						/>
					</>
				) : (
					<>
						<img
							src="../images/books_white__icon.png"
							className={styles.top_icon}
						/>
						<img
							src="../images/bell_white__icon.png"
							className={styles.top_icon}
						/>
						<img
							src="../images/user_white__icon.png"
							className={styles.top_icon}
						/>
					</>
				)}
			</span>
		</div>
	);
}
export default Header;
