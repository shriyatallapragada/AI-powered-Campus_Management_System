# College Hub

A centralized knowledge and information platform for college students — academics, placements, community Q&A, campus events, and more.

---

## Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Framework  | Next.js 16 (App Router, TypeScript)   |
| Styling    | Tailwind CSS v4                       |
| Database   | PostgreSQL via Prisma ORM             |
| Auth       | NextAuth.js (credentials + JWT)       |
| UI         | Radix UI + custom components          |

---

## Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a hosted DB like Supabase / Neon)

---

## Setup & Run

### 1. Install dependencies

```bash
cd college-hub
npm install
```

### 2. Configure environment variables

Copy the example env and fill in your values:

```bash
cp .env.local .env.local
```

Edit `.env.local`:

```env
# Your PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/college_hub"

# NextAuth — any random string, min 32 chars
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-minimum-32-characters-long"
```

> **PostgreSQL quick setup (macOS)**
> ```bash
> brew install postgresql@16
> brew services start postgresql@16
> createdb college_hub
> ```

### 3. Push the database schema

```bash
npm run db:push
```

This creates all tables in your database based on `prisma/schema.prisma`.

### 4. Seed with demo data

```bash
npm run db:seed
```

This creates:
- Departments: CSE, ECE, ME, CE
- Subjects: DBMS, OS, CN, ML, SE
- Professors: Prof. Sharma, Prof. Nair
- Demo accounts (see below)
- Sample viva questions, resources, discussions, opportunities, events

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Accounts

| Email                  | Password     | Role        |
|------------------------|--------------|-------------|
| admin@college.edu      | password123  | Admin       |
| rahul@college.edu      | password123  | Contributor |
| priya@college.edu      | password123  | Student     |

---

## All Available Routes

| Route                                        | Description                         |
|----------------------------------------------|-------------------------------------|
| `/`                                          | Home dashboard                      |
| `/academics`                                 | Department browser                  |
| `/academics/[dept]/year/[year]`              | Subjects by year                    |
| `/academics/[dept]/subjects/[id]`            | Subject page (resources, viva, etc.)|
| `/academics/[dept]/subjects/[id]/viva`       | Viva question bank                  |
| `/academics/upload`                          | Upload a resource                   |
| `/academics/viva/add`                        | Add viva questions                  |
| `/academics/professors`                      | Professor insights listing          |
| `/academics/professors/[id]`                 | Individual professor page           |
| `/placements`                                | Placement opportunities             |
| `/placements/experiences`                    | Placement experience stories        |
| `/placements/experiences/[id]`               | Single experience detail            |
| `/placements/experiences/add`                | Share your experience               |
| `/opportunities`                             | Community opportunities             |
| `/opportunities/add`                         | Share an opportunity                |
| `/campus`                                    | Events & announcements              |
| `/campus/calendar`                           | Academic calendar                   |
| `/community`                                 | Q&A discussions                     |
| `/community/ask`                             | Ask a question                      |
| `/community/[id]`                            | Discussion thread + answers         |
| `/search`                                    | Global search                       |
| `/notifications`                             | Notification centre                 |
| `/profile`                                   | Your profile & contributions        |
| `/profile/edit`                              | Edit profile                        |
| `/admin`                                     | Admin dashboard                     |
| `/admin/users`                               | Manage users                        |
| `/admin/subjects`                            | Manage subjects                     |
| `/admin/events`                              | Manage events                       |
| `/admin/opportunities`                       | Manage opportunities                |
| `/login`                                     | Sign in                             |
| `/register`                                  | Create account                      |

---

## API Routes

| Method | Route                              | Description                  |
|--------|------------------------------------|------------------------------|
| POST   | `/api/auth/register`               | Create account               |
| GET    | `/api/discussions`                 | List discussions              |
| POST   | `/api/discussions`                 | Create discussion             |
| GET    | `/api/discussions/[id]/answers`    | Get answers                  |
| POST   | `/api/discussions/[id]/answers`    | Post an answer               |
| GET    | `/api/viva`                        | Get viva questions           |
| POST   | `/api/viva`                        | Add viva questions           |
| GET    | `/api/resources`                   | List resources               |
| POST   | `/api/resources`                   | Submit a resource            |
| GET    | `/api/opportunities`               | List opportunities           |
| POST   | `/api/opportunities`               | Submit an opportunity        |
| GET    | `/api/placements/experiences`      | List placement experiences   |
| POST   | `/api/placements/experiences`      | Share placement experience   |
| GET    | `/api/search`                      | Full-text search             |

---

## Useful Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:push      # Apply schema to DB
npm run db:seed      # Seed with demo data
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:reset     # Drop all data and re-seed
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Register (no sidebar layout)
│   ├── (main)/          # All app pages (with sidebar layout)
│   │   ├── academics/
│   │   ├── placements/
│   │   ├── opportunities/
│   │   ├── campus/
│   │   ├── community/
│   │   ├── admin/
│   │   ├── profile/
│   │   ├── notifications/
│   │   └── search/
│   └── api/             # API routes
├── components/
│   ├── layout/          # Sidebar, TopBar, MobileNav
│   ├── providers/       # SessionWrapper
│   └── ui/              # Button, Card, Badge, Input, Avatar
├── lib/
│   ├── auth.ts          # NextAuth config
│   ├── prisma.ts        # Prisma client singleton
│   └── utils.ts         # Helpers, contribution points
prisma/
├── schema.prisma        # Full DB schema
└── seed.ts              # Demo data seeder
```
