# Agenda: community events (Gemeenschap)

## Purpose

The **Gemeenschap** tab on `/agenda` lists parish programme items for the Sint-Geertrui geloofsgemeenschap: Sunday liturgy, Word & Communion services, faith conversations (*Geloofsgesprek*), Geertruicafé evenings, zone-wide celebrations, and occasional announcements (beiaard, restoration closure, etc.).

This is separate from **Concerten**, which come from a different source and update rhythm.

## Current business workflow

1. The **Gemeenschapsploeg** (parish community team) plans events and communicates them.
2. Thomas receives **forwarded emails** (parish mail, bulletin-style updates such as *lichtflits*, direct messages).
3. Thomas **pastes the email(s) into Cursor** and asks the agent to update the agenda (one or multiple forwards in one message).
4. The **agent** reads all pasted blocks, merges candidates, reconciles against existing `community*.json` rows, and writes or updates JSON in **Dutch (canonical)** plus **English and French** translations in the matching locale files.
5. Thomas **reviews** the diff (quick sanity check), then changes are **deployed** with a normal site release.

There is no parish-facing editor, no external calendar sync, and no automated email intake today — the copy-paste step is still manual, but **JSON authoring and translation are agent-assisted**, not hand-typed by Thomas.

**Agent skill (paste email → update JSON):** `.cursor/skills/parish-agenda-email/SKILL.md` — Thomas can paste mail with no extra prompt; see also `.cursor/rules/parish-email-intake.mdc`.

### Agent task checklist (today)

When processing pasted parish email(s), the agent should:

- Accept **multiple forwarded emails in one paste** — split into blocks, extract all, **dedupe across mails**, then write JSON once.
- Read `community.json` (and `.en.json` / `.fr.json`) before changing anything.
- Run a **duplicate audit** by date + event intent; **update in place** — never add a second row for the same event.
- Run **`npm run agenda:check-community`** after edits (blocks duplicate ids and date+title pairs).
- Keep **routine** descriptions short (~60–140 chars) so agenda cards stay even; long text (≥200 chars) only for exceptional items (read-more UI).
- Skip or flag **past recaps** unless Thomas explicitly wants them published.
- Keep the **same `id`** across all three locale files for each event.
- Write NL from the email; draft EN/FR with similar length and meaning.
- Set `highlighted: true` only for noteworthy future items when appropriate.
- **Only meaningful events** — skip rows without actionable detail; see skill section “Only meaningful events”.
- **Beiaard:** zegening (e.g. 21 June) and inluiding (e.g. 12 July) are **two separate** community rows; put the milestone in the **title**, both `highlighted: true`.

## Only meaningful events

The agenda is for parishioners, not archive filler.

- **Add** when you have date + clear purpose; routine Sundays stay one short line; rare events name the rare thing in the **title**.
- **Skip** past recaps, duplicate rows, and concert series without **per-date time** (and location if not obvious).
- **Never** add placeholder concerts like “Beiaardconcert Sint-Geertruibeiaard” with only a date.

## Beiaard pattern (community)

| Event | Example title (NL) |
|-------|---------------------|
| Zegening new bells | `Zegening twaalf nieuwe beiaardklokken` |
| Potluck same day | separate row, e.g. `Slot- en dankviering werkjaar — Auberge Espagnole` |
| Inluiding renovated carillon | `Plechtige inluiding vernieuwde Sint-Geertruibeiaard` |

Zegening ≠ inluiding. Do not merge. Reference ids: `2026-06-21-35`, `2026-06-21-42`, `2026-07-12-33`.

| What | Where |
|------|--------|
| Dutch community events (canonical) | `src/content/agenda/community.json` |
| English | `src/content/agenda/community.en.json` |
| French | `src/content/agenda/community.fr.json` |
| Runtime loader | `src/lib/agenda-events.ts` → `getAllAgendaItems(locale)` |
| Agenda UI | `src/app/[locale]/agenda/page.tsx` (default filter: `community`) |
| Home preview | `getUpcomingAgendaItems`, `getHighlightedAgendaItems` |

Each event row:

```json
{
  "id": "2026-06-07-38",
  "category": "community",
  "title": "Eucharistieviering",
  "description": "Om 11 uur, voorgegaan door pater Arnold Castro.",
  "date": "2026-06-07",
  "highlighted": false
}
```

- **`date`**: ISO `YYYY-MM-DD`; compared in `Europe/Brussels`.
- **`id`**: stable key; use `{date}-{sequence}` and keep aligned across `nl` / `en` / `fr`.
- **`highlighted`**: optional; home page spotlight strip (future dates only).

**Quality checks after edits:** `npm run agenda:check-community` (duplicates + length warnings) and `npm test -- src/lib/agenda-events.test.ts`.

**Description length:** routine Sunday services ~60–140 characters; longer copy (≥200 chars) triggers read-more clamp in the card grid — reserve for exceptional announcements only.

**Not used for community events:**

- `npm run agenda:build` and `concerts-and-events.csv` — concerts/rehearsals only.
- `messages/*.json` — UI labels only, not event data.

## Content patterns to preserve

- Recurring Sunday rhythm (often 11:00) with celebrant or prayer leader named.
- Some emails bundle many Sundays; reconcile against existing rows before adding — **never duplicate** same date + event type.
- Some entries are **reports** (past tense), not invitations — do not treat every paragraph as a new future event.
- Cross-parish / zone events (e.g. Chrism mass elsewhere, church closed → service at Assumptionists).
- NL copy from email is **canonical**; EN/FR are translations.

## Long-term direction (not implemented)

Today the agent already does extraction + trilingual JSON; the gap is **automation of intake** and **a real store**.

1. **Replace JSON as system of record** with a structured store (likely Postgres, e.g. Supabase/Neon).
2. **Automate email intake**: agent reads forwarded mail on a schedule (no copy-paste), proposes structured updates.
3. **Human gate first**: staging / pending diffs → Thomas approve → publish. Auto-merge only for low-risk patterns once quality is proven.
4. Optionally **generate JSON at build time** from the DB so the Next.js app keeps a simple read path during migration.

See `docs/decisions/2026-06-13-agenda-source-of-truth.md` and `docs/content/agenda-roadmap-todo.md`.

## Related docs

- Page spec: `docs/pages/agenda.md`
- Concerts pipeline: `scripts/build-concerts-from-csv.mjs`, `src/content/agenda/concerts-and-events.csv`
- Agent rule: `.cursor/rules/agenda-content.mdc`
- Agent skill: `.cursor/skills/parish-agenda-email/SKILL.md`
