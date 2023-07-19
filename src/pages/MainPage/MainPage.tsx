import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import BannerButton from "../../components/Button/BannerButton";

interface IData {
	email: string;
}

function MainPage() {
	return (
		<>
			<Header />
			<div id={styles.Banner}>
				<Banner />
			</div>
			메인페이지입니다.
		</>
	);
}

export default MainPage;
