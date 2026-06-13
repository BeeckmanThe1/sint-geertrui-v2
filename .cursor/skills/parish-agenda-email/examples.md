# Parish agenda email — examples

## Example 1: Sunday schedule block (update + add)

**Email excerpt:**

> Zondag 7 juni is er eucharistieviering voorgegaan door pater Arnold Castro.  
> Zondag 14 juni is er dienst van Woord en Communie. Gebedsleider is Tomas Bruyland.  
> Zondag 24 mei … (already listed)

**Agent actions:**

- `2026-06-07`: if one row exists → update celebrant; if Geloofsgesprek at 9:30 also mentioned → second row `-37` / `-38` pattern.
- `2026-06-14`: add Word & Communion if missing.
- `2026-05-24`: leave unchanged if already correct.

## Example 2: Beiaard zegening + slotviering same day

**Email excerpt:**

> 21 juni slotviering … deken Maervoet zegent de klokken … Auberge Espagnole …

**Agent actions:**

- **`2026-06-21-35`** — title `"Zegening twaalf nieuwe beiaardklokken"`, zegening + klokken bekijken + drankje, `highlighted: true`.
- **`2026-06-21-42`** — separate row for potluck/Geertruiberaad; title mentions Auberge Espagnole, **not** the zegening.
- Do **not** use only `"Slot- en dankviering werkjaar"` as the zegening title.

## Example 2b: Beiaard inluiding (different date)

**Flyer:** 12 juli plechtige inluiding, 12–12.30 Van Eyck, receptie, luisterplekken.

**Agent actions:**

- **`2026-07-12-33`** — title `"Plechtige inluiding vernieuwde Sint-Geertruibeiaard"`, `highlighted: true`.
- Keep separate from June zegening row — different date, different event.

## Example 3: Skip recap

**Email excerpt:**

> Het café bracht zo'n 55 mensen samen; Kris hield ons een uur lang geboeid …

**Agent actions:**

- If date is past and text is purely a report → skip new row, or update existing Geertruicafé entry only if that event was already listed as upcoming and now needs the report as description (Thomas rarely wants this — default skip).

## Example 4: No service / elsewhere

**Email excerpt:**

> Geen viering in onze kerk; radiomis in Sint-Pieterskerk

**Agent actions:**

- Title makes exception clear: `"Geen viering (Radiomis in Sint-Pieterskerk)"`.
- Description explains where the community goes.

## Example 5: User message is only the email

**User message:** `[entire forwarded email, no other text]`

**Agent:** Run full workflow from `SKILL.md` without asking "what should I do?".

## Example 6: Duplicate prevented

**Email excerpt:**

> Zondag 7 juni eucharistieviering voorgegaan door pater Arnold Castro.

**Existing row:** `2026-06-07-38` — `"Eucharistieviering"`, `"Om 11 uur, voorgegaan door pater Arnold Castro."`

**Agent actions:**

- **Do not add** a second row for 2026-06-07 Eucharist.
- Report **Duplicate prevented** / **Unchanged** unless celebrant or time changed.

## Example 7: Description length

**Email:** three-line essay about who leads Sunday Word & Communion.

**Agent actions:**

- Description: `"Gebedsleider: Tomas Bruyland."` (~30 chars) — **Routine** tier.
- Do not copy the full email into `description`.

**Email:** slotviering with potluck + Geertruiberaad details.

**Agent actions:**

- **Special long** tier OK; structured `\n\n` paragraphs; `"highlighted": true`.
- Do not use Special long for the following week's routine Eucharist.

## Example 8: Multiple emails in one paste

**User message:** three forwarded blocks — (1) June Sunday schedule, (2) Geertruicafé invite, (3) reminder that Pentecost is already listed.

**Agent actions:**

1. Split into 3 email blocks.
2. Extract all candidates from all three.
3. Pentecost / 24 May already in JSON → **Unchanged** (mail 3).
4. June Sundays from mail 1 → add/update; **duplicate audit** against JSON and against mail 1 ↔ mail 2 overlap.
5. Geertruicafé from mail 2 → one row on that date; if mail 1 also mentioned the same café → **one row**, richer description if needed.
6. **Single write** to all three locale files; **`npm run agenda:check-community`** once.
7. Report: `Pasted mails processed: 3`.

## Example 9: Skip vague concerts

**Flyer:** “Jaarlijkse beiaardconcerten juli–augustus” with dates 19/07, 26/07, 2/08, 9/08 but **no times or exact locations**.

**Agent actions:**

- **Do not add** four generic `Beiaardconcert Sint-Geertruibeiaard` rows to `concerts.json`.
- Report **Skipped** — needs per-date start time (and location if unclear).
- If Thomas later provides “zondag 19 juli om 15 u., park abdij”, then add one concrete concert row.
