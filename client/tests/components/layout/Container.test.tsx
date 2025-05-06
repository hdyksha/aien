import { render } from "@testing-library/react";
import { Container } from "../../../src/components/layout/Container";
import { describe, it, expect } from "vitest";

describe("Container Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Container>Container content</Container>);
    expect(getByText("Container content")).toBeInTheDocument();
  });

  it("applies default max-width class", () => {
    const { container } = render(<Container>Container content</Container>);
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass("max-w-screen-xl");
  });

  it("applies custom max-width class when specified", () => {
    const { container } = render(
      <Container maxWidth="sm">Container content</Container>
    );
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass("max-w-screen-md");
  });

  it("applies additional className when provided", () => {
    const { container } = render(
      <Container className="bg-gray-100">Container content</Container>
    );
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass("bg-gray-100");
  });
});
