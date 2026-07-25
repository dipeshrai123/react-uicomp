import * as React from "react";
import { animate, useValue, withTiming } from "react-ui-animate";
import { Button, type ButtonSize, type ButtonVariant } from "../Button/Button";
import styles from "./CooldownButton.module.css";

export interface CooldownButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "style"> {
  /** How long the button stays disabled after being clicked, in ms. */
  cooldownMs: number;
  onClick: () => void;
  /** @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  style?: React.CSSProperties;
}

const RING_RADIUS: Record<ButtonSize, number> = { sm: 8, md: 9, lg: 10 };

/**
 * A button that shows an animated countdown ring after being clicked and
 * stays disabled until it completes — the "resend code in 12s" / rate-limited
 * action pattern common to auth and abuse-prevention flows. Composes Button
 * so it inherits the same variants, sizing, hover/press spring, and focus
 * ring as the rest of the kit.
 */
export function CooldownButton({
  cooldownMs,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  ...rest
}: CooldownButtonProps) {
  const [progress, setProgress] = useValue(0);
  const [active, setActive] = React.useState(false);

  const radius = RING_RADIUS[size];
  const circumference = 2 * Math.PI * radius;
  const dashoffset = React.useMemo(
    () => progress.to((p) => circumference * (1 - p)),
    [progress, circumference],
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
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled || active}
      aria-busy={active || undefined}
      onClick={handleClick}
      leftIcon={
        active && (
          <svg
            className={styles.ring}
            style={{ width: radius * 2 + 4, height: radius * 2 + 4 }}
            viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
            aria-hidden="true"
          >
            <circle
              cx={radius + 2}
              cy={radius + 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
            <animate.circle
              cx={radius + 2}
              cy={radius + 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeLinecap="round"
              transform={`rotate(-90 ${radius + 2} ${radius + 2})`}
              style={{ strokeDashoffset: dashoffset }}
            />
          </svg>
        )
      }
      {...rest}
    >
      {children}
    </Button>
  );
}
