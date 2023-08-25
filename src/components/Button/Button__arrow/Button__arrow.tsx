import React from "react";

interface ButtonProps {
	buttonType: "left" | "right";
	buttonTop?: string;
	buttonBottom?: string;
	buttonLeft?: string;
	buttonRight?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	buttonType,
	buttonTop,
	buttonBottom,
	buttonLeft,
	buttonRight,
	onClick,
}) => {
	const buttonStyle: React.CSSProperties = {
		background: `url(${
			buttonType === "right"
				? "https://github.com/Develop-Novo/Novo_Client/assets/40304565/2056fd71-839f-4753-8e1b-a1a0285eb855"
				: "https://github.com/Develop-Novo/Novo_Client/assets/40304565/6f9017d9-ebe6-43fd-9d3d-8d1e78611f15"
		})`,
		top: buttonTop,
		bottom: buttonBottom,
		left: buttonLeft,
		right: buttonRight,
		position: "absolute",
		width: "36px",
		height: "36px",
		backgroundSize: "100%",
		borderRadius: "50%",
		border: "none",
		boxShadow: "0px 3px 6px #00000029",
		cursor: "pointer",
		zIndex: "1",
	};

	return (
		<>
			<input type="button" style={buttonStyle} onClick={onClick} />
		</>
	);
};

export default Button;
