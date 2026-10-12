import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  align?: "start" | "center";
  className?: string;
}

/** Small uppercase label with a leading rule, shown above section headings. */
export function Eyebrow({ children, align = "start", className }: EyebrowProps) {
  return (
    <span className={cn(styles.eyebrow, align === "center" && styles.center, className)}>
      {children}
    </span>
  );
}
