import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name, required because the button shows only an icon. */
  label: string;
  children: ReactNode;
}

/** Round outlined button that holds a single icon. */
export function IconButton({ label, className, children, ...rest }: IconButtonProps) {
  return (
    <button type="button" aria-label={label} className={cn(styles.iconButton, className)} {...rest}>
      {children}
    </button>
  );
}
