import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/atoms";
import { BulletList } from "@/shared/ui/molecules";
import styles from "./EntryCard.module.css";

interface EntryCardProps {
  /** Usually plain text; can be a link. */
  title: ReactNode;
  subtitle: string;
  badge?: { label: string; href?: string };
  items: string[];
  className?: string;
}

/** Card for a job or project: title, subtitle, a badge on the right and a bullet list. */
export function EntryCard({ title, subtitle, badge, items, className }: EntryCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        {badge ? <Badge href={badge.href}>{badge.label}</Badge> : null}
      </div>
      <BulletList items={items} />
    </article>
  );
}
