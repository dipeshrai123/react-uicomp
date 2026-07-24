import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OptimisticToggle } from "./OptimisticToggle";

describe("OptimisticToggle", () => {
  it("flips immediately (optimistically) on click", () => {
    render(<OptimisticToggle checked={false} onChange={() => new Promise(() => {})} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with the new value", async () => {
    const onChange = jest.fn().mockResolvedValue(undefined);
    render(<OptimisticToggle checked={false} onChange={onChange} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("switch"));
    });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("reverts to the previous state when onChange rejects", async () => {
    const onChange = jest.fn().mockRejectedValue(new Error("denied"));
    render(<OptimisticToggle checked={false} onChange={onChange} />);
    const toggle = screen.getByRole("switch");
    await act(async () => {
      fireEvent.click(toggle);
    });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("does not respond to clicks while disabled", () => {
    const onChange = jest.fn();
    render(<OptimisticToggle checked={false} disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("ignores clicks while a change is still pending", () => {
    const onChange = jest.fn(() => new Promise<void>(() => {}));
    render(<OptimisticToggle checked={false} onChange={onChange} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the label", () => {
    render(
      <OptimisticToggle checked label="Email notifications" onChange={jest.fn()} />,
    );
    expect(screen.getByText("Email notifications")).toBeInTheDocument();
  });

  it("syncs to an externally updated checked prop", () => {
    const { rerender } = render(
      <OptimisticToggle checked={false} onChange={jest.fn()} />,
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    rerender(<OptimisticToggle checked={true} onChange={jest.fn()} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});
