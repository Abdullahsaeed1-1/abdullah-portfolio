# CONTENT.md — abdullahwork.me

Every word on the site. Copy from here into `content/projects.ts` and the page components. Do not write new marketing copy — if something is missing, mark it `TODO:` and ask.

---

## HOME

### Hero

Eyebrow (mono): `FULL-STACK & AI AUTOMATION — LAHORE, PAKISTAN`

Display heading:
> I build AI agents and systems that do **real work.**

(The word `real` carries `--signal`. Nothing else on this screen does.)

Sub-paragraph:
> Not chatbots that answer questions — agents that send the email, run the command, publish the post, and solve the schedule. Four years of shipping things businesses actually run on.

Buttons: `See the work` → `/work` · `Start a conversation` → `/contact`

Below the hero, three plain lines in mono — no icons, no cards:
```
3 campuses · 33 sections   timetable solved by constraint engine
2 AI agents                voice and business, both in daily use
1 company                  Thinkova Technologies, founded 2026
```

### Featured work

Eyebrow: `SELECTED WORK`
Heading: `Four systems, built end to end.`

Cards: Igris · Jarvis · Timetable · APS website. Each shows a real screenshot, title, one line, and stack in mono.

### Journey teaser

Eyebrow: `THE ROUTE HERE`
Heading: `From a first client to a company, in four years.`
Line: `It did not happen in a straight line.`
Link: `Read the journey` → `/journey`

### Final CTA

Heading: `Tell me what you are trying to automate.`
Line: `I will tell you honestly whether it is worth building — and if it is not, I will say so.`
Button: `Start a conversation`

---

## CASE STUDY — `/work/timetable`

**Title:** School timetable automation system
**One-liner:** A constraint solver that generates conflict-free timetables across three campuses.
**Role:** Sole developer
**Stack:** Node.js, TypeScript, Express, Prisma, PostgreSQL, Python, FastAPI, Google OR-Tools, React, Vite, Flutter, Electron, SQLite

### The problem

Ali Public School built its timetables by hand. Three campuses, 33 sections, seven periods a day, and a set of rules nobody had ever written down: important subjects early, every teacher fully loaded, nobody double-booked, and a weekly ceiling no teacher may exceed. It took weeks, and it was never quite right.

### The constraints

The rules were harder than they sounded.

- Junior, Girls and Boys campuses run on completely different models — Junior has one homeroom teacher per section, the others are subject specialists.
- Games periods need two supervising teachers per slot regardless of how many classes share the ground, and the frequency changes by grade.
- Teacher weekly ceilings — 30 periods for Girls and Boys, 35 for Junior homerooms — can never be exceeded. Not "should rarely be." Never.
- Friday periods are shorter than Monday to Thursday.

### The decisions

**A constraint solver, not a scheduling algorithm.** I used Google OR-Tools CP-SAT rather than writing heuristics. Heuristics produce a timetable that is mostly right and fails in ways you cannot explain. A solver either satisfies the hard constraints or tells you it cannot — and that difference matters when a principal asks why a teacher has a gap.

**Four sequential stages, not one weighted objective.** My first version optimised everything at once with weights, and the weights fought each other. I rebuilt it as four stages: fix shortfalls, then subject priority placement, then teacher load, then fairness — each stage hard-fixed before the next begins, with fairness isolated last so it can never undo earlier work.

**I proved the gaps were real.** Some tier violations would not go away. Rather than keep tuning, I checked the arithmetic: Boys campus has 116 periods of excess demand, Girls 143. The roster is mathematically short. No solver can fix a staffing shortage — so I built a Capacity Advisor that shows exactly where and why, instead of silently producing a worse timetable.

**Then the client asked for it offline.** After the whole system was deployed to Vercel and Railway with Supabase, Ali Uncle said he wanted it installed on his own computer, not accessed online. I copied the project into a separate repository and rebuilt the data layer: Postgres to SQLite, seven enums to validated strings, the Python solver packaged as a standalone executable with PyInstaller, and the whole thing wrapped in an Electron NSIS installer that serves over the LAN so other machines in the school can reach it.

The cloud version still exists, untouched, in its own repo. Neither build was wasted.

### What got built

