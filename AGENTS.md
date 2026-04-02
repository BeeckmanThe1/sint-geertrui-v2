<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Context: sint-geertrui-v2

## Product Goal
- Build a church website with information about history, renovation, and practical information such as events.

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, Jest.
- Internationalization uses `next-intl`.
- Supported locales: `nl` (default), `fr`, `en`.

## Architecture Preferences
- Use a classic folder structure (`components`, `lib`, `hooks`, etc.).
- No CMS for now.
- Keep content local under `src/content` (JSON/MD preferred).
- Do not add remote content fetching unless explicitly requested.

## Code Style
- 2 spaces indentation.
- Semicolons required.
- Prefer double quotes.
- Naming: `PascalCase` for components, `camelCase` for functions, `kebab-case` for route segments/files where applicable.

## Quality Gates
- Before finalizing changes, run:
  - `npm run typecheck`
  - `npm run lint`
  - `npm test`

## Git Workflow
- Prefer conventional commits.
- Never force-push or rewrite git history.
