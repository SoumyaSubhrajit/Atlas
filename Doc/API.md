# Summary of design choices (brief)

- Backend: **Node.js + Express** (you can swap to **NestJS** if preferred)
    
- DB: **MongoDB** with **Mongoose**
    
- Auth: **JWT** (access + refresh tokens) + OAuth connectors (GitHub / Google)
    
- Background jobs: **BullMQ** + Redis (for reminders, syncs, AI tasks)
    
- Validation: **Joi** or **zod** for request validation
    
- Logging: **Winston** (structured JSON logs)
    
- Rate limiting: **express-rate-limit** (e.g., 100 req/min)
    
- API versioning: `/api/v1/...`
    
- Timezone: ensure server uses UTC and store user timezone in DB (Asia/Kolkata default)
    

---

# Folder structure (recommended)

`/server ├─ src │  ├─ controllers │  │   ├─ auth.controller.js │  │   ├─ users.controller.js │  │   ├─ entries.controller.js │  │   ├─ goals.controller.js │  │   ├─ routines.controller.js │  │   ├─ insights.controller.js │  │   └─ integrations.controller.js │  ├─ services │  │   ├─ auth.service.js │  │   ├─ user.service.js │  │   ├─ entry.service.js │  │   ├─ goal.service.js │  │   ├─ routine.service.js │  │   ├─ insight.service.js │  │   └─ integration.service.js │  ├─ models │  │   ├─ user.model.js │  │   ├─ timeEntry.model.js │  │   ├─ activeTimer.model.js │  │   ├─ goal.model.js │  │   ├─ routine.model.js │  │   ├─ task.model.js │  │   ├─ aiInsight.model.js │  │   └─ notification.model.js │  ├─ routes │  │   ├─ auth.routes.js │  │   ├─ users.routes.js │  │   ├─ entries.routes.js │  │   ├─ goals.routes.js │  │   ├─ routines.routes.js │  │   ├─ insights.routes.js │  │   └─ integrations.routes.js │  ├─ middlewares │  │   ├─ auth.middleware.js │  │   ├─ error.middleware.js │  │   ├─ validate.middleware.js │  │   └─ rateLimit.middleware.js │  ├─ utils │  │   ├─ logger.js │  │   ├─ paginator.js │  │   └─ dateUtils.js │  ├─ jobs │  │   ├─ scheduler.js │  │   └─ aiJobProcessor.js │  ├─ config │  │   └─ index.js │  └─ index.js ├─ tests │  ├─ unit │  └─ integration ├─ package.json └─ Dockerfile`

---

# API Overview (Versioned)

Base url: `https://api.yourapp.com/api/v1`

Auth flows:

- `POST /api/v1/auth/signup`
    
- `POST /api/v1/auth/login`
    
- `POST /api/v1/auth/refresh`
    
- `POST /api/v1/auth/oauth/github` (callback flow)
    
- `POST /api/v1/auth/logout`
    

Protected endpoints require `Authorization: Bearer <access_token>`.

---

# ROUTES / ENDPOINTS (detailed)

I'll list endpoints by area. For each: path, method, brief description, request payload, response example, validation notes.

---

## 1) Auth Routes — `routes/auth.routes.js`

### POST /api/v1/auth/signup

Create new user.

**Request**

`{   "name": "Soumya Nayak",   "email": "sou@example.com",   "password": "P@ssw0rd!" }`

**Response 201**

`{   "user": { "id": "60...", "name": "Soumya", "email": "sou@example.com" },   "accessToken": "<jwt>",   "refreshToken": "<refresh_jwt>" }`

**Validation**

- name: required string
    
- email: valid email, unique
    
- password: min 8 chars, complexity
    

---

### POST /api/v1/auth/login

Authenticate user.

**Request**

`{   "email": "sou@example.com",   "password": "P@ssw0rd!" }`

**Response**

`{ "accessToken": "<jwt>", "refreshToken": "<refresh_jwt>", "user": {...} }`

---

### POST /api/v1/auth/refresh

Exchange refresh token for new access token.

**Request**

`{ "refreshToken": "<refresh_jwt>" }`

**Response**

`{ "accessToken": "<new_jwt>" }`

