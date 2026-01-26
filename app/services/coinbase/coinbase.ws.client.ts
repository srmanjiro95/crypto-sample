// ~/services/coinbase/coinbase.ws.client.ts
import type { CryptoSymbol } from "~/types/crypto";

type CoinbaseTickerMessage = {
  type: "ticker";
  product_id: string;
  price: string;
};

export class CoinbaseWsClient {
  private socket: WebSocket | null = null;
  private buffer = new Map<CryptoSymbol, number>();
  private flushTimer: number | null = null;

  connect(
    symbols: CryptoSymbol[],
    onFlush: (prices: Map<CryptoSymbol, number>) => void
  ) {
    if (this.socket) return;

    this.socket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    this.socket.onopen = () => {
      this.socket?.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: symbols.map((s) => `${s}-USD`),
          channels: ["ticker"],
        })
      );
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data) as CoinbaseTickerMessage;
      if (msg.type !== "ticker") return;

      const symbol = msg.product_id.replace("-USD", "") as CryptoSymbol;
      this.buffer.set(symbol, Number(msg.price));

      if (!this.flushTimer) {
        this.flushTimer = window.setTimeout(() => {
          onFlush(new Map(this.buffer));
          this.buffer.clear();
          this.flushTimer = null;
        }, 250); // ← throttle 250ms
      }
    };

    this.socket.onclose = () => {
      this.cleanup();
    };

    this.socket.onerror = () => {
      this.socket?.close();
      this.cleanup();
    };
  }

  disconnect() {
    this.socket?.close();
    this.cleanup();
  }

  private cleanup() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    this.socket = null;
    this.buffer.clear();
  }
}
