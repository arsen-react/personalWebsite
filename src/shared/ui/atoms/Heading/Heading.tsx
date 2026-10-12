import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Heading.module.css";

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  /** "section" for section titles, "display" for the larger contact headline. */
  variant?: "section" | "display";
  className?: string;
  /** Wrap the accent words in <em> to colour them. */
  children: ReactNode;
}

export function Heading({
  as: Tag = "h2",
  variant = "section",
  className,
  children,
}: HeadingProps) {
  return <Tag className={cn(styles[variant], className)}>{children}</Tag>;
}