---

### POST /api/v1/auth/logout

Invalidate refresh token (server-side or token blacklist).

---

### OAuth (example)

`GET /api/v1/auth/oauth/github` — redirect to GitHub  
`GET /api/v1/auth/oauth/github/callback` — handle callback

---

## 2) Users Routes — `routes/users.routes.js`

### GET /api/v1/users/me

Return user profile.

**Auth required**

**Response**

`{   "id": "60..",   "name": "Soumya",   "email": "sou@example.com",   "timezone": "Asia/Kolkata",   "dailyTargetHours": 3 }`

---

### PUT /api/v1/users/me

Update profile / preferences.

**Request**

`{ "dailyTargetHours": 4, "timezone": "Asia/Kolkata" }`

**Response 200**  
Updated user object.

---

### POST /api/v1/users/export

Trigger export job for user's data (CSV/Excel). Respond with export job id

---

## 3) Time Entries & Timer — `routes/entries.routes.js`

### POST /api/v1/entries/start

Start a timer (creates active_timer).

**Request**

`{   "tag": "React",   "tags": ["React","Hooks"],   "goalId": "60..",   "note": "Hooks practice" }`

**Response 201**

`{ "activeTimerId": "abc123", "startTime": "2025-12-02T15:00:00Z" }`

**Behavior**

- Creates `active_timers` doc for user. Enforces only one running timer per user (unique index).
    

---

### POST /api/v1/entries/stop

Stop running timer and convert to entry.

**Request**

`{ "activeTimerId": "abc123", "note": "added notes", "manualEnd": "2025-12-02T16:00:00Z" }`

**Response 200**

`{ "entry": { "_id": "xyz", "duration": 60, "startTime":"...", "endTime":"..." } }`

**Server**

- Calculates duration (minutes)
    
- Inserts into `time_entries`
    
- Deletes `active_timers` record
    
- Triggers goal update service & daily aggregates update
    

---

### POST /api/v1/entries (quick add)

Create a manual entry (start/end provided).

**Request**

`{   "startTime": "2025-12-01T05:00:00Z",   "endTime": "2025-12-01T06:30:00Z",   "tags": ["LeetCode"],   "title": "LeetCode - Arrays",   "goalId": "60.." }`

**Response**  
Created entry object.

**Validation**

- startTime < endTime
    
- duration > 0
    

---

### GET /api/v1/entries

List time entries (pagination + filters)

**Query params**

- `startDate`, `endDate` (ISO)
    
- `tag`
    
- `goalId`
    
- `page` (default 1), `limit` (default 20)
    

**Response**

`{   "page":1, "limit":20, "total": 123,   "entries": [ { /* time entry */ }, ... ] }`

**Indexes**

- `userId + startTime` important for range queries
    

---

### GET /api/v1/entries/:id

Get single entry

### PUT /api/v1/entries/:id

Update entry (edit start/end, tags, note). If duration changed, re-run goal progress recalculation.

### DELETE /api/v1/entries/:id

Delete entry; update goal progress & aggregates.

---

## 4) Active Timer routes — `routes/timers.routes.js` (optional separate route)

GET /api/v1/timers/active — get current timer for user  
PATCH /api/v1/timers/:id/pause — pause/resume timer

---

## 5) Goals Routes — `routes/goals.routes.js`

### POST /api/v1/goals

Create goal.

**Request**

`{   "title":"Master React",   "description":"Understand hooks and patterns",   "targetHours": 120,   "startDate": "2025-12-01",   "deadline": "2026-03-01",   "milestones": [{"title":"Basics","targetHours":40}] }`

**Response 201**  
Created goal object.

---

### GET /api/v1/goals

List goals for user (with summary fields)

### GET /api/v1/goals/:id

Detail with linked entries (paginated), progress chart data.

### PUT /api/v1/goals/:id

Update goal

### POST /api/v1/goals/:id/complete

Mark as complete (business logic to check hours or force)

---

## 6) Routines & Task Routes — `routes/routines.routes.js`

### POST /api/v1/routines

Create a routine template (recurring)

### GET /api/v1/routines

List routines

### POST /api/v1/routines/:id/instantiate

