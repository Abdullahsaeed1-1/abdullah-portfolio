# MASTER-PROMPT.md — build plan for abdullahwork.me

Give Claude Code one phase at a time. Do not hand it the whole file at once — it will rush the parts that matter most.

Before starting any phase, read `CLAUDE.md`, `DESIGN-SYSTEM.md` and `CONTENT.md` in full. They are the specification; this file is only the order of work.

---

## The opening instruction

> You are rebuilding `abdullahwork.me`, Abdullah Saeed's personal portfolio.
>
> A previous build was rejected for looking AI-generated — dark navy with cyan gradients, a polygon network globe in the hero, and copy made entirely of adjectives. `CLAUDE.md` §2 lists every banned pattern. Treat that list as hard constraints, not preferences.
>
> This site is light, editorial and sharp-cornered: paper white, near-black ink, one orange accent used sparingly. Six colours, no gradients, no shadows, no border radius, no dark mode.
>
> The moving pieces are hand-written Canvas 2D depicting Abdullah's real systems — a constraint solver settling a timetable, a voice waveform, a tool-call graph. There is exactly one 3D scene on the whole site, on `/journey`. Do not add more.
>
> Every number is real. Every word of copy comes from `CONTENT.md`. Where `CONTENT.md` says `TODO:`, leave a visible TODO — never invent a plausible substitute.
>
> Work in the phases below. Stop at the end of each phase and report what you did before continuing.

---

## Phase 1 — Foundation

1. Scaffold Next.js 15, App Router, TypeScript strict, Tailwind v4.
2. Define the six colour tokens and the type scale from `DESIGN-SYSTEM.md` §2–3 as `@theme` tokens in `globals.css`. Every later component uses tokens — no hardcoded hex anywhere.
3. Load Instrument Serif, Inter Tight and JetBrains Mono via `next/font/google`.
4. Build `lib/motion.ts` with the shared easing and durations, and `lib/canvas.ts` with a RAF helper that handles DPR capping at 2, `IntersectionObserver` pausing, `visibilitychange` pausing, and `prefers-reduced-motion`.
5. Build `components/layout/Nav.tsx` and `Footer.tsx` per `DESIGN-SYSTEM.md` §7.
6. Install and wire Lenis at `lerp: 0.1`, disabled under reduced motion.
7. Create `content/projects.ts` with typed objects for all nine projects, populated from `CONTENT.md`.
8. Create every route from `CLAUDE.md` §4 as a stub that renders its heading.

**Done when:** every route resolves, nav works, fonts render, `tsc --noEmit` and `eslint` are clean, and nothing has a rounded corner or a shadow.

---

## Phase 2 — The solver canvas

This is the most important component on the site. Build it alone.

`components/canvas/SolverGrid.tsx`, per `DESIGN-SYSTEM.md` §6.1.

- 12 × 7 grid on desktop, 8 × 7 on mobile. Cells are 1px ink outlines on paper.
- Over about four seconds, subject labels drop into cells in a fixed, deterministic order. Three or four conflicts flash in `--signal` and resolve. The grid finishes complete and holds — it does not loop.
- Single RAF loop. No allocation inside the loop. Pre-compute the solve sequence once.
- Reduced motion renders the finished grid immediately.
- Beside it, static mono text that does not animate: `3 campuses · 33 sections · zero conflicts`.

**Done when:** it runs at 60fps on a mid-range phone, settles into a readable timetable, and uses orange on no more than four cells at any one moment.

**Do not** make it abstract. It must read as a timetable, because it is one.

---

## Phase 3 — Home

Assemble the home page from `CONTENT.md` using Phase 1 components and the Phase 2 canvas.

