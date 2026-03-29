# Page: Agenda

## Route

- `/<locale>/agenda`

## Purpose

Show upcoming church events in a scannable card grid, with basic category navigation and pagination.

## Content sections

- Header/navigation bar with brand and primary nav
- Secondary tab bar (`Agenda`, `Concerten`, `Gemeenschap`)
- Event card grid
- Pagination controls
- Footer with nav/legal/address blocks

## Acceptance criteria

- [ ] Page is available at `/<locale>/agenda`.
- [ ] All user-facing strings use `next-intl` (temporary/lorem copy is allowed for now).
- [ ] Header includes links to `agenda`, `restauratie`, `geschiedenis`, `contact`, and `steun ons`.
- [ ] Secondary tabs are visible for `Agenda`, `Concerten`, and `Gemeenschap`.
- [ ] Event listing renders as 3 columns on desktop.
- [ ] Each event card shows image, date, and short event description.
- [ ] Grid supports multiple rows and keeps consistent card spacing.
- [ ] Pagination controls are visible below the grid.
- [ ] Footer includes main links, legal links, and address block.
- [ ] Layout is responsive on mobile/tablet/desktop.
- [ ] Localized SEO title and description are defined.
- [ ] Images use `picsum.photos` placeholders unless a suitable local asset exists in `docs/design/assets`.

## Edge cases

- [ ] Empty event list displays a clear fallback state.
- [ ] Missing event image uses a fallback visual.
- [ ] Very long event titles/descriptions truncate or wrap without breaking cards.

## Design reference

- Source: `docs/design/Agenda.jpg`
- Notes: Desktop design shows 9 cards, 3 columns, and simple numeric pagination.

## Implementation notes

- Components: TODO
- Data source files: TODO
- Placeholder strategy: use temporary lorem-style copy and `picsum.photos` images in this first technical iteration.
- Open questions:
  - Are tab filters client-side only, or URL-driven per category?
