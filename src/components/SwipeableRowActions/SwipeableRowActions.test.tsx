import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SwipeableRowActions } from "./SwipeableRowActions";

describe("SwipeableRowActions", () => {
  it("renders children content and actions", () => {
    render(
      <SwipeableRowActions
        actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}
      >
        <div>Ava Chen</div>
      </SwipeableRowActions>,
    );
    expect(screen.getByText("Ava Chen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls an action's onClick when clicked", () => {
    const onDelete = jest.fn();
    render(
      <SwipeableRowActions actions={[{ key: "delete", label: "Delete", onClick: onDelete }]}>
        <div>Row</div>
      </SwipeableRowActions>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("follows the drag by translating the content within the action bounds", () => {
    render(
      <SwipeableRowActions actions={[{ key: "delete", label: "Delete", onClick: jest.fn() }]}>
        <div>Row</div>
      </SwipeableRowActions>,
    );
    // The draggable surface is the wrapper the gesture is attached to, one
    // level up from the row's own content.
    const content = screen.getByText("Row").parentElement as HTMLElement;

    fireEvent.pointerDown(content, { pointerId: 1, button: 0, clientX: 300, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, button: 0, clientX: 260, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, button: 0, clientX: 250, clientY: 0 });

    expect(content.style.transform).toBe("translateX(-50px)");

    fireEvent.pointerUp(window, { pointerId: 1, button: 0, clientX: 250, clientY: 0 });
  });

  it("renders multiple actions with the correct variant classes applied", () => {
    render(
      <SwipeableRowActions
        actions={[
          { key: "archive", label: "Archive", onClick: jest.fn() },
          { key: "delete", label: "Delete", variant: "danger", onClick: jest.fn() },
        ]}
      >
        <div>Row</div>
      </SwipeableRowActions>,
    );
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
