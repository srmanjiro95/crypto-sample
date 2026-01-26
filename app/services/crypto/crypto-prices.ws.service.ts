// ~/services/crypto/crypto-prices.ws.service.ts
import type { CryptoSymbol } from "~/types/crypto";
import { CoinbaseWsClient } from "~/services/coinbase/coinbase.ws.client";
import type { QueryClient } from "@tanstack/react-query";

/**
 * Backoff config
 */
let retries = 0;
const MAX_DELAY = 30_000;

function scheduleReconnect(connect: () => void) {
  const base = Math.min(1000 * 2 ** retries, MAX_DELAY);
  const jittered = base / 2 + Math.random() * (base / 2);
  retries++;
  setTimeout(connect, jittered);
}


export function startCryptoPricesWs(
  queryClient: QueryClient,
  symbols: CryptoSymbol[]
) {
  const ws = new CoinbaseWsClient();
  let active = true;
  let connected = false;

  function connect() {
    if (!active || connected) return;

    try {
      connected = true;

      ws.connect(symbols, (prices) => {
        // Reset backoff on successful data
        retries = 0;

        queryClient.setQueryData(
          ["crypto-prices"],
          (
            old:
              | Record<CryptoSymbol, { usd: number; btc: number }>
              | undefined
          ) => {
            if (!old) return old;

            let next = { ...old };
            let btcUsd = old.BTC?.usd ?? 0;

            for (const [sym, usd] of prices) {
              if (sym === "BTC") btcUsd = usd;

              next[sym] = {
                usd,
                btc: btcUsd ? usd / btcUsd : 0,
              };
            }

            return next;
          }
        );
      });
    } catch (err) {
      connected = false;
      scheduleReconnect(connect);
    }
  }

  function disconnect() {
    if (!connected) return;
    connected = false;
    ws.disconnect();
  }

  function handleVisibilityChange() {
    active = !document.hidden;

    if (active) {
      connect();
    } else {
      disconnect();
    }
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Initial connect
  connect();

  return () => {
    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
    disconnect();
  };
}