Create an instance task on the calendar (date param)

### GET /api/v1/tasks?date=2025-12-02

List tasks for a date

### PATCH /api/v1/tasks/:id/complete

Mark complete (and optionally create time entry if user accepts)

---

## 7) Insights & AI — `routes/insights.routes.js`

### GET /api/v1/insights/weekly?weekStart=2025-11-24

Return computed AI insight summary (if available) else triggers a generation job.

**Response**

`{   "periodStart":"2025-11-24",   "summary":"You studied 8 hours this week; focus on React; move LeetCode to evening",   "recommendations":[{ "id":"r1","text":"Do 2x 45m React sessions" }] }`

### POST /api/v1/insights/generate

Trigger re-generation for a period (protected, rate-limited)

---

## 8) Integrations Routes — `routes/integrations.routes.js`

### POST /api/v1/integrations/github/connect

Start OAuth flow — redirect URL

### GET /api/v1/integrations/github/callback

Handle callback, store tokens encrypted, schedule sync job

### POST /api/v1/integrations/github/sync

Manual trigger to fetch commits/PRs (map to tags or repo-based rules)

### POST /api/v1/integrations/calendar/connect

Start Google OAuth for Calendar

---

## 9) Exports & Reporting — `routes/exports.routes.js`

### POST /api/v1/exports

Request export (type = csv|excel|pdf, startDate, endDate, includeEntries: true)

**Response**

`{ "jobId": "export_123", "status": "queued" }`

---

## 10) Notifications — `routes/notifications.routes.js`

GET /api/v1/notifications — list (paginated)  
PATCH /api/v1/notifications/:id/read — mark read  
POST /api/v1/notifications/snooze/:id — snooze

---

# CONTROLLER → SERVICE → MODEL pattern

Controllers: parse request, basic validation, authenticate user, call service.

Services: business logic (transactions, side-effects), call models, trigger jobs.

Models: Mongoose schemas, static methods, instance methods.

Example flow: `POST /entries/stop`

- Controller: validate payload, get active timer
    
- Service: compute duration, create time_entry, delete active_timer, update goal progress, update daily aggregation, enqueue AI insight update job, return entry
    
- Model: timeEntry.save()
    

---

# MONGOOSE MODELS (sample stubs)

I'll supply concise Mongoose schemas for core models (users, time_entries, active_timers, goals, ai_insights). Use `timestamps: true` for createdAt/updatedAt.

### src/models/user.model.js

`const mongoose = require('mongoose');  const IntegrationSchema = new mongoose.Schema({   connected: { type: Boolean, default: false },   username: String,   token: String,   lastSynced: Date }, { _id: false });  const UserSchema = new mongoose.Schema({   name: { type: String, required: true },   email: { type: String, required: true, unique: true, index: true },   passwordHash: { type: String },   timezone: { type: String, default: 'Asia/Kolkata' },   dailyTargetHours: { type: Number, default: 2 },   defaultTag: String,   notificationSettings: {     email: { type: Boolean, default: true },     push: { type: Boolean, default: true },     reminders: { type: Boolean, default: true },     reminderWindow: {       start: Number,       end: Number     }   },   integrations: {     github: { type: IntegrationSchema, default: {} },     googleCalendar: { type: IntegrationSchema, default: {} },     leetcode: { type: IntegrationSchema, default: {} }   } }, { timestamps: true });  module.exports = mongoose.model('User', UserSchema);`

---

### src/models/timeEntry.model.js

`const mongoose = require('mongoose');  const TimeEntrySchema = new mongoose.Schema({   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },   tag: String,   tags: [String],   goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', index: true },   title: String,   note: String,   source: { type: String, enum: ['manual','github','leetcode','calendar'], default: 'manual' },   startTime: { type: Date, index: true },   endTime: { type: Date },   duration: Number, // minutes   metadata: { type: Object, default: {} } }, { timestamps: true });  // Compound index for user + startTime for range queries TimeEntrySchema.index({ userId: 1, startTime: -1 });  module.exports = mongoose.model('TimeEntry', TimeEntrySchema);`

---

### src/models/activeTimer.model.js

