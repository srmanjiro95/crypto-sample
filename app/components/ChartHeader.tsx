import type { ChartMode } from "~/types/chart";

type Props = {
  title: string;
  mode: ChartMode;
  subtitle?: string;
};

export function ChartHeader({ title, mode, subtitle }: Props) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      <span className="text-xs uppercase tracking-wide text-zinc-500">
        {mode === "usd" && "USD price"}
        {mode === "btc" && "BTC price"}
        {mode === "percent" && "Δ %"}
      </span>
    </div>
  );
}
