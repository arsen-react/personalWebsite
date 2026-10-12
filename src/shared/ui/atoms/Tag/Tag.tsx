import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Tag.module.css";

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Compact keyword chip, e.g. a technology name. */
export function Tag({ children, className }: TagProps) {
  return <span className={cn(styles.tag, className)}>{children}</span>;
}
