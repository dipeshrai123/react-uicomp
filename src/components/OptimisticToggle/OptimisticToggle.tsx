import * as React from "react";
import {
  Easing,
  animate,
  useValue,
  withKeyframes,
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
// Kept at/above critical damping (2 * sqrt(stiffness)) so it settles in one
// smooth motion instead of ringing.
const SETTLE = { stiffness: 500, damping: 46 };
// Fixed-duration keyframes rather than a spring: a spring's velocity carries
// over between legs of a back-and-forth sequence, so amplitude and timing
// come out different every run. A decaying, timed wiggle looks the same
// every time — the same curve used for the classic "wrong password" shake.
const SHAKE_STEP_MS = 60;
const shakeKeyframes = [-8, 8, -5, 5, -2, 2, 0].map((to) => ({
  to,
  duration: SHAKE_STEP_MS,
  easing: Easing.ease,
}));

function useToggleMotion(checked: boolean) {
  const [progress, setProgress] = useValue(checked ? 1 : 0);
  // Shakes the whole track in place, independent of the thumb's own
  // position — kept as a separate value (applied to a different element)
  // rather than summed into the thumb's translateX, so it never competes
  // with the thumb's own slide animation on the same axis.
  const [shake, setShake] = useValue(0);
  const isRollbackRef = React.useRef(false);

  React.useEffect(() => {
    const target = checked ? 1 : 0;
    if (isRollbackRef.current) {
      isRollbackRef.current = false;
      // Reject feedback should read as "that didn't work", not as a second
      // slow slide — so the thumb snaps back instantly and the shake is the
      // only thing that animates.
      setProgress(target);
      setShake(withKeyframes(shakeKeyframes));
      return;
    }
    setProgress(withSpring(target, SETTLE));
  }, [checked, setProgress, setShake]);

  const rollback = React.useCallback(() => {
    isRollbackRef.current = true;
  }, []);

  const thumbX = React.useMemo(
    () => progress.to((p) => p * THUMB_TRAVEL),
    [progress],
  );

  return { thumbX, shake, rollback };
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
  const { thumbX, shake, rollback } = useToggleMotion(optimistic);
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
      <animate.span
        className={clsx(
          styles.track,
          optimistic && styles.on,
          rejected && styles.rejected,
        )}
        style={{ translateX: shake }}
      >
        <animate.span className={styles.thumb} style={{ translateX: thumbX }} />
      </animate.span>
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
}
