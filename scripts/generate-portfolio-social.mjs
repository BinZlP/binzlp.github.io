// Generate a portfolio link preview. Pass ko for the Korean edition.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { portfolioPaths, portfolioUi } from "../src/data/portfolio-ui.ts";
import { chromium } from "./portfolio-chromium.mjs";

const locale = process.argv[2] ?? "en";
if (locale !== "en" && locale !== "ko") throw new Error("Expected en or ko.");
const ko = locale === "ko";
const { profile } = ko ? await import("../src/data/portfolio.ko.ts") : await import("../src/data/portfolio.ts");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const rows = [
  { y: 80, size: 20, color: "#4d4d4d", text: portfolioUi[locale].documentTitle },
  { y: 258, size: 72, color: "#0d0d0d", text: profile.name, bold: true },
  { y: 324, size: 30, color: "#4d4d4d", text: profile.role },
  { y: 424, size: 20, color: "#1d4ed8", text: ko ? "프로젝트 · 경력 · 연구" : "Projects · Experience · Research" },
  { y: 568, size: 18, color: "#4d4d4d", text: "binzlp.github.io" + portfolioPaths[locale].replace(/\/$/, "") },
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M80 112H1120M80 518H1120" stroke="#eaeaea"/>
  <g font-family="${ko ? "Pretendard" : "Arial, Helvetica, sans-serif"}">
    ${rows.map(({y, size, color, text, bold}) =>
      `<text x="80" y="${y}" font-size="${size}" fill="${color}" ${bold ? 'font-weight="600" letter-spacing="-2"' : ""}>${escape(text)}</text>`).join("")}
  </g></svg>`;
const directory = new URL("../public/portfolio/", import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL(ko ? "social-ko.png" : "social.png", directory);
if (ko) {
  // Chromium reads the same variable WOFF2 font and weights as the Korean portfolio.
  const font = new URL("fonts/pretendard-variable.woff2", directory);
  const source = `<!doctype html><html lang="ko"><meta charset="utf-8"><style>
    @font-face { font-family: Pretendard; src: url("${font.href}") format("woff2"); font-weight: 100 900; }
    body { margin: 0; } svg { display: block; }
  </style><body>${svg}</body></html>`;
  const temp = await mkdtemp(join(tmpdir(), "portfolio-social-"));
  try {
    const html = join(temp, "preview.html");
    const image = join(temp, "preview.png");
    await writeFile(html, source);
    execFileSync(chromium(), ["--headless", "--no-first-run", "--disable-extensions", "--disable-background-networking",
      `--user-data-dir=${join(temp, "profile")}`, "--hide-scrollbars", "--force-device-scale-factor=1",
      "--window-size=1200,630", "--virtual-time-budget=5000", `--screenshot=${image}`, pathToFileURL(html).href],
      { timeout: 90000, windowsHide: true });
    await sharp(image).png().toFile(fileURLToPath(output));
  } finally {
    await rm(temp, { force: true, recursive: true, maxRetries: 5, retryDelay: 150 });
  }
} else {
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(output));
}
console.log(`Generated ${fileURLToPath(output)} (1200 × 630)`);
