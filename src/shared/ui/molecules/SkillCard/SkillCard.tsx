import { Tag } from "@/shared/ui/atoms";
import styles from "./SkillCard.module.css";

interface SkillCardProps {
  icon: string;
  title: string;
  tags: string[];
}

export function SkillCard({ icon, title, tags }: SkillCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag} className={styles.tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
