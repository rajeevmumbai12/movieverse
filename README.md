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
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing

### Frontend
- **React.js**: UI library
- **Material-UI**: Component library for styling and responsiveness
- **React Router**: Navigation
- **Axios**: HTTP client

## Project Structure

```
movieverse/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── movieController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Movie.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── movies.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
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
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update MongoDB URI if using MongoDB Atlas or different local setup
   - Change JWT_SECRET to a secure random string in production

4. Start the backend server:
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

3. Start the React development server:
```bash
npm start
```

The frontend application will run on `http://localhost:3000`

## Database Setup

### Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service:
```bash
mongod
```

### MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
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
- `POST /api/movies` - Create movie (admin only)
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)

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
