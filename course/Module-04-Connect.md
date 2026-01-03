# Module 4: Connect & Run

> ⏱️ Time: 30 minutes

---

## Step 1: Add Sample Movies (Optional)

Create `backend/sampleData.js`:

```javascript
const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    releaseDate: "1994-09-23",
    duration: 142,
    director: "Frank Darabont",
    genre: ["Drama"],
    cast: ["Tim Robbins", "Morgan Freeman"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
    rating: 9.0,
    releaseDate: "2008-07-18",
    duration: 152,
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    cast: ["Christian Bale", "Heath Ledger"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
  },
  {
    title: "Inception",
    description: "A thief who steals secrets through dream-sharing technology is given the task of planting an idea into a CEO's mind.",
    rating: 8.8,
    releaseDate: "2010-07-16",
    duration: 148,
    director: "Christopher Nolan",
    genre: ["Action", "Sci-Fi", "Thriller"],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife intertwine in four tales of violence and redemption.",
    rating: 8.9,
    releaseDate: "1994-10-14",
    duration: 154,
    director: "Quentin Tarantino",
    genre: ["Crime", "Drama"],
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    releaseDate: "1999-03-31",
    duration: 136,
    director: "Lana Wachowski",
    genre: ["Action", "Sci-Fi"],
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    releaseDate: "2014-11-07",
    duration: 169,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  }
];

module.exports = sampleMovies;
```

Create `backend/seed.js`:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const sampleMovies = require('./sampleData');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    await Movie.insertMany(sampleMovies);
    console.log(`Added ${sampleMovies.length} sample movies`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDB();
```

Add seed script to `backend/package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed.js"
}
```

---

## Step 2: Start Everything

### Terminal 1 - Start MongoDB (if local)

```bash
mongod
```

### Terminal 2 - Seed Database & Start Backend

```bash
cd backend
npm run seed    # Add sample movies
npm run dev     # Start server
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### Terminal 3 - Start Frontend

```bash
cd frontend
npm start
```

Browser opens at http://localhost:3000

---

## Step 3: Test the App

### 1. Register an Admin User

1. Go to http://localhost:3000/register
2. Fill in:
   - Name: `Admin`
   - Email: `admin@test.com`
   - Password: `123456`
   - Role: `Admin`
3. Click Register

### 2. View Movies

1. You'll be redirected to Home page
2. You should see the sample movies

### 3. Search Movies

1. Click "Search" in navbar
2. Type "Dark" and click Search
3. You should see "The Dark Knight"

### 4. View Movie Details

1. Click "View Details" on any movie
2. You'll see full movie info

### 5. Add a New Movie (Admin)

1. Click "Add Movie" in navbar
2. Fill in movie details
3. Click "Add Movie"

### 6. Edit/Delete Movies (Admin)

1. Click "Manage" in navbar
2. Click Edit or Delete on any movie

### 7. Test as Regular User

1. Logout
2. Register a new user (Role: User)
3. Notice: Add Movie and Manage links are hidden

---

## 🎉 Congratulations!

You've built a full-stack MERN application with:

✅ User authentication (JWT)  
✅ Role-based access (User/Admin)  
✅ CRUD operations for movies  
✅ Search functionality  
✅ Responsive UI with Material-UI

---

## Common Issues

### "MongoDB connection failed"
- Make sure MongoDB is running
- Check your connection string in `.env`

### "Cannot GET /api/movies"
- Make sure backend is running on port 5000

### "Network Error" in frontend
- Check CORS is enabled in backend
- Check proxy in frontend package.json

### "Invalid token"
- Token expired, login again
- Clear localStorage and login again

---

## Next Steps

1. **Add more features:**
   - Movie ratings by users
   - Favorites list
   - Comments/Reviews

2. **Deploy your app:**
   - Frontend: Vercel or Netlify
   - Backend: Render or Railway
   - Database: MongoDB Atlas

3. **Learn more:**
   - Add testing with Jest
   - Add image upload
   - Add pagination to admin

---

## Quick Reference

### API Endpoints

```
POST   /api/auth/register   - Register user
POST   /api/auth/login      - Login user
GET    /api/auth/me         - Get current user

GET    /api/movies          - Get all movies
GET    /api/movies/:id      - Get one movie
POST   /api/movies          - Create movie (admin)
PUT    /api/movies/:id      - Update movie (admin)
DELETE /api/movies/:id      - Delete movie (admin)
```

### Project Structure

```
movieverse/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── movieController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Movie.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── movies.js
│   ├── server.js
│   ├── seed.js
│   └── sampleData.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── MovieCard.js
        │   └── PrivateRoute.js
        ├── context/AuthContext.js
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Home.js
        │   ├── Search.js
        │   ├── MovieDetails.js
        │   ├── AddEditMovie.js
        │   └── ManageMovies.js
        ├── services/
        │   ├── api.js
        │   └── index.js
        └── App.js
```

---

## 🌟 You Did It!

You've successfully built your first full-stack MERN application. This is a great foundation for building more complex applications in the future.

**Happy Coding! 🚀**
