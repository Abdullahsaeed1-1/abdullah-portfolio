import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "rgb(var(--color-background-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-background-secondary) / <alpha-value>)"
        },
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        foreground: {
          primary: "rgb(var(--color-foreground-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-foreground-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-foreground-muted) / <alpha-value>)"
        },
        accent: {
          blue: "rgb(var(--color-accent-blue) / <alpha-value>)",
          cyan: "rgb(var(--color-accent-cyan) / <alpha-value>)",
          purple: "rgb(var(--color-accent-purple) / <alpha-value>)"
        },
        status: {
          success: "rgb(var(--color-success) / <alpha-value>)",
          warning: "rgb(var(--color-warning) / <alpha-value>)",
          error: "rgb(var(--color-error) / <alpha-value>)"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "Consolas", "monospace"]
      },
      maxWidth: {
        content: "1200px",
        readable: "720px",
        shell: "1440px"
      },
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "250ms",
        medium: "350ms",
        slow: "500ms",
        cinematic: "700ms"
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px"
      },
      boxShadow: {
        soft: "0 18px 60px rgb(0 0 0 / 0.24)",
        glow: "0 0 40px rgb(59 130 246 / 0.18)"
      },
      keyframes: {
        "hero-fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scene-fade-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(4px)", opacity: "1" }
        }
      },
      animation: {
        "hero-fade-up": "hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scene-fade-in": "scene-fade-in 1200ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
