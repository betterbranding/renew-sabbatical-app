# RE:NEW — Personal Sabbatical App

A stunning, captivating web application for tracking recurring 2-day personal sabbatical retreats.

## 🎨 Design

- **Colors:** Navy (#0A1628), Light Blue (#5BA4E6), White, Black
- **Typography:** Helvetica Neue, Bold headlines
- **Cards:** Dark navy backgrounds with bold white text
- **Animations:** Spring-based card entrances, scroll reveals, page transitions, confetti on goal completion

## 📋 Structure

Each RE:NEW session is a 2-day retreat:

### Day 1 — Keys to the Kingdom
A guided 5-step spiritual process:
1. **Reverence** (Acknowledge) — 10 mins
2. **Release** (Confession, Forgiveness) — 30 mins
3. **Repent** (Repent, Renounce)
4. **Respond** (Journal, Seek)
5. **Receive** (Soak, Hear, Journal, Confirm) — 1-2 hours

### Day 2 — High Five
Goal setting across 5 life areas with accountability:
- **Hi 5 Health Check** — Spiritual, Mental, Physical, Relational, Financial
- **High Five Goals** — One "Stake in the Ground" per area
- **Reflection Prompts** — What accomplishing/not accomplishing goals means
- **High Five People** — One accountability partner per area

> ✝️ *"Where there is no counsel, the people fall; But in the multitude of counselors there is safety."* — Proverbs 11:14

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** SQLite via Prisma
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
├── database/seed-data.json    # 6 sessions from Notion
├── docs/APP-SPEC.md           # Full build specification
├── prisma/schema.prisma       # Database schema
└── README.md
```

## 🚀 Getting Started

1. Clone this repo
2. Follow the full spec in `docs/APP-SPEC.md`
3. Use the seed data in `database/seed-data.json`

## 📊 Seed Data

Ships with 6 pre-existing sessions:
| Session | Date |
|---------|------|
| RE:NEW (Jan 2024) | January 2024 |
| RE:NEW Weekend | July 2024 |
| RE:NEW (1) | January 2025 |
| RE:NEW 02-2025 | February 2025 |
| RE:NEW Aug 2025 | August 2025 |
| RE:NEW Jan 2026 | January 2026 |
