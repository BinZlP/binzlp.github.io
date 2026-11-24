/**
 * Generate the downloadable portfolio from the same public data as the website.
 * Run with Node 22.12+ and a recent Chromium browser:
 *   node --experimental-strip-types scripts/generate-portfolio-pdf.mjs [en|ko]
 * Set CHROME_PATH to select a browser outside the standard install locations.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { portfolioPaths, portfolioUi } from '../src/data/portfolio-ui.ts';
import { chromium } from './portfolio-chromium.mjs';

const locale = process.argv[2] ?? 'en';
if (!['en', 'ko'].includes(locale) || process.argv.length > 3) {
  throw new Error('Usage: node --experimental-strip-types scripts/generate-portfolio-pdf.mjs [en|ko]');
}
const korean = locale === 'ko';
const labels = portfolioUi[locale];
const separator = labels.separator;
const {
  activities, awards, companies, education, experience, presentations,
  profile, projects, skills, writings,
} = korean ? await import('../src/data/portfolio.ko.ts') : await import('../src/data/portfolio.ts');
const { projectDiagrams, researchDiagrams } = korean
  ? await import('../src/data/portfolio-diagrams.ko.ts') : await import('../src/data/portfolio-diagrams.ts');

const publicDir = new URL('../public/', import.meta.url);
const portfolioUrl = new URL(portfolioPaths[locale], 'https://binzlp.github.io').href;
const output = fileURLToPath(new URL(`portfolio/hyungseok-han-portfolio${korean ? '-ko' : ''}.pdf`, publicDir));

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
const companyLink = (company) => link(companies[company].label, companies[company].href);
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
    <p class="meta">${companyLink(item.company)} &nbsp;${separator}&nbsp; ${escape(item.period)}</p>
    <h2>${escape(item.title)}</h2>
    <p class="summary">${escape(item.summary)}</p>
    <dl class="facts">
      <div><dt>${labels.role}</dt><dd>${escape(item.role)}</dd></div>
      ${item.tags?.length ? `<div><dt>${labels.technologies}</dt><dd>${escape(item.tags.join(` ${separator} `))}</dd></div>` : ''}
    </dl>
    ${image ? figure(image) : ''}
    <div class="case-row"><h3>${labels.motivation}</h3>${list(item.motivation)}</div>
    <div class="case-row"><h3>${labels.description}</h3>${list(item.description)}</div>
    <div class="case-row"><h3>${escape(labels.achievements)}</h3>
      <div>${item.achievements.map(point =>
        `<p><strong>${escape(point.title)}${korean ? '' : '.'}</strong> ${escape(point.text)}</p>`).join('')}</div></div>
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
    `<li>${link(item.title, '#' + item.id)}<span>${companyLink(item.company)}</span></li>`).join('');
  const koreanFont = korean ? `@font-face { font-family: Pretendard; font-weight: 45 920; src: url("${localAsset('portfolio/fonts/pretendard-variable.woff2')}"); }` : '';
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
    <title>${escape(profile.name)} — ${labels.documentTitle}</title>
    <meta name="author" content="${escape(profile.name)}">
    <style>@font-face { font-family: Geist; font-weight: 100 900; src: url("${localAsset('portfolio/fonts/geist-latin.woff2')}"); }
    ${koreanFont}
    ${css}
    @page { @top-left { content: "${labels.documentTitle}"; } }</style></head><body>
    <section id="profile">
      <h1>${escape(profile.name)}</h1><p class="role">${escape(profile.role)}</p>
      <p class="intro">${escape(profile.intro)}</p>
      ${links([{label: profile.email, href: 'mailto:' + profile.email}, {label: 'GitHub', href: profile.github},
        {label: 'LinkedIn', href: profile.linkedin}, {label: korean ? '웹 포트폴리오' : 'Online portfolio', href: portfolioUrl}])}
      <h2 class="section-name">${labels.education}</h2>
      <div class="education">${education.map(item =>
        `<div><h3>${escape(item.school)}</h3><p>${escape(item.degree)}</p><p class="date">${escape(item.period)}</p></div>`).join('')}</div>
      <h2 class="section-name">${labels.experience}</h2>
      ${experience.map(item => `<article class="job">
        <div class="heading-line"><h3>${companyLink(item.company)}</h3><span class="date">${escape(item.period)}</span></div>
        <p class="job-role">${escape(item.role)}</p><p>${escape(item.description)}</p>
        ${item.bullets ? list(item.bullets) : ''}</article>`).join('')}
    </section>
    <nav aria-label="${labels.contents}" class="new-page contents"><h2>${labels.projects}</h2>
      <ol>${index}</ol>
      <p class="more-links">${['presentations', 'writings', 'activities', 'skills', 'awards']
        .map(id => link(labels[id], '#' + id)).join('')}</p>
    </nav>
    <section class="new-page cases">${projects.map(projectEntry).join('')}</section>
    <section class="new-page" id="presentations"><h2>${labels.presentations}</h2>${presentations.map(publication).join('')}</section>
    <section id="writings"><h2>${labels.writings}</h2>${writings.map(publication).join('')}</section>
    <section class="new-page" id="activities"><h2>${labels.activities}</h2>
      ${rows(activities, item => item.title, item => Array.isArray(item.description) ? list(item.description) : escape(item.description))}
      <h2 id="awards" class="section-name">${escape(labels.awards)}</h2>
      ${rows(awards, item => item.year, item => escape(item.title))}
    </section>
    <section class="new-page" id="skills"><h2>${labels.skills}</h2>
      ${rows(skills, item => item.title, item => escape(item.items.join(` ${separator} `)))}
    </section>
  </body></html>`;
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
