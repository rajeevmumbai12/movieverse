# MovieVerse Full Stack Developer Learning Course

## Who is this for?
- Beginners who want to become job-ready full stack developers
- Anyone who wants to build a real-world MERN app step by step (from scratch, not by cloning)

---

## Visual Aids & Diagrams

**Folder Structure Example:**
```text
movieverse/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── queues/
│   ├── routes/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── App.js
│       └── ...
├── README.md
└── ...
```

**Architecture Diagram:**
```text
[Frontend (React)] <----> [Backend (Node.js/Express)] <----> [MongoDB]
                                         |
                                         v
                                 [Redis/Bull Queue]
```

**Screenshots (add your own):**
- ![VS Code Example](./screenshots/vscode-example.png)
- ![Postman API Test](./screenshots/postman-api-test.png)
- ![Debugging in Chrome DevTools](./screenshots/chrome-devtools-debug.png)

*Tip: Take your own screenshots as you work and save them in a `screenshots/` folder for easy reference!*

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

### 5. **Testing (Jest & Supertest)**
- Why testing matters
- Installing Jest (backend & frontend)
- Writing and running tests
- Using Supertest for API testing
- React Testing Library for frontend

### 6. **Advanced Backend**
- Connection pooling
- Caching (node-cache)
- Queue system (Bull + Redis)
- Async job processing
- Bulk operations
- Security best practices

### 7. **DevOps & Deployment**
- Environment setup
- Using .env files
- Deploying frontend (Vercel)
- Deploying backend (Render)
- Setting up MongoDB Atlas
- Setting up Upstash Redis
- Domain & SSL setup

### 8. **Best Practices & Security**
- Clean code habits
- Backend and frontend security tips
- Code quality tools

### 9. **Debugging**
- Debugging tools and extensions
- Debugging backend and frontend

### 10. **Interview Preparation**
- Common full stack interview questions
- System design basics
- Coding challenges (LeetCode, HackerRank)
- Resume & portfolio tips

---

## Step-by-Step Project Guide

### **Module 1: Setup & Tools**
**Install Node.js, MongoDB, Redis, Git, VS Code:**
- Download Node.js: https://nodejs.org/
- Download MongoDB: https://www.mongodb.com/try/download/community
- Download Redis:
  - Windows: https://github.com/tporadowski/redis/releases (download the latest .msi or .zip and follow instructions)
  - Mac: `brew install redis` (if you use Homebrew)
  - Linux: Use your package manager, e.g., `sudo apt install redis-server`
- Download Git: https://git-scm.com/
- Download Visual Studio Code: https://code.visualstudio.com/

**(Optional) Install Postman:**
- Download Postman for API testing: https://www.postman.com/downloads/

**Recommended VS Code Extensions:**
- ESLint (code linting)
- Prettier (code formatting)
- GitLens (Git supercharged)
- Bracket Pair Colorizer 2 (bracket highlighting)
- Material Icon Theme (file icons)
- REST Client (test APIs inside VS Code)
- MongoDB for VS Code (manage MongoDB visually)
- Thunder Client (lightweight API client)

**Recommended VS Code Extensions for Jest:**
- Jest (by Orta) — shows test results and inline errors in your editor
- Jest Runner — run or debug a single test or file with a click

**(Optional) Set Up GitHub Copilot:**
- Install the GitHub Copilot extension from the VS Code Marketplace
- Sign in with your GitHub account (requires a Copilot subscription or free trial)
- Enable Copilot suggestions in your editor
- Use Copilot to get code completions, explanations, and help as you code
- Learn more: https://docs.github.com/en/copilot

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

### **Module 4: Testing with Jest & Supertest**

**Why Learn Jest?**
- Jest is a popular JavaScript testing framework.
- It helps you write and run tests for your backend and frontend code.
- Testing improves code quality and confidence in your app.

**How to Install Jest (Backend):**
```bash
cd backend
npm install --save-dev jest supertest
```
- Add to `package.json`:
```json
"scripts": {
  "test": "jest"
}
```

**Create a Simple Test:**
- Create `backend/tests/sample.test.js`:
```javascript
test('Sample test', () => {
  expect(1 + 1).toBe(2);
});
```

**Run Tests:**
```bash
npm test
```

