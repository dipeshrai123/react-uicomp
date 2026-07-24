import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <svg
      className={className ? `${styles.spinner} ${className}` : styles.spinner}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="56.5"
        strokeDashoffset="42.4"
        opacity="0.9"
      />
    </svg>
  );
}
