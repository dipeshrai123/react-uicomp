import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UsageMeter } from "./UsageMeter";

describe("UsageMeter", () => {
  it("renders the label and default formatted value", () => {
    render(<UsageMeter value={40} max={100} label="API requests" />);
    expect(screen.getByText("API requests")).toBeInTheDocument();
    expect(screen.getByText("40 / 100")).toBeInTheDocument();
  });

  it("supports a custom value formatter", () => {
    render(
      <UsageMeter
        value={3.2}
        max={5}
        label="Bandwidth"
        formatValue={(value, max) => `${value.toFixed(1)}GB of ${max}GB`}
      />,
    );
    expect(screen.getByText("3.2GB of 5GB")).toBeInTheDocument();
  });

  it("exposes progressbar semantics", () => {
    render(<UsageMeter value={40} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("omits the header row when no label or formatter is given", () => {
    render(<UsageMeter value={40} max={100} />);
    expect(screen.queryByText("40 / 100")).not.toBeInTheDocument();
  });
});