**Jest for Frontend (React) Testing:**
- Create React App comes with Jest pre-installed!
- To write a test, create a file like `src/App.test.js`:
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MovieVerse title', () => {
  render(<App />);
  expect(screen.getByText(/MovieVerse/i)).toBeInTheDocument();
});
```
- Run tests in the frontend folder:
```bash
npm test
```
- Learn more: https://testing-library.com/docs/react-testing-library/intro/

**Recommended VS Code Extensions for Jest:**
- Jest (by Orta) — shows test results and inline errors in your editor
- Jest Runner — run or debug a single test or file with a click

**Learn More:**
- Jest Docs: https://jestjs.io/docs/getting-started
- Supertest (for API testing): https://github.com/ladjs/supertest

*You can also use Jest for frontend (React) testing. See React docs for details!*

### **Module 5: Advanced Backend**
**Connection pooling:**
- Modify MongoDB connection in `backend/config/db.js`:
```javascript
const connectDB = async () => {
  const client = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};
```

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

### **Module 7: Best Practices & Security**
**Why It Matters:**
- Following best practices and security guidelines helps you write clean, maintainable, and safe code—crucial for real-world projects and interviews.

### General Best Practices
- Write clear, descriptive commit messages.
- Use meaningful variable and function names.
- Keep functions and files small and focused.
- Comment your code where logic is complex.
- Use version control (Git) and push code regularly.
- Keep dependencies up to date.

### Backend Security Tips
- Never commit secrets or passwords to Git (use `.env` files).
- Validate and sanitize all user input to prevent injection attacks.
- Use HTTPS in production.
- Hash passwords with bcryptjs before storing.
- Use JWTs for authentication and verify tokens on protected routes.
- Set CORS policies to restrict API access.
- Limit failed login attempts to prevent brute-force attacks.
- Keep your dependencies updated to avoid known vulnerabilities.

### Frontend Security Tips
- Never expose sensitive keys or secrets in frontend code.
- Validate user input on the client side (but always validate again on the server).
- Use HTTPS for all API requests in production.
- Avoid using `eval()` or dangerously setting HTML.
- Keep React and dependencies updated.

### Code Quality Tools
- Use ESLint and Prettier for consistent code style.
- Add tests (Jest) for critical logic and APIs.
- Use TypeScript (optional) for type safety as you advance.

### Learn More
- [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [React Security Best Practices](https://react.dev/learn/security)

---

### **Module 8: Debugging**
**Why Debugging Matters:**
- Debugging helps you find and fix errors faster, making you a better developer.

**VS Code Built-in Debugger:**
- You can set breakpoints, step through code, and inspect variables for Node.js and React apps.
- To debug backend (Node.js):
  1. Open your main server file (e.g., `server.js`).
  2. Click to the left of a line number to set a breakpoint.
  3. Press F5 or click the Run & Debug icon in the sidebar.
  4. Choose "Node.js" and start debugging.
- To debug frontend (React):
  1. Use Chrome DevTools (press F12 in your browser).
  2. Inspect elements, view console logs, and set breakpoints in the "Sources" tab.
  3. You can also use the "Debugger for Chrome" VS Code extension for advanced debugging.

**Helpful Debugging Extensions:**
- Debugger for Chrome (frontend/React)
- Node.js Debug (backend)
- Error Lens (highlights errors and warnings inline)

**General Debugging Tips:**
- Use `console.log()` to print variable values and trace code flow.
- Read error messages carefully—they often tell you exactly what’s wrong.
- Isolate the problem by commenting out code or using breakpoints.
- Search error messages on Google or Stack Overflow.
- Don’t be afraid to ask for help if you’re stuck!

---

## Frontend (React) Debugging Options for Beginners

**1. Chrome DevTools (No Setup Needed):**
- Press F12 or right-click and choose "Inspect" in Chrome/Edge.
- Use the "Console" tab for logs and errors.
- Use the "Sources" tab to set breakpoints and step through code.
- Use the "Elements" tab to inspect and edit HTML/CSS live.

**2. React Developer Tools (Browser Extension):**
- Install for Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/
- After installing, you’ll see a "React" tab in DevTools to inspect component tree, props, and state.

**3. VS Code Debugger for Chrome/Edge:**
- Install the "Debugger for Chrome" or "Debugger for Edge" extension in VS Code.
- Add a `launch.json` file (VS Code may prompt you to do this):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/frontend/src"
    }
  ]
}
```
- Set breakpoints in your React code and press F5 to start debugging.

