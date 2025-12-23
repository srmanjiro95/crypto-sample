export type CryptoSymbol =
  | "BTC"
  | "ETH"
  | "SOL"
  | "ADA"
  | "DOGE"
  | "XRP"
  | "AVAX"
  | "LINK"
  | "MATIC"
  | "LTC";

export type CryptoMeta = {
  symbol: CryptoSymbol;
  name: string;
};

export type CryptoCardData = CryptoMeta & {
  usd: number;
  btc: number;
};
