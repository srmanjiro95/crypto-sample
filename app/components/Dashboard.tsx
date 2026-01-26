import { useEffect, useMemo, useState } from "react";
import type { CryptoCardData, CryptoSymbol } from "~/types/crypto";

import { SortableCryptoCard } from "~/components/SortableCryptoCard";
import { FilterInput } from "~/components/FilterInput";
import { ThemeToggle } from "~/components/ThemeToggle";

import { ChartHeader } from "~/components/ChartHeader";
import { ChartModeToggle } from "~/components/ChartModeToggle";
import { CryptoChartSelector } from "~/components/CryptoChartSelector";
import { PriceDeltaRow } from "~/components/PriceDeltaRow";
import { PriceLineChart } from "~/components/PriceLineChart";

import type { ChartMode } from "~/types/chart";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { usePriceHistory } from "~/hooks/usePriceHistory";
import { useCryptoPrices } from "~/hooks/useCryptoPrices";

type Props = {
  cards: CryptoCardData[];
  fetchedAt: number;
  isLoading?: boolean;
};

const STORAGE_KEY = "crypto-order";

/**
 * Contrato esperado del hook de histórico.
 * Si tu hook devuelve otra forma, abajo te dejo la versión final del hook para pegar.
 */
type HistoryPoint = {
  timestamp: number;
  prices: Record<CryptoSymbol, { usd: number; btc: number }>;
};

export function Dashboard({ cards, fetchedAt, isLoading }: Props) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ChartMode>("percent");

  const symbols = useMemo(() => cards.map((c) => c.symbol), [cards]);

  // Para la gráfica: por default mostrar 3 (puedes ajustar)
  const [selectedSymbols, setSelectedSymbols] = useState<CryptoSymbol[]>(
    symbols.slice(0, 10)
  );

  // Orden drag & drop
  const [order, setOrder] = useState<CryptoSymbol[]>(symbols);

  // ---------- Persisted order ----------
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as CryptoSymbol[];
      const valid =
        saved.length === symbols.length &&
        saved.every((s) => symbols.includes(s));
      if (valid) setOrder(saved);
    } catch {
      // ignore
    }
  }, [symbols]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  }, [order]);

  // ---------- Live prices via TanStack Query ----------
  const initialPrices = useMemo<
    Record<CryptoSymbol, { usd: number; btc: number }>
  >(() => {
    return cards.reduce(
      (acc, c) => {
        acc[c.symbol] = { usd: c.usd, btc: c.btc };
        return acc;
      },
      {} as Record<CryptoSymbol, { usd: number; btc: number }>
    );
  }, [cards]);


  const { data, isFetching, error, dataUpdatedAt } =
    useCryptoPrices(initialPrices, symbols);


  // IMPORTANT: por tu select, la data viene como { prices, symbols }
  const livePrices = data?.prices; // Record<CryptoSymbol, {usd, btc}> | undefined

  // ---------- Merge SSR + live ----------
  const mergedCards = useMemo((): CryptoCardData[] => {
    return cards.map((c) => {
      const live = livePrices?.[c.symbol];
      return {
        ...c,
        usd: live?.usd ?? c.usd,
        btc: live?.btc ?? c.btc,
      };
    });
  }, [cards, livePrices]);

  const cardMap = useMemo(() => {
    return Object.fromEntries(
      mergedCards.map((c) => [c.symbol, c])
    ) as Record<CryptoSymbol, CryptoCardData>;
  }, [mergedCards]);

  // ---------- Filter ----------
  const filteredOrder = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return order;

    return order.filter((sym) => {
      const c = cardMap[sym];
      return (
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
      );
    });
  }, [order, query, cardMap]);

  // ---------- Drag ----------
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((items) => {
      const oldIndex = items.indexOf(active.id as CryptoSymbol);
      const newIndex = items.indexOf(over.id as CryptoSymbol);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  // ---------- History (only when livePrices exists) ----------
  // Si tu hook acepta undefined, OK; si no, este cast evita el error de TS.
  const history = usePriceHistory(livePrices) as HistoryPoint[];

  // ---------- Chart data ----------
  const chartData = useMemo(() => {
    if (!history.length) return [];

    // Para modo percent: base = primer punto
    const base = history[0].prices;

    return history.map((point) => {
      const row: Record<string, number | string> = {
        time: new Date(point.timestamp).toLocaleTimeString(),
      };

      for (const sym of selectedSymbols) {
        const p = point.prices[sym];
        if (!p) continue;

        if (mode === "usd") row[sym] = p.usd;
        else if (mode === "btc") row[sym] = p.btc;
        else {
          const baseUsd = base[sym]?.usd ?? p.usd;
          row[sym] = baseUsd ? ((p.usd - baseUsd) / baseUsd) * 100 : 0;
        }
      }

      return row;
    });
  }, [history, selectedSymbols, mode]);

  // ---------- Deltas for header row ----------
  const deltas = useMemo(() => {
    if (history.length < 2) return {} as Partial<Record<CryptoSymbol, number>>;

    const first = history[0].prices;
    const last = history[history.length - 1].prices;

    const out: Partial<Record<CryptoSymbol, number>> = {};
    for (const sym of selectedSymbols) {
      const a = first[sym]?.usd;
      const b = last[sym]?.usd;
      if (a && b) out[sym] = ((b - a) / a) * 100;
    }
    return out;
  }, [history, selectedSymbols]);

  // ---------- Date ----------
  const liveDate = useMemo(() => {
    const ts = dataUpdatedAt ?? fetchedAt;
    if (!ts) return "";

    return new Date(ts).toLocaleString("es-MX", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  }, [dataUpdatedAt, fetchedAt]);

  return (
    <main
      className="
        mx-auto max-w-6xl p-4 min-h-screen transition-colors
        bg-zinc-50 text-zinc-900
        dark:bg-zinc-950 dark:text-zinc-50
      "
    >
      <header className="mb-4 flex justify-between items-end gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Crypto Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last update:{" "}
            {mounted ? liveDate : "—"}
            {isFetching && " · updating…"}
          </p>

          {error && (
            <p className="mt-1 text-sm text-red-600">
              Error updating live prices
            </p>
          )}
        </div>

        <div className="flex gap-3 items-end">
          <ThemeToggle />
          <form method="post" action="/logout">
            <button
              className="
                rounded-xl border px-3 py-2 text-sm shadow-sm transition-colors
                bg-white border-zinc-300 text-zinc-900
                dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50
              "
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* ---- Chart Section ---- */}
      <section className="mb-6 rounded-2xl border p-4 bg-white dark:bg-zinc-900">
        <ChartHeader
          title="Market movement"
          subtitle="Live Coinbase data"
          mode={mode}
        />

        <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CryptoChartSelector
            symbols={symbols}
            selected={selectedSymbols}
            onChange={setSelectedSymbols}
          />
          <ChartModeToggle value={mode} onChange={setMode} />
        </div>

        <PriceDeltaRow
          symbols={selectedSymbols}
          deltas={deltas as Record<CryptoSymbol, number | undefined>}
        />

        <PriceLineChart data={chartData} symbols={selectedSymbols} />
      </section>

      {/* ---- Filter ---- */}
      <div className="mb-4 flex items-center gap-3">
        <FilterInput value={query} onChange={setQuery} />
        {isLoading && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
            Loading…
          </span>
        )}
      </div>

      {/* ---- Cards ---- */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredOrder} strategy={rectSortingStrategy}>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrder.map((sym) => (
              <SortableCryptoCard key={sym} data={cardMap[sym]} />
            ))}
          </section>
        </SortableContext>
      </DndContext>
    </main>
  );
}
