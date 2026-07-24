import * as React from "react";
import { animate, clamp, Gesture, useGesture, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./SlideToConfirm.module.css";

export interface SlideToConfirmProps {
  label?: React.ReactNode;
  confirmedLabel?: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const RESET_SPRING = { stiffness: 420, damping: 34 };
const CONFIRM_THRESHOLD = 0.9;

/**
 * A drag-to-unlock confirmation slider for destructive or high-stakes
 * actions (production deletes, ops runbooks) — confirming requires a
 * deliberate full-length drag, not a single click that could be a
 * misclick, and releasing early snaps back to the start.
 */
export function SlideToConfirm({
  label = "Slide to confirm",
  confirmedLabel = "Confirmed",
  onConfirm,
  disabled = false,
  className,
  style,
}: SlideToConfirmProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useValue(0);
  const [confirmed, setConfirmed] = React.useState(false);
  const maxRef = React.useRef(0);
  const dragStartRef = React.useRef(0);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (track && thumb) {
      maxRef.current = Math.max(0, track.clientWidth - thumb.clientWidth - 8);
    }
  }, []);

  useGesture(
    thumbRef,
    Gesture.Pan()
      .axis("x")
      .enabled(!disabled && !confirmed)
      .onStart(() => {
        dragStartRef.current = translateX.current;
      })
      .onUpdate((e) => {
        const raw = dragStartRef.current + e.movement.x;
        setTranslateX(clamp(raw, 0, maxRef.current));
      })
      .onEnd(() => {
        if (maxRef.current > 0 && translateX.current >= maxRef.current * CONFIRM_THRESHOLD) {
          setTranslateX(withSpring(maxRef.current, RESET_SPRING));
          setConfirmed(true);
          onConfirm();
        } else {
          setTranslateX(withSpring(0, RESET_SPRING));
        }
      }),
  );

  const fillWidth = React.useMemo(
    () => translateX.to((x) => `${maxRef.current ? clamp(x / maxRef.current, 0, 1) * 100 : 0}%`),
    [translateX],
  );

  return (
    <div
      ref={trackRef}
      className={clsx(styles.track, confirmed && styles.confirmed, disabled && styles.disabled, className)}
      style={style}
      role="slider"
      aria-label={typeof label === "string" ? label : "Slide to confirm"}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={confirmed ? 100 : 0}
      aria-disabled={disabled || confirmed}
    >
      <animate.div className={styles.fill} style={{ width: fillWidth }} />
      <span className={styles.label}>{confirmed ? confirmedLabel : label}</span>
      <animate.div ref={thumbRef} className={styles.thumb} style={{ translateX }}>
        <span aria-hidden="true">{confirmed ? "✓" : "→"}</span>
      </animate.div>
    </div>
  );
}
