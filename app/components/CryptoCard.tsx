import type { CryptoCardData } from "~/types/crypto";

export function CryptoCard({ name, symbol, usd, btc }: CryptoCardData) {
  return (
    <article className="
      rounded-2xl border p-4 shadow-sm transition-colors
      bg-white text-zinc-900 border-zinc-200
      dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800
    ">
      <div className="flex justify-between items-baseline">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {symbol}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">USD</p>
        <p className="text-xl font-bold">
          ${usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">BTC</p>
        <p className="text-base font-medium">
          {btc.toLocaleString(undefined, { maximumFractionDigits: 8 })} BTC
        </p>
      </div>
    </article>
  );
}
