interface TextAreaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}

export function TextAreaField({
  label,
  name,
  placeholder,
  required,
  className = "",
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className={`space-y-2 text-sm text-zinc-700 dark:text-zinc-200 ${className}`}>
      <span className="font-medium">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
      />
    </label>
  );
}
