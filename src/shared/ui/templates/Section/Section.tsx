import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  children: ReactNode;
  /** "narrow" for text-centred sections such as contact. */
  width?: "default" | "narrow";
  /** "tinted" adds the soft accent gradient behind the section. */
  tone?: "plain" | "tinted";
  align?: "start" | "center";
}

/** Page section with the standard vertical rhythm and a centred content column. */
export function Section({
  id,
  children,
  width = "default",
  tone = "plain",
  align = "start",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        styles.section,
        tone === "tinted" && styles.tinted,
        align === "center" && styles.centered,
      )}
    >
      <div className={width === "narrow" ? styles.narrow : styles.container}>{children}</div>
    </section>
  );
}
