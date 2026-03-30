import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the main headline and key portfolio actions", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /full stack engineer with a bias for action and attention to detail/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /^github$/i })).toHaveAttribute(
      "href",
      "https://github.com/braymond-dev"
    );

    expect(screen.getByRole("heading", { name: /github projects/i })).toBeInTheDocument();
  });
});
