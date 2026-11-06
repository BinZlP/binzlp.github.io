// Generate the portfolio's social preview from code-native vector artwork.
// Run from the repository root: node scripts/generate-portfolio-social.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { profile } from "../src/data/portfolio.ts";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M80 112H1120M80 518H1120" stroke="#eaeaea"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#0d0d0d">
    <text x="80" y="80" font-size="20" fill="#4d4d4d">Engineering portfolio</text>
    <text x="80" y="258" font-size="72" font-weight="600" letter-spacing="-2">${escape(profile.name)}</text>
    <text x="80" y="324" font-size="30" fill="#4d4d4d">${escape(profile.role)}</text>
    <text x="80" y="424" font-size="20" fill="#047857">Projects · Experience · Research</text>
    <text x="80" y="568" font-size="18" fill="#4d4d4d">binzlp.github.io/portfolio</text>
  </g>
</svg>`;

const output = new URL("../public/portfolio/social.png", import.meta.url);
await mkdir(new URL("../public/portfolio/", import.meta.url), {
  recursive: true,
});
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(output));
console.log("Generated public/portfolio/social.png (1200 × 630)");
