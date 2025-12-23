import { render, screen } from "@testing-library/react";
import { Dashboard } from "../Dashboard";
import type { CryptoCardData } from "~/types/crypto";
import { vi } from "vitest";

vi.mock("@dnd-kit/core", async () => {
  const actual = await vi.importActual<any>("@dnd-kit/core");
  return {
    ...actual,
    DndContext: ({ children }: any) => <div>{children}</div>,
  };
});

vi.mock("@dnd-kit/sortable", async () => {
  const actual = await vi.importActual<any>("@dnd-kit/sortable");
  return {
    ...actual,
    SortableContext: ({ children }: any) => <div>{children}</div>,
    useSortable: () => ({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null,
      transition: null,
    }),
  };
});

const cards: CryptoCardData[] = [
  { name: "Bitcoin", symbol: "BTC", usd: 50000, btc: 1 },
  { name: "Ethereum", symbol: "ETH", usd: 3000, btc: 0.06 },
];

describe("Dashboard", () => {
  it("renders cards", () => {
    render(
      <Dashboard
        cards={cards}
        fetchedAt={new Date().toISOString()}
        formattedFetchedAt="22/12/2025, 10:00:00"
        isLoading={false}
      />
    );

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });
});
