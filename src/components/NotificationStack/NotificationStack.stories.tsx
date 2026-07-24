import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationStack, type ToastItem } from "./NotificationStack";

const meta: Meta<typeof NotificationStack> = {
  title: "Components/NotificationStack",
  component: NotificationStack,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationStack>;

let counter = 0;

function Demo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = (variant: ToastItem["variant"], title: string) => {
    counter++;
    setToasts((prev) => [
      ...prev,
      { id: String(counter), title, description: "Just now", variant },
    ]);
  };

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => push("success", "Deploy succeeded")}>Success toast</button>
        <button onClick={() => push("default", "New comment on PR #482")}>Default toast</button>
        <button onClick={() => push("danger", "Build failed")}>Danger toast</button>
      </div>
      <NotificationStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
