import { render, screen, fireEvent } from "@testing-library/react";
import { FilterInput } from "../FilterInput";
import { vi } from "vitest";

describe("FilterInput", () => {
  it("calls onChange when typing", () => {
    const onChange = vi.fn();

    render(<FilterInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(/eth/i);
    fireEvent.change(input, { target: { value: "btc" } });

    expect(onChange).toHaveBeenCalledWith("btc");
  });
});
