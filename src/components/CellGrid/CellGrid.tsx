import * as React from "react";
import { animate, clamp, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./CellGrid.module.css";

export interface CellGridProps {
  rows: number;
  columns: number;
  renderCell: (row: number, col: number) => React.ReactNode;
  onSelect?: (row: number, col: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const SELECTION_SPRING = { stiffness: 480, damping: 36 };

/**
 * A spreadsheet-style grid where arrow keys move the active cell and a
 * selection box physically slides/resizes to the newly selected cell,
 * instead of just a CSS `:focus` outline swap — the Airtable/Excel/Notion
 * grid-navigation feel.
 */
export function CellGrid({
  rows,
  columns,
  renderCell,
  onSelect,
  className,
  style,
}: CellGridProps) {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const cellRefs = React.useRef(new Map<string, HTMLDivElement>());
  const [selected, setSelected] = React.useState({ row: 0, col: 0 });
  const [selX, setSelX] = useValue(0);
  const [selY, setSelY] = useValue(0);
  const [selW, setSelW] = useValue(0);
  const [selH, setSelH] = useValue(0);
  const hasMountedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const node = cellRefs.current.get(`${selected.row}-${selected.col}`);
    if (!node) return;

    const target = {
      x: node.offsetLeft,
      y: node.offsetTop,
      w: node.offsetWidth,
      h: node.offsetHeight,
    };

    if (!hasMountedRef.current) {
      setSelX(target.x);
      setSelY(target.y);
      setSelW(target.w);
      setSelH(target.h);
      hasMountedRef.current = true;
      return;
    }

    setSelX(withSpring(target.x, SELECTION_SPRING));
    setSelY(withSpring(target.y, SELECTION_SPRING));
    setSelW(withSpring(target.w, SELECTION_SPRING));
    setSelH(withSpring(target.h, SELECTION_SPRING));
  }, [selected, setSelX, setSelY, setSelW, setSelH]);

  const moveSelection = (deltaRow: number, deltaCol: number) => {
    setSelected((prev) => {
      const next = {
        row: clamp(prev.row + deltaRow, 0, rows - 1),
        col: clamp(prev.col + deltaCol, 0, columns - 1),
      };
      onSelect?.(next.row, next.col);
      return next;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(-1, 0);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection(1, 0);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSelection(0, -1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSelection(0, 1);
    }
  };

  return (
    <div
      ref={gridRef}
      className={clsx(styles.grid, className)}
      style={{ ...style, gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      role="grid"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <animate.div
        className={styles.selection}
        style={{ translateX: selX, translateY: selY, width: selW, height: selH }}
        aria-hidden="true"
      />
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const isSelected = selected.row === row && selected.col === col;
          return (
            <div
              key={`${row}-${col}`}
              ref={(node) => {
                const key = `${row}-${col}`;
                if (node) cellRefs.current.set(key, node);
                else cellRefs.current.delete(key);
              }}
              role="gridcell"
              aria-selected={isSelected}
              className={styles.cell}
              onClick={() => {
                setSelected({ row, col });
                onSelect?.(row, col);
              }}
            >
              {renderCell(row, col)}
            </div>
          );
        }),
      )}
    </div>
  );
}