`const mongoose = require('mongoose');  const ActiveTimerSchema = new mongoose.Schema({   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },   tag: String,   tags: [String],   goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },   startTime: Date,   noteDraft: String,   isPaused: { type: Boolean, default: false },   pausedDuration: { type: Number, default: 0 }, // seconds   lastHeartbeat: Date }, { timestamps: true });  ActiveTimerSchema.index({ lastHeartbeat: 1 });  module.exports = mongoose.model('ActiveTimer', ActiveTimerSchema);`

---

### src/models/goal.model.js

`const mongoose = require('mongoose');  const MilestoneSchema = new mongoose.Schema({   title: String,   targetHours: Number,   deadline: Date }, { _id: false });  const GoalSchema = new mongoose.Schema({   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },   title: String,   description: String,   targetHours: Number,   loggedHours: { type: Number, default: 0 },   progress: { type: Number, default: 0 },   startDate: Date,   deadline: Date,   milestones: [MilestoneSchema],   isCompleted: { type: Boolean, default: false },   completionDate: Date }, { timestamps: true });  module.exports = mongoose.model('Goal', GoalSchema);`

---

### src/models/aiInsight.model.js

`const mongoose = require('mongoose');  const AiInsightSchema = new mongoose.Schema({   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },   periodStart: Date,   periodEnd: Date,   summary: String,   strengths: [String],   weaknesses: [String],   recommendations: [String],   prediction: { type: Object } }, { timestamps: true });  AiInsightSchema.index({ userId: 1, periodStart: -1 });  module.exports = mongoose.model('AiInsight', AiInsightSchema);`

---

# MIDDLEWARE (key pieces)

### auth.middleware.js

- Verifies JWT access token
    
- Attaches `req.user` (userId) to request
    
- Handles expired tokens (401) and provides helpful message
    

### validate.middleware.js

- Accepts a Joi/zod schema and validates req.body or req.query
    
- On error -> 400 with validation details
    

### error.middleware.js

- Central error handler: logs structured error and returns `{ code, message, details }`
    
- Map known errors to codes: E_AUTH, E_VALIDATION, E_NOT_FOUND, E_INTERNAL
    

### rateLimit.middleware.js

- e.g., `express-rate-limit` with Redis store for distributed rate limiting
    

---

# SAMPLE CONTROLLERS + SERVICE SNIPPET

### Controller: entries.controller.js (simplified)

`const EntryService = require('../services/entry.service');  exports.start = async (req, res, next) => {   try {     const userId = req.user.id;     const { tag, tags, goalId, note } = req.body;     const active = await EntryService.startTimer({ userId, tag, tags, goalId, note });     return res.status(201).json(active);   } catch (err) { next(err); } };  exports.stop = async (req, res, next) => {   try {     const userId = req.user.id;     const { activeTimerId, manualEnd, note } = req.body;     const entry = await EntryService.stopTimer({ userId, activeTimerId, manualEnd, note });     return res.json({ entry });   } catch (err) { next(err); } };`

### Service: entry.service.js (simplified)

`const ActiveTimer = require('../models/activeTimer.model'); const TimeEntry = require('../models/timeEntry.model'); const GoalService = require('./goal.service');  exports.startTimer = async ({ userId, tag, tags, goalId, note }) => {   // ensure user has no active timer   const existing = await ActiveTimer.findOne({ userId });   if (existing) throw new Error('Active timer exists');    const active = await ActiveTimer.create({ userId, tag, tags, goalId, startTime: new Date(), noteDraft: note, lastHeartbeat: new Date() });   return active; };  exports.stopTimer = async ({ userId, activeTimerId, manualEnd, note }) => {   const active = await ActiveTimer.findOne({ _id: activeTimerId, userId });   if (!active) throw new Error('Active timer not found');    const end = manualEnd ? new Date(manualEnd) : new Date();   const durationMs = end - active.startTime;   const durationMin = Math.max(1, Math.round(durationMs / 60000));    const entry = await TimeEntry.create({     userId,     tag: active.tag,     tags: active.tags,     goalId: active.goalId,     title: active.tag,     note: note || active.noteDraft,     startTime: active.startTime,     endTime: end,     duration: durationMin,     source: 'manual'   });    // update goals   if (active.goalId) await GoalService.addLoggedHours(active.goalId, durationMin);    // remove active timer   await ActiveTimer.deleteOne({ _id: active._id });    // enqueue aggregation & insights job   // queue.add('daily-agg', { userId, date: active.startTime });   return entry; };`

