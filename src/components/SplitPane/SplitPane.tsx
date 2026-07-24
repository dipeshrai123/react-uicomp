import * as React from "react";
import {
  animate,
  clamp,
  rubberClamp,
  snapTo,
  useDrag,
  useValue,
  withSpring,
} from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./SplitPane.module.css";

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Fraction (0-1) of the container width the left pane starts at. @default 0.5 */
  defaultSplit?: number;
  /** Minimum width in px for either pane. @default 160 */
  min?: number;
  className?: string;
  style?: React.CSSProperties;
}

const RELEASE_SPRING = { stiffness: 320, damping: 30 };
const DIVIDER_WIDTH = 6;

/**
 * Two panes divided by a draggable divider with rubber-band resistance at
 * the min/max bounds, momentum-aware snapping on release, and a
 * double-click-to-reset — the "VS Code sidebar" feel, not a plain
 * drag-to-any-width divider.
 */
export function SplitPane({
  left,
  right,
  defaultSplit = 0.5,
  min = 160,
  className,
  style,
}: SplitPaneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dividerRef = React.useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useValue(0);
  const dragStartWidthRef = React.useRef(0);

  const bounds = React.useCallback(() => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
    const maxWidth = Math.max(min, containerWidth - min - DIVIDER_WIDTH);
    return { containerWidth, maxWidth };
  }, [min]);

  React.useLayoutEffect(() => {
    const { containerWidth, maxWidth } = bounds();
    setLeftWidth(clamp(containerWidth * defaultSplit, min, maxWidth));
    // Only the very first measurement should snap instantly (no spring).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDrag(
    dividerRef,
    (e) => {
      const { containerWidth, maxWidth } = bounds();

      if (e.movement.x === 0 && e.movement.y === 0) {
        dragStartWidthRef.current = leftWidth.current;
      }

      const raw = dragStartWidthRef.current + e.movement.x;

      if (e.down) {
        setLeftWidth(rubberClamp(raw, min, maxWidth, 0.2));
        return;
      }

      const target = snapTo(clamp(raw, min, maxWidth), e.velocity.x, [
        min,
        containerWidth / 2,
        maxWidth,
      ]);
      setLeftWidth(withSpring(target, RELEASE_SPRING));
    },
    { axis: "x" },
  );

  const resetToDefault = () => {
    const { containerWidth, maxWidth } = bounds();
    setLeftWidth(
      withSpring(clamp(containerWidth * defaultSplit, min, maxWidth), RELEASE_SPRING),
    );
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className)}
      style={style}
    >
      <animate.div className={styles.pane} style={{ width: leftWidth }}>
        {left}
      </animate.div>
      <div
        ref={dividerRef}
        className={styles.divider}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panes"
        onDoubleClick={resetToDefault}
      >
        <div className={styles.grip} aria-hidden="true" />
      </div>
      <div className={styles.pane} style={{ flex: 1 }}>
        {right}
      </div>
    </div>
  );
}
