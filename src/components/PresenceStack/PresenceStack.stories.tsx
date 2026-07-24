import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PresenceStack, type PresenceUser } from "./PresenceStack";

const meta: Meta<typeof PresenceStack> = {
  title: "Components/PresenceStack",
  component: PresenceStack,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PresenceStack>;

const POOL: PresenceUser[] = [
  { id: "1", name: "Ava Chen", active: true },
  { id: "2", name: "Liam Patel" },
  { id: "3", name: "Noor Haddad", active: true },
  { id: "4", name: "Mateo Rossi" },
  { id: "5", name: "Sofia Kim" },
  { id: "6", name: "Ken Watanabe" },
  { id: "7", name: "Priya Nair" },
];

function JoinLeaveDemo() {
  const [count, setCount] = useState(3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <PresenceStack users={POOL.slice(0, count)} max={5} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setCount((c) => Math.min(POOL.length, c + 1))}>
          Add collaborator
        </button>
        <button onClick={() => setCount((c) => Math.max(0, c - 1))}>
          Remove collaborator
        </button>
      </div>
    </div>
  );
}

export const JoinAndLeave: Story = {
  render: () => <JoinLeaveDemo />,
};

export const WithOverflow: Story = {
  args: { users: POOL, max: 4 },
};

export const Empty: Story = {
  args: { users: [] },
};
