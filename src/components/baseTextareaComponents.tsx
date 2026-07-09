import {BaseTextareaProps} from "@/lib/types/baseComponentTypes";
import {Controller, get, useFormContext, FieldError} from "react-hook-form";

const BaseTextarea = ({
	name,
	labelName,
	fontSize,
	className,
	disabled,
	onChange,
	onBlur,
	...props
}: BaseTextareaProps) => {
	const {
		control,
		formState: {errors},
	} = useFormContext();

	const error = get(errors, name) as FieldError | undefined;

	return (
		<div className='w-full flex flex-col mb-4'>
			<label
				className={
					`block text-sm font-medium text-gray-700 mb-1` +
					(fontSize ? `text-${fontSize}` : "")
				}
				htmlFor={name}
			>
				{labelName}
			</label>
			<Controller
				name={name}
				control={control}
				render={({field}) => (
					<textarea
						{...field}
						className={`${className} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
						disabled={disabled}
						onChange={(e) => {
							field.onChange(e);
							onChange?.(e);
						}}
						onBlur={(e) => {
							field.onBlur();
							onBlur?.(e);
						}}
					/>
				)}
				{...props}
			/>
			{error && (
				<div className=''>
					<span
						id={`${name}-error`}
						role='alert'
						className='text-xs text-red-500'
					>
						{error.message}
					</span>
				</div>
			)}
		</div>
	);
};

export default BaseTextarea;
