import type { ReactNode } from "react";
import { SkipLink } from "@/shared/ui/atoms";

interface PageLayoutProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

/** Page skeleton: skip link, header, main content (the skip link's target) and footer. */
export function PageLayout({ header, footer, children }: PageLayoutProps) {
  return (
    <>
      <SkipLink href="#main" />
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
