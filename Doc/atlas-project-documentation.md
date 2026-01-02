# Atlas Project - Comprehensive Documentation Analysis

## Executive Summary

Atlas (also referred to as StudyFlow) is a Study & Productivity Tracker application designed to help learners track their study time, set goals, and receive AI-powered insights. Built on the MERN stack (MongoDB, Express, React/Next.js, Node.js), it features a modular, service-based architecture with background AI processing and third-party integrations.

---

## 1. Project Overview

| Aspect | Details |
|--------|---------|
| App Name | Atlas / StudyFlow |
| Purpose | Track study hours, manage goals, get AI coaching |
| Target Users | Learners, Mentors (optional), Admins (future) |
| Tech Stack | Next.js 15 (Frontend), Node.js/Express (Backend), MongoDB, Redis, BullMQ |

---

## 2. High-Level Architecture

```
Background Services
├── Cron Jobs
├── Queue Workers
└── Database Layer
    ├── MongoDB
    └── Redis

Utility Micro-Modules
├── Time Tracking Utility
├── Goal Calculator Utility
├── AI Insights Engine
├── Scheduler/Reminder Utility
├── Data Export Utility
├── Integrations Utility
├── Analytics Utility
├── Auth Utility
└── Routine/Scheduler Utility

Backend (Node.js API)
├── Auth
├── TimeTracking
├── Goals Service
├── Tasks
├── AI Engine
└── Export

Frontend (Next.js)
├── Dashboard
├── Timer
├── Planner
├── Goals
├── AI Insights
└── History
```

### Architectural Layers (Clean Architecture)

- **Presentation Layer** → Next.js Frontend
- **Application Layer** → Controllers & Services
- **Domain Layer** → Business Logic & Models
- **Infrastructure Layer** → Database, Integrations, AI, Cron

---

## 3. Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 15 (App Router) |
| Backend | Node.js + Express (or NestJS) |
| Database | MongoDB (Mongoose ORM) |
| AI Insights | OpenAI / Claude / Gemini API |
| Authentication | JWT + OAuth (GitHub/Google) |
| Background Jobs | BullMQ + Redis |
| Logging | Winston + LogDNA |
| Deployment | Docker + Kubernetes |
| CI/CD | GitHub Actions |
| Validation | Joi or Zod |
| Rate Limiting | express-rate-limit |

---

## 4. Core Utility Modules

The backend is organized into 9 utility micro-modules:

### ⭐ 1. Time Tracking Utility

- Start/stop timers
- Auto-calculate duration
- Tag entries (JS, React, LeetCode, etc.)
- Sync with GitHub commits & LeetCode activity
- Map entries → goals

### ⭐ 2. AI Insights & Coaching Utility

- Analyze weekly logged hours
- Detect patterns (best study times, consistency gaps)
- Predict completion dates
- Generate weekly AI summaries
- Suggest schedule adjustments

### ⭐ 3. Goal Calculation Utility

**Inputs:** Study logs + Goal definitions

**Outputs:**
- Completion percentage
- Time remaining
- Burn-down charts
- Predicted completion date

### ⭐ 4. Reminder & Notification Utility

- Daily study reminders
- Missed session detection
- Push/email notifications
- Smart escalation alerts

### ⭐ 5. Data Export Utility

- CSV exports
- Excel exports
- Weekly PDF reports
- JSON dumps

### ⭐ 6. Integration Utility

- GitHub commits
- Google Calendar events
- LeetCode solved problems
- LinkedIn activity

### ⭐ 7. Analytics Utility

- Time spent per tag
- Weekly/Monthly trends
- Actual vs. planned comparison
- Streak tracker

### ⭐ 8. Auth Utility

- Login/signup
- OAuth (GitHub/Google)
- Token management
- Role control (user, mentor, admin)

### ⭐ 9. Routine/Scheduler Utility

- Daily/weekly templates
- Recurring study sessions
- Calendar sync
- Priority management

---

## 5. Database Models

### Core Collections

