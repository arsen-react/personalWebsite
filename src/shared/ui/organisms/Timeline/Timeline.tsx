import { cn } from "@/shared/lib/cn";
import { TimelineItem } from "@/shared/ui/molecules";
import styles from "./Timeline.module.css";

interface TimelineProps {
  items: { period: string; title: string; subtitle: string }[];
  className?: string;
}

/** Vertical timeline with a fading rule on the left. */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn(styles.timeline, className)}>
      {items.map((item) => (
        <TimelineItem key={`${item.period}-${item.title}`} {...item} />
      ))}
    </div>
  );
}
