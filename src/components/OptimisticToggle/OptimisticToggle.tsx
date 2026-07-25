import * as React from "react";
import {
  animate,
  combine,
  useValue,
  withSequence,
  withSpring,
} from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./OptimisticToggle.module.css";

export interface OptimisticToggleProps {
  checked: boolean;
  /** Called with the new value right after the UI flips. Reject/throw to roll the toggle back. */
  onChange: (next: boolean) => void | Promise<void>;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const THUMB_TRAVEL = 18;
const SETTLE = { stiffness: 500, damping: 32 };
const SHAKE = { stiffness: 900, damping: 12 };

function useToggleMotion(checked: boolean) {
  const [progress, setProgress] = useValue(checked ? 1 : 0);
  const [shake, setShake] = useValue(0);

  React.useEffect(() => {
    setProgress(withSpring(checked ? 1 : 0, SETTLE));
  }, [checked, setProgress]);

  const rollback = React.useCallback(() => {
    setShake(
      withSequence([
        withSpring(-6, SHAKE),
        withSpring(6, SHAKE),
        withSpring(0, { stiffness: 500, damping: 20 }),
      ]),
    );
  }, [setShake]);

  const translateX = React.useMemo(
    () => combine([progress, shake], (p, s) => p * THUMB_TRAVEL + s),
    [progress, shake],
  );

  return { translateX, rollback };
}

/**
 * A toggle that flips instantly on click (optimistic UI) and calls
 * `onChange` with the new value. If `onChange` rejects — the server refused
 * the change — the toggle reverts with a visible shake instead of silently
 * re-rendering, so the user sees *why* it snapped back.
 */
export function OptimisticToggle({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  style,
}: OptimisticToggleProps) {
  const [optimistic, setOptimistic] = React.useState(checked);
  const [pending, setPending] = React.useState(false);
  const [rejected, setRejected] = React.useState(false);
  const { translateX, rollback } = useToggleMotion(optimistic);
  const rejectedTimeoutRef = React.useRef<number>();

  React.useEffect(() => {
    setOptimistic(checked);
  }, [checked]);

  React.useEffect(() => {
    return () => window.clearTimeout(rejectedTimeoutRef.current);
  }, []);

  const handleClick = async () => {
    if (disabled || pending) return;

    const next = !optimistic;
    setOptimistic(next);
    setPending(true);

    try {
      await onChange(next);
    } catch {
      setOptimistic(!next);
      rollback();
      setRejected(true);
      window.clearTimeout(rejectedTimeoutRef.current);
      rejectedTimeoutRef.current = window.setTimeout(() => setRejected(false), 400);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={optimistic}
      disabled={disabled}
      className={clsx(styles.wrapper, disabled && styles.disabled, className)}
      style={style}
      onClick={handleClick}
    >
      <span
        className={clsx(
          styles.track,
          optimistic && styles.on,
          rejected && styles.rejected,
        )}
      >
        <animate.span className={styles.thumb} style={{ translateX }} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
}
