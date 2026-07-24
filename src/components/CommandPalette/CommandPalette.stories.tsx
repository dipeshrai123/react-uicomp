import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandPalette, type Command } from "./CommandPalette";

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

function Demo() {
  const [open, setOpen] = useState(false);
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const commands: Command[] = [
    { id: "new-project", label: "Create new project", shortcut: "⌘N", onSelect: () => setLastSelected("Create new project") },
    { id: "invite", label: "Invite teammate", shortcut: "⌘I", onSelect: () => setLastSelected("Invite teammate") },
    { id: "billing", label: "Go to billing settings", onSelect: () => setLastSelected("Go to billing settings") },
    { id: "docs", label: "Open documentation", onSelect: () => setLastSelected("Open documentation") },
    { id: "logout", label: "Log out", onSelect: () => setLastSelected("Log out") },
  ];

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open palette (or press ⌘K / Ctrl+K)</button>
      <p>Last selected: {lastSelected ?? "none"}</p>
      <CommandPalette commands={commands} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
