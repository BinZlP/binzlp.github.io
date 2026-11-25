# BinZIP tech blog

Astro 기반 GitHub Pages 블로그입니다.

## Stack

- Astro
- Markdown / MDX
- GitHub Actions
- GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

한국어판은 기존 주소 `/blog/<slug>/`에서, 영어판은 `/en/blog/<slug>/`에서 읽을 수 있습니다. 한국어 원고를 완성한 뒤 같은 슬러그로 영문 파일을 추가합니다.

| 언어 | 원고 경로 |
| --- | --- |
| 한국어 | `src/content/blog/<slug>/index.mdx` |
| 영어 | `src/content/blog/en/<slug>/index.mdx` |

단일 Markdown 파일도 지원합니다. 예를 들어 `<slug>.md`와 `en/<slug>.md`는 한 쌍입니다. 각 판에는 해당 언어의 제목과 설명을 쓰고 발행일, 카테고리, 태그는 맞춥니다. 공개된 번역이 있으면 언어 전환 링크가 자동으로 연결됩니다. 홈, 글 목록, 태그, 카테고리, RSS에는 선택한 언어의 글만 표시됩니다.

필수 frontmatter:

```yaml
title: 'Post title'
description: 'Short description'
pubDate: 2026-05-18
category: 'systems' # systems | ai | it-news | etc
tags: ['tag']
```

초안이나 테스트 글은 해당 파일의 frontmatter에 `draft: true`를 넣어 보관할 수 있습니다. 빌드할 때 글 페이지, 목록, RSS, 사이트맵에서 제외됩니다.

## Portfolio

영문 포트폴리오는 `/portfolio/`, 한국어판은 `/portfolio/ko/`에서 공개됩니다. 두 언어는 같은 프로젝트 ID를 사용하므로 `#inference` 같은 직접 링크에서 언어를 전환해도 해당 프로젝트로 이동합니다. 블로그 메뉴나 글 목록에는 링크를 추가하지 않습니다.

- 영문 원고 및 공통 메타데이터: `src/data/portfolio.ts`. 프로젝트 측정값은 `src/data/portfolio-metrics.ts`에서 관리합니다.
- 한국어 원고: `src/data/portfolio.ko.ts`, `src/data/portfolio-projects.ko.ts`
- 두 언어의 페이지 및 프로젝트 상세: `src/pages/portfolio/[...language].astro`, `src/components/portfolio/ProjectEntry.astro`
- 레이아웃 및 스타일: `src/layouts/PortfolioLayout.astro`, `src/styles/portfolio.css`
- 도식: `public/portfolio/diagrams/`의 공통 원본을 사용합니다. 설명은 `src/data/portfolio-diagrams.ts`와 `src/data/portfolio-diagrams.ko.ts`에서 관리합니다.
- 각 언어판에서 해당 언어의 포트폴리오 PDF와 영문 이력서 PDF를 다운로드할 수 있습니다. 이전 프로젝트는 웹에서만 제공합니다.

프로젝트는 원본 포트폴리오의 Motivation / Description / Challenges & achievements 구성을 따릅니다. SVG를 수정하면 페이지의 이미지 크기와 설명도 함께 확인합니다. 공개할 수 있는 내용만 저장하며, 내용 변경 시 `profile.updated`를 갱신합니다.

공유 이미지 재생성 (Node.js 24):

```bash
node scripts/generate-portfolio-social.mjs
node scripts/generate-portfolio-social.mjs ko
```

포트폴리오 PDF는 웹과 같은 공개 데이터와 도식을 사용합니다. 내용이나 도식을 수정하면 Node.js 22.12 이상과 Chrome 또는 Chromium이 설치된 환경에서 아래 명령으로 PDF를 갱신하고 함께 커밋합니다. 브라우저를 자동으로 찾지 못하면 `CHROME_PATH`를 실행 파일 경로로 지정합니다.

```bash
node --experimental-strip-types scripts/generate-portfolio-pdf.mjs
node --experimental-strip-types scripts/generate-portfolio-pdf.mjs ko
```

이력서 문구는 `scripts/generate-portfolio-resume.py`에서 별도로 관리합니다. 아래 명령으로 재생성한 뒤 두 페이지의 레이아웃과 링크를 확인합니다.

```bash
python -m pip install reportlab "fonttools[woff]"
python scripts/generate-portfolio-resume.py
```

로컬에서 `/portfolio/`의 모바일 화면, 프로젝트 펼치기/접기, `#프로젝트-id` 직접 링크, 도식 확대, PDF 다운로드를 확인한 뒤 빌드합니다. `main`에 반영하면 기존 GitHub Pages workflow가 배포합니다.
