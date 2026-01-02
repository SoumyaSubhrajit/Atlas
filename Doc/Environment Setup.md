# ✅ **Environment Setup + Folder Structure + Config Guide**

_(Everything required to start the application)_

---

# **1. Folder Structure (Final & Production Ready)**

`/goal-tracker-ai │ ├── client/                       # React App (Vite or Next.js) │   ├── public/ │   ├── src/ │   │   ├── components/ │   │   ├── pages/ │   │   ├── hooks/ │   │   ├── context/ │   │   ├── utils/ │   │   ├── services/ │   │   ├── store/ │   │   ├── styles/ │   │   ├── layouts/ │   │   └── App.jsx │   ├── package.json │   └── vite.config.js │ ├── server/ │   ├── src/ │   │   ├── config/               # env, secrets, DB connection │   │   │   ├── db.js │   │   │   └── dotenv.js │   │   │ │   │   ├── models/               # MongoDB models │   │   ├── controllers/          # API logic │   │   ├── services/             # Business logic │   │   ├── routes/               # Express routes │   │   ├── utils/                # Helpers (auth, AI, logging) │   │   ├── middleware/ │   │   └── app.js                # Main Express app │   │ │   ├── tests/                    # Jest tests │   ├── package.json │   └── server.js │ ├── docs/                         # All architecture docs │── .env.example │── README.md │── package.json └── docker-compose.yml            # Optional`

---

# **2. Environment Variables (Final MASTER List)**

Create **server/.env**

`PORT=5000 MONGO_URI=mongodb+srv://... JWT_SECRET=your_secret_key REFRESH_SECRET=your_secret_key SMTP_EMAIL=your_email@gmail.com SMTP_PASS=your_app_password GITHUB_TOKEN=xxxx GOOGLE_CLIENT_ID=xxxx GOOGLE_CLIENT_SECRET=xxxx AI_MODEL=gpt-4.1`

Create **client/.env**

`VITE_API_URL=http://localhost:5000/api VITE_GOOGLE_CLIENT_ID=xxxx`

---

# **3. Development Setup Guide**

### **Backend**

`cd server npm install npm run dev`

### **Frontend**

`cd client npm install npm run dev`

### Default URLs:

- **Frontend:** http://localhost:5173
    
- **Backend:** http://localhost:5000/api
    

---

# **4. Required Tools**

You must install:

✔ Node.js 20+  
✔ MongoDB Atlas or Local Mongo  
✔ VS Code  
✔ Git  
✔ Postman / Thunder Client

(Optional)  
✔ Docker

---

# **5. Start Application Checklist (Very Short)**

|Step|Status|
|---|---|
|Install Node & Mongo|✅|
|Create folder structure|✅|
|Add .env|⚠️ You need to add|
|Install dependencies|⚠️|
|Run backend|⚠️|
|Run frontend|⚠️|

---

# **6. Final One-Sentence Summary**

**Now you only need the `.env` file + install dependencies + run client/server — all documentation is ready.**