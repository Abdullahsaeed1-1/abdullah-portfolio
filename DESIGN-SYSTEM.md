# DESIGN-SYSTEM.md — abdullahwork.me

The visual law. Nothing ships that contradicts this file.

---

## 1. The idea in one line

**Ink and signal.** Paper-white page, near-black ink, one hot orange that appears rarely enough that it still means something.

This is an editorial system, not a dashboard system. The reference points are a well-set magazine spread and a technical journal — not a SaaS landing page.

**Why light, when every developer portfolio is dark:** because every developer portfolio is dark. A client looking at twenty portfolios sees nineteen dark-navy pages with glowing accents. The twentieth is white, quiet, and confident. That is the one they remember. Dark used to signal craft; now it signals template.

---

## 2. Colour

```css
@theme {
  --color-paper:    #FBFBF9;  /* page background */
  --color-ink:      #0A0A0A;  /* primary text, borders at full strength */
  --color-signal:   #FF4A1C;  /* the one accent */
  --color-muted:    #737373;  /* secondary text */
  --color-surface:  #EDEDE9;  /* raised panels, code blocks, screenshot mats */
  --color-line:     #DEDED8;  /* hairlines */
}
```

**That is the entire palette. Six values. No gradients anywhere, ever.**

### The signal rule

`--signal` is rationed. It appears:

- on exactly **one** element per viewport — never two at once
- on the active nav item
- on focus rings
- on one word in the hero sentence
- on the "solved" state in the solver canvas
- on links, underlined on hover

It never appears as: a background fill larger than a button, a gradient, a glow, a border around a card, or decoration with no meaning. If orange is on screen twice, one of them is wrong.

### Dark mode

**There is no dark mode.** This is a deliberate editorial choice, not an omission. Do not add a toggle. Do not add `@media (prefers-color-scheme: dark)` overrides.

---

## 3. Type

```
Display    Instrument Serif  — 400 + 400 italic
Body / UI  Inter Tight       — 400, 500
Mono       JetBrains Mono    — 400, 500
```

All via `next/font/google`, self-hosted at build time.

**Why this pairing:** a real editorial serif against a tight modern grotesque creates contrast that templates never have — templates use one sans for everything. Instrument Serif has character without being a wedding font, and it is not Playfair, which is itself now a cliché. JetBrains Mono carries the technical register where it belongs: stack lines, data labels, canvas annotations.

### Scale

```
display    clamp(3rem, 8vw, 6.5rem)   Instrument Serif  400   line-height 0.95   tracking -0.02em
h1         clamp(2.5rem, 5vw, 4rem)   Instrument Serif  400   line-height 1.05
h2         clamp(1.75rem, 3vw, 2.5rem) Instrument Serif 400   line-height 1.15
h3         1.25rem                     Inter Tight      500   line-height 1.3
body       1.0625rem                   Inter Tight      400   line-height 1.7
body-lg    1.25rem                     Inter Tight      400   line-height 1.6
small      0.875rem                    Inter Tight      400   line-height 1.5
mono       0.8125rem                   JetBrains Mono   400   tracking 0.02em
eyebrow    0.75rem                     JetBrains Mono   500   tracking 0.12em   UPPERCASE
```

`eyebrow` is the only uppercase in the system — used for section labels such as `THE PROBLEM`, `WHAT I BUILT`. Everything else is sentence case.

### Prose

Case study body text: `max-width: 68ch`. Long-form reading is the point of those pages; full-width text is not read.

---

## 4. Layout and space

8px base unit. Spacing scale: `8 / 16 / 24 / 40 / 64 / 104 / 168` (Fibonacci-ish — it stops layouts feeling mechanically even).

- Content column: `max-width: 1200px`, side gutter 24px mobile / 48px desktop.
- Prose column: `68ch`.
- Section rhythm: 104px mobile, 168px desktop.
- **Asymmetry is required.** A centred column down the whole page is the template look. Hero text sits left at ~58% width. Case study headers break the grid. Screenshots occasionally bleed past the content column edge.

### Borders and corners

- Hairlines: `1px solid var(--color-line)`.
- **Border radius: 0 everywhere.** Sharp corners. No rounded cards, no pills except the one nav indicator. This single choice removes most of the template feeling on its own.
- **No box-shadows anywhere.** Depth comes from borders and whitespace.

---

## 5. Motion

Shared easing, defined once in `lib/motion.ts`:

```ts
export const ease = [0.16, 1, 0.3, 1] as const;   // expo-out
export const fast = 0.3;
export const base = 0.6;
export const slow = 1.1;
```

**Laws:**

