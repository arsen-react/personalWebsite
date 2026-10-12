export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parses "#rrggbb"; anything else returns the fallback colour. */
export function hexToRgb(hex: string, fallback: Rgb = { r: 0, g: 0, b: 0 }): Rgb {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!match) return fallback;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

export function rgba({ r, g, b }: Rgb, alpha: number): string {
  return `rgba(${r},${g},${b},${alpha})`;
}
