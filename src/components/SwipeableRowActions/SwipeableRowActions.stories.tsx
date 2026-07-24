import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwipeableRowActions } from "./SwipeableRowActions";

const meta: Meta<typeof SwipeableRowActions> = {
  title: "Components/SwipeableRowActions",
  component: SwipeableRowActions,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SwipeableRowActions>;

const rowStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid #e2e8f0",
};

export const Inbox: Story = {
  render: () => (
    <div style={{ maxWidth: 380, border: "1px solid #e2e8f0" }}>
      {["Ava Chen", "Liam Patel", "Noor Haddad"].map((name) => (
        <SwipeableRowActions
          key={name}
          actions={[
            { key: "archive", label: "Archive", onClick: () => {} },
            { key: "delete", label: "Delete", variant: "danger", onClick: () => {} },
          ]}
        >
          <div style={rowStyle}>
            <strong>{name}</strong>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Swipe left to reveal actions</div>
          </div>
        </SwipeableRowActions>
      ))}
    </div>
  ),
};
