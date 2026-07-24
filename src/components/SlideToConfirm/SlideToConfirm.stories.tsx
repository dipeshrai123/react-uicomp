import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideToConfirm } from "./SlideToConfirm";

const meta: Meta<typeof SlideToConfirm> = {
  title: "Components/SlideToConfirm",
  component: SlideToConfirm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideToConfirm>;

function DeleteProductionDemo() {
  const [deleted, setDeleted] = useState(false);

  return (
    <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 12 }}>
      <SlideToConfirm
        label="Slide to delete production database"
        confirmedLabel="Database deleted"
        onConfirm={() => setDeleted(true)}
      />
      <p style={{ fontSize: 13, opacity: 0.7 }}>
        {deleted ? "onConfirm fired." : "Not confirmed yet."}
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => <DeleteProductionDemo />,
};

export const Disabled: Story = {
  args: { disabled: true, onConfirm: () => {} },
};
