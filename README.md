# EVOQ Experience Center

Experiential marketing site for **EVOQ**, the execution runtime for the agentic enterprise.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript (strict)
- Tailwind CSS v4

No deployment-specific config. Run on any Node host with `npm run build` + `npm start`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production-style run

```bash
npm run build
npm start
```

## Editing copy (non-technical)

All user-facing copy lives in typed files under [`/content`](./content):

| File | What it controls |
|---|---|
| `content/home.ts` | Homepage narrative: industry → challenge → EVOQ → stories → close |
| `content/orbits.ts` | Create / Transform / Operate questions, scenarios, doorways |
| `content/caseStudies.ts` | Client stories (masked) mapped to Create / Transform / Operate |
| `content/rooms.ts` | Room moments, outcomes, quotes |
| `content/offerings.ts` | Flagships + sibling offerings (add/remove freely) |
| `content/metrics.ts` | Outcome metrics |
| `content/navigation.ts` | Header / footer / journey labels |
| `content/forms.ts` | Lead modal copy |
| `content/runtimePage.ts` | `/runtime` deep-dive |
| `content/brand.ts` | Color, type, space, motion tokens |
| `content/coordinationMesh.ts` | Signature runtime mesh labels & satellites |

Do not put marketing copy inside React components.

## Adding images

1. Drop files into `public/assets/...` (see [`public/assets/README.md`](./public/assets/README.md)).
2. Set the matching `src` field in the relevant `/content` file.
3. If `src` is empty, the UI shows an elegant placeholder automatically.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run check:contrast` | WCAG AA brand pair check |
| `npm run test:e2e` | Playwright smoke (requires browsers + build) |

## Site map

- `/`: film home (includes Client stories)
- `/create`, `/transform`, `/operate`: Rooms (intercepted from the film; cold-loadable)
- `/runtime`: investor / technical deep-dive
- `/proof`: redirects to home Client stories
- `/legal/privacy`, `/legal/terms`: stubs

## Lead capture

`POST /api/lead` validates the payload and logs it to the server console. Wire a CRM or email webhook later without changing the form UI.
