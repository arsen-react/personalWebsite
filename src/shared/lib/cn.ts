/** Joins class names, skipping falsy values: cn("a", isOpen && "open") -> "a open". */
export function cn(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}
