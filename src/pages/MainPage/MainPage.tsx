import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/LargeBanner";
import BannerButton from "../../components/Button/BannerButton";
import Ranking from "../../components/Ranking/Ranking";

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
			<Ranking />
			<Ranking />
			<Ranking />
		</>
	);
}

export default MainPage;
