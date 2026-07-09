export interface BaseButtonProps {
	children: React.ReactNode;
	fontSize?: string;
	disabled?: boolean;
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface BaseInputProps {
	name: string;
	type?: string;
	labelName: string;
	fontSize?: string;
	className?: string;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface BaseTextareaProps {
	name: string;
	fontSize?: string;
	labelName: string;
	className?: string;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
