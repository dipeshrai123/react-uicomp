import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BulkSelectActionBar } from "./BulkSelectActionBar";

describe("BulkSelectActionBar", () => {
  it("renders nothing when count is 0", () => {
    render(
      <BulkSelectActionBar
        count={0}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("shows the bar with the selected count once count is above 0", () => {
    render(
      <BulkSelectActionBar
        count={3}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("items selected")).toBeInTheDocument();
  });

  it("uses singular label text for a single selection", () => {
    render(
      <BulkSelectActionBar
        count={1}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    expect(screen.getByText("item selected")).toBeInTheDocument();
  });

  it("supports a custom label", () => {
    render(
      <BulkSelectActionBar
        count={2}
        label={(count) => `${count} rows`}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    expect(screen.getByText("2 rows")).toBeInTheDocument();
  });

  it("fires each action's onClick", () => {
    const onDelete = jest.fn();
    render(
      <BulkSelectActionBar
        count={2}
        actions={[{ key: "delete", label: "Delete", onClick: onDelete }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick for a disabled action", () => {
    const onArchive = jest.fn();
    render(
      <BulkSelectActionBar
        count={2}
        actions={[
          { key: "archive", label: "Archive", onClick: onArchive, disabled: true },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Archive" }));
    expect(onArchive).not.toHaveBeenCalled();
  });

  it("renders the clear button and fires onClear", () => {
    const onClear = jest.fn();
    render(
      <BulkSelectActionBar
        count={2}
        onClear={onClear}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("omits the clear button when onClear is not provided", () => {
    render(
      <BulkSelectActionBar
        count={2}
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Clear selection" }),
    ).not.toBeInTheDocument();
  });
});
