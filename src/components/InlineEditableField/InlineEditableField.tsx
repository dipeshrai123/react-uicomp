import * as React from "react";
import { animate, useValue, withSequence, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./InlineEditableField.module.css";

export interface InlineEditableFieldProps {
  value: string;
  /** Called on commit (Enter or blur) when the value changed. Throw/reject to trigger the error flash and revert. */
  onSave: (value: string) => void | Promise<void>;
  /** Shown in place of an empty value. @default "Empty" */
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const FLASH_IN = { stiffness: 400, damping: 30 };
const FLASH_OUT = { stiffness: 120, damping: 22 };

function useFlash() {
  const [opacity, setOpacity] = useValue(0);
  const [flavor, setFlavor] = React.useState<"success" | "error">("success");

  const trigger = React.useCallback(
    (kind: "success" | "error") => {
      setFlavor(kind);
      setOpacity(
        withSequence([withSpring(1, FLASH_IN), withSpring(0, FLASH_OUT)]),
      );
    },
    [setOpacity],
  );

  return { opacity, flavor, trigger };
}

/**
 * A field that morphs between a plain text display and an inline input on
 * click, for the "click a cell/label to edit it in place" pattern common in
 * settings screens and editable tables.
 */
export function InlineEditableField({
  value,
  onSave,
  placeholder = "Empty",
  ariaLabel,
  disabled = false,
  className,
  style,
}: InlineEditableFieldProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const [saving, setSaving] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { opacity: flashOpacity, flavor, trigger } = useFlash();

  React.useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEditing = () => {
    if (disabled || saving) return;
    setDraft(value);
    setEditing(true);
  };

  const commit = async () => {
    const next = draft;
    setEditing(false);
    if (next === value) return;

    setSaving(true);
    try {
      await onSave(next);
      trigger("success");
    } catch {
      trigger("error");
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={clsx(styles.input, className)}
        style={style}
        value={draft}
        aria-label={ariaLabel}
        disabled={saving}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          } else if (event.key === "Escape") {
            event.preventDefault();
            cancel();
          }
        }}
      />
    );
  }

  return (
    <button
      type="button"
      className={clsx(styles.display, disabled && styles.disabled, className)}
      style={style}
      onClick={startEditing}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <animate.span
        className={clsx(styles.flash, flavor === "error" && styles.flashError)}
        style={{ opacity: flashOpacity }}
        aria-hidden="true"
      />
      <span className={clsx(styles.text, !value && styles.placeholder)}>
        {value || placeholder}
      </span>
    </button>
  );
}
