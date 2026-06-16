# RE:NEW — Personal Sabbatical Web App

## Full Specification for Web Application Build

---

## 1. PROJECT OVERVIEW

**RE:NEW** is a personal sabbatical web app — a stunning, captivating digital retreat experience. It's built for one primary user (Greg Solomon) as a tool for recurring 2-day personal sabbaticals focused on spiritual renewal, life goal setting, and accountability across 5 life areas.

### Core Concept
Every few months, the user takes a **RE:NEW Weekend** — a structured 2-day retreat:
- **Day 1: Keys to the Kingdom** — A guided spiritual process (Reverence → Release → Repent → Respond → Receive)
- **Day 2: High Five** — Goal setting across 5 life areas (Mental, Physical, Relational, Financial, Spiritual) with accountability partners

---

## 2. DESIGN SYSTEM

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0A1628` | Primary dark / card backgrounds |
| `--navy-mid` | `#1B3A5C` | Secondary dark / hover states |
| `--blue-accent` | `#5BA4E6` | Accent / links / active states |
| `--blue-light` | `#B8D8F8` | Subtle highlights / tags |
| `--white` | `#FFFFFF` | Page background / card text |
| `--off-white` | `#F5F7FA` | Section backgrounds |
| `--black` | `#111111` | Body text on light backgrounds |

### Typography
- **Font Family:** `'Helvetica Neue', Helvetica, Arial, sans-serif`
- **Headlines:** Bold (700 weight), large scale, white on dark cards
- **Body:** Regular (400 weight), readable sizing, high contrast
- **All caps** for section labels and tags

### Card Design (CRITICAL)
Every section/module lives inside a **dark card** (`--navy` background):
- Bold white headline text
- White readable subtext
- Rounded corners (12px)
- Subtle shadow for depth
- Hover: slight scale + lighter navy background

### Animations (Make it STUNNING)
- **Page Transitions:** Smooth fade + slide between routes (300ms ease)
- **Card Entrances:** Stagger-animate cards in from bottom with spring physics
- **Scroll Reveals:** Elements fade up as they enter viewport (IntersectionObserver)
- **Hover Effects:** Cards lift slightly with shadow expansion
- **Progress Bars:** Animated fill on load
- **Tab Switches:** Cross-fade between Day 1 and Day 2
- **Loading States:** Pulsing skeleton cards in navy
- **Micro-interactions:** Checkbox confetti, tag pill press effect

---

## 3. APP ARCHITECTURE

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion
- **Database:** SQLite via Prisma (file-based, self-contained)
- **State:** React Context + hooks
- **Deployment:** Vercel-ready

### Route Structure
```
/                       → Landing / Dashboard (all sessions)
/session/[id]           → Session detail (Day 1 / Day 2 tabs)
/session/[id]/day1      → Keys to the Kingdom guided flow
/session/[id]/day2      → High Five dashboard
/session/new            → Create new session
/stats                  → Progress & trends over time
```

---

## 4. PAGES & COMPONENTS

### 4.1 Dashboard (`/`)
A timeline of all RE:NEW sessions, newest first.

**Layout:**
- Full-width hero section with "RE:NEW" logo text and tagline
- Session cards in a vertical timeline layout
- Each card shows: Session title, date, completion status, goal summary
- Floating "+" button to start a new session
- Anchor verse displayed at the bottom

**Session Card (dark navy):**
```
┌─────────────────────────────────────┐
│  RE:NEW | Jan 2026                  │
│  January 4, 2026                    │
│                                     │
│  🎯 5 Goals Set · 1 Completed      │
│  👥 3 Accountability Partners       │
│                                     │
│  [View Session →]                   │
└─────────────────────────────────────┘
```

### 4.2 Session View (`/session/[id]`)
Two-tab view: **Day 1** and **Day 2**

**Header:** Session title + date, with a subtle background gradient (navy → dark)

#### Day 1 Tab — Keys to the Kingdom
A vertical guided flow with 5 process steps, each as an expandable dark card:

