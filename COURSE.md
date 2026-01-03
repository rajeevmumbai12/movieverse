# MovieVerse Full Stack Developer Learning Course

## Who is this for?
- Beginners who want to become job-ready full stack developers
- Anyone who wants to build a real-world MERN app step by step (from scratch, not by cloning)

---

## What if You Get Stuck?

If you get stuck on any step:
- **Refer to the MovieVerse project codebase** (this repo) for examples and solutions.
- **How to use as reference:**
  1. Search for the file or feature (e.g., `movieController.js`, `Navbar.js`, `queue`) in this repo.
  2. Read the code and comments to understand the logic and structure.
  3. Compare your code with the reference to spot mistakes or missing parts.
  4. Copy only the relevant code snippet (not the whole file) if needed, and adapt it to your project.
- **Tip:** Try to solve the problem yourself first, then use the reference to learn best practices and fill knowledge gaps.
- **Ask for help:** If you're still stuck, ask questions on forums like Stack Overflow, or discuss with peers/mentors.

This approach will help you learn by doing, while also having a safety net to keep progressing!

---

## Should You Build Backend or Frontend First?

**Best Practice:**
- Start with the backend (Node.js/Express, MongoDB, REST API, authentication)
- Test your backend endpoints with Postman or curl
- Then build the frontend (React, UI, API integration)

**Why?**
- You define your data models and API contracts up front
- You can test and debug backend logic before UI work
- Frontend can consume real API responses, making integration easier
- Fewer surprises and smoother development

---

## Course Roadmap & Skills

### 1. **Web Fundamentals**
- HTML, CSS, JavaScript basics
- Responsive design
- Git & GitHub basics

### 2. **Backend Development (Node.js & Express)**
- Node.js basics
- Express.js routing & middleware
- REST API design
- JWT authentication
- Error handling
- Environment variables

### 3. **Database (MongoDB & Mongoose)**
- MongoDB basics
- Data modeling
- CRUD operations
- Mongoose schemas & validation
- Indexing & performance

### 4. **Frontend Development (React)**
- React fundamentals (components, props, state)
- React Router (navigation)
- Modern CSS (Flexbox, Grid, custom themes)
- API calls with Axios
- Authentication flows
- UI libraries (Material-UI)

### 5. **Advanced Backend**
- Connection pooling
- Caching (node-cache)
- Queue system (Bull + Redis)
- Async job processing
- Bulk operations
- Security best practices

### 6. **DevOps & Deployment**
- Environment setup
- Using .env files
- Deploying frontend (Vercel)
- Deploying backend (Render)
- Setting up MongoDB Atlas
- Setting up Upstash Redis
- Domain & SSL setup

### 7. **Interview Preparation**
- Common full stack interview questions
- System design basics
- Coding challenges (LeetCode, HackerRank)
- Resume & portfolio tips

---

## Step-by-Step Project Guide

### **Module 1: Setup & Tools**
**Install Node.js, MongoDB, Git:**
- Download Node.js: https://nodejs.org/
- Download MongoDB: https://www.mongodb.com/try/download/community
- Download Git: https://git-scm.com/

**Create your own project folder:**
```bash
mkdir movieverse
cd movieverse
```

**Initialize Git:**
```bash
git init
```

**Create Backend and Frontend folders:**
```bash
mkdir backend frontend
```

**Initialize backend Node.js project:**
```bash
cd backend
npm init -y
```

**Initialize frontend React app:**
```bash
cd ../frontend
npx create-react-app .
```

**Install dependencies:**
```bash
# Backend
cd ../backend
npm install express mongoose dotenv cors jsonwebtoken bcryptjs bull redis node-cache

# Frontend
cd ../frontend
npm install @mui/material @emotion/react @emotion/styled react-router-dom axios
```

**Create environment files:**
- Create `backend/.env` and `frontend/.env` as shown in the README/QUICKSTART

**Project structure overview:**
- backend/
- frontend/

---

### **Module 2: Backend Basics**
**Set up Express server:**
- Create `backend/server.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.listen(5000, () => console.log('Server running'));
```

**Create REST API endpoints:**
- Create `backend/routes/movies.js`:
```javascript
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json([]));
module.exports = router;
```
- Import and use in `server.js`:
```javascript
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);
```

**Connect to MongoDB:**
- Create `backend/config/db.js`:
```javascript
const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
module.exports = connectDB;
```
- Call `connectDB()` in `server.js`

**Implement authentication:**
- Install JWT:
```bash
npm install jsonwebtoken bcryptjs
```
- Create `backend/models/User.js`, `backend/controllers/authController.js`, etc.

**Test your backend endpoints:**
- Use Postman or curl to test all API routes before building the frontend

---

### **Module 3: Frontend Basics**
**Build React app structure:**
- Create `src/components/Navbar.js`, `src/components/MovieCard.js`, etc.
- Example:
```javascript
// src/components/Navbar.js
import React from 'react';
const Navbar = () => (<nav>MovieVerse</nav>);
export default Navbar;
```

**Implement routing:**
```bash
npm install react-router-dom
```
- Edit `src/App.js` to use `<BrowserRouter>` and `<Routes>`

**Style with Material-UI:**
```bash
npm install @mui/material @emotion/react @emotion/styled
```
- Use MUI components in your files

---

