import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NotificationStack, type ToastItem } from "./NotificationStack";

const TOASTS: ToastItem[] = [
  { id: "1", title: "Deploy succeeded", description: "Just now", variant: "success" },
  { id: "2", title: "Build failed", variant: "danger" },
];

describe("NotificationStack", () => {
  it("renders every toast's title and description", () => {
    render(<NotificationStack toasts={TOASTS} onDismiss={jest.fn()} />);
    expect(screen.getByText("Deploy succeeded")).toBeInTheDocument();
    expect(screen.getByText("Just now")).toBeInTheDocument();
    expect(screen.getByText("Build failed")).toBeInTheDocument();
  });

  it("calls onDismiss when the close button is clicked", () => {
    const onDismiss = jest.fn();
    render(<NotificationStack toasts={TOASTS} onDismiss={onDismiss} />);
    fireEvent.click(screen.getAllByRole("button", { name: "Dismiss" })[0]);
    expect(onDismiss).toHaveBeenCalledWith("1");
  });

  it("calls onDismiss after a swipe drag", () => {
    const onDismiss = jest.fn();
    render(<NotificationStack toasts={TOASTS} onDismiss={onDismiss} />);
    const toast = screen.getByText("Deploy succeeded").closest('[class*="toast"]') as HTMLElement;

    fireEvent.pointerDown(toast, { pointerId: 1, button: 0, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, button: 0, clientX: 40, clientY: 0 });
    fireEvent.pointerUp(window, { pointerId: 1, button: 0, clientX: 40, clientY: 0 });

    expect(onDismiss).toHaveBeenCalledWith("1");
  });

  it("renders nothing when there are no toasts", () => {
    render(<NotificationStack toasts={[]} onDismiss={jest.fn()} />);
    expect(screen.getByRole("region", { name: "Notifications" })).toBeEmptyDOMElement();
  });
});
