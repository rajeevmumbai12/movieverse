# Quick Start Guide - MovieVerse

## Prerequisites

### 1. Install Node.js (if not already installed)
**Download from:** [https://nodejs.org/](https://nodejs.org/) (v14 or higher)

**Verify installation:**
```bash
node --version
npm --version
```

### 2. Install MongoDB (if not already installed)

**Windows:**
```bash
# Using Chocolatey
choco install mongodb

# Or download installer from:
# https://www.mongodb.com/try/download/community
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

**Verify Installation:**
```bash
mongod --version
```

---

## Fast Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

### Step 2: Configure Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env

# Windows (PowerShell): copy .env.example .env
```
The `.env` file is already configured for local development. Only update if needed:
- Change `MONGODB_URI` if using MongoDB Atlas
- Set `ENABLE_QUEUE=true` if you installed Redis

**Frontend:**
```bash
cd ../frontend
cp .env.example .env

# Windows (PowerShell): copy .env.example .env
```

### Step 3: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just ensure MONGODB_URI is updated in backend/.env
```

### Step 4: Seed the Database (Optional)
Add sample movies to get started quickly:
```bash
cd backend
npm run seed
```

### Step 5: Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# OR production mode
npm start
```
Backend runs on: http://localhost:5000

### Step 6: Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
```

### Step 7: Start Frontend
```bash
npm start
```
Frontend runs on: http://localhost:3000

## First Time Usage

### Create Admin Account
1. Open http://localhost:3000
2. Click "Register"
3. Fill in the form:
   - Name: Admin User
   - Email: admin@movieverse.com
   - Password: admin123
   - Role: **Select "Admin"**
4. Click Register

### Create Regular User Account
1. Click "Register" again (logout first if needed)
2. Fill in the form with different credentials
3. Role: Select "User"
4. Click Register

## Testing the Application

### As Admin User
- View all movies on home page
- Search for movies
- Click "Add Movie" to create new movie
- Click "Manage Movies" to edit/delete movies
- View movie details

### As Regular User
- View all movies on home page
- Search for movies
- View movie details
- (Cannot add/edit/delete movies)

## Common Commands

### Backend
```bash
cd backend
npm run dev      # Start development server
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
cd frontend
npm start        # Start development server
npm run build    # Build for production
```

## Environment Variables

Backend (.env) - Already configured, just update MongoDB URI if needed:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movieverse
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Optional: Redis Queue System (for async job processing)
ENABLE_QUEUE=false    # Set to 'true' if Redis is installed
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

**Note**: Queue system is optional. Set `ENABLE_QUEUE=true` only if you have Redis installed for async movie creation with background processing.

Frontend (.env) - Already configured:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Optional: Redis Setup (For Queue System)

### Install Redis (Optional - for better performance)
```bash
# Windows (using Chocolatey)
choco install redis

# macOS
brew install redis

# Ubuntu/Debian
sudo apt-get install redis-server
```

### Start Redis
```bash
redis-server
```

### Enable Queue in Backend
Update `backend/.env`:
```
ENABLE_QUEUE=true
```

**Benefits with Redis:**
- Instant API responses (202 status)
- Background job processing
- Automatic retries on failures
- Better scalability for high traffic

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check the connection string in backend/.env

### "Port 5000 already in use"
- Change PORT in backend/.env to another port (e.g., 5001)
- Update proxy in frontend/package.json

### "CORS error"
- Make sure backend is running
- Check API URL in frontend/.env

### "Module not found"
- Run `npm install` in both backend and frontend directories

## Default Test Credentials

After seeding and creating accounts:
- Admin: admin@movieverse.com / admin123
- User: user@movieverse.com / user123

## Next Steps

1. Customize the styling in frontend
2. Add more movies through the admin panel
3. Integrate with IMDb API for automatic data fetching
4. Deploy to production (Heroku, Vercel, etc.)

---

Happy coding! 🎬
