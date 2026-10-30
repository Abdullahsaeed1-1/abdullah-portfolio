import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { themeTokens } from "@/constants/theme";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const toRgb = (token: string) => `rgb(${token.replaceAll(" ", ", ")})`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `radial-gradient(circle at 80% 30%, ${toRgb(themeTokens.accent.blue)}33, transparent 45%), ${toRgb(themeTokens.background.primary)}`,
          color: toRgb(themeTokens.foreground.primary)
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: toRgb(themeTokens.accent.cyan) }}>
          SOFTWARE ENGINEER
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 24 }}>{siteConfig.author.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: toRgb(themeTokens.foreground.secondary), maxWidth: 900 }}>
          Premium web products, AI tools, and dashboards.
        </div>
      </div>
    ),
    size
  );
}
