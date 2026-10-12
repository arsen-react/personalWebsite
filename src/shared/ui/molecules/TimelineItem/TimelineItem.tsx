import styles from "./TimelineItem.module.css";

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
}

/** One entry on a vertical timeline; the dot fills on hover. */
export function TimelineItem({ period, title, subtitle }: TimelineItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.period}>{period}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
}