1. **Reverence** (Acknowledge) — 10 mins
2. **Release** (Confession, Forgiveness) — 30 mins
3. **Repent** (Repent, Renounce)
4. **Respond** (Journal, Seek)
5. **Receive** (Soak, Hear, Journal, Confirm) — 1-2 hours

Each card has:
- Step number + name as bold headline
- Tag pills in light blue
- Suggested time
- Expandable text area for journaling/notes (content field)
- For new sessions: empty text area ready for input
- For past sessions: saved content displayed, editable on click

**Day 1 Overview card** at the top sets context.

#### Day 2 Tab — High Five Dashboard

**Section A: Hi 5 Health Check** (preparation & alignment)
Grid of 5 health area cards (Spiritual, Mental, Physical, Relational, Financial).
Each card:
- Health area name as headline
- Due date
- Text area for notes
- Tag showing Preparation or Alignment

**Section B: High Five Goals — "Stakes in the Ground"**
5 goal cards, one per life area:
```
┌────────────────────────────────────┐
│  🧠 MENTAL                        │
│  Setup Notion Habit-Tracker        │
│  Due: April 30, 2026              │
│  [ ] Completed                    │
└────────────────────────────────────┘
```
- Category tag (colored pill: Mental=gray, Physical=green, Relational=yellow, Financial=red, Spiritual=purple)
- Goal name (editable for new sessions)
- Due date picker
- Completion checkbox with animation

**Section C: Reflection Prompts**
Two dark cards with prompts:
- "How will I feel if I accomplish my High Five goals?"
- "What will happen if I don't accomplish my High Five?"
- Each with a text area for writing

**Section D: High Five People — Accountability**
5 people cards:
```
┌────────────────────────────────────┐
│  💜 SPIRITUAL HEALTH              │
│  Pat Gray                          │
│  [ ] Contacted                    │
└────────────────────────────────────┘
```

**Anchor Verse** displayed as a callout card at the bottom:
> ✝️ "Where there is no counsel, the people fall; But in the multitude of counselors there is safety." — Proverbs 11:14

### 4.3 New Session (`/session/new`)
Creates a fresh session with:
- Auto-generated title: "RE:NEW | [Month] [Year]"
- Today's date
- Pre-populated Day 1 process steps (5 steps with empty content fields)
- Empty Day 2 fields ready for input
- Pre-populated Hi 5 Health areas (5 areas)
- Empty goals, people, and reflections

### 4.4 Stats Page (`/stats`)
Visual overview across all sessions:
- **Goal Completion Rate** — bar chart over time
- **Most Active Categories** — donut chart of goal categories
- **People Tracker** — who's been listed most frequently
- **Session Timeline** — visual timeline of all sessions
- **Streak Counter** — months between sessions

---

## 5. DATABASE SCHEMA (Prisma/SQLite)

```prisma
model Session {
  id          String   @id @default(uuid())
  title       String
  date        DateTime
  status      String   @default("new") // new, in-progress, completed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  keys        KeyEntry[]
  healthItems HealthItem[]
  goals       Goal[]
  people      Person[]
  reflections Reflection[]
}

model KeyEntry {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  name      String   // Reverence, Release, Repent, Respond, Receive
  tags      String   // JSON array
  time      String?
  content   String?  @default("")
  order     Int
}

model HealthItem {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  name      String   // Spiritual Health, Mental Health, etc.
  tags      String?  // JSON array: Preparation, Alignment
  dueDate   DateTime?
  content   String?  @default("")
}

model Goal {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  name      String
  tag       String   // Mental, Physical, Relational, Financial, Spiritual
  dueDate   DateTime?
  completed Boolean  @default(false)
}

model Person {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  name      String
  tag       String   // Mental Health, Spiritual Health, etc.
  contacted Boolean  @default(false)
}

model Reflection {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  prompt    String
  answer    String?  @default("")
}
```

---

## 6. SEED DATA

The app ships with **6 pre-existing sessions** pulled from the user's Notion database:

