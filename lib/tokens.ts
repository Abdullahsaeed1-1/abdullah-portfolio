/**
 * Fixed colours from app/globals.css, for places that cannot read CSS variables:
 * the viewport theme colour, the web manifest and the generated Open Graph image.
 * Keep in sync with the @theme block.
 */
export const colorTokens = {
  night: "#0b0b0a",
  cream: "#f3f2ed",
  coal: "#0b0b0a",
  olive: "#8c9a55",
  oliveDeep: "#55602c",
  // Legacy accent names, kept as olive so older call sites stay on-palette.
  signal: "#8c9a55",
  lavender: "#8c9a55",
  cobalt: "#8c9a55",
  acid: "#8c9a55",
  lime: "#8c9a55",
  mutedOnDark: "#9a9a90"
} as const;

export type SectionTheme = "dark" | "light" | "signal" | "cobalt" | "acid";

export interface ThemePalette {
  readonly bg: string;
  readonly fg: string;
  readonly muted: string;
  readonly edge: string;
  readonly card: string;
  readonly accent: string;
}

/** Mirrors the [data-theme] blocks in globals.css, for canvases that draw in a fixed section theme. */
const olivePalette: ThemePalette = {
  bg: "#8c9a55",
  fg: "#0b0b0a",
  muted: "#2f3618",
  edge: "#0b0b0a",
  card: "#9aa766",
  accent: "#0b0b0a"
};

export const themePalettes: Record<SectionTheme, ThemePalette> = {
  dark: {
    bg: "#0b0b0a",
    fg: "#f3f2ed",
    muted: "#9a9a90",
    edge: "#262622",
    card: "#151513",
    accent: "#8c9a55"
  },
  light: {
    bg: "#f3f2ed",
    fg: "#0b0b0a",
    muted: "#5e5d55",
    edge: "#dcdbd2",
    card: "#e8e7e0",
    accent: "#55602c"
  },
  signal: olivePalette,
  cobalt: olivePalette,
  acid: olivePalette
};
