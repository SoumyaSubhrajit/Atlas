**Atlas Building phase:**  
**Utility:**  
**⭐ 1. Time Tracking Utility (Core Utility)**

This is the engine that records every activity.

**Responsibilities**

- Start/Stop timer
- Auto-calc duration
- Save logs to MongoDB
- Add tags (JS/React/Work/Open Source/etc.)
- Sync with Calendar
- Sync with GitHub commits / LeetCode activity

**Why needed**

You want:  
✔ Hour tracking  
✔ Study tracking  
✔ Goal progress  
✔ Insights  
→ This utility powers all of that.

---

**⭐ 2. AI Insights & Coaching Utility**

This is your “personal AI mentor”.

**Responsibilities**

- Analyze your weekly logged hours
- Detect patterns (your best study time, consistency, gaps)
- Predict completion dates
- Generate weekly AI summary
- Suggest plan adjustments

**Why needed**

Matches your requirement:  
✔ AI monitoring  
✔ Notifications  
✔ Weekly summary  
✔ Streak analysis

---

**⭐ 3. Goal Measurement & Progress Calculator Utility**

This utility maps logs → goals → % completion.

**Responsibilities**

- Given your goals (ex: 40 hours React)
- And your study logs  
    → Calculate completion percentage  
    → Plot progress graphs  
    → Show how far you are from target

**Why needed**

This gives you the “How close am I to my goal?” feature.

---

**⭐ 4. Reminder & Notification Utility**

This is the scheduler/cron engine.

**Responsibilities**

- Send study reminders
- Detect missed sessions
- Push/email notifications
- Smart escalation (after missing 3 sessions, send warning)

---

**⭐ 5. Data Export & Reporting Utility**

Generates:

- CSV / Excel exports
- Weekly PDF reports
- Daily log summary

---

**⭐ 6. Integration Utility**

A shared module that handles all external APIs:

- GitHub contribution tracking
- Google Calendar sync
- LinkedIn profile tracking
- LeetCode problem import

---

**⭐ 7. User Analytics Utility**

Engine for all dashboards & graphs:

- Weekly hours
- Pie chart (tag distribution)
- Month-over-month growth
- Trend lines

---

**⭐ 8. Authentication & Role Utility**

Handles:

- User login
- Mentor role
- Admin role
- Token refresh
- Permission control

---

**⭐ 9. Routine & Scheduler Utility**

Engine for:

- Daily/weekly routines
- Task templates
- Recurring tasks
- Calendar view

---

**⭐ 10. AI Routine Generator (Optional but Powerful)**

Ask AI:

“Generate a 4-week MERN study plan for me.”

This utility creates:

- Roadmap
- Weekly plan
- Estimated hours
- Skill progression