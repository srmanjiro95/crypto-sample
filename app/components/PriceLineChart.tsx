import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CryptoSymbol } from "~/types/crypto";

type Props = {
  data: any[];
  symbols: CryptoSymbol[];
};

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

export function PriceLineChart({ data, symbols }: Props) {
  return (
    <div className="h-64 w-full rounded-xl border p-3 bg-white dark:bg-zinc-900 min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => `${v.toFixed(2)}%`}
          />
          <Tooltip
            formatter={(v: number) => `${v.toFixed(2)}%`}
          />

          {symbols.map((sym, i) => (
            <Line
              key={sym}
              type="monotone"
              dataKey={sym}
              stroke={COLORS[i % COLORS.length]}
              dot={false}
              strokeWidth={2}
              name={`${sym} Δ%`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
