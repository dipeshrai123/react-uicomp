export type ClassValue = string | number | null | undefined | false;

export function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
