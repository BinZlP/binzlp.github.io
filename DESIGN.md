---
version: alpha
name: BinZIP Tech Blog
description: Documentation-grade technical blog combining Mintlify clarity with Vercel precision.
colors:
  primary: "#0D0D0D"
  secondary: "#4D4D4D"
  tertiary: "#047857"
  neutral: "#FFFFFF"
  surface: "#FAFAFA"
  border: "#EAEAEA"
  code: "#171717"
typography:
  h1:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.045em"
  h2:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 620
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  mono-sm:
    fontFamily: Geist Mono
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.04em"
rounded:
  sm: 6px
  md: 12px
  lg: 18px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 72px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 12px
  badge-accent:
    backgroundColor: "#DDFBEF"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.pill}"
    padding: 8px
  badge-neutral:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.pill}"
    padding: 8px
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  code-block:
    backgroundColor: "{colors.code}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 24px
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    height: 1px
---

## Overview

BinZIP Tech Blog should feel like a calm technical documentation product rather than a generic personal blog. The base mood comes from Mintlify: bright white canvas, generous reading space, subtle green accent, pill-shaped tags, and documentation-grade clarity. Vercel contributes the precision layer: compressed Inter/Geist-like headings, shadow-as-border cards, monochrome restraint, and code-forward details.

The result is a Korean-friendly engineering blog for systems, AI, and software notes. The interface must stay quiet so long-form posts remain readable, but cards, navigation, and code surfaces should feel deliberate and modern.

## Colors

- **Primary (#0D0D0D):** Near-black for headings, primary text, and high-emphasis buttons.
- **Secondary (#4D4D4D):** Body descriptions, metadata, and secondary navigation text.
- **Tertiary (#10B981):** Calm emerald accent inspired by Mintlify green. Use for tags, focus rings, active states, and small highlights only.
- **Neutral (#FFFFFF):** Main page and card background.
- **Surface (#FAFAFA):** Soft section panels, inline code, and low-emphasis surfaces.
- **Border (#EAEAEA):** Thin separators and Vercel-style shadow borders.
- **Code (#171717):** Code block background and technical contrast color.

Accent color is functional, not decorative. It marks taxonomy, hover/focus states, and primary information scent.

## Typography

Use Inter for all reading and UI text, with Geist Mono for code, metadata, and technical labels. Large headings use tight negative letter-spacing to borrow Vercel's engineered feel. Body copy uses relaxed line-height for Korean and English mixed technical writing.

- Display headings: 48–56px desktop, 40px mobile, 620–650 weight, tight tracking.
- Section headings: 28–32px, 620 weight, tight tracking.
- Body: 16–18px, 1.7 line-height, normal tracking.
- Metadata and chips: 12–13px, mono or Inter medium, uppercase only for English technical labels.
- Code: Geist Mono, 14px, 1.65 line-height, dark block background or soft inline surface.

## Layout

The blog uses a centered content model with two widths: 1040px for index/list pages and 760px for post reading. Home sections have 64–88px vertical rhythm. Lists use single-column cards so post titles and descriptions are scannable. Avoid dense multi-column layouts unless there are many posts.

Hero sections should have a soft radial emerald wash near the top, but the page remains mostly white. The header is sticky, translucent, and light; it should not dominate reading.

## Elevation & Depth

Depth is mostly border-driven. Use Vercel's shadow-as-border technique for cards:

`box-shadow: 0 0 0 1px rgba(13,13,13,0.08), 0 2px 8px rgba(13,13,13,0.04)`

Hover may increase border contrast and lift slightly. Heavy shadows are not allowed. Code blocks use solid dark surfaces for contrast.

## Shapes

- Buttons and taxonomy chips use full pill radius.
- Cards and content panels use 16–18px radius.
- Images use 14px radius and a subtle border/shadow ring.
- Inline code uses 6px radius.

## Components

- **Header:** white/translucent sticky bar, 1px subtle border, compact nav links, active state as emerald-tinted pill or underline.
- **Hero:** small emerald pill eyebrow, compressed headline, muted subtitle, two pill CTAs.
- **Post card:** white background, shadow-border, 18px radius, large clickable area, mono metadata, title, muted description, hover lift.
- **Chips:** emerald-tinted pill for categories/tags, neutral pill for secondary filters.
- **Article:** narrow reading column, large title, muted description, metadata row, generous paragraph spacing, styled code blocks and blockquotes.
- **Footer:** quiet centered text with subtle top border.

## Do's and Don'ts

Do keep the interface mostly white, spacious, and text-first. Do use emerald accent sparingly for orientation. Do use shadow-as-border for cards. Do preserve strong code readability. Do optimize for Korean technical prose with relaxed line-height.

Don't turn the blog into a colorful marketing landing page. Don't use heavy gradients or heavy shadows. Don't overuse green fills. Don't make cards too dense. Don't use pure black for large reading blocks when near-black is sufficient.
