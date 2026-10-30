# CLAUDE.md — abdullahwork.me

Project brain file. Read this before touching anything.

---

## 1. What this is

The personal portfolio of **Abdullah Saeed** — full-stack and AI automation developer, CEO of Thinkova Technologies, technology lead for a multi-campus education group.

Domain: `abdullahwork.me`

**This site has one job:** convince a serious client, within 20 seconds, that Abdullah builds systems businesses depend on — then give them a way to start a conversation.

It is not a résumé. It is not a list of skills. It is a set of **proofs**.

---

## 2. The prime directive — do not make this look AI-generated

A previous build of this site was rejected for looking machine-made. These are the exact failure modes. **Every one of them is banned.**

| Banned | Why |
|---|---|
| Dark navy / slate background with cyan or blue gradient text | The single most recognisable AI-portfolio signature |
| Polygon network globes, particle meshes, floating node clouds, abstract "tech" blobs | Stock imagery that says nothing about the person |
| Glassmorphism cards with backdrop-blur everywhere | Template default |
| Neon glow, drop shadows on text, gradient borders | Template default |
| "Available for new projects" pill with a pulsing green dot | Template signature |
| Icon chips reading Frontend / Backend / AI / Design | Decoration, zero information |
| Copy made of adjectives: "premium", "passionate", "cutting-edge", "seamless", "innovative", "thoughtful" | Says nothing, proves nothing |
| Skill bars, percentage rings, "90% React" | Meaningless and unprovable |
| Emoji anywhere in the UI | Cheapens everything |
| Generic stock photography | Same as above |

**The test, applied to every screen before you call it done:** could this exact screen belong to any other developer if you swapped the name out? If yes, it is wrong. Every visual element must be *about Abdullah's actual work.*

---

## 3. Stack

```
Framework      Next.js 15 (App Router, TypeScript, strict)
Styling        Tailwind CSS v4 (CSS-first config, @theme tokens)
Motion         Motion (framer-motion v11+)
Smooth scroll  Lenis
2D             Canvas 2D API — hand-written, no chart libraries
3D             React Three Fiber + drei — used exactly ONCE (see §6)
Forms          Web3Forms (no backend)
Fonts          next/font/google, self-hosted at build
Deploy         Vercel
```

**Do not add:** UI component libraries (shadcn, MUI, Chakra), animation libraries beyond Motion, icon packs beyond Lucide, state managers, CMS, analytics scripts without being asked.

---

## 4. Routes

```
/                      Home
/work                  All projects, grid
/work/igris            Case study — voice agent
/work/jarvis           Case study — business assistant
/work/timetable        Case study — constraint solver
/work/aps-website      Case study — Next.js rebuild
/journey               The four-year story
/contact               Web3Forms
```

Case studies are **separate routes, not anchors**. Abdullah sends these URLs directly to clients — `/work/timetable` must open on the timetable story, nothing else.

Four deep case studies. Everything else (NutriX, apspremier.com, Luxara, Hangout, Veldara) appears as a compact card on `/work` with no detail page.

---

## 5. Repository layout

```
/
├── CLAUDE.md               ← this file
├── DESIGN-SYSTEM.md        ← tokens, type, motion law
├── CONTENT.md              ← every word of real copy
├── MASTER-PROMPT.md        ← the build plan, in phases
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── journey/page.tsx
│   ├── contact/page.tsx
│   └── globals.css
├── components/
│   ├── canvas/             SolverGrid, VoiceOrb, ToolGraph, BeforeAfter
│   ├── three/              JourneyThread (the only R3F component)
│   ├── layout/             Nav, Footer, PageShell
│   └── ui/                 Button, Tag, Prose, SectionHeading
├── content/
│   └── projects.ts         typed project data, single source of truth
├── lib/
│   ├── motion.ts           shared variants + easing
│   └── canvas.ts           RAF loop helper, DPR handling, visibility pause
└── public/
    └── shots/              real screenshots — see §7
```

All project data lives in `content/projects.ts` as typed objects. No copy is hardcoded in JSX.

---

## 6. The 3D rule — one moment only

React Three Fiber is used in **exactly one place**: the `/journey` page, where a 3D thread follows the user's scroll through the four-year timeline.

That is the whole 3D budget. No floating 3D objects in the hero, no 3D cards, no R3F on `/work`.

**Reason:** 3D everywhere is what cheap portfolios do, and it is the thing that most reliably reads as "AI made this." One well-executed 3D moment, in the one place it means something, is the premium choice. Restraint is the signal.

Everything else that moves is **Canvas 2D** — hand-written, fast, and specific to Abdullah's actual work (see `DESIGN-SYSTEM.md` §5).

---

## 7. Screenshots

Abdullah is supplying real screenshots. They go in `public/shots/` as:

```
timetable-grid.png        filled timetable, 33 sections
timetable-warnings.png    warnings / gaps page
timetable-capacity.png    capacity advisor
igris-orb.png             the agent mid-conversation
jarvis-telegram.png       morning brief in Telegram
jarvis-memory.png         memory panel
aps-before.png            old WordPress site
aps-after.png             the Next.js rebuild
aps-premier.png           apspremier.com
```

**Until a real screenshot exists, use a labelled placeholder — never a stock image, never a generated abstract graphic.** A box reading `screenshot: timetable grid` is honest. A fake dashboard mockup is not.

Every screenshot sits in a restrained frame: 1px border in `--line`, no shadow, no browser chrome mockup, no perspective tilt.

---

## 8. Writing rules

- **Specifics, never adjectives.** "3 campuses, 33 sections" beats "complex scheduling system." If a sentence has no number, name or decision in it, cut it.
- **First person, past tense, plain.** "I moved the whole thing to SQLite" — not "leveraged SQLite for optimal local persistence."
- **No marketing voice.** No "passionate", "cutting-edge", "robust", "seamless", "leveraged", "spearheaded".
- **Sentence case** for every heading. Never Title Case, never ALL CAPS except the one-word eyebrow labels defined in the design system.
- **Trade-offs stay in.** "Code signing skipped while testing" and "this is slower than the cloud version" build more trust than a flawless story. Clients have been lied to before; honesty reads as competence.
- **Never invent.** No fake metrics, no fake testimonials, no fake client logos, no rounded-up numbers. If a figure is not confirmed, leave it out. A `TODO:` comment is correct; a plausible-sounding invention is not.

---

## 9. Performance and accessibility — non-negotiable

- Lighthouse: performance ≥ 95, accessibility 100.
- Every canvas respects `prefers-reduced-motion` — reduced means **render the final still frame**, not a blank box.
- Canvas loops pause via `IntersectionObserver` when offscreen and on `visibilitychange`.
- The R3F scene is `next/dynamic` with `ssr: false` and only loads on `/journey`.
- Canvas handles `devicePixelRatio`, capped at 2.
- No layout shift: every image and canvas has explicit dimensions.
- Full keyboard navigation, visible focus rings (`--signal`, 2px offset).
- Every interactive canvas has a text alternative nearby — the page must make complete sense with JavaScript disabled.
- Mobile is a first-class target, not a shrunk desktop. Canvas pieces simplify on small screens; they do not disappear.

---

## 10. Definition of done

A page ships when:

1. It passes the swap-the-name test in §2.
2. Every number on it is real and verifiable.
3. It works at 375px wide.
4. It works with reduced motion on.
5. It works with JavaScript off (content-wise).
6. `tsc --noEmit` and `eslint` are clean.
7. Nothing from the banned list in §2 appears anywhere on it.
