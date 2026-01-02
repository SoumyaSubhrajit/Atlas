(Versioned `v1` REST API)

Base URL: `https://api.studyflow.app/api/v1`  
Auth: JWT access token (Bearer); refresh token flow for long sessions. All protected endpoints require `Authorization: Bearer <accessToken>`.

I’ll present:

1. Route map (grouped by feature)
    
2. Controller responsibilities (per route)
    
3. Service methods (business logic) + side effects
    
4. Model definitions (Mongoose-like schema notes)
    
5. Request/Response examples (JSON)
    
6. Validation rules & error codes
    
7. Middleware & cross-cutting concerns
    
8. Sample controller + service code stubs (Node/Express + Mongoose)
    
9. Postman / OpenAPI guidance
    

---

## 1) ROUTE MAP (feature groups)

### Auth

- `POST /api/v1/auth/signup`
    
- `POST /api/v1/auth/login`
    
- `POST /api/v1/auth/refresh`
    
- `POST /api/v1/auth/logout`
    
- `GET /api/v1/auth/oauth/:provider` (redirect)
    
- `GET /api/v1/auth/oauth/:provider/callback`
    

### Users

- `GET /api/v1/users/me`
    
- `PUT /api/v1/users/me`
    
- `POST /api/v1/users/export` (create export job)
    
- `DELETE /api/v1/users/me` (GDPR delete/export flows)
    

### Entries (Time tracking)

- `POST /api/v1/entries/start`
    
- `POST /api/v1/entries/stop`
    
- `POST /api/v1/entries` (quick-add / manual)
    
- `GET /api/v1/entries` (list + filters + pagination)
    
- `GET /api/v1/entries/:id`
    
- `PUT /api/v1/entries/:id`
    
- `DELETE /api/v1/entries/:id`
    

### Active Timer

- `GET /api/v1/timers/active`
    
- `PATCH /api/v1/timers/:id/pause`
    
- `PATCH /api/v1/timers/:id/resume`
    
- `DELETE /api/v1/timers/:id` (cancel)
    

### Goals

- `POST /api/v1/goals`
    
- `GET /api/v1/goals`
    
- `GET /api/v1/goals/:id`
    
- `PUT /api/v1/goals/:id`
    
- `DELETE /api/v1/goals/:id`
    
- `POST /api/v1/goals/:id/complete`
    
- `GET /api/v1/goals/:id/progress` (returns chart data & ETA)
    

### Routines & Tasks

- `POST /api/v1/routines`
    
- `GET /api/v1/routines`
    
- `PUT /api/v1/routines/:id`
    
- `DELETE /api/v1/routines/:id`
    
- `POST /api/v1/routines/:id/instantiate` (create a task instance)
    
- `GET /api/v1/tasks` (filters: date, status)
    
- `PATCH /api/v1/tasks/:id/complete`
    

### Insights (AI)

- `GET /api/v1/insights/weekly?weekStart=YYYY-MM-DD`
    
- `POST /api/v1/insights/generate` (enqueue regenerate)
    
- `GET /api/v1/insights/:id`
    

### Integrations

- `POST /api/v1/integrations/:provider/connect` (start OAuth)
    
- `GET /api/v1/integrations/:provider/callback`
    
- `POST /api/v1/integrations/:provider/sync` (manual sync)
    
- `GET /api/v1/integrations` (list)
    

### Exports & Reports

- `POST /api/v1/exports` (create export job)
    
- `GET /api/v1/exports/:id/status`
    
- `GET /api/v1/exports/:id/download`
    

### Notifications

- `GET /api/v1/notifications`
    
- `PATCH /api/v1/notifications/:id/read`
    
- `POST /api/v1/notifications/snooze/:id`
    

### Admin (future)

- `GET /api/v1/admin/health`
    
- `GET /api/v1/admin/usage` (internal metrics)
    

---

## 2) CONTROLLER RESPONSIBILITIES (pattern)

Each controller method:

- Validate request (schema)
    
- Authenticate/authorize (if required)
    
- Map request to service call(s)
    
- Catch and normalize errors to response format
    
- Return standardized responses `{ success: true|false, data, error }`
    

Examples below.

---

## 3) SERVICES (business logic) — main methods

### auth.service

- `signup(payload)`
    
- `login(email, password)`
    
- `refreshToken(refreshToken)`
    
- `logout(userId, refreshToken)`
    

Side-effects: create JWTs, store refresh tokens (DB/Redis), send welcome email.

### user.service

- `getProfile(userId)`
    
- `updateProfile(userId, updatePayload)`
    
- `exportUserData(userId, options)` → enqueue export job
    

### entry.service

- `startTimer(userId, payload)` → creates ActiveTimer doc, ensure uniqueness
    
- `stopTimer(userId, activeTimerId, manualEnd, note)` → calculate duration, create TimeEntry, delete ActiveTimer, call GoalService.addLoggedHours, update daily aggregation, queue AI job
    
- `createEntry(userId, payload)` → manual quick-add
    
- `listEntries(userId, query)` → supports pagination & filters
    
