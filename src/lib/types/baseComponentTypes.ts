import { Dayjs } from "dayjs";
import { RegisterOptions } from "react-hook-form";

export interface BaseButtonProps {
	children: React.ReactNode;
	fontSize?: string;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit" | "reset";
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface BaseInputProps {
	name: string;
	type?: string;
	labelName: string;
	fontSize?: string;
	className?: string;
	disabled?: boolean;
	rules?: RegisterOptions;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface BaseTextareaProps {
	name: string;
	fontSize?: string;
	labelName: string;
	className?: string;
	disabled?: boolean;
	rules?: RegisterOptions;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export interface BaseSelectProps {
	name: string;
	labelName: string;
	options: { value: string; label: string }[];
	fontSize?: string;
	className?: string;
	disabled?: boolean;
	rules?: RegisterOptions;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export interface BaseDateInputProps {
	name: string;
	labelName: string;
	fontSize?: string;
	className?: string;
	disabled?: boolean;
	rules?: RegisterOptions;
	onChange?: (value: Dayjs | null) => void;
	onBlur?: () => void;
}
