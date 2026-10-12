import styles from "./SkipLink.module.css";

interface SkipLinkProps {
  href?: string;
  children?: string;
}

/** First focusable element on the page; lets keyboard users jump past the header. */
export function SkipLink({ href = "#main", children = "Skip to content" }: SkipLinkProps) {
  return (
    <a className={styles.skipLink} href={href}>
      {children}
    </a>
  );
}
