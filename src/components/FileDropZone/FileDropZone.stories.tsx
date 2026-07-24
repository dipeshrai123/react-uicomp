import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileDropZone } from "./FileDropZone";

const meta: Meta<typeof FileDropZone> = {
  title: "Components/FileDropZone",
  component: FileDropZone,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileDropZone>;

function Demo() {
  const [names, setNames] = useState<string[]>([]);

  return (
    <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 12 }}>
      <FileDropZone onFiles={(files) => setNames(files.map((f) => f.name))} />
      {names.length > 0 && (
        <ul style={{ fontSize: 13 }}>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const Disabled: Story = {
  args: { disabled: true, onFiles: () => {} },
};
