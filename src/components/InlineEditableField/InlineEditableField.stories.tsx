import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineEditableField } from "./InlineEditableField";

const meta: Meta<typeof InlineEditableField> = {
  title: "Components/InlineEditableField",
  component: InlineEditableField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InlineEditableField>;

function SettingsRow() {
  const [name, setName] = useState("Acme Corp");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
      <label style={{ fontSize: 12, opacity: 0.6 }}>Workspace name</label>
      <InlineEditableField
        value={name}
        ariaLabel="Workspace name"
        onSave={(next) =>
          new Promise<void>((resolve) => setTimeout(() => {
            setName(next);
            resolve();
          }, 300))
        }
      />
    </div>
  );
}

function FailingSave() {
  const [value, setValue] = useState("Won't actually save");

  return (
    <div style={{ maxWidth: 320 }}>
      <InlineEditableField
        value={value}
        ariaLabel="Field that always fails to save"
        onSave={() =>
          new Promise<void>((_, reject) => setTimeout(reject, 300))
        }
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <SettingsRow />,
};

export const SaveFails: Story = {
  render: () => <FailingSave />,
};

export const EmptyValue: Story = {
  args: {
    value: "",
    placeholder: "Add a description",
    onSave: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: "Locked field",
    disabled: true,
    onSave: () => {},
  },
};
