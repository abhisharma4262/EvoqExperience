# EVOQ Experience Center

Experiential marketing site for **EVOQ**, the execution runtime for the agentic enterprise.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Remotion (programmatic launch videos)

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
| `npm run remotion:studio` | Remotion Studio for launch compositions |
| `npm run remotion:render` | Export all launch MP4s to `out/videos/` |
| `npm run remotion:render:home` | Export homepage film only |
| `npm run remotion:render:create` | Export Create launch only |
| `npm run remotion:render:transform` | Export Transform launch only |
| `npm run remotion:render:operate` | Export Operate launch only |

## Launch videos (Remotion)

Frame-driven compositions live in [`remotion/`](./remotion). They reuse copy from [`content/`](./content) and mirror the Create / Transform / Operate demos plus the homepage film narrative.

| Workflow | Command / URL |
|---|---|
| Author & scrub timelines | `npm run remotion:studio` |
| In-browser Player preview | [http://localhost:3000/launch](http://localhost:3000/launch) |
| Export MP4s | `npm run remotion:render` → `out/videos/*.mp4` |

Compositions: `HomeFilm`, `CreateLaunch`, `TransformLaunch`, `OperateLaunch` (1920×1080, 30fps). All four are multi-scene cinematic films with the same upbeat electronic bed at `public/audio/launch-bed.mp3` (*Wallpaper* by Kevin MacLeod / incompetech.com, CC BY 4.0). The scroll site and room demos are unchanged; Remotion is the export/preview layer.

## Site map

- `/`: film home (includes Client stories)
- `/create`, `/transform`, `/operate`: Rooms (intercepted from the film; cold-loadable)
- `/launch`: Remotion Player for launch video previews
- `/runtime`: investor / technical deep-dive
- `/proof`: redirects to home Client stories
- `/legal/privacy`, `/legal/terms`: stubs

## Lead capture

`POST /api/lead` validates the payload and logs it to the server console. Wire a CRM or email webhook later without changing the form UI.
