import * as React from "react";
import { animate, clamp, useValue, withSequence, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./UsageMeter.module.css";

export type UsageMeterZone = "normal" | "warn" | "danger";

export interface UsageMeterProps {
  value: number;
  max: number;
  label?: React.ReactNode;
  /** Fraction (0-1) of `max` at which the meter switches to a warning color and pulses. @default 0.8 */
  warnAt?: number;
  /** Fraction (0-1) of `max` at which the meter switches to a danger color and pulses. @default 1 */
  dangerAt?: number;
  formatValue?: (value: number, max: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FILL_SPRING = { stiffness: 220, damping: 26 };
const PULSE_UP = { stiffness: 500, damping: 14 };
const PULSE_DOWN = { stiffness: 300, damping: 20 };

const ZONE_SEVERITY: Record<UsageMeterZone, number> = { normal: 0, warn: 1, danger: 2 };

function zoneFor(fraction: number, warnAt: number, dangerAt: number): UsageMeterZone {
  if (fraction >= dangerAt) return "danger";
  if (fraction >= warnAt) return "warn";
  return "normal";
}

/**
 * An animated usage/quota bar that reacts distinctly the moment usage
 * crosses a warning or danger threshold — a brief pulse, not just a color
 * swap — for billing and limits screens where "you're about to hit your
 * cap" needs to actually register.
 */
export function UsageMeter({
  value,
  max,
  label,
  warnAt = 0.8,
  dangerAt = 1,
  formatValue,
  className,
  style,
}: UsageMeterProps) {
  const rawFraction = max > 0 ? value / max : 0;
  const widthFraction = clamp(rawFraction, 0, 1);
  const zone = zoneFor(rawFraction, warnAt, dangerAt);

  const [width, setWidth] = useValue(0);
  const [pulse, setPulse] = useValue(1);
  const prevZoneRef = React.useRef<UsageMeterZone>(zone);

  React.useEffect(() => {
    setWidth(withSpring(widthFraction * 100, FILL_SPRING));
  }, [widthFraction, setWidth]);

  React.useEffect(() => {
    const prev = prevZoneRef.current;
    if (ZONE_SEVERITY[zone] > ZONE_SEVERITY[prev]) {
      setPulse(withSequence([withSpring(1.15, PULSE_UP), withSpring(1, PULSE_DOWN)]));
    }
    prevZoneRef.current = zone;
  }, [zone, setPulse]);

  return (
    <div className={clsx(styles.meter, className)} style={style}>
      {(label !== undefined || formatValue !== undefined) && (
        <div className={styles.header}>
          {label !== undefined && <span className={styles.label}>{label}</span>}
          <span className={styles.value}>
            {formatValue
              ? formatValue(value, max)
              : `${value.toLocaleString()} / ${max.toLocaleString()}`}
          </span>
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <animate.div
          className={clsx(styles.fill, styles[zone])}
          style={{ width: width.to((w) => `${w}%`), scale: pulse }}
        />
      </div>
    </div>
  );
}
