# MRDVS documentation repository instructions

These instructions apply to the entire repository. Follow a more specific nested `AGENTS.md` if one is added later.

## Project overview

- This repository contains the public documentation site for 迈尔微视 (MRDVS).
- The site is built with [Mintlify](https://mintlify.com) using MDX pages and `docs.json`.
- The documentation covers MRDVS 3D cameras, developer integration, software and SDKs, industry solutions, case studies, downloads, FAQs, technical articles, and company information.
- The main product families are the S, M, H, and V Series.
- Site-wide configuration, navigation, redirects, SEO metadata, analytics, branding, and integrations live in `docs.json`.
- Static images live in `images/`; migrated downloads and other binary assets live in `files/` and `videos/`.

## Repository structure

| Path | Purpose |
| --- | --- |
| `products/` | Chinese product documentation for the S, M, H, and V Series |
| `developers/` | Chinese software, Camera SDK, ROS, protocol, localization, and deployment documentation |
| `solutions/` | Chinese solutions and customer case studies |
| `resources/` | Chinese downloads, FAQs, insights, and videos |
| `index.mdx`, `about.mdx` | Chinese home and company pages |
| `en/` | English documentation and translation baseline for international locales |
| `ja/`, `ko/`, `vi/`, `de/`, `it/`, `es/`, `ru/` | Japanese, Korean, Vietnamese, German, Italian, Spanish, and Russian documentation |
| `docs.json` | Mintlify site configuration and navigation |

Chinese (`zh-CN`) is the default language and uses routes without a locale prefix. English uses `/en/`; other translations use their ISO locale prefix. Thai is not part of the current site.

## Before making changes

1. Read `docs.json` to understand the current navigation and route.
2. Search for an existing page before creating a new one.
3. Read two or three nearby pages in the same language and section to match their structure and level of detail.
4. For current Mintlify behavior, use the installed Mintlify skill and consult the official Mintlify documentation. Use the Mintlify MCP servers when available:
   - `https://mcp.mintlify.com` for project content and settings.
   - `https://www.mintlify.com/docs/mcp` for Mintlify product documentation search.
5. Verify product facts against supplied source material or an official MRDVS source. Do not infer technical specifications.

## Sources of truth and localization

- Treat the root MDX files as the Chinese source for product facts and the default site experience.
- Treat `en/` as the translation baseline for `ja`, `ko`, `vi`, `de`, `it`, `es`, and `ru`.
- When shared content changes, update the Chinese page, its English equivalent, and every affected locale in the same task unless the user explicitly limits the scope.
- The eight non-Chinese locale trees must contain the same relative MDX paths as `en/`. There are currently 78 MDX pages per locale.
- Keep the navigation hierarchy consistent across languages. Localize tab and group labels, but preserve page order, icons, nesting, and page suffixes.
- A new public page must be added to every supported locale and to the corresponding language tree in `docs.json`. Do not expose a navigation entry whose target file does not exist.
- Convert internal links to the destination locale. Chinese links have no locale prefix; translated links must use `/en/`, `/ja/`, `/ko/`, `/vi/`, `/de/`, `/it/`, `/es/`, or `/ru/` as appropriate.
- Preserve MDX/JSX tag names, attribute names, icon identifiers, code, commands, file names, asset URLs, external URLs, model numbers, measurements, IDs, and product names during translation.
- Use natural technical language in each locale. Do not perform literal translations that change the technical meaning.
- Do not leave translation placeholders, mixed-language fragments, or source-locale internal links.

## Preferred terminology

Use these names and capitalization consistently. Do not translate trademarks or identifiers.

| Preferred term | Guidance |
| --- | --- |
| 迈尔微视 | Company name in Chinese content |
| MRDVS | Company name in English and other international content; keep uppercase |
| S Series, M Series, H Series, V Series | Use in international content; use `S 系列`, `M 系列`, `H 系列`, `V 系列` in Chinese |
| LxCameraViewer | Preserve this exact capitalization |
| Camera SDK | Preserve this exact name; do not rename it to a generic SDK |
| RGB-D, dToF, iToF, IMU, SLAM, ROS, ROS1, ROS2, SDK, API | Preserve capitalization and established technical meaning |
| LiDAR | Prefer this spelling in international content |
| 上位机软件 | Preferred Chinese term for host-side camera software |
| 点云 / point cloud | Use for 3D point data |
| 深度图 / depth map | Use for depth-image output |

Product model names such as `S2 Max`, `S2 Max 2.0`, `S10`, `S10 Ultra`, `S11`, `M4`, `M4 Pro`, `M4 Mega`, `M4-G`, `H3310`, and `V2 Pro` must remain unchanged.

## Writing style

- Use active voice and address the reader directly. Use `你` in Chinese and “you” in English.
- Keep sentences concise and focused on one idea.
- Use sentence case for headings in languages where capitalization applies.
- Start procedural pages with context and prerequisites, then present steps in task order.
- Use numbered steps for procedures and bullets for unordered facts.
- Bold UI labels: `点击 **设置**` or `Click **Settings**`.
- Use code formatting for commands, paths, file names, APIs, parameters, UI values, and identifiers.
- Prefer precise, factual descriptions over marketing claims.
- Avoid filler, repetition, unsupported superlatives, emoji, and decorative emphasis.
- Explain warnings before the risky action.
- Use realistic, tested code examples. Every fenced code block must include a language tag when one is available.
- Add descriptive alt text to images. Do not use the file name as alt text.

## MDX and frontmatter

Every page must begin with valid YAML frontmatter:

```yaml
---
title: "Clear page title"
description: "Concise description for search and navigation."
---
```

- `title` and `description` are required for all new and translated pages.
- Preserve existing `legacyId` and `legacyUrls` fields on migrated Chinese pages. Do not add them to translated pages or remove them without an explicit migration task.
- Use Mintlify components when they improve scanning or navigation. Prefer built-in components such as `<Card>`, `<Columns>`, `<Steps>`, `<Tabs>`, `<Accordion>`, `<Note>`, `<Tip>`, and `<Warning>` over custom markup.
- Keep component tag names, nesting, and attribute names valid. Translate only reader-facing attribute values such as `title` or `label`.
- Markdown headings require a space after the hash marks: use `## Heading`, never `##Heading`.
- In prose and tables, write comparisons such as `< 9 W` with a space or escape the character so MDX does not parse the value as a tag.
- Use root-relative internal links without `.mdx`, for example `/developers/camera-sdk/user-guide` or `/en/developers/camera-sdk/user-guide`.
- Use root-relative paths for repository assets, for example `/images/example.png`.
- Do not use `../` links for internal pages.

## Navigation, routes, and redirects

- Keep the five top-level tabs aligned across all languages: product documentation, use and development, solutions and cases, support and resources, and about MRDVS.
- When adding, renaming, moving, or deleting a page, update every affected language tree in `docs.json`.
- Preserve `/about` and each localized `/<locale>/about` route.
- When a published route changes, add a permanent redirect in `docs.json`. Do not delete legacy `/node/...` or `/doc/editor/...` redirects unless the user explicitly requests a redirect cleanup.
- Check that every page referenced in navigation exists and that no localized navigation points to another locale.
- Keep navigation shallow and follow the existing tab/group structure instead of introducing a new root navigation pattern.

## Content boundaries and safety

- Document public product behavior, published specifications, supported integration workflows, public protocols, customer-approved cases, and public downloads.
- Do not invent or estimate dimensions, ranges, accuracy, environmental ratings, firmware compatibility, SDK behavior, certification status, release dates, prices, or performance claims.
- Do not publish credentials, tokens, private endpoints, internal hostnames, unpublished roadmaps, internal troubleshooting notes, or confidential customer information.
- Preserve customer names and deployment details only when they already appear in approved public source content.
- Do not replace firmware, SDK packages, drawings, certificates, videos, or other binary downloads unless the user supplies or approves the replacement.
- Do not remove or change the Google, Baidu, or Bing site-verification metadata, GA4 measurement ID, Microsoft Clarity project ID, contact links, or official-site links without an explicit request.
- Preserve legal and safety warnings. A translation may clarify wording but must not weaken requirements.

## Validation

Use Node.js 20 or 22 for the Mintlify CLI. The currently installed CLI is not compatible with Node.js 26.

Run checks appropriate to the change:

```bash
git diff --check
mint validate
mint broken-links
```

For broad content, navigation, or localization changes, also verify:

- `docs.json` parses as JSON.
- All supported locale directories have the same MDX path set as `en/`.
- Every navigation target resolves to an MDX file.
- No translated page contains a stale `/en/` link unless the English page is intentionally the destination.
- MDX tags, attributes, code blocks, and asset URLs remain intact.
- No `.DS_Store` files are present.
- `mint a11y` passes when the change affects page structure, media, or components.

If `mint validate` reports an MDX parsing error, inspect translated headings, angle-bracket comparisons, JSX attributes, braces, and code fences before changing content structure.

## Change discipline

- Make the smallest change that fully satisfies the request.
- Preserve unrelated edits and existing redirects.
- Do not reformat `docs.json` wholesale for a small navigation edit.
- Do not rename files or routes for style alone.
- Do not edit generated or binary assets as text.
- Summarize affected languages and validation results when handing off a change.
