/**
 * Generate the downloadable portfolio from the same public data as the website.
 * Run with Node 22.12+ and a recent Chromium browser:
 *   node --experimental-strip-types scripts/generate-portfolio-pdf.mjs
 * Set CHROME_PATH to select a browser outside the standard install locations.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  activities, awards, earlierProjects, education, experience, presentations,
  profile, projects, skills, writings,
} from '../src/data/portfolio.ts';
import { projectDiagrams, researchDiagrams } from '../src/data/portfolio-diagrams.ts';

const publicDir = new URL('../public/', import.meta.url);
const portfolioUrl = 'https://binzlp.github.io/portfolio/';
const output = fileURLToPath(new URL('portfolio/hyungseok-han-portfolio.pdf', publicDir));

function localAsset(path) {
  const url = new URL(path.replace(/^\//, ''), publicDir);
  if (!existsSync(url)) throw new Error(`Missing portfolio asset: ${path}`);
  return url.href;
}

function escape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

const link = (label, href) => `<a href="${escape(href)}">${escape(label)}</a>`;
const list = (items) => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const links = (items) => items.length
  ? `<p class="links">${items.map(item => link(item.label, item.href)).join('')}</p>` : '';

function figure(image) {
  return `<figure><a href="${escape(new URL(image.src, portfolioUrl).href)}">
    <img src="${escape(localAsset(image.src))}" width="${image.width}" height="${image.height}" alt="${escape(image.alt)}"></a>
    <figcaption>${escape(image.caption)}</figcaption></figure>`;
}

function projectEntry(item) {
  const image = projectDiagrams[item.id] ?? item.image;
  return `<article id="${escape(item.id)}" class="project ${image ? 'illustrated' : 'text-case'}">
    <p class="meta">${escape(item.company)} &nbsp;·&nbsp; ${escape(item.period)}</p>
    <h2>${escape(item.title)}</h2>
    <p class="summary">${escape(item.summary)}</p>
    <dl class="facts">
      <div><dt>Role</dt><dd>${escape(item.role)}</dd></div>
      ${item.tags?.length ? `<div><dt>Technologies</dt><dd>${escape(item.tags.join(' · '))}</dd></div>` : ''}
    </dl>
    ${image ? figure(image) : ''}
    <div class="case-row"><h3>Motivation</h3>${list(item.motivation)}</div>
    <div class="case-row"><h3>Description</h3>${list(item.description)}</div>
    <div class="case-row"><h3>Challenges &amp; achievements</h3>
      <div>${item.achievements.map(point =>
        `<p><strong>${escape(point.title)}.</strong> ${escape(point.text)}</p>`).join('')}</div></div>
    ${links(item.links)}
  </article>`;
}

function publication(item) {
  return `<article class="publication">
    <p class="meta">${escape(item.meta)}</p><h3>${escape(item.title)}</h3>
    <p>${escape(item.description)}</p>${links(item.links)}
    ${item.title.startsWith('ScaleOPT') ? `<div class="research-figures">${researchDiagrams.map(figure).join('')}</div>` : ''}
  </article>`;
}

function rows(items, label, content) {
  return `<dl class="rows">${items.map(item =>
    `<div><dt>${escape(label(item))}</dt><dd>${content(item)}</dd></div>`).join('')}</dl>`;
}

function portfolio() {
  const css = readFileSync(new URL('portfolio-pdf.css', import.meta.url), 'utf8');
  const index = projects.map(item =>
    `<li>${link(item.title, '#' + item.id)}<span>${escape(item.company)}</span></li>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>${escape(profile.name)} — Engineering portfolio</title>
    <meta name="author" content="${escape(profile.name)}">
    <style>@font-face { font-family: Geist; font-weight: 100 900; src: url("${localAsset('portfolio/fonts/geist-latin.woff2')}"); }
    ${css}</style></head><body>
    <section id="profile">
      <h1>${escape(profile.name)}</h1><p class="role">${escape(profile.role)}</p>
      <p class="intro">${escape(profile.intro)}</p>
      ${links([{label: profile.email, href: 'mailto:' + profile.email}, {label: 'GitHub', href: profile.github},
        {label: 'LinkedIn', href: profile.linkedin}, {label: 'Online portfolio', href: portfolioUrl}])}
      <h2 class="section-name">Education</h2>
      <div class="education">${education.map(item =>
        `<div><h3>${escape(item.school)}</h3><p>${escape(item.degree)}</p><p class="date">${escape(item.period)}</p></div>`).join('')}</div>
      <h2 class="section-name">Work experience</h2>
      ${experience.map(item => `<article class="job">
        <div class="heading-line"><h3>${escape(item.company)}</h3><span class="date">${escape(item.period)}</span></div>
        <p class="job-role">${escape(item.role)}</p><p>${escape(item.description)}</p>
        ${item.bullets ? list(item.bullets) : ''}</article>`).join('')}
    </section>
    <nav aria-label="Contents" class="new-page contents"><h2>Projects</h2>
      <ol>${index}</ol>
      <p class="more-links">${[
        ['Earlier projects', 'earlier-projects'], ['Presentations', 'presentations'], ['Writings', 'writings'],
        ['Other activities', 'activities'], ['Skills', 'skills'], ['Awards & honors', 'awards'],
      ].map(([title, id]) => link(title, '#' + id)).join('')}</p>
    </nav>
    <section class="new-page cases">${projects.map(projectEntry).join('')}</section>
    <section class="new-page" id="earlier-projects"><h2>Earlier projects</h2>
      ${earlierProjects.map(item => `<article class="earlier">
        <div class="heading-line"><h3>${escape(item.title)}</h3><span class="date">${escape(item.period)}</span></div>
        <p>${escape(item.description)}</p></article>`).join('')}
      <h2 class="section-name" id="presentations">Presentations</h2>${presentations.map(publication).join('')}
    </section>
    <section class="new-page" id="writings"><h2>Writings</h2>${writings.map(publication).join('')}</section>
    <section class="new-page" id="activities"><h2>Other activities</h2>
      ${rows(activities, item => item.title, item => Array.isArray(item.description) ? list(item.description) : escape(item.description))}
      <h2 id="awards" class="section-name">Awards &amp; honors</h2>
      ${rows(awards, item => item.year, item => escape(item.title))}
    </section>
    <section class="new-page" id="skills"><h2>Skills</h2>
      ${rows(skills, item => item.title, item => escape(item.items.join(' · ')))}
    </section>
  </body></html>`;
}

function chromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    ...[process.env.ProgramFiles, process.env['ProgramFiles(x86)'], process.env.LOCALAPPDATA].filter(Boolean)
      .flatMap(dir => [join(dir, 'Google/Chrome/Application/chrome.exe'), join(dir, 'Microsoft/Edge/Application/msedge.exe')]),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ];
  const browser = candidates.find(file => existsSync(file));
  if (!browser) throw new Error('Set CHROME_PATH to an installed Chromium or Chrome executable.');
  return browser;
}

const browser = chromium();
const tempDir = mkdtempSync(join(tmpdir(), 'portfolio-print-'));
try {
  const input = join(tempDir, 'portfolio.html');
  const pdf = join(tempDir, 'portfolio.pdf');
  writeFileSync(input, portfolio());
  execFileSync(browser, ['--headless', '--no-first-run', '--disable-extensions', '--disable-background-networking',
    `--user-data-dir=${join(tempDir, 'profile')}`, '--no-pdf-header-footer', `--print-to-pdf=${pdf}`,
    pathToFileURL(input).href], { timeout: 90000, windowsHide: true, maxBuffer: 2 ** 22 });
  const bytes = readFileSync(pdf);
  if (!bytes.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('Chromium returned an invalid PDF.');
  // Stage on the output volume so a failed render cannot damage the previous download.
  const stage = `${output}.${process.pid}.tmp`;
  try {
    writeFileSync(stage, bytes);
    renameSync(stage, output);
  } finally {
    rmSync(stage, { force: true });
  }
  console.log(`Generated ${output} (${Math.round(bytes.length / 1024)} KiB)`);
} finally {
  rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 });
}