1. Things move **up and in**, 16–24px, never more. No slide-in-from-the-side, no scale-from-zero, no rotation on entry.
2. Stagger is 60ms. Never more — longer staggers feel like a slideshow.
3. Entry animations fire **once**. Nothing re-animates when scrolled back to.
4. No parallax on text. Parallax on screenshots only, and subtle (≤ 40px of travel).
5. Lenis: `lerp: 0.1`. Smooth, not floaty. If scrolling feels like ice, it is wrong.
6. `prefers-reduced-motion: reduce` → all entry animation off, all canvases render their final still frame, Lenis disabled.

---

## 6. The canvas pieces

These are the heart of the site. Each is hand-written Canvas 2D, each is **about Abdullah's actual work**, and each replaces the generic abstract graphic a template would use.

### 6.1 `SolverGrid` — home hero

A timetable grid that solves itself.

A grid of cells, roughly 12 columns by 7 rows. On load, cells are empty outlines. Over ~4 seconds, subjects drop into cells one by one. Conflicts flash briefly in `--signal`, then resolve. The grid settles into a complete, stable timetable and holds.

This is a literal, honest depiction of the OR-Tools constraint solver Abdullah built. It is the opposite of a stock globe: it means something, and only he could use it.

- Deterministic — same solve order every load, no randomness.
- Single RAF loop, ~400 cells max, no per-frame allocation.
- Reduced motion: render the final solved grid immediately.
- Mobile: 8 columns, same behaviour.
- Loops once on load, then rests. A looping hero animation is a distraction; a settled one is a finished artefact.

### 6.2 `VoiceOrb` — Igris case study header

A waveform ring, not a glowing sphere. Thin ink strokes radiating from a centre, their lengths driven by a stored amplitude array from a real recorded phrase. Three states cycle slowly: idle (near-flat), listening (active), speaking (different rhythm). One orange stroke marks the moment a tool call fires.

No glow. No gradient. No blur. Line work only.

### 6.3 `ToolGraph` — Jarvis case study header

A node graph that traces one real request end to end: `message → memory retrieval → Claude → tool selection → Gmail → approval → sent`. Nodes are small squares, edges are thin lines, and the active path lights in `--signal` as it travels. It runs once, then holds the complete path.

Drawn from Jarvis's actual tool loop, not an invented architecture.

### 6.4 `BeforeAfter` — APS website case study

A draggable divider over the real before/after screenshots. No automatic sweep — the user drags, so they engage with it. Handle is a 1px line with a small square grip in `--signal`.

### 6.5 `JourneyThread` — the one R3F scene

On `/journey`: a single thin ribbon in 3D space that the camera follows as the user scrolls through the four-year timeline. Milestones are small nodes along it. The ribbon is ink-coloured; the current milestone node is orange.

- `next/dynamic`, `ssr: false`, loads only on this route.
- Scroll-driven only. No idle animation, no auto-rotate, no orbit controls.
- One material, flat colour, no lighting rig, no environment map, no post-processing.
- Reduced motion or WebGL unavailable → fall back to a clean vertical SVG timeline with the same content.

---

## 7. Components

**Button** — sharp rectangle, 1px ink border, transparent fill. Hover: fill flips to ink, text to paper. 150ms. Primary variant: signal border and text, same flip.

**Tag** — mono, small, uppercase eyebrow styling, 1px line border, no fill.

**ProjectCard** — screenshot in a hairline frame, title in display serif, one-line description, stack in mono. Hover: the frame border goes to ink, and the image shifts up 4px. No lift, no shadow, no scale.

**SectionHeading** — eyebrow label in mono above a display-serif heading, with a 1px rule running from the label to the right edge of the column.

**Nav** — fixed, paper background, 1px bottom hairline. Name left in display serif, links right in Inter Tight. Active route carries a 2px signal underline. No hamburger animation theatrics on mobile — a plain full-screen panel.

**Footer** — email, GitHub, LinkedIn, a `© 2026` line. One row. Nothing else.

---

## 8. The contact form

Web3Forms. `POST` to `https://api.web3forms.com/submit` with the access key in `NEXT_PUBLIC_WEB3FORMS_KEY`.

Fields: name, email, what you want built (textarea), budget range (select). Plus a hidden honeypot field named `botcheck` — bots fill it, humans never see it, and a filled honeypot means silently discard.

Client-side validation before submit: empty required field shows an inline error in `--signal` beside the control and blocks submission. Success state replaces the form in place — no redirect, no modal, no confetti.

The form page carries one line of real copy above it, not a sales pitch. See `CONTENT.md`.
