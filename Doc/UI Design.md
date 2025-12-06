# Navigation & UI Wireframe Structure

**App name (working):** StudyFlow — MERN Study & Productivity Tracker

**Primary users:** You (learner), Mentor (optional), Admin (future)

**Routing convention:** Next.js App Router / file-based routes  
Examples: `/`, `/dashboard`, `/timer`, `/planner`, `/goals`, `/insights`, `/history`, `/integrations`, `/settings`, `/auth/*`.

---

## Top-level Navigation (Global)

Visible on desktop (horizontal top nav) and mobile (bottom nav or hamburger).

- Logo / Home (left)
    
- Dashboard
    
- Timer
    
- Planner
    
- Goals
    
- Insights (AI)
    
- History
    
- Integrations
    
- Notifications (icon)
    
- User menu (avatar) → Profile / Settings / Logout
    

Mobile: Collapse into a hamburger (left) + floating primary action (Start Timer) bottom center.

---

## 1) Auth / Onboarding Screens

### 1.1 Login (/auth/login)

- Email field, Password field, Sign in button
    
- OAuth buttons (GitHub, Google)
    
- Link: Sign up / Forgot password
    
- Error states inline
    

### 1.2 Signup (/auth/signup)

- Name, Email, Password, Confirm
    
- Quick onboarding checkbox: “I want a guided study plan”
    
- CTA: “Create account”
    

### 1.3 Onboarding Wizard (/onboarding)

Purpose: capture goals, weekly availability, preferred study times, priority stack (MERN / Docker / K8s / LeetCode), and mentor opt-in.  
Steps:

1. Welcome & goals selection (choose 1–3 goals)
    
2. Weekly availability (days + hours per day)
    
3. Priorities + target timeline (30/90/180 days)
    
4. Import options (GitHub, Calendar)
    
5. Summary + create account
    

Wireframe (simple):

`[Step 1/5] Header: "Let's set your goals" Card list: [Goal tile: Learn React - select] Bottom: Back | Next`

---

## 2) Dashboard (/dashboard) — PRIMARY HOME

**Purpose:** Quick at-a-glance of today's schedule, active timer, weekly summary, progress to main goal, and quick actions.

**Layout (desktop: 3-col grid)**

Left column (narrow)

- Today mini calendar (small)
    
- Quick stats: Hours today, Streak (days), Goals progress %
    
- Shortcuts: Start Timer, Add Quick Entry, Planner
    

Center column (main)

- Top: Active Timer Card (prominent)
    
    - Start/Stop, Tag selector, Note field
        
    - CTA: Log time
        
- Middle: Today’s schedule (card list) — time blocks with status (Done / Upcoming / Missed)
    
- Bottom: Goal progress card (progress bar, % complete, ETA) — click opens Goals page
    

Right column (side)

- Weekly summary chart (sparkline)
    
- Pie chart: Time by tag this week
    
- AI Suggestion snippet (1 recommendation + CTA "See full insights")
    

**Wireframe (ASCII)**

`┌───────────────────────────────────────────────────────┐ | Dashboard                                              | | ┌──────┐ ┌─────────────────────────┐ ┌───────────────┐ | | |Timer │ | Today Schedule          | | Weekly Chart  | | | |Card  │ | (blocks)                | | Pie Chart     | | | └──────┘ └─────────────────────────┘ └───────────────┘ | └───────────────────────────────────────────────────────┘`

**Key components**

- `ActiveTimerCard` (props: user, runningEntry)
    
- `ScheduleList` (props: todayEntries[])
    
- `GoalProgressCard` (props: goal object)
    
- `AiSuggestionPreview` (props: suggestion)
    

**Interactions**

- Start Timer opens Tag picker modal
    
- Timer auto-pause on calendar event (optional)
    
- Click goal → `/goals/:id`
    

**Microcopy**

- Timer placeholder: “What are you doing? (React, LeetCode, Office…)”
    
- Goal progress CTA: “How to close 10% faster”
    

---

## 3) Timer Page (/timer)

**Purpose:** Dedicated area for time tracking, history of active sessions.

**Layout**

- Large Timer widget top center
    
- Tag selection (multi/primary)
    
- Add notes / associate to goal dropdown
    
- Past quick entries below (list or table)
    
- Pomodoro toggle (optional)
    

**Components**

- `TimerWidget` (start/stop/reset, lap)
    
- `TagSelector` (frequent tags, create new)
    
