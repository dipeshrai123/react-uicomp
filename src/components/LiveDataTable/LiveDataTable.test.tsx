import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LiveDataTable, type DataTableColumn } from "./LiveDataTable";

interface Row {
  id: string;
  name: string;
  count: number;
}

const ROWS: Row[] = [
  { id: "b", name: "Banana", count: 5 },
  { id: "a", name: "Apple", count: 20 },
  { id: "c", name: "Cherry", count: 10 },
];

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", render: (row) => row.name, sortValue: (row) => row.name },
  { key: "count", header: "Count", render: (row) => String(row.count) },
];

function bodyRowNames() {
  return screen.getAllByRole("row").slice(1).map((row) => row.querySelector("td")?.textContent);
}

describe("LiveDataTable", () => {
  it("renders a row per item and a header per column", () => {
    render(<LiveDataTable rows={ROWS} columns={columns} getRowId={(r) => r.id} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Count")).toBeInTheDocument();
    expect(bodyRowNames()).toEqual(["Banana", "Apple", "Cherry"]);
  });

  it("sorts ascending then descending then back to original order on repeated header clicks", () => {
    render(<LiveDataTable rows={ROWS} columns={columns} getRowId={(r) => r.id} />);
    const nameHeader = screen.getByText("Name");

    fireEvent.click(nameHeader);
    expect(bodyRowNames()).toEqual(["Apple", "Banana", "Cherry"]);
    expect(nameHeader.closest("th")).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(nameHeader);
    expect(bodyRowNames()).toEqual(["Cherry", "Banana", "Apple"]);
    expect(nameHeader.closest("th")).toHaveAttribute("aria-sort", "descending");

    fireEvent.click(nameHeader);
    expect(bodyRowNames()).toEqual(["Banana", "Apple", "Cherry"]);
    expect(nameHeader.closest("th")).not.toHaveAttribute("aria-sort");
  });

  it("does not sort when clicking a column with no sortValue", () => {
    render(<LiveDataTable rows={ROWS} columns={columns} getRowId={(r) => r.id} />);
    fireEvent.click(screen.getByText("Count"));
    expect(bodyRowNames()).toEqual(["Banana", "Apple", "Cherry"]);
  });

  it("does not throw when a row's version changes", () => {
    const { rerender } = render(
      <LiveDataTable
        rows={ROWS}
        columns={columns}
        getRowId={(r) => r.id}
        getRowVersion={() => 0}
      />,
    );
    expect(() =>
      rerender(
        <LiveDataTable
          rows={ROWS}
          columns={columns}
          getRowId={(r) => r.id}
          getRowVersion={(row) => (row.id === "a" ? 1 : 0)}
        />,
      ),
    ).not.toThrow();
  });
});
