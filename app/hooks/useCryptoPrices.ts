import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { CryptoSymbol } from "~/types/crypto";
import { cryptoPricesQuery } from "~/queries/crypto.query";
import { startCryptoPricesWs } from "~/services/crypto/crypto-prices.ws.service";

export function useCryptoPrices(
  initialPrices: Record<CryptoSymbol, { usd: number; btc: number }>,
  symbols: CryptoSymbol[]
) {
  const queryClient = useQueryClient();

  const query = useQuery(
    cryptoPricesQuery(initialPrices)
  );

  useEffect(() => {
    const stop = startCryptoPricesWs(queryClient, symbols);
    return () => stop();
  }, [queryClient, symbols.join(",")]);

  return query;
}