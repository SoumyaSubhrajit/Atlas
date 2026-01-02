# Atlas Project - Study & Productivity Tracker

A modern, full-stack study and productivity tracking application built with **Next.js 15** and **Express**.

## 🏗️ Project Structure

```
Atlas/
├── client/                 # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   └── styles/        # CSS & design tokens
│   └── ...
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/        # Database & env config
│   │   ├── controllers/   # API handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # Route definitions
│   │   ├── services/      # Business logic
│   │   ├── middlewares/   # Auth, validation
│   │   └── utils/         # Helpers
│   └── server.js          # Entry point
│
└── Doc/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/atlas.git
   cd atlas
   ```

2. **Setup Client**
   ```bash
   cd client
   npm install
   cp .env.example .env.local
   ```

3. **Setup Server**
   ```bash
   cd server
   npm install
   # Update .env with your MongoDB URI
   ```

### Running Development Servers

**Client (Frontend):**
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

**Server (Backend):**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

## 🎨 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **React 19** - UI library

### Backend
- **Express** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication

## 📋 Features (Planned)

- [ ] Time tracking with start/stop timer
- [ ] Study goals with progress tracking
- [ ] Dashboard with analytics
- [ ] Routines & scheduling
- [ ] AI-powered insights
- [ ] GitHub integration

## 📄 License

MIT License - see LICENSE file for details.

---

*Built with ❤️ for productive studying*
