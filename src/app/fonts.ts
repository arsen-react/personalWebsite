import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";

// Self-hosted at build time. styles/tokens.css reads them through these CSS variables.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [manrope, instrumentSerif, jetbrainsMono]
  .map((font) => font.variable)
  .join(" ");
