export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

export function parseTheme(value: string | null | undefined): Theme | null {
  return value === "dark" || value === "light" ? value : null;
}

/** Dark is the default, so a page with no theme set switches to light on the first toggle. */
export function nextTheme(current: Theme | null): Theme {
  return current === "light" ? "dark" : "light";
}

/** Runs in <head> before first paint, so a saved light theme never flashes dark. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
