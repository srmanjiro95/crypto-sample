import { useEffect, useMemo, useState } from "react";
import type { CryptoCardData, CryptoSymbol } from "~/types/crypto";
import { SortableCryptoCard } from "~/components/SortableCryptoCard";
import { FilterInput } from "~/components/FilterInput";
import { ThemeToggle } from "~/components/ThemeToggle";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type Props = {
  cards: CryptoCardData[];
  fetchedAt: string;
  formattedFetchedAt: string;
  isLoading?: boolean;
};

const STORAGE_KEY = "crypto-order";

export function Dashboard({
  cards,
  formattedFetchedAt,
  isLoading,
}: Props) {
  const [query, setQuery] = useState("");

  const [order, setOrder] = useState<CryptoSymbol[]>(
    cards.map((c) => c.symbol)
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as CryptoSymbol[];
      const symbols = cards.map((c) => c.symbol);

      const isValid =
        saved.length === symbols.length &&
        saved.every((s) => symbols.includes(s));

      if (isValid) {
        setOrder(saved);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  }, [order]);

  const cardMap = useMemo(() => {
    return Object.fromEntries(cards.map((c) => [c.symbol, c])) as Record<
      CryptoSymbol,
      CryptoCardData
    >;
  }, [cards]);

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((items) => {
      const oldIndex = items.indexOf(active.id as CryptoSymbol);
      const newIndex = items.indexOf(over.id as CryptoSymbol);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <main
      className="
        mx-auto max-w-6xl p-4 min-h-screen transition-colors
        bg-zinc-50 text-zinc-900
        dark:bg-zinc-950 dark:text-zinc-50
      "
    >
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Crypto Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last update: {formattedFetchedAt}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <ThemeToggle />

          <form method="post" action="/logout">
            <button className="
                rounded-xl border px-3 py-2 text-sm shadow-sm transition-colors
                bg-white border-zinc-300 text-zinc-900
                dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50
              ">
              Logout
            </button>
          </form>
        </div>

      </header>

      <div className="mb-4 flex items-center gap-3">
        <FilterInput value={query} onChange={setQuery} />
        {isLoading && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
            Loading...
          </span>
        )}
      </div>

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
