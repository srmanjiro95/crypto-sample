import type { CryptoSymbol } from "~/types/crypto";

type CoinbaseResponse = {
  data: { amount: string };
};

export async function fetchUsd(symbol: CryptoSymbol): Promise<number> {
  const res = await fetch(
    `https://api.coinbase.com/v2/prices/${symbol}-USD/spot`,
    { headers: { Accept: "application/json" } }
  );

  if (!res.ok) throw new Error(`Coinbase error for ${symbol}`);

  const json = (await res.json()) as CoinbaseResponse;
  return Number(json.data.amount);
}
