import styles from "./Button__Comment.module.css";

interface CommentButtonProps {
	width: string;
	marginLeft: string;
}

const Button__Comment: React.FC<{ commentButtonProps: CommentButtonProps }> = ({
	commentButtonProps,
}) => {
	const buttonSize: React.CSSProperties = {
		width: commentButtonProps.width,
		marginLeft: commentButtonProps.marginLeft,
	};
	return (
		<button
			className={styles.novel__contents__button__comment}
			style={buttonSize}
		>
			<div className={styles.novel__contents__button__comment__text}>
				코멘트 남기기
			</div>
		</button>
	);
};
export default Button__Comment;
