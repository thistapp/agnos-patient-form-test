import {useState, useEffect} from "react";
import dayjs from "dayjs";
import {BaseDateInputProps} from "@/lib/types/baseComponentTypes";
import {Controller, get, useFormContext, FieldError} from "react-hook-form";

const BaseDateInput = ({
	name,
	labelName,
	fontSize,
	className = "",
	disabled = false,
	onChange,
	onBlur,
	...props
}: BaseDateInputProps) => {
	const {
		control,
		watch,
		formState: {errors},
	} = useFormContext();

	const error = get(errors, name) as FieldError | undefined;
	const rawValue = watch(name);
	const [localValue, setLocalValue] = useState<string>("");

	// Synchronize external value changes (e.g. form load/reset) to local state
	useEffect(() => {
		let active = true;
		if (rawValue) {
			const formatted = dayjs.isDayjs(rawValue)
				? rawValue.format("YYYY-MM-DD")
				: dayjs(rawValue).format("YYYY-MM-DD");

			if (localValue) {
				const localDayjs = dayjs(localValue);
				const rawDayjs = dayjs.isDayjs(rawValue) ? rawValue : dayjs(rawValue);
				if (
					localDayjs.isValid() &&
					rawDayjs.isValid() &&
					localDayjs.isSame(rawDayjs, "day")
				) {
					return;
				}
			}

			setTimeout(() => {
				if (active) {
					setLocalValue(formatted);
				}
			}, 0);
		} else {
			if (localValue) {
				const parts = localValue.split("-");
				const year = parseInt(parts[0], 10);
				if (!isNaN(year) && year >= 1000) {
					setTimeout(() => {
						if (active) {
							setLocalValue("");
						}
					}, 0);
				}
			}
		}

		return () => {
			active = false;
		};
	}, [rawValue, localValue]);

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
					<input
						type='date'
						id={name}
						value={localValue}
						className={`${className}`}
						disabled={disabled}
						onChange={(e) => {
							let val = e.target.value;

							// Prevent year from exceeding 4 digits by truncating extra characters
							if (val) {
								const parts = val.split("-");
								if (parts[0] && parts[0].length > 4) {
									parts[0] = parts[0].substring(0, 4);
									val = parts.join("-");
								}
							}

							setLocalValue(val);

							if (val) {
								const parts = val.split("-");
								const year = parseInt(parts[0], 10);
								// Only update form state for complete dates with a 4-digit year (year >= 1000)
								// to prevent dayjs from auto-parsing "0002" into "1902"
								if (
									year >= 1000 &&
									parts[0].length === 4 &&
									parts.length === 3
								) {
									const dayjsVal = dayjs(val);
									if (dayjsVal.isValid()) {
										field.onChange(dayjsVal);
										onChange?.(dayjsVal);
										return;
									}
								}
							}
							// Otherwise, hold field state as null until valid year is provided
							field.onChange(null);
							onChange?.(null);
						}}
						onBlur={() => {
							field.onBlur();
							onBlur?.();
						}}
					/>
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

export default BaseDateInput;
