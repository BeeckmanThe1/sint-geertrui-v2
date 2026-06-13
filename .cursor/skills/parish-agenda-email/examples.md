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

## Example 2: Special event with extra detail

**Email excerpt:**

> Zondag 21 juni slotviering … Auberge Espagnole … deken Patrick Maervoet zegent de klokken …

**Agent actions:**

- Update existing `2026-06-21-*` row(s) in place with full potluck + Geertruiberaad text.
- Set `"highlighted": true` on the main slotviering row.
- NL canonical; translate EN/FR.

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
