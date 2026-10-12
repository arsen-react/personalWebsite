"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useEscapeKey, useLockBodyScroll, useScrolled } from "@/shared/hooks";
import { cn } from "@/shared/lib/cn";
import { MenuButton } from "@/shared/ui/atoms";
import { Logo } from "@/shared/ui/molecules";
import { useActiveSection } from "../hooks/useActiveSection";
import styles from "./SiteHeader.module.css";

export interface NavItem {
  id: string;
  label: string;
}

interface SiteHeaderProps {
  brand: string;
  items: readonly NavItem[];
  /** Extra controls shown after the links, e.g. the theme toggle. */
  actions?: ReactNode;
}

const LINKS_ID = "site-navigation-links";

/**
 * Fixed header with in-page navigation. Gains a blurred background once the page
 * scrolls; below 768px the links collapse into a full-screen menu (Escape closes it).
 */
export function SiteHeader({ brand, items, actions }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(sectionIds);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useLockBodyScroll(menuOpen);
  useEscapeKey(closeMenu, menuOpen);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <nav className={styles.inner} aria-label="Main navigation">
        <Logo brand={brand} />

        <MenuButton
          open={menuOpen}
          aria-controls={LINKS_ID}
          onClick={() => setMenuOpen((open) => !open)}
        />

        <ul id={LINKS_ID} className={cn(styles.links, menuOpen && styles.open)} role="list">
          {items.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(styles.link, isActive && styles.active)}
                  aria-current={isActive ? "location" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            );
          })}
          {actions ? <li>{actions}</li> : null}
        </ul>
      </nav>
    </header>
  );
}
