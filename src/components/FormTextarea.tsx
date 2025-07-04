interface FormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label: string;
  rows?: number;
  required?: boolean;
  focusRingColor?: string;
  borderFocusColor?: string;
}

export function FormTextarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  required = false,
  focusRingColor = "blue",
  borderFocusColor = "blue",
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200"
      >
        {label} {required && "*"}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-${focusRingColor}-300/50 focus:border-${borderFocusColor}-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