| Model | Purpose | Key Fields |
|-------|---------|------------|
| User | User accounts & preferences | email, passwordHash, timezone, dailyTargetHours, integrations |
| TimeEntry | Study session records | userId, tags, startTime, endTime, duration, goalId, source |
| ActiveTimer | Currently running timer | userId (unique), tag, startTime, lastHeartbeat, isPaused |
| Goal | Study goals | title, targetHours, loggedHours, progress, deadline, milestones[] |
| Routine | Recurring task templates | userId, title, schedule, recurrence |
| Task | Instantiated routine tasks | routineId, date, status |
| AiInsight | AI-generated summaries | periodStart, periodEnd, summary, recommendations[] |
| Notification | User notifications | userId, type, message, read, actionUrl |
| ExportJob | Export job tracking | userId, status, type, fileUrl |

### Key Indexes

- `User.email` (unique)
- `TimeEntry.userId + startTime` (compound)
- `TimeEntry.goalId`
- `ActiveTimer.userId` (unique)
- `Goal.userId`
- `AiInsight.userId + periodStart`

---

## 6. API Structure

**Base URL:** `https://api.studyflow.app/api/v1`

**Auth:** JWT Bearer tokens with refresh token flow

### Route Groups

#### Authentication (/auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/signup | Create new user |
| POST | /auth/login | Authenticate user |
| POST | /auth/refresh | Refresh access token |
| POST | /auth/logout | Invalidate tokens |
| GET | /auth/oauth/:provider | OAuth redirect |
| GET | /auth/oauth/:provider/callback | OAuth callback |

#### Users (/users)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users/me | Get user profile |
| PUT | /users/me | Update profile |
| POST | /users/export | Create export job |
| DELETE | /users/me | GDPR delete |

#### Time Entries (/entries)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /entries/start | Start timer |
| POST | /entries/stop | Stop timer |
| POST | /entries | Quick-add entry |
| GET | /entries | List with filters |
| GET | /entries/:id | Get single entry |
| PUT | /entries/:id | Update entry |
| DELETE | /entries/:id | Delete entry |

#### Active Timer (/timers)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /timers/active | Get current timer |
| PATCH | /timers/:id/pause | Pause timer |
| PATCH | /timers/:id/resume | Resume timer |
| DELETE | /timers/:id | Cancel timer |

#### Goals (/goals)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /goals | Create goal |
| GET | /goals | List goals |
| GET | /goals/:id | Get goal details |
| PUT | /goals/:id | Update goal |
| DELETE | /goals/:id | Delete goal |
| POST | /goals/:id/complete | Mark complete |
| GET | /goals/:id/progress | Get progress data |

#### Insights (/insights)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /insights/weekly | Get weekly AI summary |
| POST | /insights/generate | Trigger regeneration |
| GET | /insights/:id | Get specific insight |

#### Integrations (/integrations)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /integrations/:provider/connect | Start OAuth |
| GET | /integrations/:provider/callback | OAuth callback |
| POST | /integrations/:provider/sync | Manual sync |
| GET | /integrations | List integrations |

---

## 7. Backend Folder Structure

```
/server
├── src/
│   ├── config/           # Environment, secrets, DB connection
│   │   ├── db.js
│   │   └── dotenv.js
│   ├── controllers/      # API logic
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── entries.controller.js
│   │   ├── goals.controller.js
│   │   ├── routines.controller.js
│   │   ├── insights.controller.js
│   │   └── integrations.controller.js
│   ├── services/         # Business logic
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── entry.service.js
│   │   ├── goal.service.js
│   │   ├── routine.service.js
│   │   ├── insight.service.js
│   │   └── integration.service.js
│   ├── models/           # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── timeEntry.model.js
│   │   ├── activeTimer.model.js
│   │   ├── goal.model.js
│   │   ├── routine.model.js
│   │   ├── task.model.js
│   │   ├── aiInsight.model.js
│   │   └── notification.model.js
│   ├── routes/           # Express routes
│   ├── middlewares/      # Auth, validation, errors
│   ├── utils/            # Helpers, logging, date utils
│   ├── jobs/             # Background job processors
│   └── app.js            # Main Express app
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
└── Dockerfile
```

---

## 8. Frontend UI Structure

### Navigation Routes

