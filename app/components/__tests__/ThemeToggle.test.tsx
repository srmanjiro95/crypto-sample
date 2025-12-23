import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../ThemeToggle";

describe("ThemeToggle", () => {
  it("toggles theme text when clicked", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    const initialText = button.textContent;

    fireEvent.click(button);

    expect(button.textContent).not.toBe(initialText);
  });
});
