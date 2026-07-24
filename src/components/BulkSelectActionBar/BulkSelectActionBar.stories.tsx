import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BulkSelectActionBar } from "./BulkSelectActionBar";

const meta: Meta<typeof BulkSelectActionBar> = {
  title: "Components/BulkSelectActionBar",
  component: BulkSelectActionBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BulkSelectActionBar>;

interface Row {
  id: number;
  name: string;
  email: string;
}

const ROWS: Row[] = [
  { id: 1, name: "Ava Chen", email: "ava@example.com" },
  { id: 2, name: "Liam Patel", email: "liam@example.com" },
  { id: 3, name: "Noor Haddad", email: "noor@example.com" },
  { id: 4, name: "Mateo Rossi", email: "mateo@example.com" },
  { id: 5, name: "Sofia Kim", email: "sofia@example.com" },
];

function TableWithBulkSelect() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ width: 32 }} />
            <th style={{ textAlign: "left", padding: "8px 4px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "8px 4px" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.id} style={{ borderTop: "1px solid #e2e8f0" }}>
              <td style={{ padding: "8px 4px" }}>
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggle(row.id)}
                />
              </td>
              <td style={{ padding: "8px 4px" }}>{row.name}</td>
              <td style={{ padding: "8px 4px" }}>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BulkSelectActionBar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        actions={[
          {
            key: "archive",
            label: "Archive",
            onClick: () => setSelected(new Set()),
          },
          {
            key: "delete",
            label: "Delete",
            variant: "danger",
            onClick: () => setSelected(new Set()),
          },
        ]}
      />
    </div>
  );
}

export const InATable: Story = {
  render: () => <TableWithBulkSelect />,
};

export const Static: Story = {
  args: {
    count: 3,
    actions: [
      { key: "archive", label: "Archive", onClick: () => {} },
      { key: "export", label: "Export", onClick: () => {} },
      { key: "delete", label: "Delete", variant: "danger", onClick: () => {} },
    ],
    onClear: () => {},
  },
};
