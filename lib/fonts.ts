import { Inter_Tight, JetBrains_Mono } from "next/font/google";

// One professional grotesque for headings and body; weight and tracking carry the hierarchy.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Mono only sets small labels; not preloading it leaves bandwidth for the face that paints the LCP.
  preload: false
});

export const fontVariables = `${interTight.variable} ${jetBrainsMono.variable}`;