| Session | Date | Key Data Points |
|---------|------|-----------------|
| RE:NEW (Jan 2024) | Jan 2024 | Goals: Finish Building Tables, Lose 4" waist, Anniversary Trip, Pay off RH Refunds, Publish Sabbatical Template |
| RE:NEW Weekend | Jul 2024 | Template goals (Goal #1–#5), Mentor 1–5 |
| RE:NEW (1) | Jan 2025 | People: Roger (Spiritual), Brandon (Physical), John (Relational), Paola (Financial) |
| RE:NEW 02-2025 | Feb 2025 | People: David Hicks, Pat Gray, Adrian DelGado, Robert Harris, Paola Guzman |
| RE:NEW Aug 2025 | Aug 2025 | Same goals as Jan 2025 session |
| RE:NEW Jan 2026 | Jan 2026 | Goals: Setup Notion Habit-Tracker, Schedule Hernia Surgery, $15K/mth income, Read Celebration of Discipline. People: Find a Therapist, John Critz |

**Full seed data is provided in `database/seed-data.json`.**

---

## 7. API ROUTES

```
GET    /api/sessions              — List all sessions
POST   /api/sessions              — Create new session
GET    /api/sessions/[id]         — Get session with all related data
PUT    /api/sessions/[id]         — Update session
DELETE /api/sessions/[id]         — Delete session

PUT    /api/keys/[id]             — Update key entry content
PUT    /api/health/[id]           — Update health item
PUT    /api/goals/[id]            — Update goal (name, dueDate, completed)
PUT    /api/people/[id]           — Update person (name, contacted)
PUT    /api/reflections/[id]      — Update reflection answer
```

---

## 8. KEY INTERACTIONS

### New Session Flow
1. User clicks "+" or "New Session"
2. App creates session with auto-title and today's date
3. Day 1 tab opens with 5 empty process step cards
4. User fills in each step's content area
5. Switch to Day 2 tab
6. User fills in goals, people, reflections
7. Auto-saves on blur/change

### Editing Past Sessions
- Click any session from dashboard
- All fields are editable
- Changes auto-save with a subtle "Saved ✓" toast
- Checkbox toggles animate immediately

### Goal Completion
- Clicking a goal checkbox triggers a satisfying confetti micro-animation
- Progress updates in real-time on the dashboard card

---

## 9. RESPONSIVE DESIGN

- **Desktop:** Two-column layouts for cards where appropriate
- **Tablet:** Single column with wider cards
- **Mobile:** Full-width stacked cards, swipe between Day 1/Day 2
- **All:** Touch-friendly, minimum 44px tap targets

---

## 10. FILE STRUCTURE

```
renew-sabbatical-app/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── database/
│   └── seed-data.json
├── public/
│   └── (logo assets)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              (Dashboard)
│   │   ├── stats/page.tsx
│   │   └── session/
│   │       ├── new/page.tsx
│   │       └── [id]/
│   │           ├── page.tsx      (Session view)
│   │           ├── day1/page.tsx
│   │           └── day2/page.tsx
│   ├── components/
│   │   ├── SessionCard.tsx
│   │   ├── KeyEntryCard.tsx
│   │   ├── GoalCard.tsx
│   │   ├── PersonCard.tsx
│   │   ├── HealthCard.tsx
│   │   ├── ReflectionCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── AnimatedCard.tsx
│   │   └── VerseCallout.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
└── .env
```

---

## 11. DEPLOYMENT

- **Vercel:** One-click deploy with SQLite persistence
- **Environment:** Single `.env` with `DATABASE_URL="file:./dev.db"`
- **Build:** `npm run build` → `prisma generate` → `prisma db seed` → `next build`

---

## 12. SUMMARY

Build a **stunning, captivating** Next.js web app called RE:NEW. Every section lives in a **dark navy card with bold white headlines**. Use **Helvetica Bold** everywhere. Animations should be **smooth, spring-based, and delightful** — staggered card entrances, scroll reveals, page transitions, checkbox confetti. The color scheme is **white, black, light blue, and navy blue**.

The app tracks recurring 2-day sabbatical sessions with guided Day 1 spiritual processes and Day 2 goal/accountability tracking across 5 life areas. It ships with 6 pre-existing sessions from Notion and supports creating new sessions with empty fields ready for input.

**Make it feel like a premium, personal retreat experience — not just another productivity app.**
