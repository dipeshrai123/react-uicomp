import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StepperWizard, type WizardStep } from "./StepperWizard";

const STEPS: WizardStep[] = [
  { key: "a", label: "Account", content: <p>Account content</p> },
  { key: "b", label: "Workspace", content: <p>Workspace content</p> },
  { key: "c", label: "Invite", content: <p>Invite content</p> },
];

describe("StepperWizard", () => {
  it("renders every step label and only the active step's content", () => {
    render(<StepperWizard steps={STEPS} activeIndex={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByText("Invite")).toBeInTheDocument();
    expect(screen.getByText("Account content")).toBeInTheDocument();
    expect(screen.queryByText("Workspace content")).not.toBeInTheDocument();
  });

  it("shows the new step's content when activeIndex changes", () => {
    const { rerender } = render(<StepperWizard steps={STEPS} activeIndex={0} />);
    rerender(<StepperWizard steps={STEPS} activeIndex={1} />);
    expect(screen.getByText("Workspace content")).toBeInTheDocument();
  });

  it("marks the current and completed step dots as done", () => {
    render(<StepperWizard steps={STEPS} activeIndex={1} />);
    const dots = screen.getAllByText(/^[123]$/);
    expect(dots[0]).toHaveClass("dotDone");
    expect(dots[1]).toHaveClass("dotDone");
    expect(dots[2]).not.toHaveClass("dotDone");
  });

  it("does not throw when navigating backward", () => {
    const { rerender } = render(<StepperWizard steps={STEPS} activeIndex={2} />);
    expect(() => rerender(<StepperWizard steps={STEPS} activeIndex={0} />)).not.toThrow();
    expect(screen.getByText("Account content")).toBeInTheDocument();
  });
});
