import styles from "./LanguageItem.module.css";

interface LanguageItemProps {
  name: string;
  level: string;
}

export function LanguageItem({ name, level }: LanguageItemProps) {
  return (
    <div className={styles.item}>
      <span className={styles.name}>{name}</span>
      <span className={styles.level}>{level}</span>
    </div>
  );
}
