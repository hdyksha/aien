import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../src/components/common/Button";
import { describe, it, expect, vi } from "vitest";

describe("Button Component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant styles", () => {
    const { rerender } = render(<Button label="Primary" variant="primary" />);
    expect(screen.getByText("Primary")).toHaveClass("bg-blue-500");

    rerender(<Button label="Secondary" variant="secondary" />);
    expect(screen.getByText("Secondary")).toHaveClass("bg-gray-200");
  });

  it("disables the button when disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
