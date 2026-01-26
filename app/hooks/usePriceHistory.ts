import { useEffect, useState } from "react";
import type { CryptoSymbol } from "~/types/crypto";

type LivePrices = Record<CryptoSymbol, { usd: number; btc: number }>;

export type HistoryPoint = {
  timestamp: number;
  prices: LivePrices;
};

export function usePriceHistory(livePrices?: LivePrices) {
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    if (!livePrices) return;

    setHistory((prev) => {
      const point: HistoryPoint = {
        timestamp: Date.now(),
        prices: livePrices,
      };

      // últimos 30 puntos
      return [...prev.slice(-29), point];
    });
  }, [livePrices]);

  return history;
}
