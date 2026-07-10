import dayjs from "dayjs";
import { BaseDateInputProps } from "@/lib/types/baseComponentTypes";
import { Controller, get, useFormContext, FieldError } from "react-hook-form";

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
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name) as FieldError | undefined;

  return (
    <div className="w-full flex flex-col mb-4">
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
        render={({ field }) => {
          const rawValue = field.value;
          let stringValue = "";
          if (rawValue) {
            if (dayjs.isDayjs(rawValue)) {
              stringValue = rawValue.format("YYYY-MM-DD");
            } else {
              stringValue = dayjs(rawValue).format("YYYY-MM-DD");
            }
          }

          return (
            <input
              type="date"
              id={name}
              value={stringValue}
              className={`${className} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white`}
              disabled={disabled}
              onChange={(e) => {
                const val = e.target.value;
                const dayjsVal = val ? dayjs(val) : null;
                field.onChange(dayjsVal);
                onChange?.(dayjsVal);
              }}
              onBlur={() => {
                field.onBlur();
                onBlur?.();
              }}
            />
          );
        }}
        {...props}
      />
      {error && (
        <div className="mt-1">
          <span
            id={`${name}-error`}
            role="alert"
            className="text-xs text-red-500"
          >
            {error.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default BaseDateInput;
