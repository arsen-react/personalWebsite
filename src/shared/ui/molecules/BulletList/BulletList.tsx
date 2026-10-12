import styles from "./BulletList.module.css";

/** Two-column list with short accent dashes; one column on small screens. */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
