import * as React from "react";
import {
  animate,
  clamp,
  combine,
  useValue,
  withDelay,
  withSequence,
  withSpring,
} from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./CascadingSettingsToggle.module.css";

export interface SettingToggleItem {
  key: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface CascadingSettingsToggleProps {
  parent: {
    label: React.ReactNode;
    description?: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
  /** Dependent settings, revealed with a staggered spring when the parent is on. */
  children: SettingToggleItem[];
  className?: string;
  style?: React.CSSProperties;
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked, onChange, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={clsx(styles.switchTrack, checked && styles.switchOn)}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.switchThumb} />
    </button>
  );
}

const REVEAL_SPRING = { stiffness: 260, damping: 28 };

function ChildRow({
  item,
  index,
  parentChecked,
}: {
  item: SettingToggleItem;
  index: number;
  parentChecked: boolean;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const measuredRef = React.useRef(0);
  const hasMountedRef = React.useRef(false);
  const [height, setHeight] = useValue(0);

  React.useLayoutEffect(() => {
    const measured = contentRef.current?.scrollHeight ?? 0;
    measuredRef.current = measured;
    setHeight(parentChecked ? measured : 0);
    hasMountedRef.current = true;
    // Only the very first measurement should snap instantly (no spring) —
    // subsequent toggles go through the staggered effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!hasMountedRef.current) return;
    const target = parentChecked ? measuredRef.current : 0;
    const reveal = withSpring(target, REVEAL_SPRING);
    const delayMs = index * 60;
    setHeight(delayMs > 0 ? withSequence([withDelay(delayMs), reveal]) : reveal);
  }, [parentChecked, index, setHeight]);

  const opacity = React.useMemo(
    () =>
      combine([height], (h) =>
        measuredRef.current ? clamp(h / measuredRef.current, 0, 1) : 0,
      ),
    [height],
  );

  return (
    <animate.div
      className={styles.childWrapper}
      style={{
        height,
        opacity,
        overflow: "hidden",
        pointerEvents: parentChecked ? "auto" : "none",
      }}
    >
      <div ref={contentRef} className={styles.childRow}>
        <div className={styles.text}>
          <div className={styles.childLabel}>{item.label}</div>
          {item.description && (
            <div className={styles.description}>{item.description}</div>
          )}
        </div>
        <Switch
          checked={item.checked}
          onChange={item.onChange}
          disabled={item.disabled || !parentChecked}
        />
      </div>
    </animate.div>
  );
}

/**
 * A parent setting toggle with dependent child settings that expand or
 * collapse in a staggered spring reveal when the parent flips — the
 * "turn one thing off, watch everything under it fold away" pattern
 * common to admin/settings panels.
 */
export function CascadingSettingsToggle({
  parent,
  children,
  className,
  style,
}: CascadingSettingsToggleProps) {
  return (
    <div className={clsx(styles.group, className)} style={style}>
      <div className={styles.parentRow}>
        <div className={styles.text}>
          <div className={styles.parentLabel}>{parent.label}</div>
          {parent.description && (
            <div className={styles.description}>{parent.description}</div>
          )}
        </div>
        <Switch checked={parent.checked} onChange={parent.onChange} />
      </div>
      <div className={styles.children}>
        {children.map((item, index) => (
          <ChildRow
            key={item.key}
            item={item}
            index={index}
            parentChecked={parent.checked}
          />
        ))}
      </div>
    </div>
  );
}
