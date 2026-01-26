import type { CryptoSymbol } from "~/types/crypto";
import { PriceDelta } from "./PriceDelta";

type Props = {
  symbols: CryptoSymbol[];
  deltas: Record<CryptoSymbol, number | undefined>;
};

export function PriceDeltaRow({ symbols, deltas }: Props) {
  return (
    <div className="mb-3 flex gap-4 text-sm">
      {symbols.map((sym) => (
        <div key={sym} className="flex items-center gap-1">
          <span className="font-medium">{sym}</span>
          <PriceDelta value={deltas[sym]} />
        </div>
      ))}
    </div>
  );
}
