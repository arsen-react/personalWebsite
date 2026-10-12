import type { ReactNode } from "react";
import { Eyebrow, Heading } from "@/shared/ui/atoms";

interface SectionHeadingProps {
  label: string;
  /** Title text; wrap accent words in <em>. */
  children: ReactNode;
  align?: "start" | "center";
  variant?: "section" | "display";
}

/** Eyebrow label plus title; fades in when scrolled into view. */
export function SectionHeading({
  label,
  children,
  align = "start",
  variant = "section",
}: SectionHeadingProps) {
  return (
    <div className="reveal">
      <Eyebrow align={align}>{label}</Eyebrow>
      <Heading as="h2" variant={variant}>
        {children}
      </Heading>
    </div>
  );
}
