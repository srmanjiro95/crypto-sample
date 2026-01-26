import type { CryptoSymbol } from "~/types/crypto";

type Props = {
  symbols: CryptoSymbol[];
  selected: CryptoSymbol[];
  onChange: (next: CryptoSymbol[]) => void;
};

export function CryptoChartSelector({
  symbols,
  selected,
  onChange,
}: Props) {
  function toggle(sym: CryptoSymbol) {
    onChange(
      selected.includes(sym)
        ? selected.filter((s) => s !== sym)
        : [...selected, sym]
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {symbols.map((sym) => {
        const active = selected.includes(sym);

        return (
          <button
            key={sym}
            onClick={() => toggle(sym)}
            className={`
              rounded-full px-3 py-1 text-sm transition-colors
              ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              }
            `}
          >
            {sym}
          </button>
        );
      })}
    </div>
  );
}
