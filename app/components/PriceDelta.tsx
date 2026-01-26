type Props = {
  value?: number;
};

export function PriceDelta({ value }: Props) {
  if (value === undefined) {
    return <span className="text-zinc-400">—</span>;
  }

  const isUp = value > 0;
  const isDown = value < 0;

  return (
    <span
      className={`
        text-xs font-medium
        ${
          isUp
            ? "text-emerald-600"
            : isDown
            ? "text-red-500"
            : "text-zinc-400"
        }
      `}
    >
      {isUp && "▲"}
      {isDown && "▼"} {Math.abs(value).toFixed(2)}%
    </span>
  );
}
