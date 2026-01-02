# MovieVerse - MERN Stack Movie Application

A full-stack movie web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based access control for users and administrators.

## Features

### User Features
- **Authentication**: Secure login and registration system with JWT tokens
- **View Movies**: Browse all movies with detailed information
- **Search**: Search movies by title or description
- **Sort & Filter**: Sort movies by name, rating, release date, and duration
- **Pagination**: Browse movies with efficient pagination
- **Movie Details**: View comprehensive movie information including cast, director, genre, and ratings

### Admin Features
- **Add Movies**: Create new movie entries with detailed information
- **Edit Movies**: Update existing movie details
- **Delete Movies**: Remove movies from the database
- **Manage Movies**: Comprehensive admin panel for movie management

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database with connection pooling
- **Mongoose**: ODM for MongoDB with optimized indexing
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Bull**: Queue system for background job processing
- **Redis**: Optional - for queue backend and caching
- **node-cache**: In-memory caching for performance

### Frontend
- **React.js**: UI library
- **Material-UI**: Component library for styling and responsiveness
- **React Router**: Navigation
- **Axios**: HTTP client

### Performance & Scalability
- **Connection Pooling**: Handles concurrent database connections
- **Caching**: In-memory cache with 5-minute TTL
- **Database Indexing**: Optimized queries for search and sort
- **Queue System**: Background processing for movie creation
- **Lazy Loading**: Async data insertion with queue fallback

## Project Structure

```
movieverse/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cache.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── movieController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Movie.js
│   ├── queues/
│   │   └── movieQueue.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── movies.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── seed.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── MovieCard.js
    │   │   ├── Navbar.js
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AddEditMovie.js
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── ManageMovies.js
    │   │   ├── MovieDetails.js
    │   │   ├── Register.js
    │   │   └── Search.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .env
    ├── .gitignore
    └── package.json
```

## Installation & Setup

### Prerequisites

#### 1. Node.js (v14 or higher)
**Download and install from:** [https://nodejs.org/](https://nodejs.org/)

**Verify installation:**
```bash
node --version
npm --version
```

#### 2. MongoDB (local or Atlas)
See [Database Setup](#database-setup) section below for installation instructions.

#### 3. Redis (Optional - for queue system)
See [Queue System](#queue-system-optional) section for installation instructions.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Copy the example file
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env

# Or manually create .env file with these variables:
```

4. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movieverse
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Optional: Enable queue system (requires Redis)
ENABLE_QUEUE=false
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
   - Update `MONGODB_URI` if using MongoDB Atlas or different local setup
   - Change `JWT_SECRET` to a secure random string in production
   - Set `ENABLE_QUEUE=true` only if Redis is installed

5. Start the backend server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Copy the example file
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env

# Or manually create .env file with:
```

4. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
   - Update the URL if your backend runs on a different port

5. Start the React development server:
```bash
npm start
```

The frontend application will run on `http://localhost:3000`

## Database Setup

### Local MongoDB

**Installation:**

**Windows:**
```bash
# Using Chocolatey
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
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

**Start MongoDB:**
```bash
# Windows/macOS/Linux
mongod

# Or as a service (Linux)
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify Installation:**
```bash
mongod --version
mongo --version  # MongoDB shell
```

### MongoDB Atlas (Cloud Alternative)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` file

## Usage

### Creating Admin User
When registering, select "Admin" role from the dropdown to create an admin account. The first user should be created as an admin to manage movies.

### User Flow
1. Register/Login to access the application
2. Browse movies on the home page
3. Use search functionality to find specific movies
4. Sort movies by various criteria
5. Click on any movie to view detailed information

### Admin Flow
1. Login with admin credentials
2. Navigate to "Add Movie" to create new movie entries
3. Use "Manage Movies" to view all movies with edit/delete options
4. Edit existing movies by clicking the Edit button
5. Delete movies using the Delete button (with confirmation)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Movies
- `GET /api/movies` - Get all movies (with pagination, search, sort)
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie (admin only, queued if Redis enabled)
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)
- `GET /api/movies/admin/queue-stats` - View queue statistics (admin only)

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes on both frontend and backend
- Secure password hashing with bcrypt

### Movie Management
- Full CRUD operations for movies
- Image URL support for movie posters
- Multiple genres per movie
- Cast information
- IMDb integration support
- Comprehensive movie metadata (rating, duration, release date, etc.)

### Search & Sort
- Real-time search by title and description
- Sort by: Title, Rating, Release Date, Duration, Date Added
- Ascending/Descending order options

### User Interface
- Material-UI components for consistent design
- Responsive layout for all screen sizes
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Intuitive navigation with React Router

## Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Role-based access control
- Input validation
- CORS configuration

## Queue System (Optional)

The application supports an optional **Redis-backed queue system** for asynchronous job processing:

### Setup
1. Install Redis on your system
2. Start Redis server: `redis-server`
3. Enable in `backend/.env`:
   ```
   ENABLE_QUEUE=true
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

### Features
- **Instant API responses** - Movie creation returns immediately (HTTP 202)
- **Background processing** - Database insertions happen asynchronously
- **Automatic retries** - Failed jobs retry 3 times with exponential backoff
- **Job monitoring** - View queue stats at `/api/movies/admin/queue-stats`
- **Graceful fallback** - Works without Redis (direct database insertion)

### Monitoring Queue
Access queue statistics (admin only):
```bash
GET /api/movies/admin/queue-stats
```

Returns waiting, active, completed, and failed job counts with details.

## Development

### Available Scripts

Backend:
- `npm start` - Start server
- `npm run dev` - Start server with nodemon

Frontend:
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movieverse
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Future Enhancements
- IMDb API integration for automatic movie data fetching
- User reviews and ratings
- Watchlist functionality
- Movie recommendations
- Advanced filtering (by genre, year, director)
- User profiles
- Social features (share, like, comment)
- Video trailer integration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access if using MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in backend `.env`
   - Update proxy in frontend `package.json`

3. **CORS Errors**
   - Verify backend CORS configuration
   - Check API URL in frontend `.env`

4. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET is set
   - Verify token is being sent in headers

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is open source and available under the MIT License.

## Contact
For questions or support, please open an issue in the repository.

---

Built with ❤️ using MERN Stack
