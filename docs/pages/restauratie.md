# Page: Restauratie

## Route

- `/<locale>/restauratie`

## Purpose

Explain restoration progress and context through a mixed layout of text and supporting images.

## Content sections

- Header/navigation with brand and main links
- Hero image
- Intro text block
- Multiple alternating content blocks (image + text combinations)
- Footer with nav/legal/address blocks

## Acceptance criteria

- [ ] Page is available at `/<locale>/restauratie`.
- [ ] All user-facing strings use `next-intl` (temporary/lorem copy is allowed for now).
- [ ] Header includes links to `agenda`, `restauratie`, `geschiedenis`, `contact`, and `steun ons`.
- [ ] Hero image appears below header and spans page width on desktop.
- [ ] Intro section includes page title and introductory paragraph.
- [ ] At least 3 restoration content blocks are supported with mixed image/text layout.
- [ ] Content blocks support alternating visual rhythm (image left/right across sections).
- [ ] Footer includes main links, legal links, and address block.
- [ ] Layout is responsive on mobile/tablet/desktop.
- [ ] Localized SEO title and description are defined.
- [ ] Images use `picsum.photos` placeholders unless a suitable local asset exists in `docs/design/assets`.

## Edge cases

- [ ] Missing block image renders fallback without collapsing content flow.
- [ ] Long translated text keeps readable spacing and does not overlap images.
- [ ] Uneven content lengths between sections do not break layout.

## Design reference

- Source: `docs/design/Restauratie.jpg`
- Notes: Uses repeated narrative blocks with supporting imagery.

## Implementation notes

- Components: TODO
- Data source files: TODO
- Placeholder strategy: use temporary lorem-style copy and `picsum.photos` images in this first technical iteration.
- Open questions:
  - Should restoration blocks be managed as structured content entries under `src/content`?
