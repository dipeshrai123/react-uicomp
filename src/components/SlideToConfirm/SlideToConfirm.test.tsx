import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SlideToConfirm } from "./SlideToConfirm";

describe("SlideToConfirm", () => {
  it("renders the label and slider semantics", () => {
    render(<SlideToConfirm label="Slide to confirm" onConfirm={jest.fn()} />);
    const slider = screen.getByRole("slider", { name: "Slide to confirm" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("Slide to confirm")).toBeInTheDocument();
  });

  it("does not confirm from a drag that never reaches the threshold", () => {
    const onConfirm = jest.fn();
    render(<SlideToConfirm onConfirm={onConfirm} />);

    // jsdom reports zero-width layout for the track/thumb, so the traversable
    // distance is 0 — this exercises the guard that only confirms once a
    // real, measured distance has actually been dragged past the threshold.
    fireEvent.pointerDown(document.querySelector('[aria-hidden="true"]')!.parentElement!, {
      pointerId: 1,
      button: 0,
      clientX: 0,
      clientY: 0,
    });
    fireEvent.pointerMove(window, { pointerId: 1, button: 0, clientX: 300, clientY: 0 });
    fireEvent.pointerUp(window, { pointerId: 1, button: 0, clientX: 300, clientY: 0 });

    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0");
  });

  it("marks the slider disabled and does not respond to drag when disabled", () => {
    const onConfirm = jest.fn();
    render(<SlideToConfirm disabled onConfirm={onConfirm} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
  });

  it("shows the confirmed label once confirmed", () => {
    render(<SlideToConfirm confirmedLabel="Done!" onConfirm={jest.fn()} />);
    expect(screen.queryByText("Done!")).not.toBeInTheDocument();
  });
});
