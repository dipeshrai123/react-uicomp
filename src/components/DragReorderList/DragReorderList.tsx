import * as React from "react";
import { animate, Gesture, move, useGesture, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./DragReorderList.module.css";

export interface DragReorderListProps<T> {
  items: T[];
  getId: (item: T) => string;
  onReorder: (next: T[]) => void;
  /** Row height in px. Rows are assumed to be a uniform height. */
  itemHeight: number;
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SETTLE_SPRING = { stiffness: 500, damping: 40 };
const LIFT_SPRING = { stiffness: 400, damping: 30 };

interface ReorderItemProps<T> {
  item: T;
  id: string;
  items: T[];
  getId: (item: T) => string;
  onReorder: (next: T[]) => void;
  itemHeight: number;
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
}

function ReorderItem<T>({
  item,
  id,
  items,
  getId,
  onReorder,
  itemHeight,
  renderItem,
}: ReorderItemProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [translateY, setTranslateY] = useValue(0);
  const [scale, setScale] = useValue(1);
  const startIndexRef = React.useRef(0);
  const itemsRef = React.useRef(items);
  itemsRef.current = items;

  useGesture(
    ref,
    Gesture.Pan()
      .axis("y")
      .onStart(() => {
        startIndexRef.current = itemsRef.current.findIndex((it) => getId(it) === id);
        setDragging(true);
        setScale(withSpring(1.02, LIFT_SPRING));
      })
      .onUpdate((e) => {
        const currentItems = itemsRef.current;
        const currentIndex = currentItems.findIndex((it) => getId(it) === id);
        const startIndex = startIndexRef.current;
        const shiftSoFar = currentIndex - startIndex;

        setTranslateY(e.movement.y - shiftSoFar * itemHeight);

        const rawIndex = startIndex + Math.round(e.movement.y / itemHeight);
        const clampedIndex = Math.max(0, Math.min(currentItems.length - 1, rawIndex));
        if (clampedIndex !== currentIndex) {
          onReorder(move(currentItems, currentIndex, clampedIndex) as T[]);
        }
      })
      .onEnd(() => {
        setDragging(false);
        setTranslateY(withSpring(0, SETTLE_SPRING));
        setScale(withSpring(1, LIFT_SPRING));
      }),
  );

  return (
    <animate.div
      ref={ref}
      layout={!dragging}
      layoutOptions={SETTLE_SPRING}
      className={clsx(styles.item, dragging && styles.dragging)}
      style={{ height: itemHeight, translateY, scale }}
    >
      {renderItem(item, dragging)}
    </animate.div>
  );
}

/**
 * A list whose items can be dragged up/down to reorder — kanban cards,
 * priority lists, playlist-style ordering — where the dragged item follows
 * the pointer directly and the rest of the list reflows around it with a
 * FLIP spring, instead of a click-driven automatic sort.
 */
export function DragReorderList<T>({
  items,
  getId,
  onReorder,
  itemHeight,
  renderItem,
  className,
  style,
}: DragReorderListProps<T>) {
  return (
    <div className={clsx(styles.list, className)} style={style} role="list">
      {items.map((item) => (
        <ReorderItem
          key={getId(item)}
          id={getId(item)}
          item={item}
          items={items}
          getId={getId}
          onReorder={onReorder}
          itemHeight={itemHeight}
          renderItem={renderItem}
        />
      ))}
    </div>
  );
}
