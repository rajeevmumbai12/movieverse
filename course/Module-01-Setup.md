# Module 1: Project Setup

> ⏱️ Time: 30 minutes

---

## Step 1: Create Project Folder

Open terminal and run:

```bash
mkdir movieverse
cd movieverse
mkdir backend frontend
```

---

## Step 2: Setup Backend

```bash
cd backend
npm init -y
```

Install packages:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken node-cache
npm install -D nodemon
```

---

## Step 3: Create Backend Files

Create these folders inside `backend/`:

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── .env
```

---

## Step 4: Create .env File

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movieverse
JWT_SECRET=mysecretkey123
JWT_EXPIRE=30d
```

> 💡 If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

---

## Step 5: Setup Frontend

Open a new terminal:

```bash
cd frontend
npx create-react-app .
```

Install packages:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios
```

---

## Step 6: Create Frontend Folders

Create these folders inside `frontend/src/`:

```
frontend/src/
├── components/
├── context/
├── pages/
├── services/
├── App.js
└── index.js
```

---

## Step 7: Update package.json

Add proxy to `frontend/package.json` (add before the last `}`):

```json
"proxy": "http://localhost:5000"
```

---

## ✅ Done!

Your folder structure:

```
movieverse/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    └── package.json
```

---

**Next → [Module 2: Backend](./Module-02-Backend.md)**
