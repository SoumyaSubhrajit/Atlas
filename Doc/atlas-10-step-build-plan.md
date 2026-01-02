# Atlas Project - 10-Step Build Plan

## Overview

This document outlines a **methodical, step-by-step build plan** for the Atlas Study & Productivity Tracker. Each step must be **fully completed and verified** before moving to the next.

---

## Architecture Understanding for Beginners

### What is Next.js?

```
┌─────────────────────────────────────────────────────┐
│                 YOUR BROWSER                        │
│   (What users see - the "Frontend")                 │
└─────────────────────────────────────────────────────┘
                        │
                        │ HTTP Requests (fetch data)
                        ▼
┌─────────────────────────────────────────────────────┐
│              NEXT.JS 15 (App Router)                │
│                                                     │
│   /app                                              │
│   ├── page.jsx          ← Landing page (/)          │
│   ├── layout.jsx        ← Wraps all pages           │
│   ├── dashboard/                                    │
│   │   └── page.jsx      ← Dashboard (/dashboard)    │
│   ├── timer/                                        │
│   │   └── page.jsx      ← Timer page (/timer)       │
│   └── goals/                                        │
│       └── page.jsx      ← Goals page (/goals)       │
│                                                     │
│   Key Concept: Each folder = URL route              │
│   page.jsx = What renders at that URL               │
│   layout.jsx = Shared wrapper (sidebar, nav)        │
└─────────────────────────────────────────────────────┘
```

### How Frontend Talks to Backend

```
┌─────────────────────┐     HTTP Request      ┌─────────────────────┐
│   Next.js Frontend  │ ───────────────────▶  │  Express Backend    │
│   (localhost:3000)  │                       │  (localhost:5000)   │
│                     │ ◀───────────────────  │                     │
│                     │     JSON Response     │                     │
└─────────────────────┘                       └─────────────────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────────┐
                                              │     MongoDB         │
                                              │  (stores all data)  │
                                              └─────────────────────┘
```

### Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER (What users see)                             │
│ → Next.js pages, components, forms                              │
└─────────────────────────────────────────────────────────────────┘
                              │ calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ APPLICATION LAYER (API endpoints)                               │
│ → Controllers receive requests, validate, return responses      │
│ → Routes: /api/v1/auth/login, /api/v1/entries/start, etc.       │
└─────────────────────────────────────────────────────────────────┘
                              │ calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ DOMAIN/SERVICE LAYER (Business logic)                           │
│ → Services: auth.service.js, entry.service.js, goal.service.js  │
│ → Contains all the "rules" of your app                          │
└─────────────────────────────────────────────────────────────────┘
                              │ calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ INFRASTRUCTURE LAYER (Data storage & external APIs)             │
│ → Models: user.model.js, timeEntry.model.js                     │
│ → MongoDB, Redis, OpenAI API, GitHub API                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## The 10 Steps Summary

| Step | Name | Focus |
|------|------|-------|
| 1 | Project Initialization | Next.js + Express setup, Git, .env |
| 2 | Database Models | MongoDB connection, all schemas |
| 3 | Authentication | JWT, signup/login, protected routes |
| 4 | UI Design System | Tokens, components, layouts |
| 5 | Time Tracking | Timer start/stop, entries, tags |
| 6 | Goals System | CRUD, progress calculation |
| 7 | Dashboard & Analytics | Stats, charts, streak |
| 8 | Routines & Scheduler | Templates, calendar, tasks |
| 9 | AI Insights | Weekly summaries, recommendations |
| 10 | Integrations & Polish | GitHub, exports, error handling |

---

## Step 1: Project Initialization & Foundation

### Goal
Set up both frontend and backend with proper folder structure, Git, and basic configuration.

### What We'll Create

```
Atlas/
├── client/                    # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Reusable UI
│   │   └── styles/           # CSS & tokens
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── config/           # DB, env config
│   │   ├── controllers/      # API handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # Route definitions
│   │   ├── services/         # Business logic
│   │   ├── middlewares/      # Auth, validation
│   │   ├── utils/            # Helpers
│   │   └── app.js            # Express setup
│   ├── package.json
│   └── server.js             # Entry point
│
├── Doc/                       # Documentation (already exists)
├── .gitignore
└── README.md
```

### Verification Checklist
- [ ] `npm run dev` works in client folder
- [ ] `npm run dev` works in server folder
- [ ] Both .env files created
- [ ] Initial commit pushed to GitHub

---

