# Page: Home

## Route

- `/<locale>`

## Purpose

Introduce the church website clearly and guide users to history, renovation, practical information, and events.

## Content sections

- Full-width hero image with top navigation overlay
- Mission card block on hero
- Newsletter CTA button on hero
- "Aankomende evenementen" preview strip with 3 event cards and carousel/next affordance
- Full-width embedded 360 degrees church view (webview/embed)
- Footer with navigation links, legal links, and address block

## Acceptance criteria

- [ ] Page is available at `/<locale>`.
- [ ] All user-facing strings use `next-intl` (temporary/lorem copy is allowed for now).
- [ ] Header includes links to `agenda`, `restauratie`, `geschiedenis`, and `contact`.
- [ ] Site branding appears in the header ("Sint-Geertruikerk Leuven").
- [ ] Mission content block is visible on top of the hero image.
- [ ] Newsletter CTA is present in the hero area and remains visible on desktop.
- [ ] Events preview shows exactly 3 cards on desktop.
- [ ] Every event preview card includes image, date, and short description text.
- [ ] Events section contains an action affordance to move to additional items (arrow/button).
- [ ] Final content section contains an embedded 360 degrees church experience rendered as a webview/embed.
- [ ] The 360 embed section is full-width on desktop and scales correctly on smaller breakpoints.
- [ ] Footer includes navigation links, legal links (privacy/cookies), and address (`Sint-Geertruiabdij 1`, `3000 Leuven`).
- [ ] Content and layout are responsive on mobile/tablet/desktop.
- [ ] Localized SEO title and description are defined.
- [ ] Placeholder copy is visually balanced and can be replaced later without code changes.
- [ ] Images use `picsum.photos` placeholders unless a suitable local asset exists in `docs/design/assets`.

## Edge cases

- [ ] Empty upcoming events list shows a graceful fallback message/state.
- [ ] Long translated text does not break layout.
- [ ] Missing hero image still renders usable header/content structure.
- [ ] If the 360 embed fails to load, the page shows a graceful fallback (for example a static image + external link).

## Design reference

- Source: `docs/design/Homepage.jpg`
- Notes: Includes overlay header, hero mission/newsletter blocks, and a final 360 view section (implemented as embed/webview).

## Implementation notes

- Components: TODO
- Data source files: TODO
- Placeholder strategy: use `picsum.photos` for all temporary images; prefer local assets from `docs/design/assets` when a good match exists.
- Open questions:
  - Should home event cards link to event detail pages or only to agenda listing?
