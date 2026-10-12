import { themeInitScript } from "../lib/theme";

/** Inline script for <head>: applies the saved theme before the page paints. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
