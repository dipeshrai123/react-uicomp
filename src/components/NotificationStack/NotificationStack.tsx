import * as React from "react";
import { animate, Gesture, Presence, useGesture, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./NotificationStack.module.css";

export type ToastVariant = "default" | "success" | "danger";

export interface ToastItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
}

export interface NotificationStackProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ENTER_SPRING = { stiffness: 380, damping: 30 };
const EXIT_SPRING = { stiffness: 380, damping: 32 };
const DISMISS_VELOCITY = 0.5;

function Toast({
  toast,
  index,
  onDismiss,
}: {
  toast: ToastItem;
  index: number;
  onDismiss: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useValue(0);
  const dragStartRef = React.useRef(0);
  const widthRef = React.useRef(0);

  React.useLayoutEffect(() => {
    widthRef.current = ref.current?.offsetWidth ?? 0;
  }, []);

  useGesture(
    ref,
    Gesture.Pan()
      .axis("x")
      .onStart(() => {
        dragStartRef.current = translateX.current;
      })
      .onUpdate((e) => {
        setTranslateX(dragStartRef.current + e.movement.x);
      })
      .onEnd((e) => {
        const shouldDismiss =
          Math.abs(e.velocity.x) > DISMISS_VELOCITY ||
          Math.abs(translateX.current) > widthRef.current * 0.4;

        if (shouldDismiss) {
          const direction = translateX.current >= 0 ? 1 : -1;
          setTranslateX(withSpring(direction * (widthRef.current + 40), EXIT_SPRING));
          onDismiss(toast.id);
        } else {
          setTranslateX(withSpring(0, ENTER_SPRING));
        }
      }),
  );

  return (
    <animate.div
      ref={ref}
      className={clsx(styles.toast, styles[toast.variant ?? "default"])}
      style={{ opacity: 0, translateY: 16, scale: 1 - index * 0.04, translateX }}
      animate={{
        opacity: withSpring(1, ENTER_SPRING),
        translateY: withSpring(-index * 8, ENTER_SPRING),
        scale: withSpring(1 - index * 0.04, ENTER_SPRING),
      }}
      exit={{
        opacity: withSpring(0, EXIT_SPRING),
        translateY: withSpring(-16, EXIT_SPRING),
      }}
    >
      <div className={styles.title}>{toast.title}</div>
      {toast.description && <div className={styles.description}>{toast.description}</div>}
      <button
        type="button"
        className={styles.close}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </animate.div>
  );
}

/**
 * A stack of system notifications (deploy succeeded, new comment, etc.)
 * that spring in/out and can be swiped away — with a velocity/distance
 * threshold, not a single-pixel drag — rather than only a click-to-dismiss
 * close button.
 */
export function NotificationStack({
  toasts,
  onDismiss,
  className,
  style,
}: NotificationStackProps) {
  return (
    <div
      className={clsx(styles.stack, className)}
      style={style}
      role="region"
      aria-label="Notifications"
    >
      <Presence>
        {toasts.map((toast, index) => (
          <Toast key={toast.id} toast={toast} index={index} onDismiss={onDismiss} />
        ))}
      </Presence>
    </div>
  );
}
