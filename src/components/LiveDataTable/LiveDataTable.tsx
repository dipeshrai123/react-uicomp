import * as React from "react";
import { animate, useValue, withSequence, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./LiveDataTable.module.css";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  render: (row: T) => React.ReactNode;
  /** Enables clicking the header to sort by this column. */
  sortValue?: (row: T) => string | number;
}

export interface LiveDataTableProps<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  /** Returns a value that changes whenever a row's data changes, to trigger the update flash. */
  getRowVersion?: (row: T) => string | number;
  className?: string;
  style?: React.CSSProperties;
}

type SortDirection = "asc" | "desc";

const FLIP_SPRING = { stiffness: 500, damping: 40 };
const FLASH_IN = { stiffness: 400, damping: 30 };
const FLASH_OUT = { stiffness: 120, damping: 22 };

function Row<T>({
  row,
  columns,
  version,
}: {
  row: T;
  columns: DataTableColumn<T>[];
  version: string | number | undefined;
}) {
  const rowRef = React.useRef<HTMLTableRowElement>(null);
  const prevTopRef = React.useRef<number | null>(null);
  const prevVersionRef = React.useRef(version);
  const [translateY, setTranslateY] = useValue(0);
  const [flash, setFlash] = useValue(0);

  // Classic FLIP: diff this row's DOM position against where it was last
  // commit, snap it back to the old spot with no animation, then spring it
  // to rest — so a sort/filter/live update reads as the row *moving* there
  // instead of the table just snapping to a new arrangement.
  React.useLayoutEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const newTop = node.getBoundingClientRect().top;
    const prevTop = prevTopRef.current;

    if (prevTop !== null && Math.abs(prevTop - newTop) > 0.5) {
      setTranslateY(prevTop - newTop);
      setTranslateY(withSpring(0, FLIP_SPRING));
    }

    prevTopRef.current = newTop;
  });

  React.useEffect(() => {
    const prevVersion = prevVersionRef.current;
    if (prevVersion !== undefined && version !== undefined && prevVersion !== version) {
      setFlash(withSequence([withSpring(1, FLASH_IN), withSpring(0, FLASH_OUT)]));
    }
    prevVersionRef.current = version;
  }, [version, setFlash]);

  return (
    <animate.tr ref={rowRef} className={styles.row} style={{ translateY }}>
      {columns.map((column) => (
        <td key={column.key} className={styles.cell}>
          <animate.span
            className={styles.flash}
            style={{ opacity: flash }}
            aria-hidden="true"
          />
          <span className={styles.cellContent}>{column.render(row)}</span>
        </td>
      ))}
    </animate.tr>
  );
}

/**
 * A table whose rows physically move — via a FLIP-style spring transition —
 * when they're reordered by a sort, a filter, or a simulated realtime
 * update, instead of the table just snapping to the new arrangement. Rows
 * also flash briefly when their data changes in place.
 */
export function LiveDataTable<T>({
  rows,
  columns,
  getRowId,
  getRowVersion,
  className,
  style,
}: LiveDataTableProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; direction: SortDirection } | null>(
    null,
  );

  const sortedRows = React.useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column?.sortValue) return rows;

    const sortValue = column.sortValue;
    return [...rows].sort((a, b) => {
      const av = sortValue(a);
      const bv = sortValue(b);
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, columns, sort]);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  return (
    <table className={clsx(styles.table, className)} style={style}>
      <thead>
        <tr>
          {columns.map((column) => {
            const sortable = Boolean(column.sortValue);
            const active = sort?.key === column.key;
            return (
              <th
                key={column.key}
                className={clsx(styles.header, sortable && styles.sortable)}
                onClick={sortable ? () => toggleSort(column.key) : undefined}
                aria-sort={
                  active ? (sort!.direction === "asc" ? "ascending" : "descending") : undefined
                }
              >
                {column.header}
                {active && (
                  <span className={styles.sortIndicator} aria-hidden="true">
                    {sort!.direction === "asc" ? " ▲" : " ▼"}
                  </span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <Row
            key={getRowId(row)}
            row={row}
            columns={columns}
            version={getRowVersion?.(row)}
          />
        ))}
      </tbody>
    </table>
  );
}
