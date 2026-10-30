export interface ThemeColorScale {
  readonly primary: string;
  readonly secondary: string;
  readonly muted?: string;
}

export interface ThemeAccentScale {
  readonly blue: string;
  readonly cyan: string;
  readonly purple: string;
}

export interface ThemeStatusScale {
  readonly success: string;
  readonly warning: string;
  readonly error: string;
}

export interface ThemeTokens {
  readonly background: ThemeColorScale;
  readonly foreground: Required<ThemeColorScale>;
  readonly surface: string;
  readonly accent: ThemeAccentScale;
  readonly status: ThemeStatusScale;
}
