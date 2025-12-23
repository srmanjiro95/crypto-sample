import { render, screen } from "@testing-library/react";
import { CryptoCard } from "../CryptoCard";

describe("CryptoCard", () => {
  it("renders crypto info correctly", () => {
    render(
      <CryptoCard
        name="Bitcoin"
        symbol="BTC"
        usd={50000}
        btc={1}
      />
    );

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getAllByText("BTC").length).toBeGreaterThan(0);

    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText(/1\s*BTC/)).toBeInTheDocument();
  });
});
