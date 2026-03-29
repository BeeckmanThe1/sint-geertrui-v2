# Page: Geschiedenis

## Route

- `/<locale>/geschiedenis`

## Purpose

Provide long-form historical context about the church with readable typography and thematic visuals.

## Content sections

- Header/navigation with brand and main links
- Hero image
- Article content section with heading and multiple subheadings
- Bottom "book" section that opens an image carousel
- Footer with nav/legal/address blocks

## Acceptance criteria

- [ ] Page is available at `/<locale>/geschiedenis`.
- [ ] All user-facing strings use `next-intl` (temporary/lorem copy is allowed for now).
- [ ] Header includes links to `agenda`, `restauratie`, `geschiedenis`, `contact`, and `steun ons`.
- [ ] Hero image appears below header and spans page width on desktop.
- [ ] Main content includes page heading and structured long-form text blocks.
- [ ] Subsections are visually separated and readable (line length, spacing, hierarchy).
- [ ] Bottom book visual is clickable and opens an image carousel/modal.
- [ ] Carousel supports next/previous navigation and close action.
- [ ] Carousel can be operated with keyboard (`Esc` to close, arrow keys to navigate).
- [ ] Footer includes main links, legal links, and address block.
- [ ] Layout is responsive on mobile/tablet/desktop.
- [ ] Localized SEO title and description are defined.
- [ ] Images use `picsum.photos` placeholders unless a suitable local asset exists in `docs/design/assets`.

## Edge cases

- [ ] Missing historical content section still renders page shell with fallback copy.
- [ ] Long paragraphs remain readable and do not overflow containers.
- [ ] Missing imagery falls back gracefully without layout breakage.
- [ ] If carousel image list is empty, book click does not crash and shows a graceful fallback state.

## Design reference

- Source: `docs/design/Geschiedenis.jpg`
- Notes: Visual style emphasizes editorial reading flow; bottom book acts as entry point to a gallery carousel.

## Implementation notes

- Components: TODO
- Data source files: TODO
- Placeholder strategy: use temporary lorem-style copy and `picsum.photos` images in this first technical iteration.
- Open questions:
  - Should the book-triggered carousel reuse a generic gallery component across pages?
