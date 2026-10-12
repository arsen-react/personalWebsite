"use client";

import { Icon, IconButton } from "@/shared/ui/atoms";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <IconButton
      label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
    >
      <Icon name={isDark ? "sun" : "moon"} />
    </IconButton>
  );
}
