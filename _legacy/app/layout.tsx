import type { Metadata, Viewport } from "next";

import { Footer, Navbar } from "@/components/layout";
import { ScrollProgress } from "@/components/shared";
import { defaultMetadata, personJsonLd } from "@/config/seo";
import { themeTokens } from "@/constants/theme";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/providers/AppProviders";
import "@/styles/globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: `rgb(${themeTokens.background.primary})`
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          // Structured data must be raw JSON; the content is static and built from our own config.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppProviders>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <ScrollProgress />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
