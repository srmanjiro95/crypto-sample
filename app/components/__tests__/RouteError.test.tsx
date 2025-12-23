import { render, screen } from "@testing-library/react";
import { RouteError } from "../RouteError";

describe("RouteError", () => {
  it("renders error message", () => {
    render(<RouteError error={new Error("Boom")} />);

    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });
});
