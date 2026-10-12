import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: string[];
  /** Accessible name for the group of items. */
  label: string;
}

/**
 * Endless horizontal scroll of short items. The list is rendered twice so the loop is
 * seamless; the copy is hidden from screen readers.
 */
export function Marquee({ items, label }: MarqueeProps) {
  return (
    <div className={styles.strip} role="group" aria-label={label}>
      <div className={styles.track}>
        {[...items, ...items].map((item, index) => (
          <span
            className={styles.item}
            key={`${item}-${index}`}
            aria-hidden={index >= items.length || undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
