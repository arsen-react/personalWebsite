import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./MenuButton.module.css";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  label?: string;
}

/** Three-line menu button that turns into a cross while open. Shown on small screens only. */
export function MenuButton({
  open,
  label = "Toggle navigation menu",
  className,
  ...rest
}: MenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      className={cn(styles.menuButton, open && styles.open, className)}
      {...rest}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
