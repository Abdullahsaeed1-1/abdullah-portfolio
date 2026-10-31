import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Nav } from "@/components/layout/Nav";
import { ScrollTheme } from "@/components/layout/ScrollTheme";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { colorTokens } from "@/lib/tokens";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: colorTokens.night
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={fontVariables}>
      <body className="bg-paper text-ink">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] min-h-11 -translate-y-24 rounded-full border border-ink bg-paper px-4 py-2 text-small focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollTheme />
        <Nav />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