- `updateEntry(userId, entryId, update)`
    
- `deleteEntry(userId, entryId)`
    

### timer.service

- `getActiveTimer(userId)`
    
- `pauseTimer(userId, timerId)`
    
- `resumeTimer(userId, timerId)`
    
- `cleanupStaleTimers()` → job to clear abandoned timers
    

### goal.service

- `createGoal(userId, payload)`
    
- `updateGoal(userId, goalId, payload)`
    
- `getGoals(userId)`
    
- `addLoggedHours(goalId, minutes)` → increments loggedHours, recalc progress, return changed goal
    
- `calculateETA(goalId)` → based on user avg weekly hours or heuristic
    

### routine.service

- `createRoutine(userId, payload)`
    
- `instantiateRoutine(routineId, date)`
    
- `listRoutines(userId)`
    

### insight.service

- `generateWeeklyInsight(userId, weekStart)` → orchestrates data aggregation + LLM prompt + persists result
    
- `getInsight(userId, period)` → read from DB
    

### integration.service

- `connectProvider(userId, provider, authCode)` → store tokens
    
- `syncProvider(userId, provider)` → fetch contributions, create entries or metadata
    

### export.service

- `enqueueExport(userId, options)` → create export job, push to queue
    
- `getExportStatus(jobId)`
    

### notification.service

- `createNotification(userId, payload)`
    
- `sendReminder(userId, schedule)`
    

---

## 4) MODELS (Mongoose-like) — concise schemas (already created earlier but restated here with field details & validation)

I'll list primary model skeletons with fields, types, and indexes. These are ready to copy into `src/models/*`.

### User model — `User`

Fields:

- `_id: ObjectId`
    
- `name: String` (required)
    
- `email: String` (required, unique, index)
    
- `passwordHash: String` (nullable if OAuth)
    
- `timezone: String` (default `Asia/Kolkata`)
    
- `dailyTargetHours: Number` (default 2)
    
- `notificationSettings` (object)
    
- `integrations` (object)
    
- `createdAt`, `updatedAt` (timestamps)
    

Indexes:

- `email: unique`
    

### TimeEntry — `TimeEntry`

Fields:

- `_id`, `userId: ObjectId` (index), `tags: [String]`, `title`, `note`
    
- `source: enum ['manual','github','leetcode','calendar']`
    
- `startTime: Date` (index), `endTime: Date`, `duration: Number` (minutes)
    
- `goalId: ObjectId` (index)
    
- `metadata: Object`
    
- timestamps
    

Indexes:

- `{ userId: 1, startTime: -1 }`
    
- `goalId`
    
- `tags`
    

### ActiveTimer — `ActiveTimer`

Fields:

- `_id`, `userId` (unique index), `tag`, `tags`, `goalId`, `startTime`, `noteDraft`, `lastHeartbeat`
    

Indexes:

- `userId: unique`
    
- `lastHeartbeat`
    

### Goal — `Goal`

Fields:

- `_id`, `userId`, `title`, `description`, `targetHours`, `loggedHours`, `progress` (0-100), `startDate`, `deadline`, `milestones[]`, `isCompleted`
    

Indexes:

- `userId`
    
- `deadline`
    

### Routine, Task, AiInsight, Notification, ExportJob — as earlier schema

