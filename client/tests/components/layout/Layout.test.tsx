import { render, screen } from "@testing-library/react";
import { Layout } from "../../../src/components/layout/Layout";
import { describe, it, expect } from "vitest";

describe("Layout Component", () => {
  it("renders children correctly", () => {
    render(<Layout>Main content</Layout>);
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(<Layout header={<div>Header content</div>}>Main content</Layout>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(<Layout footer={<div>Footer content</div>}>Main content</Layout>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders sidebar when provided", () => {
    render(<Layout sidebar={<div>Sidebar content</div>}>Main content</Layout>);
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
  });

  it("renders all sections when provided", () => {
    render(
      <Layout
        header={<div>Header content</div>}
        footer={<div>Footer content</div>}
        sidebar={<div>Sidebar content</div>}
      >
        Main content
      </Layout>
    );
    
    expect(screen.getByText("Header content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });
});
