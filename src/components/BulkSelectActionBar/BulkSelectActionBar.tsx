import * as React from "react";
import {
  animate,
  Presence,
  useValue,
  withSequence,
  withSpring,
} from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./BulkSelectActionBar.module.css";

export type BulkActionVariant = "default" | "danger";

export interface BulkAction {
  /** Stable identity for the action, used as its React key. */
  key: string;
  label: string;
  icon?: React.ReactNode;
  /** @default "default" */
  variant?: BulkActionVariant;
  onClick: () => void;
  disabled?: boolean;
}

export interface BulkSelectActionBarProps {
  /** Number of currently selected rows. The bar shows while this is > 0. */
  count: number;
  actions: BulkAction[];
  /** Called when the user dismisses the selection via the clear button. */
  onClear?: () => void;
  /** Customizes the text next to the count. @default count === 1 ? "item selected" : "items selected" */
  label?: (count: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ENTER_SPRING = { stiffness: 320, damping: 30 };
const EXIT_SPRING = { stiffness: 320, damping: 32 };

const defaultLabel = (count: number) =>
  count === 1 ? "item selected" : "items selected";

function CountBadge({ count }: { count: number }) {
  const [pulse, setPulse] = useValue(1);
  const previousCount = React.useRef(count);

  React.useEffect(() => {
    if (previousCount.current !== count) {
      previousCount.current = count;
      // A quick overshoot-then-settle pulse reads as "this number just
      // changed" without relying on the digits themselves catching the eye.
      setPulse(
        withSequence([
          withSpring(1.18, { stiffness: 520, damping: 12 }),
          withSpring(1, { stiffness: 420, damping: 18 }),
        ]),
      );
    }
  }, [count, setPulse]);

  return (
    <animate.span className={styles.count} style={{ scale: pulse }}>
      {count}
    </animate.span>
  );
}

interface BarContentProps extends Omit<BulkSelectActionBarProps, "label"> {
  label: (count: number) => React.ReactNode;
}

function BarContent({
  count,
  actions,
  onClear,
  label,
  className,
  style,
}: BarContentProps) {
  return (
    <animate.div
      role="toolbar"
      aria-label="Bulk actions"
      className={clsx(styles.bar, className)}
      style={{ opacity: 0, translateY: 24, ...style }}
      animate={{
        opacity: withSpring(1, ENTER_SPRING),
        translateY: withSpring(0, ENTER_SPRING),
      }}
      exit={{
        opacity: withSpring(0, EXIT_SPRING),
        translateY: withSpring(24, EXIT_SPRING),
      }}
    >
      <div className={styles.summary}>
        <CountBadge count={count} />
        <span className={styles.label}>{label(count)}</span>
      </div>
      <div className={styles.actions}>
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={clsx(
              styles.action,
              action.variant === "danger" && styles.danger,
            )}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon && (
              <span className={styles.actionIcon} aria-hidden="true">
                {action.icon}
              </span>
            )}
            {action.label}
          </button>
        ))}
      </div>
      {onClear && (
        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
          aria-label="Clear selection"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </animate.div>
  );
}

/**
 * A floating action bar that appears once rows/items are selected in a
 * table or list, and animates out when the selection is cleared. Built for
 * the "select rows, act on them in bulk" pattern common in SaaS admin
 * tables, inboxes, and data grids.
 */
export function BulkSelectActionBar({
  count,
  actions,
  onClear,
  label = defaultLabel,
  className,
  style,
}: BulkSelectActionBarProps) {
  return (
    <Presence>
      {count > 0 && (
        <BarContent
          key="bulk-select-bar"
          count={count}
          actions={actions}
          onClear={onClear}
          label={label}
          className={className}
          style={style}
        />
      )}
    </Presence>
  );
}
