import * as React from "react";
import { animate, useValue, withTiming } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./CooldownButton.module.css";

export type CooldownButtonVariant = "primary" | "secondary";

export interface CooldownButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "style"> {
  /** How long the button stays disabled after being clicked, in ms. */
  cooldownMs: number;
  onClick: () => void;
  /** @default "primary" */
  variant?: CooldownButtonVariant;
  style?: React.CSSProperties;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A button that shows an animated countdown ring after being clicked and
 * stays disabled until it completes — the "resend code in 12s" / rate-limited
 * action pattern common to auth and abuse-prevention flows.
 */
export function CooldownButton({
  cooldownMs,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  children,
  ...rest
}: CooldownButtonProps) {
  const [progress, setProgress] = useValue(0);
  const [active, setActive] = React.useState(false);

  const dashoffset = React.useMemo(
    () => progress.to((p) => CIRCUMFERENCE * (1 - p)),
    [progress],
  );

  const handleClick = () => {
    if (active || disabled) return;
    onClick();
    setActive(true);
    setProgress(0);
    setProgress(
      withTiming(1, {
        duration: cooldownMs,
        onComplete: () => setActive(false),
      }),
    );
  };

  return (
    <button
      type="button"
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled || active}
      aria-busy={active || undefined}
      onClick={handleClick}
      {...rest}
    >
      {active && (
        <svg className={styles.ring} viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          <animate.circle
            cx="12"
            cy="12"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
            style={{ strokeDashoffset: dashoffset }}
          />
        </svg>
      )}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
