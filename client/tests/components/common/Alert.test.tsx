import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "../../../src/components/common/Alert";
import { describe, it, expect, vi } from "vitest";

describe("Alert Component", () => {
  it("renders children correctly", () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="Alert Title">Alert message</Alert>);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });

  it("applies info type classes by default", () => {
    const { container } = render(<Alert>Alert message</Alert>);
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveClass("bg-blue-50");
    expect(alertElement).toHaveClass("text-blue-800");
  });

  it("applies success type classes when specified", () => {
    const { container } = render(<Alert type="success">Success message</Alert>);
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveClass("bg-green-50");
    expect(alertElement).toHaveClass("text-green-800");
  });

  it("applies warning type classes when specified", () => {
    const { container } = render(<Alert type="warning">Warning message</Alert>);
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveClass("bg-yellow-50");
    expect(alertElement).toHaveClass("text-yellow-800");
  });

  it("applies error type classes when specified", () => {
    const { container } = render(<Alert type="error">Error message</Alert>);
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveClass("bg-red-50");
    expect(alertElement).toHaveClass("text-red-800");
  });

  it("renders close button when onClose is provided", () => {
    render(<Alert onClose={() => {}}>Alert message</Alert>);
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<Alert onClose={handleClose}>Alert message</Alert>);
    
    fireEvent.click(screen.getByLabelText("Close"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
