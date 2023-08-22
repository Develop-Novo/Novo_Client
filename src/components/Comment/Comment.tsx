import React, { useState } from "react";
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
	commentID: number;
}

const Comment: React.FC<{ commentProps: CommentProps }> = ({
	commentProps,
}) => {
	const [isClicked, setIsClicked] = useState(false);
	const [likeCount, setLikeCount] = useState(commentProps.commentLikes);

	const postLike = async () => {
		try {
			// Replace with your API endpoint
			const response = await fetch(
				`http://52.78.121.235:8080/review/id/${commentProps.commentID}/like`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				setIsClicked(true);
				setLikeCount(likeCount + 1);
			} else {
				console.error("Failed to post like");
			}
		} catch (error) {
			console.error("Error posting like:", error);
		}
	};

	const postDislike = async () => {
		try {
			// Replace with your API endpoint
			const response = await fetch(
				`http://52.78.121.235:8080/review/id/${commentProps.commentID}/dislike`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				setIsClicked(false);
				setLikeCount(likeCount - 1);
			} else {
				console.error("Failed to post like");
			}
		} catch (error) {
			console.error("Error posting like:", error);
		}
	};
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
					<a
						href="javascript:void(0);"
						onClick={isClicked ? postDislike : postLike}
					>
						<FontAwesomeIcon
							icon={faHeart}
							size="xl"
							style={{
								color: isClicked ? "red" : "#C0C0C0",
							}}
							className={styles.reaction_icon}
						/>
					</a>
					{likeCount}
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