(Use earlier message's detailed schema for exact field lists.)

---

## 5) REQUEST / RESPONSE EXAMPLES (core flows)

### Start Timer

**POST** `/api/v1/entries/start`

`Request: {   "tag": "React",   "tags": ["React", "Hooks"],   "goalId": "64f4c9a...",   "note": "Practice useEffect cleanup" }  200 Response: {   "success": true,   "data": {     "activeTimerId": "63f85e...",     "userId": "60f...",     "startTime": "2025-12-06T09:30:00Z",     "tag": "React"   } }`

### Stop Timer

**POST** `/api/v1/entries/stop`

`Request: { "activeTimerId": "63f85e..." }  Response: {   "success": true,   "data": {     "entry": {       "_id": "6458...",       "userId": "60f...",       "startTime": "2025-12-06T09:30:00Z",       "endTime": "2025-12-06T10:15:00Z",       "duration": 45,       "tag": "React"     }   } }`

---

## 6) VALIDATION RULES & ERROR CODES

Use `zod` or `Joi` schemas in `middlewares/validate.middleware.js`.

**Common error codes**

- `E_AUTH` (401) — auth failed / invalid token
    
- `E_VALIDATION` (400) — request validation
    
- `E_NOT_FOUND` (404)
    
- `E_CONFLICT` (409) — e.g., active timer exists
    
- `E_RATE_LIMIT` (429)
    
- `E_INTERNAL` (500)
    

Return standardized JSON:

`{ "success": false, "error": { "code": "E_VALIDATION", "message": "Tag is required", "details": [] } }`

---

## 7) MIDDLEWARE & CROSS-CUTTING

- **auth.middleware**: verifies JWT, refresh logic, attach `req.user` object
    
- **validate.middleware(schema)**: validate body/query params
    
- **error.middleware**: central error handling, map to codes
    
- **rateLimit.middleware**: use Redis store for distributed rate limiting
    
- **logging.middleware**: attach request id (UUID) for traceability
    
- **transaction.middleware**: optional for multi-step operations (or let services handle atomicity)
    

---

## 8) SAMPLE CODE SCAFFOLD (Express + Mongoose)

### src/routes/entries.routes.js

`const express = require('express'); const router = express.Router(); const entriesController = require('../controllers/entries.controller'); const auth = require('../middlewares/auth.middleware'); const validate = require('../middlewares/validate.middleware'); const schemas = require('../validations/entries.validation');  router.post('/start', auth, validate(schemas.start), entriesController.start); router.post('/stop', auth, validate(schemas.stop), entriesController.stop); router.post('/', auth, validate(schemas.create), entriesController.create); router.get('/', auth, entriesController.list); router.get('/:id', auth, entriesController.getById); router.put('/:id', auth, validate(schemas.update), entriesController.update); router.delete('/:id', auth, entriesController.remove);  module.exports = router;`

### src/controllers/entries.controller.js

`const entryService = require('../services/entry.service');  exports.start = async (req, res, next) => {   try {     const userId = req.user.id;     const payload = req.body;     const active = await entryService.startTimer(userId, payload);     res.status(201).json({ success: true, data: active });   } catch (err) { next(err); } };  exports.stop = async (req, res, next) => {   try {     const userId = req.user.id;     const { activeTimerId, manualEnd, note } = req.body;     const entry = await entryService.stopTimer(userId, { activeTimerId, manualEnd, note });     res.json({ success: true, data: entry });   } catch (err) { next(err); } };  // other controller methods ...`

### src/services/entry.service.js

`const ActiveTimer = require('../models/activeTimer.model'); const TimeEntry = require('../models/timeEntry.model'); const GoalService = require('./goal.service'); const queue = require('../jobs/queue');  exports.startTimer = async (userId, { tag, tags = [], goalId, note }) => {   // check active timer   const exists = await ActiveTimer.findOne({ userId });   if (exists) throw { code: 'E_CONFLICT', message: 'Active timer exists' };    const active = await ActiveTimer.create({ userId, tag, tags, goalId, startTime: new Date(), noteDraft: note, lastHeartbeat: new Date() });   return active; };  exports.stopTimer = async (userId, { activeTimerId, manualEnd, note }) => {   const active = await ActiveTimer.findOne({ _id: activeTimerId, userId });   if (!active) throw { code: 'E_NOT_FOUND', message: 'Active timer not found' };    const end = manualEnd ? new Date(manualEnd) : new Date();   const durationMin = Math.max(1, Math.round((end - active.startTime) / 60000));    const entry = await TimeEntry.create({     userId,     tag: active.tag,     tags: active.tags,     goalId: active.goalId,     title: active.tag,     note: note || active.noteDraft,     startTime: active.startTime,     endTime: end,     duration: durationMin,     source: 'manual'   });    if (active.goalId) await GoalService.addLoggedHours(active.goalId, durationMin);   await ActiveTimer.deleteOne({ _id: active._id });    // enqueue daily aggregate + AI insight job   queue.add('daily-agg', { userId, date: active.startTime });   queue.add('ai-insight', { userId, periodStart: getWeekStart(active.startTime) });    return entry; };`

---

## 9) TESTS & CONTRACTS

- Unit tests: services with DB mocks (sinon/jest)
    
- Integration tests: spin up `mongodb-memory-server` for controllers
    
- E2E: Playwright/Cypress for UI → API flows
    
- Create OpenAPI 3.0 spec from routes; auto-generate Postman collection
    

Sample OpenAPI snippet (entries start)

`paths:   /api/v1/entries/start:     post:       tags: [Entries]       security:         - bearerAuth: []       requestBody:         required: true         content:           application/json:             schema:               $ref: '#/components/schemas/StartTimer'       responses:         '201':           description: Created           content:             application/json:               schema:                 $ref: '#/components/schemas/ActiveTimer' components:   schemas:     StartTimer:       type: object       properties:         tag: { type: string }         tags: { type: array, items: { type: string } }         goalId: { type: string }         note: { type: string }       required: [tag]`

---

## 10) OPERATIONS (rate limiting, monitoring, scaling)

- Rate-limits: 100 req/min per user default; 10 req/min for sensitive endpoints (insights/generate)
    
- Monitoring: Prometheus metrics from Node app; Grafana dashboards
    
- Logs: Winston → JSON → Logstash/Datadog
    
- Health endpoints: `/api/v1/health` returning readiness & DB connection
    
- Autoscaling: API-scale horizontally; Redis & Mongo managed services
    

---

## 11) SECURITY & GDPR

- Sensitive tokens & refresh tokens stored encrypted (e.g., using AWS KMS)
    
- Provide `DELETE /api/v1/users/me` to run data removal pipeline & export file
    
- Role-based verification for Mentor/Admin views
    
- Rate limiting & IP throttling for login endpoints