### **Module 4: Full CRUD & Auth**
**Add, edit, delete movies (admin):**
- Create `backend/models/Movie.js` and CRUD endpoints in `movieController.js`
- Example create endpoint:
```javascript
exports.createMovie = async (req, res) => {
  // ...existing code...
};
```

**Register/login users:**
- Create registration and login endpoints in `authController.js`

**Protect routes with JWT:**
- Create `backend/middleware/auth.js` to verify tokens
- Use `app.use(protect)` for protected routes

---

### **Module 5: Advanced Features**
**Search, sort, pagination:**
- Implement query params in movie routes

**Caching for performance:**
- Install node-cache:
```bash
npm install node-cache
```
- Use in `backend/config/cache.js`

**Queue system for async jobs:**
- Install Bull and Redis:
```bash
npm install bull redis
```
- Create `backend/queues/movieQueue.js` and configure as shown in repo

**Bulk movie import:**
- Create endpoint to accept array of movies and add to queue

---

### **Module 6: Deployment**
**Deploy frontend to Vercel:**
- Sign up at https://vercel.com/
- Connect your GitHub repo
- Deploy frontend folder

**Deploy backend to Render:**
- Sign up at https://render.com/
- Connect your GitHub repo
- Deploy backend folder

**Set up MongoDB Atlas & Upstash Redis:**
- Create free accounts, get connection strings
- Update `.env` files

**Configure environment variables:**
- Set secrets and URLs in Render/Vercel dashboard

---

### **Module 7: Interview Prep**
**Practice coding questions:**
- Use LeetCode, HackerRank

**Review system design:**
- Study REST API, database design, caching, queues

**Build your resume & portfolio:**
- Add MovieVerse project with GitHub link

---

## Sample .env Templates

### Backend (`backend/.env`)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
PORT=5000
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Common Troubleshooting Tips
- **MongoDB connection error:** Check your `MONGODB_URI` and internet connection.
- **Redis connection error:** Make sure Redis is running and `REDIS_URL` is correct.
- **CORS error:** Ensure backend has CORS enabled (`app.use(cors())`).
- **Port already in use:** Change the `PORT` in `.env` or stop other running servers.
- **Frontend can't reach backend:** Check API URL in frontend `.env` and backend server status.

---

## Module Checklists

### After Each Module, Ask Yourself:
- [ ] Did I run all commands and create all files?
- [ ] Did I test the feature (API, UI, etc.)?
- [ ] Did I commit my changes with a clear message?
- [ ] Did I read and understand the code I wrote?

---

## Mini-Project Ideas (After MovieVerse)
- **BookVerse:** Book management app (CRUD, search, auth)
- **TaskVerse:** To-do/task manager with user login
- **RecipeVerse:** Recipe sharing platform with images
- **BlogVerse:** Simple blog with comments and likes

---

## Soft Skills & Git Tips
- Write clear commit messages (e.g., "Add movie CRUD endpoints")
- Use branches for new features (`git checkout -b feature/feature-name`)
- Communicate blockers early if working in a team
- Practice explaining your code and project to others

---

## Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [React Docs](https://react.dev/)
- [Node.js Docs](https://nodejs.org/en/docs)
- [MongoDB University](https://university.mongodb.com/)
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [InterviewBit](https://www.interviewbit.com/)

---

## How to Use This Course
- Follow modules in order
- Run the commands and create files as shown
- **Do NOT clone the repo—build everything yourself for hands-on practice**
- Build the app step by step
- Practice coding and system design regularly
- Update your resume and portfolio as you learn

**By the end, you'll be ready to build real-world apps and ace full stack developer interviews!**

---

## Frequently Asked Questions (FAQ)

**Q: What if I don’t know JavaScript well?**
A: Spend a few days on [freeCodeCamp JavaScript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) before starting.

**Q: My app won’t start, what should I check?**
A: Double-check your `.env` files, installed dependencies, and that MongoDB/Redis are running.

**Q: How do I ask for help?**
A: Use Stack Overflow, GitHub Discussions, or ask a mentor. Be specific about your error and what you’ve tried.

**Q: Can I use Windows/Mac/Linux?**
A: Yes! All steps work on any OS. Just adjust commands for your terminal if needed.

**Q: How do I deploy for free?**
A: Use Vercel (frontend), Render (backend), MongoDB Atlas, and Upstash Redis—all have free tiers.

---

## Glossary
- **CRUD:** Create, Read, Update, Delete (basic database operations)
- **API:** Application Programming Interface (how frontend talks to backend)
- **JWT:** JSON Web Token (used for authentication)
- **CORS:** Cross-Origin Resource Sharing (browser security feature)
- **Queue:** System for handling background jobs (e.g., Bull + Redis)
- **Cache:** Temporary storage for fast data access (e.g., node-cache)
- **Deployment:** Putting your app live on the internet

---

## Suggested Timeline
- **Module 1:** 1-2 days (setup, tools)
- **Module 2:** 2-3 days (backend basics)
- **Module 3:** 2-3 days (frontend basics)
- **Module 4:** 2-3 days (CRUD & auth)
- **Module 5:** 2-3 days (advanced features)
- **Module 6:** 1-2 days (deployment)
- **Module 7:** Ongoing (interview prep)

*Adjust as needed—go at your own pace!*
