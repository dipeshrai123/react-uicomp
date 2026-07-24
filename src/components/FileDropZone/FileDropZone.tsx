import * as React from "react";
import { animate, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./FileDropZone.module.css";

export interface FileDropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HOVER_SPRING = { stiffness: 400, damping: 26 };

/**
 * A drag-and-drop file upload zone with spring-driven scale/border feedback
 * while a file is dragged over it, on top of native HTML5 drag-and-drop
 * (no custom pointer gesture needed — the browser already tracks the drag).
 */
export function FileDropZone({
  onFiles,
  accept,
  multiple = true,
  disabled = false,
  children,
  className,
  style,
}: FileDropZoneProps) {
  const [isOver, setIsOver] = React.useState(false);
  const [scale, setScale] = useValue(1);
  const dragCounterRef = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setScale(withSpring(isOver ? 1.02 : 1, HOVER_SPRING));
  }, [isOver, setScale]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    onFiles(Array.from(fileList));
  };

  return (
    <animate.div
      className={clsx(styles.zone, isOver && styles.over, disabled && styles.disabled, className)}
      style={{ scale, ...style }}
      onDragEnter={(event: React.DragEvent) => {
        event.preventDefault();
        dragCounterRef.current++;
        if (!disabled) setIsOver(true);
      }}
      onDragOver={(event: React.DragEvent) => event.preventDefault()}
      onDragLeave={(event: React.DragEvent) => {
        event.preventDefault();
        dragCounterRef.current--;
        if (dragCounterRef.current <= 0) {
          dragCounterRef.current = 0;
          setIsOver(false);
        }
      }}
      onDrop={(event: React.DragEvent) => {
        event.preventDefault();
        dragCounterRef.current = 0;
        setIsOver(false);
        handleFiles(event.dataTransfer.files);
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      // Stringified rather than a raw boolean: `animate.*` elements route
      // every prop (not just animated ones) through a DOM-attribute setter
      // that treats boolean values as HTML boolean attributes (present/
      // absent), which is wrong for `aria-*` attributes — they're always
      // string-valued ("true"/"false"), never presence-only.
      aria-disabled={disabled ? "true" : "false"}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
      />
      {children ?? (
        <div className={styles.placeholder}>
          <span>Drag and drop files here, or click to browse</span>
        </div>
      )}
    </animate.div>
  );
}