## Step 2: Database Models & MongoDB Setup

### Goal
Connect to MongoDB and create all data models following our schema design.

### Models to Create

| Model | Purpose |
|-------|---------|
| `User` | User accounts, preferences, integrations |
| `TimeEntry` | Completed study sessions |
| `ActiveTimer` | Currently running timer (1 per user max) |
| `Goal` | Study goals with targets and progress |
| `Routine` | Recurring task templates |
| `Task` | Instantiated routine tasks |
| `AiInsight` | AI-generated weekly summaries |
| `Notification` | User notifications |

### Verification Checklist
- [ ] MongoDB connection successful
- [ ] All models defined with proper indexes
- [ ] Test document creates/reads work

---

## Step 3: Authentication System

### Goal
Implement JWT-based auth with signup, login, and protected routes.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Create new user |
| POST | `/api/v1/auth/login` | Login, get tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Invalidate tokens |

### Verification Checklist
- [ ] Signup creates user in DB
- [ ] Login returns valid JWT
- [ ] Protected route rejects invalid token
- [ ] Refresh token flow works

---

## Step 4: Design System & UI Foundation

### Goal
Build the visual foundation with design tokens, core components, and layouts.

### Design Tokens

```css
:root {
  --primary: #6366F1;
  --primary-hover: #4F46E5;
  --bg: #FAFAFA;
  --surface: #FFFFFF;
  --glass-bg: rgba(255,255,255,0.55);
  --glass-border: rgba(255,255,255,0.28);
  --glass-blur: 14px;
}
```

### Components to Build

| Component | Purpose |
|-----------|---------|
| `Button` | Primary, secondary, ghost, icon variants |
| `Input` | Form inputs with validation states |
| `GlassCard` | Glassmorphism container |
| `Sidebar` | Notion-style left navigation |
| `DashboardLayout` | 2-column layout wrapper |

### Verification Checklist
- [ ] Landing page renders with gradient
- [ ] Dashboard layout works
- [ ] Responsive at 320px, 768px, 1280px

---

## Step 5: Time Tracking Core

### Goal
Build the timer system - start, stop, pause, resume with auto-duration calculation.

### Timer Flow

```
Start: Click → POST /entries/start → Create ActiveTimer
Stop:  Click → POST /entries/stop → Create TimeEntry, Delete ActiveTimer
```

### Verification Checklist
- [ ] Start creates ActiveTimer in DB
- [ ] Stop creates TimeEntry with correct duration
- [ ] Timer persists across page refresh
- [ ] Tags saved correctly

---

## Step 6: Goals & Progress System

### Goal
Create and track study goals with progress visualization.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/goals` | Create goal |
| GET | `/api/v1/goals` | List user's goals |
| GET | `/api/v1/goals/:id/progress` | Get detailed progress |

### Verification Checklist
- [ ] Goals create with milestones
- [ ] Progress % updates when timer stops
- [ ] Progress bar renders correctly

---

## Step 7: Dashboard & Analytics

### Goal
Build the main dashboard with stats, charts, and quick actions.

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR  │           MAIN CONTENT                      │
│           │  Today's Stats    │    Active Timer         │
│  • Home   │  Weekly Chart                               │
│  • Timer  │  Goal Progress Cards                        │
│  • Goals  │                                             │
└─────────────────────────────────────────────────────────┘
```

### Verification Checklist
- [ ] Dashboard shows today's hours
- [ ] Weekly chart renders
- [ ] Goal cards show progress

---

## Step 8: Routines & Scheduler

### Goal
Create recurring study templates and calendar-based planning.

### Verification Checklist
- [ ] Routine creates with recurrence
- [ ] Tasks generate correctly
- [ ] Calendar view renders

---

## Step 9: AI Insights Integration

### Goal
Generate weekly AI-powered summaries and recommendations.

### Verification Checklist
- [ ] Weekly summary generates
- [ ] Recommendations are specific
- [ ] Insights page renders

---

## Step 10: Integrations & Polish

### Goal
Add external integrations, notifications, exports, and final polish.

### Verification Checklist
- [ ] All error cases handled gracefully
- [ ] Export downloads correctly
- [ ] App works end-to-end

---

## Development Rules

> [!IMPORTANT]
> **DO NOT MOVE TO THE NEXT STEP** until current step is fully verified and committed to GitHub.

> [!TIP]
> Between sessions, create a context snapshot summarizing what was completed and the exact next action.

---

*Document created: January 2, 2026*
