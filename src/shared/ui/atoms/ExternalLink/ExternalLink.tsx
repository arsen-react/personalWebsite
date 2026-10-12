import type { AnchorHTMLAttributes } from "react";
import { externalLinkProps } from "@/shared/lib/links";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Link to another site: opens in a new tab without giving it access to this page. */
export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  return (
    <a {...externalLinkProps} {...rest}>
      {children}
    </a>
  );
}
