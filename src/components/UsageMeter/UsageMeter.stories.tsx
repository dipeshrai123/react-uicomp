import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { UsageMeter } from "./UsageMeter";

const meta: Meta<typeof UsageMeter> = {
  title: "Components/UsageMeter",
  component: UsageMeter,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UsageMeter>;

function IncrementingUsage() {
  const [value, setValue] = useState(40);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <UsageMeter value={value} max={100} label="API requests" />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setValue((v) => Math.max(0, v - 15))}>-15</button>
        <button onClick={() => setValue((v) => Math.min(120, v + 15))}>+15</button>
      </div>
    </div>
  );
}

export const CrossingThresholds: Story = {
  render: () => <IncrementingUsage />,
};

export const Normal: Story = {
  args: { value: 40, max: 100, label: "Storage" },
};

export const Warning: Story = {
  args: { value: 85, max: 100, label: "Storage" },
};

export const OverLimit: Story = {
  args: { value: 110, max: 100, label: "Storage" },
};

export const CustomFormat: Story = {
  args: {
    value: 3.2,
    max: 5,
    label: "Bandwidth",
    formatValue: (value, max) => `${value.toFixed(1)}GB of ${max}GB`,
  },
};