- Hero: text left at ~58% width, `SolverGrid` right. On mobile the canvas sits below the text.
- The word `real` in the hero heading carries `--signal`. Nothing else on that screen does.
- Three mono stat lines — plain text, no cards, no icons, no borders.
- Featured work: four `ProjectCard`s with real screenshots from `public/shots/`, or labelled placeholders where a screenshot is missing.
- Journey teaser and final CTA.
- Entry animations: up 20px, fade, 60ms stagger, fire once.

**Done when:** the swap-the-name test in `CLAUDE.md` §2 passes, and the page works at 375px.

---

## Phase 4 — Case study template and the timetable story

1. Build `app/work/[slug]/page.tsx` as a reusable template: eyebrow + display title, meta row (role, stack, year) in mono, then the five sections — the problem, the constraints, the decisions, what got built, what I would tell you honestly.
2. Prose column at 68ch. Screenshots in hairline frames, occasionally bleeding past the column edge for rhythm. No shadows, no browser chrome, no tilt.
3. Populate `/work/timetable` completely from `CONTENT.md`.

The decisions section is the most valuable part of the page — give it the most space and the strongest typography. It is what convinces a client that Abdullah thinks, rather than only codes.

**Done when:** the timetable page reads as a technical article someone would finish, and every claim on it is traceable to `CONTENT.md`.

---

## Phase 5 — The remaining case studies and their canvases

1. `VoiceOrb` (`DESIGN-SYSTEM.md` §6.2) → `/work/igris`
2. `ToolGraph` (§6.3) → `/work/jarvis`
3. `BeforeAfter` (§6.4) → `/work/aps-website`
4. Populate all three pages from `CONTENT.md`.
5. Build `/work` — four featured case studies, then the five smaller cards with no detail links.

Each canvas follows the same engineering rules as Phase 2: one RAF loop, pausing, reduced-motion still frame, no glow or blur.

---

## Phase 6 — The journey page and the one 3D scene

1. Build the SVG fallback timeline first, fully populated. It must be complete and good on its own.
2. Then build `components/three/JourneyThread.tsx` per `DESIGN-SYSTEM.md` §6.5 — one ribbon, scroll-driven, flat material, no lights, no post-processing, no orbit controls.
3. Load it with `next/dynamic`, `ssr: false`, only on this route.
4. Fall back to the SVG timeline under reduced motion or when WebGL is unavailable.
5. Leave the 2022 milestone as a visible TODO. Do not write a first-client story — Abdullah has not supplied one.

**Done when:** the R3F bundle appears on no route except `/journey`, and the page is complete with WebGL disabled.

---

## Phase 7 — Contact

Build the Web3Forms integration per `DESIGN-SYSTEM.md` §8: four fields, hidden `botcheck` honeypot, client-side validation with inline errors in `--signal`, in-place success state.

Key in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY`. Commit `.env.example`, never the real key.

Test a real submission end to end and confirm the email arrives before calling this done.

---

## Phase 8 — Hardening

1. Lighthouse on every route. Performance ≥ 95, accessibility 100. Report the numbers.
2. Test every page at 375px, 768px and 1440px.
3. Test the whole site with `prefers-reduced-motion: reduce`. Every canvas must show its final frame — a blank box is a failure.
4. Test with JavaScript disabled. All content must still be there.
5. Keyboard-only pass. Visible focus rings everywhere, logical tab order.
6. Confirm no route except `/journey` ships the three.js bundle.
7. Replace every remaining placeholder with a real screenshot, or list what is still missing.
8. `tsc --noEmit` and `eslint` clean.
9. Walk `CLAUDE.md` §2 line by line and confirm nothing on the banned list appears anywhere.

---

## Standing rules for every phase

- Verify before reporting. Run it, look at it, then say it is done. Do not report success from having written the code.
- When something cannot be done as specified, say so and explain why. Do not substitute something easier and call it finished.
- Never fabricate content, metrics, testimonials or client names. `TODO:` is always the correct answer to missing information.
- Commit at the end of each phase with a clear message.
- If a phase takes a decision the spec did not cover, write it down and flag it in the report.