Web admin in React with full CRUD across teachers, classes and subjects; timetable generation with granular locking — a whole class, a single day, or one period; a warnings page; a Capacity Advisor; a gaps view with a root-cause breakdown for every empty slot; and a Flutter app for teachers with their own timetable and a live countdown to the next period.

Production hardening that I did not skip: JWT with role-based access control, bcrypt, rate limiting on the expensive endpoints, Zod validation across all 40 endpoints in 9 controllers, optimistic locking so two people editing at once get a clear conflict instead of silent data loss, and a security baseline checked item by item before launch.

### What I would tell you honestly

The installer is unsigned while it is still being tested — Windows shows a warning. Code signing is on the list, not done. And the offline build is a single-concurrent-user system; it was never designed to be a multi-tenant product.

---

## CASE STUDY — `/work/igris`

**Title:** Igris — voice-first AI agent
**One-liner:** Speak to it, and it actually does the thing.
**Role:** Sole developer
**Stack:** Node.js, Express, React, Vite, Tailwind, Framer Motion, Gemini, Groq Whisper, ElevenLabs

### The problem

Voice assistants answer questions. I wanted one that performs work — reads and writes files, runs commands, searches the web, opens what I need — from a spoken sentence, with no typing.

### The decisions

**Three providers, each for what it is best at.** Groq Whisper for transcription because it is fast and handles Roman Urdu mixed with English, which is how I actually speak. Gemini for reasoning and deciding which tool to call. ElevenLabs for a voice that does not sound like a screen reader. One provider for all three would have been simpler and worse at every step.

**Tool-calling, not intent matching.** The model decides which tool a request needs rather than matching against a list of phrases. This is why "check what is in the config file and tell me if the port is right" works without anyone having written a rule for it.

**Barge-in.** You can interrupt it mid-sentence. Without this, every slightly wrong answer costs you the full length of the reply, and the assistant becomes annoying to use. It is a small feature that decides whether the thing is usable at all.

**Security boundaries from the first commit.** File access is confined to the workspace directory. Terminal commands run against an allowlist — `npm`, `node`, `git`, `dir`, `cd`, `echo` — and nothing else. An agent that can run arbitrary shell commands is not a feature, it is a liability.

**Provider fallback.** API quotas run out at the worst moment. When a provider fails, it falls through to an alternative rather than dying.

### What I would tell you honestly

It is a voice assistant first. Command execution is deliberately narrow, and which spoken languages work well depends on the configured Whisper and ElevenLabs models.

---

## CASE STUDY — `/work/jarvis`

**Title:** Jarvis — private AI assistant and digital operator
**One-liner:** It runs my business operations, with approval gates on anything that leaves the building.
**Role:** Sole developer
**Stack:** Python, FastAPI, Uvicorn, Claude API, Playwright, ReportLab, Google Workspace APIs, Meta, LinkedIn, Canva, Telegram, WhatsApp, Twilio

### The problem

I run a company, handle technology and marketing for a school group, and run my own brand. The work is not hard — it is scattered. Email in one place, calendar in another, social posts somewhere else, invoices nowhere.

### The decisions

**Approval-first, not autonomy-first.** Nothing leaves without me saying yes. Emails are drafted, never sent. Social posts are previewed, never published. External calendar invites wait. An assistant that acts on your behalf without a gate will eventually send something embarrassing to a client — and one such incident costs more than the automation ever saved.

**Memory that curates itself.** It remembers people, projects, preferences and dates, retrieves what is relevant before each conversation, and learns afterwards. A weekly self-review removes duplicates and resolves contradictions. Memory that only grows becomes noise within a month.

**Credentials are never stored.** Passwords, PINs, OTPs and card numbers are excluded from memory by design, not by filtering after the fact.

**Effort routing to control cost.** Simple messages get low reasoning effort, normal tasks medium, strategy and analysis high — with an Opus-level advisor available for genuinely hard decisions. Running everything at maximum effort is how an assistant like this becomes too expensive to keep using.

**Strict brand separation.** APS, Thinkova, Luxara and personal are separate areas. No content, account, memory or Drive folder crosses between them. When you handle several brands, one mixed-up post is the thing that ends a client relationship.

**Reachable where I already am.** Web app, Telegram, WhatsApp, browser voice, and Twilio phone calls for urgent alerts. In voice mode replies are one to three sentences, in Roman Urdu or English.

### What got built

