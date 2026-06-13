---
name: parish-agenda-email
description: >-
  Updates Sint-Geertrui parish community agenda JSON from pasted Gemeenschapsploeg
  emails (lichtflits, Sunday services, Geertruicafé, parish announcements). Use when
  the user pastes forwarded parish mail, Dutch liturgical schedule text, or mentions
  community.json / gemeenschap agenda — even with no other instructions. Handles one or
  several pasted emails in a single message. Prevents duplicate events and keeps description
  length consistent for the agenda card grid. Adds only meaningful events with clear
  titles; splits rare beiaard zegening and inluiding into separate community rows.
---

# Parish agenda from pasted email

Thomas pastes forwarded parish emails — **one or several in the same message**. **Execute this workflow immediately** — do not ask what to do unless the message is ambiguous (e.g. concerts only, or question-only with no update intent).

## Files (only these for community events)

| Locale | Path |
|--------|------|
| NL (canonical) | `src/content/agenda/community.json` |
| EN | `src/content/agenda/community.en.json` |
| FR | `src/content/agenda/community.fr.json` |

Do **not** edit `concerts*.json` unless the source gives **enough detail to be useful** (see [Only meaningful events](#only-meaningful-events)). Do not run `agenda:build` for vague flyer summaries alone.

## Only meaningful events

**Do not add rows that parishioners cannot act on.** When in doubt, **skip** and say so in the summary.

| Add | Skip |
|-----|------|
| Date + **what** + usually **time** and/or **who/where** | Past recaps, tombola results, thank-you-only mail |
| Rare milestones with the milestone **in the title** | Generic placeholder titles (“Beiaardconcert …”) |
| Concerts/rehearsals with **time and place** in description | Concert series mentioned without per-date time/location |
| Legitimate same-day pairs (9:30 Geloofsgesprek + 11:00 mis) | Duplicate of an existing row |

**Concerts (`concerts*.json`):** only add when the mail/flyer/CSV gives a **specific date and start time** (and location if not obvious). A list of Sundays with no hour is **not** enough — note “needs time/location” and do not invent entries.

**Community (`community*.json`):** routine Sunday lines stay short; exceptional items get the **exception in the title**, not buried in description only.

## Beiaard: zegening and inluiding are two events

The renovation has two **rare, separate** moments — **never merge into one row** or hide under generic “slotviering”:

| Date (example) | Separate event | Title must say |
|----------------|----------------|----------------|
| First moment (e.g. 21 June) | **Zegening** of new bells during/after slotviering | `Zegening twaalf nieuwe beiaardklokken` — **not** only “Slot- en dankviering werkjaar” |
| Second moment (e.g. 12 July) | **Inluiding** of renovated carillon | `Plechtige inluiding vernieuwde Sint-Geertruibeiaard` — **not** only “inspeling” without inluiding |

Rules:

- **`highlighted: true`** on both zegening and inluiding rows.
- Same calendar day as slotviering/potluck → **two rows**: (1) zegening row, (2) potluck/slotafsluiting row with its own title.
- Do **not** fold inluiding into the zegening row or vice versa.
- Use **inluiding** in NL titles for the July-style ceremony; zegening ≠ inluiding.

Reference rows in `community.json`: `2026-06-21-35` (zegening), `2026-06-21-42` (potluck same day), `2026-07-12-33` (inluiding).

**Images (already in `public/images/restoration/article/`):**

| Event | `imageUrl` |
|-------|------------|
| Zegening (bells up close) | `/images/restoration/article/image2.jpg` |
| Inluiding (tower / belfry) | `/images/restoration/article/image5.jpg` |

Add `imageUrl` on highlighted beiaard rows in all three locale files (same path). Do not add images to routine Sunday lines without a relevant photo.

## Workflow

1. **Read** all three `community*.json` files.
2. **Split** the user message into **one or more email blocks** if needed (see [Multiple emails](#multiple-emails-in-one-paste)).
3. **Parse** every block: dates, titles, times, celebrants/prayer leaders, locations, special notes.
4. **Merge across emails:** deduplicate candidates from all blocks into one planned change set before touching JSON.
5. **Duplicate audit (mandatory before writing):** for each candidate, search existing rows by **`date` first**, then title/service type. Never add a second row if the same event already exists — **update** it. See [Duplicate prevention](#duplicate-prevention).
6. **Reconcile** each item: update in place, add only genuinely new rows.
7. **Apply** all changes to the three locale files in **one pass** (single write).
8. **Description length:** match the [length tiers](#description-length-ui) so cards in the grid look even.
9. **Verify (mandatory):**
   - `npm run agenda:check-community` — must pass (no duplicate ids or date+title pairs).
   - `npm test -- src/lib/agenda-events.test.ts`
10. **Report** summary: Added | Updated | Already OK | Skipped | Duplicates prevented (note if merged across multiple pasted mails).

## Multiple emails in one paste

Thomas often pastes **several forwarded mails at once**. Treat the whole message as **one batch job**:

1. **Detect separate emails** — common separators:
   - `---------- Forwarded message ----------` / `-------- Oorspronkelijk bericht --------`
   - `From:` / `Van:` / `Subject:` / `Onderwerp:` starting a new block
   - Horizontal rules (`---`) or clear blank gaps between unrelated mail bodies
2. **Extract events from every block** — do not stop after the first mail.
3. **Unify before writing:** build one candidate list for the entire paste.
   - Same date + same event in **two pasted mails** → **one** agenda row (not two).
   - Prefer the **more specific** line (time, celebrant, location). If one mail only says “already in your agenda”, keep/update the existing row; do not add again.
   - If two mails **conflict** (different celebrant same date), prefer the **later block in the paste** (usually the newer forward) and mention the conflict in the summary.
4. **Write JSON once** after processing all mails — never apply mail 1, then accidentally duplicate when applying mail 2.
5. **Report:** one combined table; optionally note “merged from 3 pasted emails” at the top.

**Do not** ask Thomas to paste mails one at a time.

## Duplicate prevention

**Never ship duplicate events.** Before adding any row:

1. List all existing events on that **`date`**.
2. Match by **intent**, not only exact title text:
   - Same Sunday Eucharist → one row (update celebrant/time in description).
   - Same Word & Communion → one row.
   - Same Geertruicafé date → one row.
3. **Legitimate same-day pairs** (two rows OK): different time + different type — e.g. `Geloofsgesprek` 9:30 and `Eucharistieviering` 11:00 → two ids, distinct titles.
4. If the email repeats something “already in your agenda” → **do not add**; update only if details changed.
5. After edits, `npm run agenda:check-community` fails on:
   - duplicate `id`
   - duplicate **`date` + `title`** (normalized)
   - missing ids across nl/en/fr

If the check warns about same date + service type, confirm the two rows are intentional or merge.

## Description length (UI)

Cards use a **3-column grid**. Descriptions drive card height:

| Tier | Length | When | Card behaviour |
|------|--------|------|----------------|
| **Routine** | ~1 sentence, **60–140 chars** | Sunday Eucharist, Word & Communion, Geloofsgesprek | Full text visible; cards stay even |
| **Special short** | **140–199 chars** | Extra detail without read-more | Still no clamp; keep rare |
| **Special long** | **≥200 chars** | Slotviering, Geertruicafé, closure notices | `line-clamp-5` + “Read more” dialog — OK for **highlighted / exceptional** items only |

**Consistency rules:**

- Default new/updated **routine** services to Tier **Routine** — do not paste long email paragraphs onto a standard Sunday line.
- Put time + celebrant/gebedsleider in **one short sentence** (match existing rows):
  - `"Om 11 uur, voorgegaan door pater Arnold Castro."`
  - `"Gebedsleider: Tomas Bruyland."`
- Extra context (potluck rules, long thanks) → Tier **Special long**, use `\n\n` between paragraphs, only when the event is truly exceptional.
- When updating an existing row, **do not lengthen** a routine entry unless the email adds essential new facts (location change, cancelled service).
- EN/FR: same tier as NL (similar character count, not a much longer translation).

Reference: `AgendaReadMoreDescription` clamps at **200** chars (`READ_MORE_MIN_CHARS`).

## Merge rules

| Situation | Action |
|-----------|--------|
| Event for that date already exists | **Update** title/description in place; keep `id` |
| New date + new event | **Add** row; new `id` |
| Email says "already in your agenda" | Match existing row; update only if details differ |
| Past-tense recap / thank-you / attendance report | **Skip** unless user asked to publish recaps |
| Two events same day (e.g. 9:30 Geloofsgesprek + 11:00 mis) | **Two rows**, same date, different ids |
| Off-site or "no service here" | Title/description must state location clearly |
| Noteworthy future event (beiaard zegening/inluiding, closure) | **`highlighted: true`**; milestone **in title** |
| Beiaard zegening + potluck same Sunday | **Two rows** — zegening title + separate potluck/slot row |
| Flyer lists concert dates without times | **Skip** concerts; report missing detail |

## Event shape

```json
{
  "id": "2026-06-07-38",
  "category": "community",
  "title": "Eucharistieviering",
  "description": "Om 11 uur, voorgegaan door pater Arnold Castro.",
  "date": "2026-06-07"
}
```

- **`category`**: always `"community"`.
- **`date`**: ISO `YYYY-MM-DD`. Infer year from email context; Sunday dates must be correct.
- **`id`**: `{date}-{sequence}`. Same id in NL/EN/FR. For new rows, use next free sequence for that date (e.g. if `2026-06-07-37` and `-38` exist, use `-39`).
- **`highlighted`**: optional; only for important **future** home-page items.
- Omit `imageUrl` unless the email provides one.

## Copy rules

- **NL** (`community.json`): faithful to email; natural parish Dutch.
- **EN / FR**: same meaning and **similar length** as NL; translate titles and descriptions; keep names (Castro, Geertruihof, etc.).
- Use `\n\n` only in **Special long** tier descriptions.
- Typical patterns:
  - Eucharist → `"Eucharistieviering"` / `"Eucharist"` / `"Eucharistie"`
  - Word & Communion → `"Dienst van Woord en Communie"` + `"Gebedsleider: …"` or `"Voorgegaan door …"`
  - Faith conversation → `"Geloofsgesprek"` + pastorie, 9:30
  - Geertruicafé → time, Geertruihof, guest speaker

## Response format (for Thomas)

```markdown
## Agenda update

**Pasted mails processed:** 3 (unified before write)

| Status | Date | Title |
|--------|------|-------|
| Added | 2026-06-14 | … |
| Updated | 2026-06-21 | … |
| Unchanged | 2026-05-24 | … |
| Skipped | — | recap paragraph (not a future event) |
| Duplicate prevented | 2026-06-07 | same Eucharist in mail 1 and mail 2 → one row |

**Conflicts resolved:** 2026-06-14 celebrant — used mail 3 (newest forward)

**Checks:** `npm run agenda:check-community` ✓

**Files:** community.json, community.en.json, community.fr.json
```

No commit unless Thomas asks.

## Examples

See [examples.md](examples.md).

## Reference

- `docs/content/agenda-community.md`
- `.cursor/rules/agenda-content.mdc`
