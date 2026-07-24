import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CellGrid } from "./CellGrid";

describe("CellGrid", () => {
  it("renders a cell per row/column and selects the first cell by default", () => {
    render(
      <CellGrid rows={2} columns={2} renderCell={(row, col) => `${row}-${col}`} />,
    );
    const cells = screen.getAllByRole("gridcell");
    expect(cells).toHaveLength(4);
    expect(cells[0]).toHaveAttribute("aria-selected", "true");
    expect(cells[1]).toHaveAttribute("aria-selected", "false");
  });

  it("selects a cell on click and calls onSelect", () => {
    const onSelect = jest.fn();
    render(
      <CellGrid
        rows={2}
        columns={2}
        renderCell={(row, col) => `${row}-${col}`}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("1-1"));
    expect(screen.getByText("1-1").closest('[role="gridcell"]')).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(onSelect).toHaveBeenCalledWith(1, 1);
  });

  it("moves the selection with arrow keys", () => {
    render(<CellGrid rows={2} columns={2} renderCell={(row, col) => `${row}-${col}`} />);
    const grid = screen.getByRole("grid");
    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(screen.getByText("0-1").closest('[role="gridcell"]')).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.keyDown(grid, { key: "ArrowDown" });
    expect(screen.getByText("1-1").closest('[role="gridcell"]')).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("clamps navigation at the grid edges", () => {
    render(<CellGrid rows={2} columns={2} renderCell={(row, col) => `${row}-${col}`} />);
    const grid = screen.getByRole("grid");
    fireEvent.keyDown(grid, { key: "ArrowUp" });
    fireEvent.keyDown(grid, { key: "ArrowLeft" });
    expect(screen.getByText("0-0").closest('[role="gridcell"]')).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
