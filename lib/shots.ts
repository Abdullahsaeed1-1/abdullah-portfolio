import { existsSync } from "node:fs";
import path from "node:path";

// Checked at build time, so dropping a file into public/shots replaces its placeholder on the next build.
export function shotExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
