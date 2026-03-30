import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the main headline and key portfolio actions", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /full-stack software engineering with enterprise scale and strong frontend instincts/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /^github$/i })).toHaveAttribute(
      "href",
      "https://github.com/braymond-dev"
    );

    expect(
      screen.getByRole("heading", { name: /career timeline/i })
    ).toBeInTheDocument();
  });
});
