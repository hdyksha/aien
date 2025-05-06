import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../../src/components/common/Modal";
import { describe, it, expect, vi } from "vitest";

describe("Modal Component", () => {
  it("renders nothing when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal content
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders modal content when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal content
      </Modal>
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal Title">
        Modal content
      </Modal>
    );
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} footer={<button>Close</button>}>
        Modal content
      </Modal>
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClose when clicking outside the modal", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal content
      </Modal>
    );
    
    // Click on the backdrop (the parent div with the flex class)
    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal content
      </Modal>
    );
    
    // Click on the modal content
    fireEvent.click(screen.getByText("Modal content"));
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        Modal content
      </Modal>
    );
    
    let modalElement = screen.getByRole("document");
    expect(modalElement).toHaveClass("max-w-md");
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        Modal content
      </Modal>
    );
    
    modalElement = screen.getByRole("document");
    expect(modalElement).toHaveClass("max-w-2xl");
  });
});
