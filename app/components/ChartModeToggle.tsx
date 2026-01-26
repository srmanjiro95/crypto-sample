import type { ChartMode } from "~/types/chart";

type Props = {
  value: ChartMode;
  onChange: (mode: ChartMode) => void;
};

const MODES: ChartMode[] = ["usd", "btc", "percent"];

const LABELS: Record<ChartMode, string> = {
  usd: "USD",
  btc: "BTC",
  percent: "%",
};

const DESCRIPTIONS: Record<ChartMode, string> = {
  usd: "Absolute price",
  btc: "Relative to BTC",
  percent: "Change %",
};

export function ChartModeToggle({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {MODES.map((mode) => {
        const active = value === mode;

        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={`
              rounded-xl px-3 py-2 text-sm transition-colors
              ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              }
            `}
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="font-medium">{LABELS[mode]}</span>
              <span className="text-[10px] opacity-70">
                {DESCRIPTIONS[mode]}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
