import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplitPane } from "./SplitPane";

const meta: Meta<typeof SplitPane> = {
  title: "Components/SplitPane",
  component: SplitPane,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

const panelStyle: React.CSSProperties = {
  height: "100%",
  padding: 16,
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  fontSize: 14,
};

export const Default: Story = {
  render: () => (
    <div style={{ height: 320, border: "1px solid #e2e8f0" }}>
      <SplitPane
        left={
          <div style={{ ...panelStyle, backgroundColor: "#f8fafc" }}>
            <strong>Sidebar</strong>
            <p>Drag the divider. Double-click it to reset to the default split.</p>
          </div>
        }
        right={
          <div style={{ ...panelStyle, backgroundColor: "#ffffff" }}>
            <strong>Main content</strong>
            <p>Resizes to fill whatever space the left pane doesn't take.</p>
          </div>
        }
      />
    </div>
  ),
};

export const NarrowDefault: Story = {
  render: () => (
    <div style={{ height: 320, border: "1px solid #e2e8f0" }}>
      <SplitPane
        defaultSplit={0.25}
        min={120}
        left={<div style={{ ...panelStyle, backgroundColor: "#f8fafc" }}>Narrow sidebar</div>}
        right={<div style={{ ...panelStyle, backgroundColor: "#ffffff" }}>Wide content</div>}
      />
    </div>
  ),
};
