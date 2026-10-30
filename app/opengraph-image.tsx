import { ImageResponse } from "next/og";

import { hero } from "@/content/home";
import { site } from "@/content/site";
import { colorTokens } from "@/lib/tokens";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colorTokens.night,
        color: colorTokens.cream
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: 3,
          color: colorTokens.mutedOnDark,
          textTransform: "uppercase"
        }}
      >
        {hero.eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontSize: 76,
          lineHeight: 1.02,
          maxWidth: 1000
        }}
      >
        {hero.heading.before}
        <span style={{ color: colorTokens.signal, marginLeft: 18, marginRight: 18 }}>
          {hero.heading.signal}
        </span>
        {hero.heading.after.trim()}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          borderTop: `1px solid ${colorTokens.cream}`,
          paddingTop: 24
        }}
      >
        <span>{site.name}</span>
        <span style={{ color: colorTokens.mutedOnDark }}>{site.domain}</span>
      </div>
    </div>,
    size
  );
}
