import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SplitPane } from "./SplitPane";

describe("SplitPane", () => {
  it("renders the left and right content", () => {
    render(<SplitPane left={<div>Sidebar</div>} right={<div>Main content</div>} />);
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("exposes separator semantics on the divider", () => {
    render(<SplitPane left={<div />} right={<div />} />);
    const divider = screen.getByRole("separator", { name: "Resize panes" });
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("tracks the drag by updating the left pane's width live", () => {
    const { container } = render(
      <SplitPane left={<div>Sidebar</div>} right={<div />} min={160} />,
    );
    const divider = screen.getByRole("separator");
    const leftPane = container.querySelector("div")!.firstElementChild as HTMLElement;
    const initialWidth = leftPane.style.width;

    fireEvent.pointerDown(divider, { pointerId: 1, button: 0, clientX: 200, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, button: 0, clientX: 260, clientY: 0 });

    expect(leftPane.style.width).not.toBe(initialWidth);
    expect(Number.isFinite(parseFloat(leftPane.style.width))).toBe(true);

    fireEvent.pointerUp(window, { pointerId: 1, button: 0, clientX: 260, clientY: 0 });
  });

  it("does not throw when the divider is double-clicked to reset", () => {
    render(<SplitPane left={<div />} right={<div />} />);
    const divider = screen.getByRole("separator");
    expect(() => fireEvent.doubleClick(divider)).not.toThrow();
  });
});
