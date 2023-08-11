import React from "react";
import styles from "./Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
const Comment: React.FC = ({}) => {
	return (
		<div className={styles.comment__container}>
			<div className={styles.comment__writer__info}>
				<img
					src="../images/default_user__icon.png"
					className={styles.comment__writer__avatar}
				/>
				<span className={styles.comment__writer__name}>연글술사</span>
				<span className={styles.comment__writer__score}>★ 8</span>
			</div>
			<div className={styles.comment__content}>
				코멘트입니다코멘트입니다코멘트입니다코멘트입니다코멘트입니다코멘트입니다코멘트입니다코멘트입니다코멘트입니다
			</div>
			<div className={styles.comment__reaction}>
				<span>
					<FontAwesomeIcon
						icon={faHeart}
						size="xl"
						style={{
							color: "#C0C0C0",
						}}
						className={styles.reaction_icon}
					/>
					54
				</span>
				<span>
					<FontAwesomeIcon
						icon={faComment}
						flip="horizontal"
						size="xl"
						style={{
							color: "#C0C0C0",
						}}
						className={styles.reaction_icon}
					/>
					54
				</span>
			</div>
		</div>
	);
};

export default Comment;
