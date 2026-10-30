# abdullahwork.me

Abdullah Saeed's portfolio. The specification lives in `CLAUDE.md`, `DESIGN-SYSTEM.md`, `CONTENT.md` and `MASTER-PROMPT.md` — read those before changing anything.

## Run it

```bash
npm.cmd install
copy .env.example .env.local   # then add the Web3Forms key
npm.cmd run dev
```

## Where things live

| Folder | What is in it |
| --- | --- |
| `app/` | Routes: `/`, `/work`, `/work/[slug]`, `/journey`, `/contact` |
| `content/` | Every word of copy and all project data — edit text here, never in JSX |
| `components/canvas/` | Hand-written Canvas 2D pieces: `SolverGrid`, `VoiceOrb`, `ToolGraph`, `BeforeAfter` |
| `components/three/` | `JourneyThread`, the only 3D scene (loaded on `/journey` only) |
| `components/case-study/`, `work/`, `home/`, `journey/`, `contact/` | Page-specific pieces |
| `components/layout/`, `components/ui/` | Nav, footer, shell; buttons, tags, prose, screenshot frames |
| `lib/` | `canvas.ts` (RAF loop, DPR, pausing, reduced motion), `motion.ts`, fonts, tokens |
| `public/shots/` | Real screenshots — see below |
| `_legacy/` | The previous, rejected build, kept for reference. Not compiled. Safe to delete. |

## Screenshots

Drop PNGs into `public/shots/` with the names listed in `CLAUDE.md` §7. Each one replaces its labelled placeholder on the next build.

## Quality gates

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```
