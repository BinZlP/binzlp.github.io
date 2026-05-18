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
