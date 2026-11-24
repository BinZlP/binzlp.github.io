import { existsSync } from "node:fs";
import { join } from "node:path";

export function chromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const windowsDirs = [process.env.ProgramFiles, process.env["ProgramFiles(x86)"], process.env.LOCALAPPDATA];
  const candidates = [
    ...windowsDirs.filter(Boolean).flatMap(dir => [
      join(dir, "Google/Chrome/Application/chrome.exe"),
      join(dir, "Microsoft/Edge/Application/msedge.exe"),
    ]),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const browser = candidates.find(path => existsSync(path));
  if (!browser) throw new Error("Set CHROME_PATH to an installed Chromium or Chrome executable.");
  return browser;
}
