import * as React from "react";
import {
  animate,
  Gesture,
  rubberClamp,
  useGesture,
  useValue,
  withSpring,
} from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./SwipeableRowActions.module.css";

export type SwipeActionVariant = "default" | "danger";

export interface SwipeAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: SwipeActionVariant;
  onClick: () => void;
}

export interface SwipeableRowActionsProps {
  children: React.ReactNode;
  actions: SwipeAction[];
  /** Width in px reserved per action. @default 72 */
  actionWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SNAP_SPRING = { stiffness: 420, damping: 34 };

/**
 * Wraps row/list content so a horizontal swipe reveals contextual actions
 * (archive, delete) behind it — the mobile-web inbox/table pattern — with a
 * binary open/closed snap on release rather than a partial-reveal drag.
 */
export function SwipeableRowActions({
  children,
  actions,
  actionWidth = 72,
  className,
  style,
}: SwipeableRowActionsProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useValue(0);
  const dragStartXRef = React.useRef(0);
  const totalWidth = actions.length * actionWidth;

  const close = React.useCallback(() => {
    setTranslateX(withSpring(0, SNAP_SPRING));
  }, [setTranslateX]);

  const open = React.useCallback(() => {
    setTranslateX(withSpring(-totalWidth, SNAP_SPRING));
  }, [setTranslateX, totalWidth]);

  useGesture(
    contentRef,
    Gesture.Pan()
      .axis("x")
      .onStart(() => {
        dragStartXRef.current = translateX.current;
      })
      .onUpdate((e) => {
        const raw = dragStartXRef.current + e.movement.x;
        setTranslateX(rubberClamp(raw, -totalWidth, 0, 0.25));
      })
      .onEnd((e) => {
        const raw = dragStartXRef.current + e.movement.x;
        const shouldOpen = raw < -totalWidth / 2 || e.velocity.x < -0.5;
        if (shouldOpen) open();
        else close();
      }),
  );

  return (
    <div className={clsx(styles.row, className)} style={style}>
      <div className={styles.actions} style={{ width: totalWidth }}>
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={clsx(styles.action, action.variant === "danger" && styles.danger)}
            style={{ width: actionWidth }}
            onClick={() => {
              close();
              action.onClick();
            }}
          >
            {action.icon && (
              <span className={styles.icon} aria-hidden="true">
                {action.icon}
              </span>
            )}
            <span className={styles.label}>{action.label}</span>
          </button>
        ))}
      </div>
      <animate.div ref={contentRef} className={styles.content} style={{ translateX }}>
        {children}
      </animate.div>
    </div>
  );
}
