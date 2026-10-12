"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import { navSections, profile } from "@/content/profile";
import { useTheme } from "@/lib/useTheme";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 40,
    () => false,
  );

  // Lock page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Highlight the link of the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" },
    );
    for (const { id } of navSections) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={scrolled ? "nav scrolled" : "nav"}
      id="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <div className="nav-logo">
          <span className="nav-logo-dot" aria-hidden="true" />
          {profile.brand}
        </div>

        <button
          className={menuOpen ? "hamburger active" : "hamburger"}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={menuOpen ? "nav-links open" : "nav-links"} role="list">
          {navSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeId === id ? "active" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="theme-toggle"
              aria-label="Toggle dark/light theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunIcon className="icon-sun" />
              ) : (
                <MoonIcon className="icon-moon" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
