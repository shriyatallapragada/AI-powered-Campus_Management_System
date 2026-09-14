# 🎓 College Hub — AI-Powered Campus Management System

> One place for everything students need to know about college.

College Hub solves a real problem: useful college information is scattered across WhatsApp groups, Telegram chats, PDFs, seniors, and personal connections. Students miss internships, struggle to prepare for vivas, and lose institutional knowledge every time a batch graduates.

**College Hub centralises it all** — academics, placements, community Q&A, campus events, and more — and makes it searchable, contributable, and permanent.

---

## ✨ What it does

| Section | What students get |
|---|---|
| **Academics** | Subject resources, notes, previous papers, viva question bank, exam insights, professor patterns |
| **Placements** | Centralised opportunities dashboard, placement experience stories, round-by-round breakdowns |
| **Opportunities** | Internships shared by the community and placement cell, clearly labelled by source |
| **Community** | Anonymous Q&A — ask seniors anything without needing to know them personally |
| **Campus** | Events, workshops, hackathons, notices, academic calendar |
| **Search** | One search bar across subjects, viva questions, companies, discussions, professors |
| **Profiles** | Contribution points, badges, activity history — recognition for sharing knowledge |
| **Admin** | Moderation panel, approvals queue, user and content management |

### Core design principles

- **Contribution takes under a minute** — after a viva, submit 2–3 questions in 60 seconds. After an interview, share what rounds happened. Upload a PDF. That's it.
- **No toxic ratings** — professor insights focus on exam patterns and preparation tips, not personal opinions.
- **Source transparency** — every piece of content is labelled: Official / Verified Student / Community Submitted.
- **Knowledge accumulates** — information doesn't disappear when seniors graduate.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Prisma ORM v5 |
| Auth | NextAuth.js — credentials + JWT sessions |
| UI Components | Radix UI primitives + custom component library |
| Runtime | Node.js 18+ |

---

## 🗂 Project Structure

```
college-hub/
├── prisma/
│   ├── schema.prisma        # 25+ model DB schema
│   └── seed.ts              # Demo data seeder
│
└── src/
    ├── app/
    │   ├── (auth)/          # Login & Register — no sidebar
    │   │   ├── login/
    │   │   └── register/
    │   ├── (main)/          # All authenticated app pages
    │   │   ├── academics/   # Departments → Subjects → Resources, Viva, Papers
    │   │   ├── placements/  # Opportunities + Experience stories
    │   │   ├── opportunities/
    │   │   ├── campus/      # Events, Notices, Calendar
    │   │   ├── community/   # Q&A discussions
    │   │   ├── search/
    │   │   ├── notifications/
    │   │   ├── profile/
    │   │   └── admin/       # Moderation dashboard
    │   └── api/             # REST API routes
    │
    ├── components/
    │   ├── layout/          # Sidebar, TopBar, MobileNav
    │   ├── providers/       # SessionWrapper
    │   └── ui/              # Button, Card, Badge, Input, Avatar
    │
    └── lib/
        ├── auth.ts          # NextAuth configuration + type extensions
        ├── prisma.ts        # Prisma client singleton
        └── utils.ts         # Formatters, contribution point constants
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **PostgreSQL** — local install or a free hosted instance ([Neon](https://neon.tech) / [Supabase](https://supabase.com))

### 1. Clone the repo

```bash
git clone https://github.com/shriyatallapragada/AI-powered-Campus_Management_System.git
cd AI-powered-Campus_Management_System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/college_hub"

