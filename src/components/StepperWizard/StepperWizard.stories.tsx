import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StepperWizard, type WizardStep } from "./StepperWizard";

const meta: Meta<typeof StepperWizard> = {
  title: "Components/StepperWizard",
  component: StepperWizard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StepperWizard>;

function Demo() {
  const [index, setIndex] = useState(0);

  const steps: WizardStep[] = [
    { key: "account", label: "Account", content: <p>Create your account details.</p> },
    { key: "workspace", label: "Workspace", content: <p>Name your workspace.</p> },
    { key: "invite", label: "Invite", content: <p>Invite your team.</p> },
    { key: "done", label: "Done", content: <p>You're all set!</p> },
  ];

  return (
    <div style={{ maxWidth: 420 }}>
      <StepperWizard steps={steps} activeIndex={index} />
      <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
        <button disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Back
        </button>
        <button
          disabled={index === steps.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
