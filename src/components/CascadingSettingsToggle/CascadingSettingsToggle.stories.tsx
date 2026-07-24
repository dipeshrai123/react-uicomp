import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CascadingSettingsToggle } from "./CascadingSettingsToggle";

const meta: Meta<typeof CascadingSettingsToggle> = {
  title: "Components/CascadingSettingsToggle",
  component: CascadingSettingsToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CascadingSettingsToggle>;

function NotificationSettings() {
  const [enabled, setEnabled] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(true);

  return (
    <div style={{ maxWidth: 420 }}>
      <CascadingSettingsToggle
        parent={{
          label: "Notifications",
          description: "Turn all notification channels on or off.",
          checked: enabled,
          onChange: setEnabled,
        }}
        children={[
          {
            key: "email",
            label: "Email",
            description: "Order and account updates.",
            checked: email,
            onChange: setEmail,
          },
          {
            key: "sms",
            label: "SMS",
            description: "Delivery alerts only.",
            checked: sms,
            onChange: setSms,
          },
          {
            key: "push",
            label: "Push",
            description: "Real-time in-app alerts.",
            checked: push,
            onChange: setPush,
          },
        ]}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <NotificationSettings />,
};
