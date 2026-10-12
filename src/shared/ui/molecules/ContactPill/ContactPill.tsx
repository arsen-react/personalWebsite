import type { ReactNode } from "react";
import { externalLinkProps, isExternalHref } from "@/shared/lib/links";
import { Icon, type IconName } from "@/shared/ui/atoms";
import styles from "./ContactPill.module.css";

interface ContactPillProps {
  href: string;
  icon: IconName;
  children: ReactNode;
}

/** Rounded contact link with a leading icon; external URLs open in a new tab. */
export function ContactPill({ href, icon, children }: ContactPillProps) {
  return (
    <a className={styles.pill} href={href} {...(isExternalHref(href) ? externalLinkProps : {})}>
      <Icon name={icon} />
      {children}
    </a>
  );
}
