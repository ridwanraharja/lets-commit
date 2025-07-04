import { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  icon?: LucideIcon;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  helperText?: string;
  focusRingColor?: string;
  borderFocusColor?: string;
}

export function FormInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  required = false,
  min,
  max,
  step,
  helperText,
  focusRingColor = "blue",
  borderFocusColor = "blue",
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
      >
        {Icon && <Icon className="w-4 h-4 inline mr-1" />}
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-${focusRingColor}-300/50 focus:border-${borderFocusColor}-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
      />
      {helperText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