- `QuickEntryList` (past 10)
    

**Edge UX**

- When user navigates away, timer continues (server-side session)
    
- Warn if closing browser (confirm modal)
    

---

## 4) Planner (/planner)

**Purpose:** Manage recurring routines & one-off tasks (calendar like)

**Layout**

- Calendar view (month/week)
    
- Left side: Routine templates & task creation
    
- Middle: Calendar with draggable tasks (drag to schedule)
    
- Right: Task detail (selected)
    

**Components**

- `Calendar` (fullcalendar or custom)
    
- `RoutineCard` (reusable template)
    
- `TaskEditorModal` (create/edit recurrence)
    

**Features**

- Create recurring template: e.g., “Daily: 1hr JS review”
    
- Drag template to calendar to instantiate
    
- Sync to Google Calendar (per-event permission)
    

**Microcopy**

- Recurrence UI: “Repeat: Mon-Fri • 1hr • Priority: High”
    

---

## 5) Goals (/goals)

**Purpose:** Manage target goals and track progress.

**Layout**

- List of goals (cards) with progress bars
    
- Each card:
    
    - Title, target hours, hours logged, % complete, ETA
        
    - Actions: View details, Edit, Mark complete
        
- Click goal → detail page
    

### Goal Detail (/goals/:id)

- Overview: title, description, timeline
    
- Progress charts (burn-down, weekly contributions)
    
- Linked entries (list of entries tagged to this goal)
    
- Suggested tasks (AI generated)
    
- Milestones (30/90/180 checkpoints)
    
- Export goal report button
    

**Components**

- `GoalCard`
    
- `GoalDetailProgressChart`
    
- `LinkedEntriesTable`
    

**Props/state**

- Goal object {id, title, targetHours, loggedHours, startDate, endDate, milestones[]}
    

---

## 6) Insights (AI) (/insights)

**Purpose:** Full AI-driven analysis interface with deeper recommendations.

**Layout**

- Summary panel (top): key metrics (avg weekly hours, streak, top tags)
    
- Timeline/Comparisons (middle)
    
- Full AI report (longform) with sections:
    
    - Weekly summary
        
    - Strengths
        
    - Weaknesses
        
    - Suggested schedule change
        
- Actionable tasks (create tasks from suggestions)
    
- Feedback loop: “Was this helpful?” (thumbs up/down) — feed back to AI model
    

**Components**

- `AiSummary` (text)
    
- `AiRecommendationCard` (copy + accept/create task)
    
- `FeedbackWidget`
    

**AI Interaction**

- Provide raw data to AI: last 30 days entries, goals
    
- Show confidence score for suggestions
    

**Microcopy**

- Header: “Your week at a glance — what worked and what to change”
    

---

## 7) History (/history)

**Purpose:** Searchable log of all entries; auditing & export.

**Layout**

- Filters top: date range, tag, goal, source (GitHub/LeetCode)
    
- Table with columns:
    
    - Date, Start, End, Duration, Tag(s), Title, Goal, Notes
        
- Actions per row:
    
    - Edit, Delete, Link to Goal, Export as CSV
        
- Bulk actions: select multiple → export / tag / assign to goal
    

**Components**

- `HistoryFilterBar`
    
- `EntriesTable` (with pagination & virtualized list)
    
- `ExportModal`
    

**Performance notes**

- Use server-side pagination and indexes on `startTime`, `tag`, `userId`
    

---

## 8) Integrations (/integrations)

**Purpose:** Configure GitHub, Google Calendar, LeetCode, LinkedIn

**Layout**

- List of cards: GitHub, Google Calendar, LeetCode, LinkedIn
    
- Each card:
    
    - Connect/Disconnect button
        
    - Status (connected user, last sync)
        
    - Settings (scopes, auto-sync toggle)
        
- Sync logs & last run output
    

**Flows**

- OAuth redirects to provider → user accepts → stored tokens (encrypted)
    
- On connect, run an initial sync (pull last 90 days)
    

**Security**

- Only store refresh tokens encrypted
    
- Provide a clear UI to revoke access
    

---

## 9) Settings (/settings)

**Sections**

- Profile (name, avatar, timezone)
    
- Preferences (default study tag, daily target)
    
- Notifications (email/push toggles, reminder windows)
    
- Integrations management
    
- Export & Delete Data (GDPR)
    
- Team / Mentor invites (future)
    

**Important**

- Timezone selection defaults to Asia/Kolkata
    

---

