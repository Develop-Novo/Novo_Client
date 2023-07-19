import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

function Header() {
	return (
		<div id={styles.header_container}>
			<span id={styles.logo_container}>
				<img src="../images/novo__logo.png" className={styles.logo} />
			</span>
			<span className={styles.search}>
				<img
					src="../images/search__icon.png"
					className={styles.search_icon}
				/>
				<input type="text" className={styles.search_input} />
			</span>
			<span className={styles.icons}>
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
			</span>
		</div>
	);
}
export default Header;
