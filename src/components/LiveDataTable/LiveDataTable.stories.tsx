import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveDataTable, type DataTableColumn } from "./LiveDataTable";

const meta: Meta<typeof LiveDataTable> = {
  title: "Components/LiveDataTable",
  component: LiveDataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveDataTable>;

interface ServiceRow {
  id: string;
  name: string;
  requests: number;
  latencyMs: number;
  version: number;
}

const INITIAL: ServiceRow[] = [
  { id: "auth", name: "auth-service", requests: 1240, latencyMs: 82, version: 0 },
  { id: "billing", name: "billing-service", requests: 340, latencyMs: 210, version: 0 },
  { id: "search", name: "search-service", requests: 5602, latencyMs: 45, version: 0 },
  { id: "notify", name: "notification-service", requests: 890, latencyMs: 120, version: 0 },
  { id: "media", name: "media-service", requests: 2210, latencyMs: 66, version: 0 },
];

const columns: DataTableColumn<ServiceRow>[] = [
  { key: "name", header: "Service", render: (row) => row.name, sortValue: (row) => row.name },
  {
    key: "requests",
    header: "Requests / min",
    render: (row) => row.requests.toLocaleString(),
    sortValue: (row) => row.requests,
  },
  {
    key: "latency",
    header: "p95 latency",
    render: (row) => `${row.latencyMs}ms`,
    sortValue: (row) => row.latencyMs,
  },
];

function LiveDemo() {
  const [rows, setRows] = useState(INITIAL);

  const simulateUpdate = () => {
    setRows((prev) => {
      const index = Math.floor(Math.random() * prev.length);
      const next = [...prev];
      const row = next[index];
      next[index] = {
        ...row,
        requests: Math.max(0, row.requests + Math.floor((Math.random() - 0.3) * 800)),
        latencyMs: Math.max(10, row.latencyMs + Math.floor((Math.random() - 0.5) * 40)),
        version: row.version + 1,
      };
      return next;
    });
  };

  return (
    <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 12 }}>
      <button onClick={simulateUpdate} style={{ alignSelf: "flex-start" }}>
        Simulate a live update
      </button>
      <LiveDataTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        getRowVersion={(row) => row.version}
      />
    </div>
  );
}

export const SortableAndLive: Story = {
  render: () => <LiveDemo />,
};

export const Static: Story = {
  args: {
    rows: INITIAL,
    columns,
    getRowId: (row: ServiceRow) => row.id,
  },
};