# NextAuth — any random string, minimum 32 characters
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-this-with-a-random-32-char-string"
```

> **Quick PostgreSQL setup on macOS**
> ```bash
> brew install postgresql@16
> brew services start postgresql@16
> createdb college_hub
> ```
>
> **Or use Neon (free, no install needed)**
> 1. Go to [neon.tech](https://neon.tech) → create a project
> 2. Copy the connection string into `DATABASE_URL`

### 4. Create the database tables

```bash
npm run db:push
```

### 5. Load demo data

```bash
npm run db:seed
```

This creates departments, subjects, professors, sample viva questions, resources, discussions, opportunities, events, and 3 demo user accounts.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 👤 Demo Accounts

| Email | Password | Role | What you can do |
|---|---|---|---|
| `admin@college.edu` | `password123` | Admin | Full moderation, approve/reject content, manage users |
| `rahul@college.edu` | `password123` | Contributor | Browse, contribute, see contribution stats |
| `priya@college.edu` | `password123` | Student | Browse everything, ask questions, submit content |

---

## 📋 All Routes

### Student-facing

| Route | Description |
|---|---|
| `/` | Home dashboard — updates, upcoming, quick actions |
| `/academics` | Department browser |
| `/academics/[dept]/year/[year]` | Subjects by year and semester |
| `/academics/[dept]/subjects/[id]` | Subject page — resources, viva bank, exam insights |
| `/academics/[dept]/subjects/[id]/viva` | Full viva question bank for a subject |
| `/academics/[dept]/subjects/[id]/viva/add` | Submit viva questions |
| `/academics/upload` | Upload notes, papers, lab material |
| `/academics/viva/add` | Add viva questions (general) |
| `/academics/professors` | Professor insights listing |
| `/academics/professors/[id]` | Individual professor — patterns, tips, top viva questions |
| `/placements` | Placement opportunities dashboard |
| `/placements/experiences` | Student placement experience stories |
| `/placements/experiences/[id]` | Full experience — rounds, prep, tips |
| `/placements/experiences/add` | Share your placement/internship experience |
| `/opportunities` | Community-sourced opportunities |
| `/opportunities/add` | Share an opportunity |
| `/campus` | Events, notices, announcements |
| `/campus/calendar` | Academic calendar |
| `/community` | Q&A — browse all discussions |
| `/community/ask` | Ask a question (optionally anonymous) |
| `/community/[id]` | Discussion thread with answers |
| `/search` | Global search |
| `/notifications` | Notification centre |
| `/profile` | Your profile, points, badges, contributions |
| `/profile/edit` | Edit profile, skills, interests |
| `/login` | Sign in |
| `/register` | Create account |

### Admin

| Route | Description |
|---|---|
| `/admin` | Overview — pending items, reports, stats |
| `/admin/users` | Manage users — verify, change roles |
| `/admin/subjects` | Manage subjects and departments |
| `/admin/events` | Approve/reject community events |
| `/admin/opportunities` | Approve/reject community-submitted opportunities |

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new account |
| `GET` | `/api/discussions` | List discussions (filter by tag, subject) |
| `POST` | `/api/discussions` | Create a discussion |
| `GET` | `/api/discussions/[id]/answers` | Get all answers for a discussion |
| `POST` | `/api/discussions/[id]/answers` | Post an answer |
| `GET` | `/api/viva` | Get viva questions (filter by subject, professor) |
| `POST` | `/api/viva` | Submit viva questions (batch) |
| `GET` | `/api/resources` | List resources (filter by subject, type) |
| `POST` | `/api/resources` | Submit a resource |
| `GET` | `/api/opportunities` | List open opportunities |
| `POST` | `/api/opportunities` | Submit an opportunity |
| `GET` | `/api/placements/experiences` | List placement experiences |
| `POST` | `/api/placements/experiences` | Share a placement experience |
| `GET` | `/api/search?q=query` | Global full-text search |

All `POST` endpoints require an authenticated session (cookie/JWT).

---

## 🗄 Database Schema

The Prisma schema covers 25+ models across five domains:

```
Auth          → User, Account, Session, VerificationToken
Academic      → Department, Subject, Professor, ProfessorSubject
Content       → Resource, QuestionPaper, VivaQuestion, VivaAnswer
              → ProfessorInsight, Discussion, Answer
Opportunities → Company, Opportunity, PlacementExperience
Campus        → Event, Announcement, AdminInfo
Platform      → Vote, Bookmark, Report, Contribution, Badge, UserBadge, Notification, Profile
```

Key relationships:
- `Subject → Resources, QuestionPapers, VivaQuestions, Discussions`
- `Professor → Subjects (many-to-many), Insights, VivaQuestions`
- `Company → Opportunities, PlacementExperiences`
- `User → Profile (points, year, dept), Contributions, Badges`

---

## ⚙️ Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run db:push      # Push schema to database (no migrations)
npm run db:seed      # Seed database with demo data
npm run db:studio    # Open Prisma Studio — visual database browser
npm run db:reset     # Drop all data and re-seed from scratch
```

---

## 🔮 What's next (not built yet)

Per the original brief, these are planned for after the MVP proves useful:

- AI assistant — answers questions using platform content (RAG over viva questions, papers, discussions)
- Full-text search via PostgreSQL `tsvector` / pgvector
- Email OTP verification for college email domains
- File uploads via Cloudinary (currently supports external links)
- Alumni network and direct mentorship
- Anonymous polls, study groups, project team matching
- Cross-college expansion

---

## 📄 License

MIT
