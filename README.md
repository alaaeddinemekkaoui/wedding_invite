# 💍 Ghita × Walid — Luxury Wedding Invitation

A **full-stack luxury wedding invitation web app** built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and PostgreSQL. Production-ready and deployable directly to Vercel.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169e1?logo=postgresql)

---

## ✨ Features

- **Public invitation page** — elegant, animated, mobile-first
- **RSVP confirmation form** — connected to PostgreSQL
- **Protected admin dashboard** — login, RSVP table, stats, CSV export
- **Dark mode / Light mode** — toggle with system preference detection
- **Framer Motion animations** — smooth, premium micro-interactions
- **Moroccan-inspired design** — subtle geometric ornaments, gold accents
- **Fully responsive** — mobile, tablet, desktop
- **Accessible** — semantic HTML, ARIA labels, focus states
- **Vercel-ready** — serverless API routes, Neon Postgres integration

---

## 🏗️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Animations | [Framer Motion 11](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Database | [Neon Postgres](https://neon.tech/) (`@neondatabase/serverless`) |
| Auth | Cookie-based session with HMAC signing |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Folder Structure

```
├── app/
│   ├── page.tsx                 # Public invitation page
│   ├── layout.tsx               # Root layout with metadata
│   ├── globals.css              # Theme variables & global styles
│   ├── admin/
│   │   └── page.tsx             # Protected admin dashboard
│   └── api/
│       ├── rsvp/route.ts        # POST: save RSVP / GET: list RSVPs (admin)
│       ├── stats/route.ts       # GET: admin statistics
│       └── admin/
│           ├── login/route.ts   # POST: admin login
│           └── logout/route.ts  # POST: admin logout
├── components/
│   ├── Navbar.tsx               # Sticky translucent navbar
│   ├── ThemeProvider.tsx        # Dark/light theme context
│   ├── ThemeToggle.tsx          # Theme switch button
│   ├── HeroSection.tsx          # Hero with animated names
│   ├── CoupleSection.tsx        # Couple introduction cards
│   ├── DetailsSection.tsx       # Wedding detail cards
│   ├── CountdownSection.tsx     # Live countdown timer
│   ├── ProgramSection.tsx       # Event timeline
│   ├── LocationSection.tsx      # Venue card + map placeholder
│   ├── RSVPSection.tsx          # RSVP confirmation form
│   ├── FooterSection.tsx        # Footer with closing message
│   ├── DecorativeDivider.tsx    # Section divider ornament
│   ├── AdminLogin.tsx           # Admin login form
│   └── AdminDashboard.tsx       # Admin dashboard with table
├── data/
│   └── wedding-config.ts        # All editable wedding content
├── lib/
│   ├── db.ts                    # Neon Postgres database helpers
│   ├── auth.ts                  # Admin session auth (cookie + HMAC)
│   ├── validators.ts            # RSVP input validation
│   └── utils.ts                 # Utility functions (cn)
├── schema/
│   └── init.sql                 # PostgreSQL table schema
├── .env.example                 # Environment variable template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (recommended: 20+)
- **npm** or **yarn**
- A **Neon Postgres** database (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/alaaeddinemekkaoui/wedding_invite.git
cd wedding_invite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://user:password@your-neon-host/database?sslmode=require
ADMIN_PASSWORD=your-secure-admin-password
SESSION_SECRET=change-this-to-a-random-string-at-least-32-chars
```

### 4. Set up the database

Run the SQL schema on your Neon database:

```sql
-- Copy and paste schema/init.sql into the Neon SQL Editor
CREATE TABLE IF NOT EXISTS rsvp (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200)  NOT NULL,
  phone       VARCHAR(30)   NOT NULL,
  guest_count INTEGER       NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_name ON rsvp (name);
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the invitation page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

### 6. Build for production

```bash
npm run build
npm start
```

---

## 🔑 Admin Dashboard

Navigate to `/admin` and enter the password set in `ADMIN_PASSWORD`.

### Features

- **Total confirmations** — count of all RSVPs
- **Total guests** — sum of all accompanying persons
- **Searchable table** — filter by name or phone
- **CSV export** — download all RSVPs as a CSV file
- **Delete entries** — remove individual RSVPs
- **Logout** — secure session termination

---

## 🎨 Customizing Wedding Content

All wedding-specific content is in a **single configuration file**:

```
data/wedding-config.ts
```

Edit this file to change:

- **Couple names** — `couple.name1`, `couple.name2`
- **Wedding date** — `wedding.date`, `wedding.dateISO`
- **Venue** — `wedding.venue`, `wedding.city`, `wedding.fullVenue`
- **Hero text** — `hero.subtitle`
- **Couple bios** — `coupleSection.ghita`, `coupleSection.walid`
- **Event schedule** — `program.items` array
- **Venue description** — `location.description`
- **Google Maps link** — `location.mapLink`
- **RSVP message** — `rsvp.message`
- **All French labels** — navbar, sections, buttons, footer

This makes it easy to reuse the project for another wedding.

---

## 🌗 Theme System

- **Light mode** — ivory, champagne, warm beige, muted gold
- **Dark mode** — deep emerald, charcoal, muted gold, warm ivory
- Toggle in the navbar or system preference on first visit
- Preference saved in `localStorage`

---

## ▲ Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Wedding invitation app"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no configuration needed

### 3. Connect Neon Postgres

1. Go to [neon.tech](https://neon.tech) and create a free database
2. Copy the connection string
3. In Vercel → Project Settings → Environment Variables, add:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` |
| `ADMIN_PASSWORD` | Your chosen admin password |
| `SESSION_SECRET` | A random string (min 32 characters) |

4. Run the SQL schema in Neon's SQL Editor (copy from `schema/init.sql`)

### 4. Deploy

Vercel will automatically deploy on every push to `main`.

---

## 📱 Routes

| Route | Type | Description |
| --- | --- | --- |
| `/` | Public | Wedding invitation page |
| `/admin` | Protected | Admin dashboard (login required) |
| `POST /api/rsvp` | API | Save RSVP submission |
| `GET /api/rsvp` | API (admin) | List all RSVPs |
| `GET /api/stats` | API (admin) | RSVP statistics |
| `POST /api/admin/login` | API | Admin authentication |
| `POST /api/admin/logout` | API | End admin session |

---

## 🔒 Security

- Admin password stored in environment variable (never in code)
- Session cookie: `httpOnly`, `secure` (in production), `sameSite: lax`
- Session token signed with HMAC-SHA256
- Timing-safe password comparison
- Server-side input validation and sanitization
- HTML injection prevention (strip `<` and `>` from inputs)

---

## ♿ Accessibility

- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Focus-visible outlines
- Keyboard-accessible navigation
- Good contrast in both themes
- Respects `prefers-reduced-motion`

---

## 📜 Scripts

| Script | Command |
| --- | --- |
| Development | `npm run dev` |
| Build | `npm run build` |
| Start | `npm start` |
| Lint | `npm run lint` |

---

## 📄 License

This project is private and intended for personal use. Feel free to fork and customize for your own wedding.
