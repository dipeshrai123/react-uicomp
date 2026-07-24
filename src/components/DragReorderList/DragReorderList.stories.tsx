import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DragReorderList } from "./DragReorderList";

const meta: Meta<typeof DragReorderList> = {
  title: "Components/DragReorderList",
  component: DragReorderList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DragReorderList>;

interface Task {
  id: string;
  title: string;
}

const INITIAL: Task[] = [
  { id: "1", title: "Design onboarding flow" },
  { id: "2", title: "Fix billing webhook retries" },
  { id: "3", title: "Write Q3 roadmap doc" },
  { id: "4", title: "Review PR #482" },
  { id: "5", title: "Ship dark mode" },
];

function PriorityList() {
  const [items, setItems] = useState(INITIAL);

  return (
    <div style={{ maxWidth: 420, border: "1px solid #e2e8f0" }}>
      <DragReorderList
        items={items}
        getId={(item) => item.id}
        onReorder={setItems}
        itemHeight={48}
        renderItem={(item, isDragging) => (
          <div
            style={{
              padding: "0 16px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: isDragging ? 0.9 : 1,
            }}
          >
            <span aria-hidden="true">⠿</span>
            <span>{item.title}</span>
          </div>
        )}
      />
    </div>
  );
}

export const PriorityQueue: Story = {
  render: () => <PriorityList />,
};
