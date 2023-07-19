import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";

interface IData {
	email: string;
}

function MainPage() {
	return (
		<>
			<Header />
			메인페이지입니다.
		</>
	);
}

export default MainPage;
