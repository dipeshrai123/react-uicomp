import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { OptimisticToggle } from "./OptimisticToggle";

const meta: Meta<typeof OptimisticToggle> = {
  title: "Components/OptimisticToggle",
  component: OptimisticToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OptimisticToggle>;

function AlwaysSucceeds() {
  const [checked, setChecked] = useState(false);
  return (
    <OptimisticToggle
      checked={checked}
      label="Email notifications"
      onChange={(next) =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            setChecked(next);
            resolve();
          }, 400),
        )
      }
    />
  );
}

function AlwaysRejects() {
  const [checked, setChecked] = useState(false);
  return (
    <OptimisticToggle
      checked={checked}
      label="Setting the server always rejects"
      onChange={() =>
        new Promise<void>((_, reject) => setTimeout(reject, 400))
      }
    />
  );
}

export const Default: Story = {
  render: () => <AlwaysSucceeds />,
};

export const ServerRejects: Story = {
  render: () => <AlwaysRejects />,
};

export const Disabled: Story = {
  args: { checked: true, label: "Locked setting", disabled: true, onChange: () => {} },
};
