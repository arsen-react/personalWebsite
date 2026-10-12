import { cn } from "@/shared/lib/cn";
import styles from "./CodeSample.module.css";

/**
 * Decorative "editor window" in the hero. The block uses white-space: pre, so the newlines
 * and indents in the strings below are exactly what renders.
 */
export function CodeSample({ className }: { className?: string }) {
  return (
    <div className={cn(styles.code, className)}>
      <span className={styles.comment}>{"// architecture.ts"}</span>
      {"\n"}
      <span className={styles.keyword}>const</span> <span className={styles.fn}>buildSystem</span>
      {" = () => {\n  "}
      <span className={styles.keyword}>return</span>
      {" {\n    framework: "}
      <span className={styles.str}>&quot;React&quot;</span>
      {",\n    state: "}
      <span className={styles.str}>&quot;Redux Toolkit&quot;</span>
      {",\n    quality: "}
      <span className={styles.str}>&quot;production&quot;</span>
      {",\n    scale: "}
      <span className={styles.keyword}>Infinity</span>
      {"\n  };\n};"}
    </div>
  );
}
