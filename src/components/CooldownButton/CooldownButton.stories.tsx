import type { Meta, StoryObj } from "@storybook/react-vite";
import { CooldownButton } from "./CooldownButton";

const meta: Meta<typeof CooldownButton> = {
  title: "Components/CooldownButton",
  component: CooldownButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CooldownButton>;

export const ResendCode: Story = {
  args: {
    cooldownMs: 4000,
    onClick: () => {},
    children: "Resend code",
  },
};

export const Secondary: Story = {
  args: {
    cooldownMs: 4000,
    variant: "secondary",
    onClick: () => {},
    children: "Retry",
  },
};
