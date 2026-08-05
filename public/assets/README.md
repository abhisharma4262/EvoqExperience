# EVOQ media assets

Drop founder-supplied screenshots, loops, and logos into the folders below.
Every image slot on the site renders an elegant placeholder when `src` is empty.

## Scenarios (Orbit State B)

| Slot | Suggested path | Used in |
|---|---|---|
| Create scenario visual | `/public/assets/scenarios/create-booking.png` | Create Orbit |
| Transform scenario visual | `/public/assets/scenarios/transform-assessment.png` | Transform Orbit |
| Operate scenario visual | `/public/assets/scenarios/operate-dashboard.png` | Operate Orbit |

Wire paths in `content/orbits.ts` → `scenario.visual.src`.

## Sidecar offering visuals (6)

| Offering slug | Suggested path |
|---|---|
| `requirements-as-a-service` | `/public/assets/sidecar/requirements-as-a-service.png` |
| `agentic-engineering` | `/public/assets/sidecar/agentic-engineering.png` |
| `data-ai-analytics` | `/public/assets/sidecar/data-ai-analytics.png` |
| `ai-led-modernization` | `/public/assets/sidecar/ai-led-modernization.png` |
| `eval-as-a-service` | `/public/assets/sidecar/eval-as-a-service.png` |
| `quality-engineering` | `/public/assets/sidecar/quality-engineering.png` |
| `autonomous-diagnostics` | `/public/assets/sidecar/autonomous-diagnostics.png` |
| `continuous-quality` | `/public/assets/sidecar/continuous-quality.png` |
| `operational-intelligence` | `/public/assets/sidecar/operational-intelligence.png` |

Wire via `content/offerings.ts` → `screenshot.src`.

## Customer logos

| Label | Suggested path |
|---|---|
| Global hotel group | `/public/assets/logos/hotel-group.svg` |
| Retail bank | `/public/assets/logos/retail-bank.svg` |
| P&C insurer | `/public/assets/logos/pc-insurer.svg` |

## Client story logos

Drop logos into `/public/assets/logos/` and set `logoSrc` on each entry in `content/caseStudies.ts`.
Until then, tiles show a monogram placeholder. Client legal names never appear in copy.

## Still empty at handoff

All slots above are intentionally empty until assets are supplied.
Supported formats: `.png`, `.jpg`, `.webp`, `.svg`, `.mp4` (for future looping media).
