# Decision: agenda source of truth and email-assisted updates

- **Date:** 2026-06-13
- **Decision:** Plan to move community agenda data off hand-edited JSON toward a structured database as the system of record, with an AI agent processing forwarded parish emails into **staged** updates (human approval before publish initially).
- **Context:**
  - Community events today live in `src/content/agenda/community*.json`. Thomas receives forwarded emails from the Gemeenschapsploeg / parish bulletin (*lichtflits*), **pastes them into Cursor**, and the **agent** writes or updates trilingual JSON (NL canonical + EN/FR). Thomas reviews before deploy.
  - JSON authoring is already agent-assisted; the remaining manual step is **copy-paste intake** and **review**. Fully manual transcription is not the current process.
  - Long term this still does not scale if every mail requires a chat session; duplicates and recap-vs-upcoming errors remain risks without a structured store and merge tooling.
  - Concerts remain a separate pipeline (CSV → build script → `concerts*.json`).
- **Alternatives considered:**
  - Keep JSON indefinitely, rejected for long-term maintainability.
  - Headless CMS (Sanity, Payload, etc.), viable if parish volunteers need a UI; heavier than needed for phase 1.
  - Fully autonomous agent writes to production, rejected until merge rules and quality are proven; high impact if wrong (times, locations, “church closed”).
  - JSON only, no DB, acceptable short-term bootstrap only.
- **Consequences:**
  - Short term: continue **paste email → agent updates `community*.json` → Thomas reviews → deploy**; document merge rules for the agent.
  - Medium term: introduce DB schema + staging table + approval step; site reads DB or generated JSON.
  - Agent work must be idempotent (update by date/title, no blind append) and allowlist trusted sender addresses.
  - `next-intl` UI copy stays in `messages/`; event bodies move to the new store when migrated.
  - EN/FR translations may be agent-drafted with NL as canonical from email.
