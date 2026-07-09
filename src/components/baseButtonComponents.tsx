import {BaseButtonProps} from "@/lib/types/baseComponentTypes";

const BaseButton = ({
	children,
	className = "",
	disabled = false,
	type = "button",
	onClick,
}: BaseButtonProps) => {
	return (
		<button
			className={className}
			disabled={disabled}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default BaseButton;