---

# VALIDATION & ERROR HANDLING

Use `Joi` or `zod`:

Example validation for start timer:

`const startSchema = Joi.object({   tag: Joi.string().required(),   tags: Joi.array().items(Joi.string()).optional(),   goalId: Joi.string().optional(),   note: Joi.string().allow('', null) });`

Errors:

- Return standard shape:
    

`{ "code": "E_VALIDATION", "message": "Tag required", "details": [...] }`

---

# RATE LIMITING & SECURITY

- Rate limit auth endpoints (e.g., 5 req/min)
    
- Rate limit insights generation (e.g., 1 per 10 minutes)
    
- Use helmet.js for security headers
    
- Use CORS with allowed origins for frontend
    
- Use HTTPS only in production
    
- Input sanitization to avoid injection
    

---

# BACKGROUND JOBS & QUEUES

Use BullMQ + Redis. Example jobs:

- `daily-aggregation` — aggregate daily totals
    
- `ai-insight-generation` — call LLM and save result
    
- `integration-sync` — GitHub/LeetCode sync
    
- `reminder-dispatch` — send push/email
    

Design: enqueue jobs in controllers/services for non-blocking behavior.

---

# PAGINATION & PERFORMANCE

- Use cursor-based pagination for large lists or offset+limit for simplicity.
    
- Add indexes on `userId + startTime` and `goalId` for fast queries.
    
- Aggregate queries for dashboard should be precomputed (daily_hours collection) to avoid heavy aggregation on demand.
    

---

# SAMPLE CURLS

Start timer:

`curl -X POST https://api.yourapp.com/api/v1/entries/start \  -H "Authorization: Bearer $TOKEN" \  -H "Content-Type: application/json" \  -d '{"tag":"React","tags":["React","Hooks"],"goalId":"64...","note":"Hooks practice"}'`

Stop timer:

`curl -X POST https://api.yourapp.com/api/v1/entries/stop \  -H "Authorization: Bearer $TOKEN" \  -H "Content-Type: application/json" \  -d '{"activeTimerId":"abc123"}'`

Get weekly insights:

`curl -X GET "https://api.yourapp.com/api/v1/insights/weekly?weekStart=2025-11-24" \  -H "Authorization: Bearer $TOKEN"`

---

# TESTING STRATEGY

- Unit tests: services and utilities (mock DB)
    
- Integration tests: controllers with in-memory MongoDB (mongodb-memory-server)
    
- E2E tests: use Playwright or Cypress for frontend flows
    
- CI: GitHub Actions to run linter, tests, build Docker images
    

Example unit test targets:

- `entry.service.startTimer` (creates active timer)
    
- `entry.service.stopTimer` (creates entry, updates goal)
    
- `goal.service.addLoggedHours` (recalculates progress)
    
- `insight.service.generate` (calls AI mock and saves)
    

---

# POSTMAN / OPENAPI

Create an OpenAPI spec (YAML/JSON) from routes. Export a Postman collection with auth flow and sample requests for QA.

---

# DEPLOYMENT NOTES

- Dockerize the API; multi-stage build
    
- Use environment variables (12-factor)
    
- Kubernetes manifests for production
    
- Use managed MongoDB (Atlas)
    
- Use managed Redis (e.g., Amazon ElastiCache) for Bull
    
- Set up log aggregation (Datadog/LogDNA) and monitoring (Prometheus/Grafana)
    

---

# NEXT ACTIONS (Developer Handoff)

1. Generate Express project scaffold with the folder layout above.
    
2. Implement models and basic auth + user routes.
    
3. Implement entries start/stop endpoints and services + unit tests.
    
4. Wire up Redis & Bull for background jobs.
    
5. Implement goals and goal progress calculation.
    
6. Implement AI job worker (mock LLM first).
    
7. Implement integrations later (GitHub/Calendar).