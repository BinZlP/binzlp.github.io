import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Keep public download links stable while refreshing embedded copies after an edit.
export function portfolioAssetUrl(file: string): string {
  const publicPath = file.startsWith("/portfolio/") ? file : `/portfolio/${file}`;
  const bytes = readFileSync(resolve("public", `.${publicPath}`));
  const version = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
  return `${publicPath}?v=${version}`;
}