## 10) Mentor View (optional) (/mentor)

**Purpose:** Mentor/Coach can view mentee dashboards and give feedback

**Permissions**

- Mentor must have access to user view (consent-based)
    
- Read-only plus comment ability on entries/tasks
    

**Layout**

- List of mentees
    
- For each: mini-dashboard + comments feed
    

---

## 11) Notifications UI

- Bell icon in header
    
- Notification drawer with grouping by type: Reminder, AI Suggestion, Sync failed
    
- Each notification actionable (snooze, open related page)
    

---

## UI Component Library (suggested)

Use component-based system (tailwind + headlessui OR Chakra UI OR MUI). Recommended:

- **Design tokens**: primary color, spacing, font sizes
    
- **Components**: Button, Input, Modal, Select, DatePicker, Table, Toast, ToastQueue, Avatar, Badge, ProgressBar, Chart (recharts or chart.js)
    

---

## Responsive Behavior

**Desktop**

- 3-column dashboard layout
    
- Full calendars and charts
    

**Tablet**

- 2 columns; collapsible side panels
    
- Use hamburger for secondary nav
    

**Mobile**

- Single column; bottom nav bar
    
- Floating primary action (Start Timer)
    
- Simplify charts (sparklines)
    

---

## Accessibility (a11y)

- All interactive controls keyboard-accessible
    
- ARIA labels for modals, forms, charts
    
- Color contrast ratio >= 4.5:1 for text
    
- Use semantic HTML (buttons, form, nav)
    
- Provide text alternatives for charts (summary text hidden for screen readers)
    

---

## Styling / Microcopy / Tone Guide

- Tone: friendly, encouraging, concise
    
- Microcopy examples:
    
    - Empty state Dashboard: “No tracked hours yet — start a timer or add a quick entry.”
        
    - Timer placeholder: “What will you focus on for the next session?”
        
    - Export confirmation: “Export completed. Download started.”
        
- Use emojis sparingly for personality in suggestions (✅, 🔥, ⚠️)
    

---

## Data & State Considerations (for devs)

- `Timer` state should be persisted server-side every 30s to avoid data loss
    
- Optimistic UI updates for start/stop events with rollback on failure
    
- Use Redux/Context or React Query for data fetching and cache invalidation
    
- Use web sockets (Socket.IO) for real-time timer updates across tabs/devices
    

---

## Sample Component Props (for Frontend devs)

**TimerWidget**

`interface TimerWidgetProps {   runningEntry?: Entry|null;   onStart: (tag:string, goalId?:string, note?:string) => Promise<void>;   onStop: () => Promise<void>;   tags: string[];   defaultTag?: string; }`

**GoalCard**

`interface GoalCardProps {   goal: {     id: string;     title: string;     targetHours: number;     loggedHours: number;     startDate: string;     endDate?: string;     milestones?: Array<{title:string, targetHours:number}>;   };   onOpen: (id:string) => void;   onEdit: (id:string) => void; }`

**AiRecommendationCard**

`interface AiRecommendationCardProps {   id: string;   title: string;   description: string;   confidence: number; // 0-1   createdAt: string;   onAccept: (id:string) => void;   onCreateTask: (payload:{title:string, estHours:number}) => void; }`

---

## UX Flows (3 critical examples)

### Flow A — Start a study session

1. User clicks Start Timer (header or dashboard)
    
2. Modal opens: choose tag, goal, add short note
    
3. User clicks Confirm → Timer starts; server record created
    
4. Auto-save every 30s; UI shows running state
    
5. Stop Timer → duration calculated & saved; user prompted to add details
    

### Flow B — Create a recurring routine

1. Planner → Create Routine → set repeat (Mon-Fri) and duration
    
2. Routine saved → appears on calendar
    
3. If missed, system marks missed and triggers reminder
    

### Flow C — AI Suggestion acceptance

1. Insights page shows suggestion: “Shift React practice to evenings”
    
2. User clicks “Create Task” → Task modal prefilled with suggestion details
    
3. User confirms → Task added to Planner (and optional calendar event)
    

---

## Developer Handoff Checklist (when building UI)

- Provide design tokens + basic CSS variables
    
- Provide example API responses for Dashboard, Goals, Entries
    
- Provide sample data fixture JSON
    
- Provide storybook for major components
    
- Ensure components are reusable & small (one responsibility)
    
- Add unit and E2E tests for critical flows (timer start/stop, create goal, accept AI suggestion)