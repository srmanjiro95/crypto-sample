import type { CryptoSymbol } from "~/types/crypto";

export function cryptoPricesQuery(
  initial: Record<CryptoSymbol, { usd: number; btc: number }>
) {
  return {
    queryKey: ["crypto-prices"],
    queryFn: async () => initial,
    initialData: initial,
    select: (data: Record<CryptoSymbol, { usd: number; btc: number }>) => ({
      prices: data,
      symbols: Object.keys(data) as CryptoSymbol[],
    }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  };
}

