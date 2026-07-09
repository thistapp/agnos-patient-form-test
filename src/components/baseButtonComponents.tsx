"use client";

import {BaseButtonProps} from "@/lib/types/baseComponentTypes";

const BaseButton = ({
	children,
	className,
	disabled = false,
	onClick,
}: BaseButtonProps) => {
	return (
		<button className={className} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};

export default BaseButton;
