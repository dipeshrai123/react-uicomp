import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DragReorderList } from "./DragReorderList";

interface Item {
  id: string;
  title: string;
}

const ITEMS: Item[] = [
  { id: "a", title: "Alpha" },
  { id: "b", title: "Beta" },
  { id: "c", title: "Gamma" },
];

describe("DragReorderList", () => {
  it("renders every item", () => {
    render(
      <DragReorderList
        items={ITEMS}
        getId={(item) => item.id}
        onReorder={jest.fn()}
        itemHeight={48}
        renderItem={(item) => item.title}
      />,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("reorders the array when an item is dragged past a neighbor", () => {
    const onReorder = jest.fn();
    render(
      <DragReorderList
        items={ITEMS}
        getId={(item) => item.id}
        onReorder={onReorder}
        itemHeight={48}
        renderItem={(item) => item.title}
      />,
    );

    const alpha = screen.getByText("Alpha");
    fireEvent.pointerDown(alpha, { pointerId: 1, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, clientX: 0, clientY: 20 });
    fireEvent.pointerMove(window, { pointerId: 1, clientX: 0, clientY: 60 });

    expect(onReorder).toHaveBeenCalledWith([
      { id: "b", title: "Beta" },
      { id: "a", title: "Alpha" },
      { id: "c", title: "Gamma" },
    ]);
  });

  it("does not reorder for small movements under half the item height", () => {
    const onReorder = jest.fn();
    render(
      <DragReorderList
        items={ITEMS}
        getId={(item) => item.id}
        onReorder={onReorder}
        itemHeight={48}
        renderItem={(item) => item.title}
      />,
    );

    const alpha = screen.getByText("Alpha");
    fireEvent.pointerDown(alpha, { pointerId: 1, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 1, clientX: 0, clientY: 10 });

    expect(onReorder).not.toHaveBeenCalled();
  });

  it("does not throw when the drag ends", () => {
    render(
      <DragReorderList
        items={ITEMS}
        getId={(item) => item.id}
        onReorder={jest.fn()}
        itemHeight={48}
        renderItem={(item) => item.title}
      />,
    );
    const alpha = screen.getByText("Alpha");
    expect(() => {
      fireEvent.pointerDown(alpha, { pointerId: 1, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(window, { pointerId: 1, clientX: 0, clientY: 60 });
      fireEvent.pointerUp(window, { pointerId: 1, clientX: 0, clientY: 60 });
    }).not.toThrow();
  });
});
