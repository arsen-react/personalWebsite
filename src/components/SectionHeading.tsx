import type { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  children: ReactNode;
}

export function SectionHeading({ label, children }: SectionHeadingProps) {
  return (
    <div className="reveal">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{children}</h2>
    </div>
  );
}
