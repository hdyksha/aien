import { render, screen } from "@testing-library/react";
import { Card } from "../../../src/components/common/Card";
import { describe, it, expect } from "vitest";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="Card Title">Card Content</Card>);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Card>Card Content</Card>);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("bg-white");
    expect(cardElement).toHaveClass("shadow-card");
  });

  it("applies outlined variant classes", () => {
    const { container } = render(<Card variant="outlined">Card Content</Card>);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("border");
    expect(cardElement).toHaveClass("border-secondary-200");
  });

  it("applies elevated variant classes", () => {
    const { container } = render(<Card variant="elevated">Card Content</Card>);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("shadow-lg");
  });

  it("applies additional className when provided", () => {
    const { container } = render(<Card className="custom-class">Card Content</Card>);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("custom-class");
  });
});