| Route | Purpose |
|-------|---------|
| /dashboard | Primary home with timer, schedule, stats |
| /timer | Dedicated time tracking |
| /planner | Routines & calendar view |
| /goals | Goal management |
| /insights | AI-powered analysis |
| /history | Searchable log of entries |
| /integrations | Third-party connections |
| /settings | User preferences |
| /auth/* | Login, signup, onboarding |

### Key UI Components

- **ActiveTimerCard** — Timer widget with start/stop
- **ScheduleList** — Today's time blocks
- **GoalProgressCard** — Progress bar with ETA
- **AiSuggestionPreview** — AI recommendation snippet
- **TimerWidget** — Full timer with lap/pause
- **TagSelector** — Tag picker with create new
- **Calendar** — Fullcalendar or custom
- **RoutineCard** — Reusable template cards
- **EntriesTable** — Paginated history table

### Responsive Design

| Device | Layout |
|--------|--------|
| Desktop | 3-column grid |
| Tablet | 2-column with collapsible panels |
| Mobile | Single column with bottom nav |

---

## 9. Data Flows

### Timer Flow

```
User → Timer UI → API (/entries/start) → Time Tracking Utility → MongoDB
     → Stop → Calculate Duration → Create TimeEntry → Update Goal Progress
```

### Goal Progress Flow

```
MongoDB Logs → Goal Utility → Progress % → Dashboard UI
```

### AI Insight Flow

```
Logs + Goals + Patterns → AI Engine → Generated Summary → Notification → User
```

### Reminder Flow

```
Routine Tasks → Scheduler Utility → Cron Engine → Email/Push → User
```

---

## 10. Background Jobs

Powered by **BullMQ + Redis**:

| Job Name | Purpose |
|----------|---------|
| daily-aggregation | Aggregate daily totals |
| ai-insight-generation | Call LLM and save result |
| integration-sync | GitHub/LeetCode sync |
| reminder-dispatch | Send push/email notifications |
| cleanup-stale-timers | Clear abandoned timers |

---

## 11. Security & Operations

### Security Measures

- JWT with refresh token rotation
- Bcrypt password hashing
- Role-based access control
- Rate limiting (100 req/min default, 10 req/min for sensitive)
- Cloudflare Firewall
- Encrypted sensitive fields in MongoDB
- HTTPS only in production

### Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| General | 100 req/min |
| Auth endpoints | 5 req/min |
| AI generation | 1 per 10 minutes |

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| E_AUTH | 401 | Auth failed |
| E_VALIDATION | 400 | Request validation error |
| E_NOT_FOUND | 404 | Resource not found |
| E_CONFLICT | 409 | Conflict (e.g., timer exists) |
| E_RATE_LIMIT | 429 | Rate limit exceeded |
| E_INTERNAL | 500 | Server error |

---

## 12. Environment Configuration

### Backend (server/.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
REFRESH_SECRET=your_secret_key
SMTP_EMAIL=your_email@gmail.com
SMTP_PASS=your_app_password
GITHUB_TOKEN=xxxx
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
AI_MODEL=gpt-4.1
```

### Frontend (client/.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=xxxx
```

### Required Tools

- Node.js 20+
- MongoDB Atlas or Local Mongo
- VS Code
- Git
- Postman / Thunder Client
- Docker (optional)

---

## 13. Development Workflow

### Starting the Application

```bash
# Backend
cd server
npm install
npm run dev    # Runs on http://localhost:5000

# Frontend
cd client
npm install
npm run dev    # Runs on http://localhost:5173
```

### Testing Strategy

| Test Type | Tool | Target |
|-----------|------|--------|
| Unit | Jest + Sinon | Services with DB mocks |
| Integration | mongodb-memory-server | Controllers |
| E2E | Playwright/Cypress | UI flows |

---

## 14. Future Scalability

The architecture supports easy migration to microservices:

- **Analytics Service** — Dashboard data processing
- **AI Insighter Service** — LLM-based analysis
- **Scheduler Service** — Cron and reminders
- **Integration Service** — Third-party APIs

### Horizontal Scaling

- API scales horizontally
- Redis-backed queues
- MongoDB sharding (future)
- CDN for static assets

---

## Summary

Atlas/StudyFlow is a well-architected productivity tracking application with:

✅ Modular backend with clear separation of concerns  
✅ AI-powered insights for personalized coaching  
✅ Third-party integrations (GitHub, Google Calendar, LeetCode)  
✅ Real-time timer with server-side persistence  
✅ Goal tracking with progress visualization  
✅ Background job processing for async tasks  
✅ Comprehensive API with proper validation and error handling  
✅ Responsive UI for all device sizes  
✅ Security-first design with JWT, rate limiting, and encryption
