import * as React from "react";
import { animate, Presence, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./PresenceStack.module.css";

export interface PresenceUser {
  id: string;
  name: string;
  avatarUrl?: string;
  /** Background color for the initials fallback. Derived from `id` if omitted. */
  color?: string;
  /** Shows a small pulsing "active" indicator. */
  active?: boolean;
}

export interface PresenceStackProps {
  users: PresenceUser[];
  /** Avatars beyond this count collapse into a "+N" badge. @default 5 */
  max?: number;
  /** Avatar diameter in px. @default 32 */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ENTER = { stiffness: 420, damping: 22 };
const EXIT = { stiffness: 420, damping: 30 };

const PALETTE = [
  "#f97316",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#ec4899",
  "#eab308",
  "#14b8a6",
];

function colorFor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Avatar({ user, size }: { user: PresenceUser; size: number }) {
  return (
    <animate.div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.36),
        backgroundColor: user.avatarUrl ? undefined : user.color ?? colorFor(user.id),
        opacity: 0,
        scale: 0.5,
        translateY: 6,
      }}
      animate={{
        opacity: withSpring(1, ENTER),
        scale: withSpring(1, ENTER),
        translateY: withSpring(0, ENTER),
      }}
      exit={{
        opacity: withSpring(0, EXIT),
        scale: withSpring(0.5, EXIT),
        translateY: withSpring(6, EXIT),
      }}
      title={user.name}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className={styles.avatarImg} />
      ) : (
        <span aria-hidden="true">{initials(user.name)}</span>
      )}
      {user.active && <span className={styles.activeDot} aria-label="Active" />}
    </animate.div>
  );
}

/**
 * A stack of collaborator avatars that spring in and out as people join and
 * leave (Figma/Notion/Linear-style presence), collapsing overflow into a
 * "+N" badge instead of growing without bound.
 */
export function PresenceStack({
  users,
  max = 5,
  size = 32,
  className,
  style,
}: PresenceStackProps) {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;

  return (
    <div
      className={clsx(styles.stack, className)}
      style={style}
      role="group"
      aria-label="Active collaborators"
    >
      <Presence>
        {visible.map((user) => (
          <Avatar key={user.id} user={user} size={size} />
        ))}
      </Presence>
      {overflow > 0 && (
        <div
          className={styles.overflow}
          style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32) }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
