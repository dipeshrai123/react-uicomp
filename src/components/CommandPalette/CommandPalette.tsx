import * as React from "react";
import { animate, Presence, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./CommandPalette.module.css";

export interface Command {
  id: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  commands: Command[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BACKDROP_SPRING = { stiffness: 320, damping: 30 };
const PANEL_SPRING = { stiffness: 340, damping: 28 };
const HIGHLIGHT_SPRING = { stiffness: 480, damping: 34 };

interface PanelProps {
  commands: Command[];
  onOpenChange: (open: boolean) => void;
  placeholder: string;
  emptyMessage: string;
}

function Panel({ commands, onOpenChange, placeholder, emptyMessage }: PanelProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const [highlightY, setHighlightY] = useValue(0);
  const [highlightHeight, setHighlightHeight] = useValue(0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(q) ||
        command.group?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useLayoutEffect(() => {
    const active = filtered[activeIndex];
    const node = active ? itemRefs.current.get(active.id) : null;
    const list = listRef.current;
    if (!node || !list) return;

    const targetY = node.offsetTop;
    setHighlightY(withSpring(targetY, HIGHLIGHT_SPRING));
    setHighlightHeight(withSpring(node.offsetHeight, HIGHLIGHT_SPRING));
    node.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex, filtered, setHighlightY, setHighlightHeight]);

  const select = (command: Command) => {
    onOpenChange(false);
    command.onSelect();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) select(command);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <animate.div
      className={styles.panel}
      style={{ opacity: 0, scale: 0.96, translateY: -8 }}
      animate={{
        opacity: withSpring(1, PANEL_SPRING),
        scale: withSpring(1, PANEL_SPRING),
        translateY: withSpring(0, PANEL_SPRING),
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
    >
      <input
        ref={inputRef}
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search commands"
      />
      <div className={styles.list} ref={listRef} role="listbox">
        {filtered.length === 0 ? (
          <div className={styles.empty}>{emptyMessage}</div>
        ) : (
          <>
            <animate.div
              className={styles.highlight}
              style={{ translateY: highlightY, height: highlightHeight }}
              aria-hidden="true"
            />
            {filtered.map((command, index) => (
              <button
                key={command.id}
                ref={(node) => {
                  if (node) itemRefs.current.set(command.id, node);
                  else itemRefs.current.delete(command.id);
                }}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={styles.item}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(command)}
              >
                {command.icon && (
                  <span className={styles.icon} aria-hidden="true">
                    {command.icon}
                  </span>
                )}
                <span className={styles.label}>{command.label}</span>
                {command.shortcut && (
                  <span className={styles.shortcut}>{command.shortcut}</span>
                )}
              </button>
            ))}
          </>
        )}
      </div>
    </animate.div>
  );
}

/**
 * A Cmd/Ctrl+K "jump to anything" palette: type-ahead filtering with a
 * highlight bar that physically slides between results instead of jumping,
 * built on native focus/keyboard handling rather than a UI-kit dependency.
 */
export function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder = "Type a command or search...",
  emptyMessage = "No matching commands",
  className,
  style,
}: CommandPaletteProps) {
  const openRef = React.useRef(open);
  openRef.current = open;

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!openRef.current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <Presence>
      {open && (
        <animate.div
          key="command-palette-backdrop"
          className={clsx(styles.backdrop, className)}
          style={{ opacity: 0, ...style }}
          animate={{ opacity: withSpring(1, BACKDROP_SPRING) }}
          exit={{ opacity: withSpring(0, BACKDROP_SPRING) }}
          onClick={() => onOpenChange(false)}
        >
          <div className={styles.panelWrapper} onClick={(event) => event.stopPropagation()}>
            <Panel
              commands={commands}
              onOpenChange={onOpenChange}
              placeholder={placeholder}
              emptyMessage={emptyMessage}
            />
          </div>
        </animate.div>
      )}
    </Presence>
  );
}