17 modules covering the agent loop, tools, personal tracking, effort routing, learning, diary, Google integration, social publishing, Canva workflows, three messaging channels, phone calls, browser automation, privacy locks and scheduling. Daily morning brief on Telegram. Sunday memory review. Watchers on Gmail, payments and deadlines. Runs 24/7 on a VPS; usable from an iPhone home screen over HTTPS.

---

## CASE STUDY — `/work/aps-website`

**Title:** alipublicschool.com.pk — institutional website rebuild
**One-liner:** Replaced a legacy WordPress site without losing a single search ranking.
**Role:** Sole developer and designer
**Stack:** Next.js 15, App Router, static site generation, TypeScript, Tailwind, Vercel, Cloudflare
**Launched:** 25 October 2026

### The problem

The school's main site was an aging WordPress install, client-side rendered, and invisible to search engines in the ways that mattered. It also looked nothing like an institution that has been running for decades.

### The decisions

**Static generation, specifically for the SEO problem.** The old site rendered on the client, so crawlers saw very little. Next.js with App Router and SSG delivers the content in the HTML.

**Preserving rankings was the hard requirement, not the launch.** The school ranks for searches that bring in admissions. A rebuild that lost those rankings would have been a net loss no matter how good it looked. I kept the URL structure, carried over the real content — the principal's message, the BISE and PSRA registration numbers — and kept the launch steps written down so the DNS cutover could be done carefully rather than quickly.

**A brand system from the crest, not from a trend.** Six colour tokens pulled from the school's own crest, and a three-typeface hierarchy — Fraunces, Manrope and Amiri — so the Urdu and English sit together properly. A school founded generations ago should not look like a startup.

---

## OTHER WORK — `/work` cards only, no detail pages

**NutriX — AI nutrition analyzer** · Backend and database lead · Node.js, MongoDB, computer vision
Pakistani food recognition across 50–60 dish classes. Built the API and nutrition calculation engine; evaluated YOLOv8-seg against an EfficientNet and U-Net pipeline. Final year project, group S26CS044.

**apspremier.com** · React
The Premier campus site — the first thing I built for the school group, two years ago.

**Luxara** · React, e-commerce
My own handmade and stainless-steel jewellery brand. Built the storefront, the brand and the customer side of it.

**Hangout** · Next.js, GSAP, Lenis
A layered parallax mountain valley with a scroll-driven car path across six illustrated layers.

**Veldara** · Vanilla JavaScript, Canvas
Scroll-scrubbed video using canvas frame extraction, with no animation library at all.

---

## JOURNEY — `/journey`

Four milestones along the 3D thread. Keep the voice plain and first-person. `TODO:` marks where Abdullah needs to supply the real detail — do not invent it.

**2022 — The first paid work**
`TODO: Abdullah to supply — the first client, what it was, what he charged, what went wrong.`

**March 2024 — Ali Public School**
It started with one website for the Premier campus. Then a 30-page prospectus. Then the social media, from zero. Then the ad campaigns for the school opening. Two years later I handle technology and marketing for the whole group across both campuses.

Most of what I know about building things people actually depend on, I learned here — because when something broke, it broke for a real school on a real morning.

**2026 — Two agents and a company**
I built Igris, then Jarvis, because I wanted to see how far an agent could go past answering questions. Around the same time Irtaza and I founded Thinkova Technologies.

**October 2026 — Group analyst roles**
The school group restructured, and I was given two formal roles: Group Marketing Analyst and Group IT & Digital Services Analyst. Classster, Xero, data governance, AI in classrooms.

Closing line:
> Still in my final year of computer science. Everything above happened alongside it.

(This is the one place "student" appears on the entire site — at the end, as the punchline, after four years of proof. It reads as remarkable there. Anywhere near the top it would read as an excuse.)

---

## CONTACT — `/contact`

Heading: `Tell me what you are trying to automate.`

Line:
> Send me the problem rather than the spec. If building it is not worth your money, I would rather tell you that now than halfway through.

Form fields: Name · Email · What you want built · Budget range
Budget options: `Under $1,000` · `$1,000 – $5,000` · `$5,000 – $15,000` · `$15,000+` · `Not sure yet`

Below the form, in mono:
```
abdullahuser052@gmail.com
github.com/Abdullahsaeed1-1
```

Success state: `Got it. I will reply within a day.`
