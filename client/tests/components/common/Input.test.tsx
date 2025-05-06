import { render, screen } from "@testing-library/react";
import { Input } from "../../../src/components/common/Input";
import { describe, it, expect } from "vitest";

describe("Input Component", () => {
  it("renders input element correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders helper text when provided and no error", () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });

  it("prioritizes error message over helper text", () => {
    render(
      <Input 
        error="This field is required" 
        helperText="Enter your username" 
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.queryByText("Enter your username")).not.toBeInTheDocument();
  });

  it("applies fullWidth class when fullWidth is true", () => {
    const { container } = render(<Input fullWidth />);
    const inputContainer = container.firstChild as HTMLElement;
    expect(inputContainer).toHaveClass("w-full");
  });

  it("applies additional className to input when provided", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("forwards additional props to input element", () => {
    render(<Input type="text" maxLength={10} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
