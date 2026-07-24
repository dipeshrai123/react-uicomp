import type { Meta, StoryObj } from "@storybook/react-vite";
import { CellGrid } from "./CellGrid";

const meta: Meta<typeof CellGrid> = {
  title: "Components/CellGrid",
  component: CellGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CellGrid>;

const DATA = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 4 }, (_, col) => `R${row + 1}C${col + 1}`),
);

export const Spreadsheet: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <p style={{ fontSize: 13, opacity: 0.7 }}>Click a cell, then use the arrow keys.</p>
      <CellGrid rows={6} columns={4} renderCell={(row, col) => DATA[row][col]} />
    </div>
  ),
};
