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

블로그 글은 `src/content/blog/` 아래에 Markdown 또는 MDX로 작성합니다.

필수 frontmatter:

```yaml
title: 'Post title'
description: 'Short description'
pubDate: 2026-05-18
category: 'systems' # systems | ai | it-news | etc
tags: ['tag']
```

## Portfolio

영문 포트폴리오는 `/portfolio/`에서 공개됩니다. 블로그 메뉴나 글 목록에는 링크를 추가하지 않습니다.

- 내용: `src/data/portfolio.ts`
- 페이지 및 프로젝트 상세: `src/pages/portfolio/index.astro`, `src/components/portfolio/ProjectEntry.astro`
- 레이아웃 및 스타일: `src/layouts/PortfolioLayout.astro`, `src/styles/portfolio.css`
- 직접 작성한 프로젝트 아키텍처 SVG: `public/portfolio/diagrams/`
- 다운로드용 이력서: `public/portfolio/hyungseok-han-resume.pdf`

프로젝트는 원본 포트폴리오의 Motivation / Description / Challenges & achievements 구성을 따릅니다. SVG를 수정하면 페이지의 이미지 크기와 설명도 함께 확인합니다. 공개할 수 있는 내용만 저장하며, 내용 변경 시 `profile.updated`를 갱신합니다.

공유 이미지 재생성 (Node.js 24):

```bash
node scripts/generate-portfolio-social.mjs
```

이력서 문구는 `scripts/generate-portfolio-resume.py`에서 별도로 관리합니다. ReportLab이 설치된 Python 환경에서 재생성한 뒤 두 페이지의 레이아웃과 링크를 확인합니다.

```bash
python scripts/generate-portfolio-resume.py
```

로컬에서 `/portfolio/`의 모바일 화면, 프로젝트 펼치기/접기, `#프로젝트-id` 직접 링크, 도식 확대, PDF 다운로드를 확인한 뒤 빌드합니다. `main`에 반영하면 기존 GitHub Pages workflow가 배포합니다.
