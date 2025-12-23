import { render, screen } from "@testing-library/react";
import { SortableCryptoCard } from "../SortableCryptoCard";
import type { CryptoCardData } from "~/types/crypto";

const data: CryptoCardData = {
  name: "Bitcoin",
  symbol: "BTC",
  usd: 50000,
  btc: 1,
};

describe("SortableCryptoCard", () => {
  it("renders crypto card content", () => {
    render(<SortableCryptoCard data={data} />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getAllByText("BTC").length).toBeGreaterThan(0);
  });
});
