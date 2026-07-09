import {BaseSelectProps} from "@/lib/types/baseComponentTypes";
import {Controller, get, useFormContext, FieldError} from "react-hook-form";

const BaseSelect = ({
	name,
	labelName,
	options,
	fontSize,
	className = "",
	disabled = false,
	onChange,
	onBlur,
	...props
}: BaseSelectProps) => {
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
					(fontSize ? ` text-${fontSize}` : "")
				}
				htmlFor={name}
			>
				{labelName}
			</label>
			<Controller
				name={name}
				control={control}
				render={({field}) => (
					<select
						{...field}
						className={`${className} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white`}
						disabled={disabled}
						onChange={(e) => {
							field.onChange(e);
							onChange?.(e);
						}}
						onBlur={(e) => {
							field.onBlur();
							onBlur?.(e);
						}}
					>
						<option value=''>Select option</option>
						{options.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				)}
				{...props}
			/>
			{error && (
				<div className='mt-1'>
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

export default BaseSelect;
