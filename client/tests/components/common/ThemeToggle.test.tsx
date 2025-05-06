import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../../../src/components/common/ThemeToggle";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as themeUtils from "../../../src/utils/theme";

// Mock the theme utilities
vi.mock("../../../src/utils/theme", () => ({
  getInitialTheme: vi.fn(),
  toggleTheme: vi.fn(),
  setTheme: vi.fn(),
}));

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock classList methods instead of trying to redefine documentElement
    document.documentElement.classList.add = vi.fn();
    document.documentElement.classList.remove = vi.fn();
  });

  it("renders light mode icon when theme is dark", () => {
    vi.mocked(themeUtils.getInitialTheme).mockReturnValue("dark");
    
    render(<ThemeToggle />);
    
    // In dark mode, we show the sun icon (light mode icon)
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("renders dark mode icon when theme is light", () => {
    vi.mocked(themeUtils.getInitialTheme).mockReturnValue("light");
    
    render(<ThemeToggle />);
    
    // In light mode, we show the moon icon (dark mode icon)
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("calls toggleTheme when clicked", () => {
    vi.mocked(themeUtils.getInitialTheme).mockReturnValue("light");
    vi.mocked(themeUtils.toggleTheme).mockReturnValue("dark");
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    expect(themeUtils.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it("updates the icon when theme changes", () => {
    vi.mocked(themeUtils.getInitialTheme).mockReturnValue("light");
    vi.mocked(themeUtils.toggleTheme).mockReturnValue("dark");
    
    render(<ThemeToggle />);
    
    // Initially in light mode
    let button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    
    // Click to toggle
    fireEvent.click(button);
    
    // Now in dark mode
    button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("applies additional className when provided", () => {
    vi.mocked(themeUtils.getInitialTheme).mockReturnValue("light");
    
    const { container } = render(<ThemeToggle className="custom-class" />);
    const button = container.firstChild as HTMLElement;
    
    expect(button).toHaveClass("custom-class");
  });
});
