# sint-geertrui-v2

Website for Sint-Geertruikerk in Leuven: history, restoration, agenda, and practical visitor information.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS, Jest
- `next-intl` for Dutch (default), French, and English

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/nl`).

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
```

## Documentation

Project docs live in [`docs/`](docs/README.md) (product overview, page specs, design references).

## Content

- UI copy: `messages/*.json`
- Agenda data: `src/content/agenda/`
- Static images: `public/images/`
