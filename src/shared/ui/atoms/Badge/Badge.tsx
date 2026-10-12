import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { externalLinkProps, isExternalHref } from "@/shared/lib/links";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: ReactNode;
  /** Turns the badge into a link; external URLs open in a new tab. */
  href?: string;
  className?: string;
}

/** Outlined pill for short metadata such as a date range. */
export function Badge({ children, href, className }: BadgeProps) {
  const classes = cn(styles.badge, className);

  if (href) {
    return (
      <a className={classes} href={href} {...(isExternalHref(href) ? externalLinkProps : {})}>
        {children}
      </a>
    );
  }
  return <span className={classes}>{children}</span>;
}
