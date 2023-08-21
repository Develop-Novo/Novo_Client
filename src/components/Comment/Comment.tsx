import React from "react";
import styles from "./Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
	writerName: number;
	writerImg: string;
	commentRating: number;
	commentContent: string;
	commentComment: number;
	commentLikes: number;
}

const Comment: React.FC<{ commentProps: CommentProps }> = ({
	commentProps,
}) => {
	return (
		<div className={styles.comment__container}>
			<div className={styles.comment__writer__info}>
				<img
					src={commentProps.writerImg}
					className={styles.comment__writer__avatar}
				/>
				<span className={styles.comment__writer__name}>
					{commentProps.writerName}
				</span>
				<span className={styles.comment__rating}>
					★ {commentProps.commentRating}
				</span>
			</div>
			<div className={styles.comment__content}>
				{commentProps.commentContent}
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
					{commentProps.commentLikes}
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
					{commentProps.commentComment}
				</span>
			</div>
		</div>
	);
};

export default Comment;
