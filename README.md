# RE:NEW — Personal Sabbatical Framework

A guided 2-day sabbatical web app for spiritual renewal and life planning.

## Stack

- **Next.js 15** (App Router)
- **Prisma** + **Supabase** (PostgreSQL)
- **NextAuth.js** (Google OAuth)
- **Vercel** (deployment)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/betterbranding/renew-sabbatical-app.git
cd renew-sabbatical-app
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the connection string from Settings → Database → Connection string (URI)

### 3. Set Up Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI

### 4. Configure Environment

```bash
cp .env.example .env
# Fill in your values
```

### 5. Push Database Schema

```bash
npx prisma db push
```

### 6. Run Dev Server

```bash
npm run dev
```

### 7. Seed Historical Data (Greg only)

After your first login, find your userId in the database, then:

```bash
npx tsx prisma/seed.ts YOUR_USER_ID
```

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # REST API routes
│   ├── auth/signin/       # Login page
│   ├── session/[id]/      # Session view
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── Landing.tsx        # Session list + new session
│   ├── SessionView.tsx    # Full session (Day 1 + Day 2)
│   └── KeysModule.tsx     # Day 1 guided module
├── lib/                   # Utilities
│   ├── api.ts             # Client-side API wrapper
│   ├── auth.ts            # NextAuth config
│   ├── content.ts         # Lesson curriculum content
│   ├── prisma.ts          # Prisma client singleton
│   └── seed-demo.ts       # Demo data for new users
└── styles/
    └── globals.css        # App styles
```

## Framework

**Day 1 — Keys to the Kingdom**: Reverence → Release → Repent → Respond → Receive

**Day 2 — Hi 5**: Health Assessment (5 areas) → SMART Goals → Accountability People → Reflection

## License

Private — The Better Branding Co.
