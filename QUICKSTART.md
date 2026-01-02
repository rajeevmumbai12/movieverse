# Quick Start Guide - MovieVerse

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

# If using MongoDB Atlas, just update the MONGODB_URI in backend/.env
```

### Step 3: Seed the Database (Optional)
Add sample movies to get started quickly:
```bash
npm run seed
```

### Step 4: Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# OR production mode
npm start
```
Backend runs on: http://localhost:5000

### Step 5: Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
```

### Step 6: Start Frontend
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
```

Frontend (.env) - Already configured:
```
REACT_APP_API_URL=http://localhost:5000/api
```

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
