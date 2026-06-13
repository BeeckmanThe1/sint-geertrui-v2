# Agenda content roadmap — TODO

Phased work to move from **paste-into-Cursor + agent-written JSON** toward a database and scheduled email intake.

## Phase 0 — Document & tighten (current)

- [x] Document current business workflow (forwarded emails → paste into Cursor → agent writes NL/EN/FR JSON → Thomas reviews → deploy).
- [x] Document technical files and merge conventions (`docs/content/agenda-community.md`).
- [x] Record decision (`docs/decisions/2026-06-13-agenda-source-of-truth.md`).
- [ ] Add allowlist of trusted parish email senders / subjects (when known).
- [ ] Document merge rules with examples (update vs add vs skip recap).
- [x] Add duplicate + description-length check (`npm run agenda:check-community`).

## Phase 1 — Schema & staging (no production DB yet)

- [ ] Finalize event schema (match today’s JSON fields + `status`, `sourceEmailId`, `updatedAt`).
- [ ] Define idempotency rules: same `date` + similar `title` → update, not duplicate.
- [ ] Prototype “email → proposed JSON diff” script (today this is done in Cursor chat via paste; script would formalize the same steps).
- [ ] Weekly review checklist for Thomas (5-minute approve/reject).

## Phase 2 — Database as source of truth

- [ ] Choose host (e.g. Supabase/Neon Postgres).
- [ ] Migrations: `events` table + locale columns or translation rows.
- [ ] Seed from current `community*.json` and `concerts*.json`.
- [ ] Read path: build-time fetch or `agenda:build`-style export → JSON (minimal app change).
- [ ] Optional: minimal admin or “pending events” view.

## Phase 3 — Email automation

- [ ] Dedicated inbox or Gmail/Outlook API access for forwarded parish mail.
- [ ] Scheduled job (daily or weekly) → extract candidates → write to **staging** only.
- [ ] Notification to Thomas: diff summary (added / updated / flagged).
- [ ] Approve → publish to production table / regenerate site data.

## Phase 4 — Trust & automation

- [ ] Auto-merge low-risk patterns (e.g. single Sunday line with date + prayer leader).
- [ ] Flag high-risk items for mandatory review (closures, off-site location, multi-paragraph announcements).
- [ ] Agent-drafted EN/FR with optional human review.
- [ ] Retention policy for past events (hide vs archive).

## Out of scope (for now)

- Replacing the concerts CSV pipeline in phase 1 (keep separate `source` field if unified DB later).
- Public CMS for parish volunteers (revisit after DB + staging works).
- Runtime remote fetch on every page request (prefer build-time or ISR snapshot).

## References

- `docs/content/agenda-community.md`
- `docs/decisions/2026-06-13-agenda-source-of-truth.md`
- `.cursor/rules/agenda-content.mdc`
- `.cursor/skills/parish-agenda-email/SKILL.md`