**4. Useful Extensions:**
- Error Lens (highlights errors/warnings inline)
- ESLint (shows code issues as you type)
- React Developer Tools (browser extension, not VS Code)
- Debugger for Chrome/Edge (VS Code)

**5. Classic Console.log():**
- Use `console.log()` in your code to print values and debug logic quickly.

**Tips:**
- Always check the browser console for errors and warnings.
- Use breakpoints to pause code and inspect variables.
- Refresh the page after making code changes to see updates.

---

## Quick Reference Tables

| Command                | Purpose                        |
|------------------------|--------------------------------|
| npm start              | Start the app                  |
| npm test               | Run tests                      |
| npm install <package>  | Install a package              |
| git status             | Check git changes              |
| git add .              | Stage all changes              |
| git commit -m "msg"    | Commit changes                 |
| git push               | Push to remote repo            |

| HTTP Status | Meaning         |
|-------------|-----------------|
| 200         | OK              |
| 201         | Created         |
| 400         | Bad Request     |
| 401         | Unauthorized    |
| 404         | Not Found       |
| 500         | Server Error    |

---

## Project Milestones
- ✅ Backend API running and tested with Postman/Thunder Client
- ✅ Frontend UI loads and fetches data from backend
- ✅ Authentication (register/login) works
- ✅ CRUD operations for movies work
- ✅ Tests pass for backend and frontend
- ✅ App deployed and accessible online

---

## Accessibility (a11y) Tips
- Use semantic HTML tags (e.g., <nav>, <main>, <button>)
- Add alt text to all images
- Ensure good color contrast for readability
- Make forms accessible with labels
- Test navigation with keyboard (Tab key)
- Learn more: https://web.dev/accessibility/

---

## TypeScript (Optional Advanced Step)
- TypeScript adds static typing to JavaScript for fewer bugs
- You can migrate your backend or frontend to TypeScript as you advance
- Learn more: https://www.typescriptlang.org/docs/

---

## Community & Portfolio
- Share your progress and code on GitHub
- Write a blog post or LinkedIn article about your learning journey
- Add MovieVerse to your portfolio and resume
- Join dev communities (e.g., freeCodeCamp, DEV.to, Hashnode)

---

## Video Tutorials (per module)
- [freeCodeCamp Full Stack Course](https://www.youtube.com/watch?v=4Z9KEBexzcM)
- [Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)
- [React JS Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
- [Jest Testing Crash Course](https://www.youtube.com/watch?v=FgnxcUQ5vho)
- [MongoDB Tutorial](https://www.youtube.com/watch?v=ofme2o29ngU)
- [VS Code Debugging Guide](https://www.youtube.com/watch?v=H0XScE08hy8)
- [Web Accessibility Guide](https://www.youtube.com/watch?v=3f31oufqFSM)

---

## Module Checklists & FAQ

### After Each Module, Ask Yourself:
- [ ] Did I run all commands and create all files?
- [ ] Did I test the feature (API, UI, etc.)?
- [ ] Did I commit my changes with a clear message?
- [ ] Did I read and understand the code I wrote?

### Common Issues (FAQ)
- **Module 1:** Trouble installing Node.js/MongoDB/Redis? Check official docs and YouTube install guides.
- **Module 2:** API not working? Check server logs, .env, and MongoDB connection.
- **Module 3:** React app not loading? Check terminal for errors, ensure correct API URL.
- **Module 4:** Tests failing? Read error messages, check test file paths, and review sample tests.
- **Module 5:** Queue/caching not working? Check Redis status and config.
- **Module 6:** Deployment failed? Double-check environment variables and deployment logs.
- **Module 7:** Security warnings? Update dependencies and review best practices.
- **Module 8:** Debugging not working? Set breakpoints, use console.log, and check extension setup.
- **Module 9:** Interview prep? Practice coding daily and review system design basics.

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
- **Module 4:** 2-3 days (testing with Jest & Supertest)
- **Module 5:** 2-3 days (advanced features)
- **Module 6:** 1-2 days (deployment)
- **Module 7:** Ongoing (best practices, security, debugging, interview prep)

*Adjust as needed—go at your own pace!*
