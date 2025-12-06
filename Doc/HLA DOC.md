🏗️ **HIGH-LEVEL ARCHITECTURE (HLA) DOCUMENT**

**_Study & Productivity Tracker for MERN Transition_**

---

**1️****⃣ System Overview**

This application is a **modular, service-based MERN architecture** with Next.js on the frontend, Node/Express (or NestJS) backend, MongoDB for data, and background AI + scheduling services.

Below is the functional layout:

 ┌─────────────────────────────────────────────────────────────┐

 │                        FRONTEND (Next.js)                   │

 │ Dashboard | Timer | Planner | Goals | AI Insights | History │

 └─────────────────────────────────────────────────────────────┘

                 │     REST/GraphQL API Calls

                 ▼

 ┌─────────────────────────────────────────────────────────────┐

 │                     BACKEND (Node.js API)                   │

 │ Auth • TimeTracking • Goals • Tasks • AI Insights • Export  │

 └─────────────────────────────────────────────────────────────┘

                 │

                 ▼

 ┌─────────────────────────────────────────────────────────────┐

 │                     Utility Micro-Modules                   │

 │  1. Time Tracking Utility                                   │

 │  2. Goal Calculator Utility                                 │

 │  3. Insights/A.I. Engine                                    │

 │  4. Scheduler/Reminder Utility                              │

 │  5. Data Export Utility                                     │

 │  6. Integrations Utility (GitHub, Calendar, LeetCode)       │

 │  7. Analytics Utility                                       │

 │  8. Auth Utility                                            │

 │  9. Routine/Scheduler Utility                               │

 └─────────────────────────────────────────────────────────────┘

                 │

                 ▼

 ┌─────────────────────────────────────────────────────────────┐

 │                           MongoDB                           │

 │ Users • Entries • Goals • Tasks • Insights • Integrations   │

 └─────────────────────────────────────────────────────────────┘

      ┌──────────────────────────────────────────────┐

      │ Background Services (Cron / Queue Workers)   │

      │ - Weekly AI summaries                        │

      │ - Reminder triggers                           │

      │ - Sync GitHub/LeetCode                        │

      └──────────────────────────────────────────────┘

---

**2️****⃣ Module Breakdown (Every Utility Explained)**

Each module acts like a microservice inside your backend codebase.

---

**✨ 1. Time Tracking Utility**

Handles all time logs.

- Start/stop timers
- Auto stop on browser close
- Manual entry
- Tagging system
- Sync to MongoDB
- Pull GitHub commits + LeetCode solutions
- Map each entry → goal

---

**✨ 2. Goal Calculation Utility**

Maps time → goals.

Inputs:

- All logs
- Goal definitions

Outputs:

- % completion
- Time remaining
- Burn down chart
- Predicted completion date

---

**✨ 3. AI Insights Engine**

Runs weekly, daily, or on demand.

Tasks:

- Pattern detection (consistency, best hours)
- Recommendations (increase JS by 2 hrs/week)
- AI-generated summaries
- Personalized study suggestions

---

**✨ 4. Reminder & Notification Utility**

Cron + worker pattern.

Features:

- Daily study reminders
- Missed-session detection
- Escalating alerts
- Email/push notifications

---

**✨ 5. Export Utility**

Generates:

- CSV
- Excel
- Weekly PDF report
- JSON dumps

---

**✨ 6. Integration Utility**

Handles API connections:

- GitHub commits
- Google Calendar events
- LeetCode solved problems
- LinkedIn activity

---

**✨ 7. Analytics Utility**

Feeds dashboard charts:

- Time spent per tag
- Weekly/Monthly trends
- Compare actual vs planned
- Streak tracker

---

**✨ 8. Auth Utility**

Includes:

- Login/signup
- OAuth (GitHub/Google)
- Token management
- Role control (user, mentor, admin)

---

**✨ 9. Routine/Scheduler Utility**

Creates & manages your planned routine.

- Daily/weekly templates
- Recurring study sessions
- Calendar sync
- Priorities

---

**3️****⃣ Architectural Layers (Clean Architecture)**

Presentation Layer (Next.js)

    |

Application Layer (Controllers & Services)

    |

Domain Layer (Business Logic & Models)

    |

Infrastructure Layer (Database, Integrations, AI, Cron)

This ensures:

- Clean code
- Testability
- Scalability
- Future microservices migration

---

**4️****⃣ Data Flow Architecture**

---

**🟦 4.1 Time Entry Flow**

User → Timer UI → API (/time/start) → Time Tracking Utility → MongoDB

---

**🟦 4.2 Goal Progress Flow**

MongoDB Logs → Goal Utility → Progress % → Dashboard UI

---

**🟦 4.3 Weekly AI Insight Flow**

Logs + Goals + Patterns → AI Engine → Generated Summary → Notification Utility → User

---

**🟦 4.4 Reminder Flow**

Routine Tasks → Scheduler Utility → Cron Engine → Email/Push → User

---

**5️****⃣ Technology Choices (Finalized)**

|**Component**|**Tech**|
|---|---|
|Frontend|Next.js 15 (App Router)|
|Backend|Node.js + Express or NestJS|
|DB|MongoDB (Mongoose ORM)|
|AI Insights|OpenAI / Claude / Gemini API|
|Auth|JWT + OAuth|
|Background Jobs|BullMQ + Redis|
|Deployment|Docker + Kubernetes|
|CI/CD|GitHub Actions|
|Logging|Winston + LogDNA|

---

**6️****⃣ Microservice Possibility (Future)**

SAFE to split later into:

1. Analytics Service
2. AI Insighter Service
3. Scheduler Service
4. Integration Service

This will help scale if users increase.

---

**7️****⃣ Security Architecture**

- JWT with refresh token rotation
- Bcrypt password hashing
- Role-based access
- Rate limiting
- Cloudflare Firewall
- Encrypted sensitive fields in MongoDB

---

**8️****⃣ Scalability Design**

- Horizontal scaling of Node API
- Redis-backed queues
- MongoDB sharding (later)
- CDN for static assets

---

**9️****⃣ High-Level Component Diagram**

┌────────────────────────────────────────┐

│                Next.js UI              │

└────────────────────────────────────────┘

                │

                ▼

┌────────────────────────────────────────┐

│            Node.js API Gateway         │

└────────────────────────────────────────┘

   │        │         │         │

   ▼        ▼         ▼         ▼

TimeUtil   GoalUtil  AIUtil  ReminderUtil

   │        │         │         │

   └───────────────MongoDB───────────────┘