import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";

function Footer() {
	return (
		<div id={styles.footer_container}>
			<div className={styles.footer_menu}>
				<span className={styles.footer_menu_item}>서비스</span>
				<span className={styles.footer_menu_item}>노보 소개</span>
				<span className={styles.footer_menu_item}>문의하기</span>
			</div>
			<div id={styles.footer_info}>
				<p>
					대표자 유성룡 | (주) 노보 | 경기도 용인시 수지구 죽전로 152
					<p>novo123@novovo.com | 1577-1123</p>
				</p>
				<p>© 웹소설 커뮤니티 노보. All Rights Reserved</p>
			</div>
		</div>
	);
}
export default Footer;
