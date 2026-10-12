"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, nextTheme, parseTheme, type Theme } from "../lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = (): Theme =>
  parseTheme(document.documentElement.getAttribute("data-theme")) ?? "dark";

// The static HTML is rendered dark; the client snapshot then picks up a saved theme.
const serverTheme = (): Theme => "dark";

/** Current theme (kept in <html data-theme>) and a toggle that also persists the choice. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  const toggleTheme = useCallback(() => {
    const next = nextTheme(readTheme());
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, []);

  return { theme, toggleTheme };
}
