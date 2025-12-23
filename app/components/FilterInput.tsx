import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function FilterInput({ value, onChange }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search by symbol (e.g. "eth")'
      className="
        w-full rounded-xl border px-3 py-2 text-sm outline-none transition-colors
        bg-white text-zinc-900 border-zinc-300
        placeholder-zinc-400
        focus:ring-2 focus:ring-zinc-300
        dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700
        dark:placeholder-zinc-500 dark:focus:ring-zinc-700
      "
    />
  );
}
