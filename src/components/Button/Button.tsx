import * as React from "react";
import { animate, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import { Spinner } from "./Spinner";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  /** Visual style of the button. @default "primary" */
  variant?: ButtonVariant;
  /** Size of the button. @default "md" */
  size?: ButtonSize;
  /** Stretches the button to fill its container's width. */
  fullWidth?: boolean;
  /**
   * Shows a spinner in place of `leftIcon` and disables interaction, without
   * shifting layout the way swapping `disabled` on and off would.
   */
  loading?: boolean;
  /** Icon rendered before the label. Hidden while `loading`. */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

const SPINNER_SIZE: Record<ButtonSize, number> = { sm: 13, md: 15, lg: 17 };

const HOVER_SCALE = withSpring(1.03, { stiffness: 300, damping: 20 });
const PRESS_SCALE = withSpring(0.96, { stiffness: 400, damping: 25 });

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled = false,
      children,
      ...rest
    },
    ref,
  ) => {
    const isInteractive = !disabled && !loading;

    return (
      <animate.button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        // Stringified rather than a raw boolean: `animate.*` elements route
        // every prop (not just animated ones) through a DOM-attribute setter
        // that treats boolean values as HTML boolean attributes (present/
        // absent), which is wrong for `aria-*` attributes — they're always
        // string-valued ("true"/"false"), never presence-only.
        aria-busy={loading ? "true" : undefined}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          className,
        )}
        hover={isInteractive ? { scale: HOVER_SCALE } : undefined}
        press={isInteractive ? { scale: PRESS_SCALE } : undefined}
        {...rest}
      >
        {loading ? (
          <Spinner size={SPINNER_SIZE[size]} className={styles.icon} />
        ) : (
          leftIcon && (
            <span className={styles.icon} aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        {children}
        {!loading && rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </animate.button>
    );
  },
);

Button.displayName = "Button";
