# Module 3: Frontend

> ⏱️ Time: 2-3 hours

---

## Step 1: API Service

Create `frontend/src/services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

Create `frontend/src/services/index.js`:

```javascript
import api from './api';

// Auth services
export const authService = {
  register: async (name, email, password, role = 'user') => {
    const res = await api.post('/auth/register', { name, email, password, role });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  },

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Movie services
export const movieService = {
  getMovies: async (page = 1, limit = 10, search = '') => {
    const res = await api.get('/movies', { params: { page, limit, search } });
    return res.data;
  },

  getMovie: async (id) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },

  createMovie: async (data) => {
    const res = await api.post('/movies', data);
    return res.data;
  },

  updateMovie: async (id, data) => {
    const res = await api.put(`/movies/${id}`, data);
    return res.data;
  },

  deleteMovie: async (id) => {
    const res = await api.delete(`/movies/${id}`);
    return res.data;
  }
};
```

---

## Step 2: Auth Context

Create `frontend/src/context/AuthContext.js`:

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data);
    return data;
  };

  const register = async (name, email, password, role) => {
    const data = await authService.register(name, email, password, role);
    setUser(data);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Step 3: Components

Create `frontend/src/components/Navbar.js`:

```javascript
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            🎬 MovieVerse
          </Link>
        </Typography>

        {user ? (
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/search">Search</Button>
            {isAdmin() && (
              <>
                <Button color="inherit" component={Link} to="/admin/add">Add Movie</Button>
                <Button color="inherit" component={Link} to="/admin/manage">Manage</Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
```

Create `frontend/src/components/MovieCard.js`:

```javascript
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onEdit, onDelete, showActions }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ⭐ {movie.rating}/10 • {movie.duration} min
        </Typography>
        <Box sx={{ mt: 1 }}>
          {movie.genre?.slice(0, 2).map((g, i) => (
            <Chip key={i} label={g} size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <Button size="small" onClick={() => navigate(`/movie/${movie._id}`)}>
          View Details
        </Button>
        {showActions && (
          <>
            <Button size="small" onClick={() => onEdit(movie)}>Edit</Button>
            <Button size="small" color="error" onClick={() => onDelete(movie._id)}>Delete</Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default MovieCard;
```

Create `frontend/src/components/PrivateRoute.js`:

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin()) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
```

---

## Step 4: Pages

Create `frontend/src/pages/Login.js`:

```javascript
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} margin="normal" required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link component={RouterLink} to="/register">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
```

Create `frontend/src/pages/Register.js`:

```javascript
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert, Link, MenuItem } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" value={name}
            onChange={(e) => setName(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} margin="normal" required />
          <TextField fullWidth select label="Role" value={role}
            onChange={(e) => setRole(e.target.value)} margin="normal">
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <Link component={RouterLink} to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
```

Create `frontend/src/pages/Home.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Pagination, Box } from '@mui/material';
import { movieService } from '../services';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMovies();
  }, [page]);

  const loadMovies = async () => {
    const data = await movieService.getMovies(page, 12);
    setMovies(data.movies);
    setTotalPages(data.totalPages);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Movies</Typography>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} />
        </Box>
      )}
    </Container>
  );
};

export default Home;
```

Create `frontend/src/pages/Search.js`:

```javascript
import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import { movieService } from '../services';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await movieService.getMovies(1, 50, search);
    setMovies(data.movies);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Search Movies</Typography>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)}
          label="Search by title" sx={{ mr: 2, width: 300 }} />
        <Button type="submit" variant="contained" sx={{ height: 56 }}>Search</Button>
      </Box>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
```

Create `frontend/src/pages/MovieDetails.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Grid, Chip, Box } from '@mui/material';
import { movieService } from '../services';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    const data = await movieService.getMovie(id);
    setMovie(data);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Back</Button>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img src={movie.posterUrl || 'https://via.placeholder.com/300x450'} 
              alt={movie.title} style={{ width: '100%', borderRadius: 8 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3">{movie.title}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              ⭐ {movie.rating}/10 • {movie.duration} min • {movie.director}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {movie.genre?.map((g, i) => <Chip key={i} label={g} sx={{ mr: 1 }} />)}
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>{movie.description}</Typography>
            {movie.cast?.length > 0 && (
              <Typography><strong>Cast:</strong> {movie.cast.join(', ')}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetails;
```

Create `frontend/src/pages/AddEditMovie.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Grid, Chip, Box } from '@mui/material';
import { movieService } from '../services';

const AddEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '', description: '', rating: '', releaseDate: '',
    duration: '', director: '', posterUrl: ''
  });
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState('');
  const [cast, setCast] = useState([]);
  const [castInput, setCastInput] = useState('');

  useEffect(() => {
    if (isEdit) loadMovie();
  }, [id]);

  const loadMovie = async () => {
    const movie = await movieService.getMovie(id);
    setForm({
      title: movie.title, description: movie.description, rating: movie.rating,
      releaseDate: movie.releaseDate.split('T')[0], duration: movie.duration,
      director: movie.director, posterUrl: movie.posterUrl || ''
    });
    setGenres(movie.genre || []);
    setCast(movie.cast || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, genre: genres, cast };
    if (isEdit) {
      await movieService.updateMovie(id, data);
    } else {
      await movieService.createMovie(data);
    }
    navigate('/admin/manage');
  };

  const addGenre = () => {
    if (genreInput && !genres.includes(genreInput)) {
      setGenres([...genres, genreInput]);
      setGenreInput('');
    }
  };

  const addCast = () => {
    if (castInput && !cast.includes(castInput)) {
      setCast([...cast, castInput]);
      setCastInput('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>{isEdit ? 'Edit' : 'Add'} Movie</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Rating (0-10)" type="number" value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Duration (min)" type="number" value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Release Date" type="date" value={form.releaseDate}
                onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
                InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Director" value={form.director}
                onChange={(e) => setForm({ ...form, director: e.target.value })} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Poster URL" value={form.posterUrl}
                onChange={(e) => setForm({ ...form, posterUrl: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField label="Add Genre" value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)} />
                <Button onClick={addGenre}>Add</Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                {genres.map((g, i) => (
                  <Chip key={i} label={g} onDelete={() => setGenres(genres.filter((_, j) => j !== i))} sx={{ mr: 1 }} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField label="Add Cast" value={castInput}
                  onChange={(e) => setCastInput(e.target.value)} />
                <Button onClick={addCast}>Add</Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                {cast.map((c, i) => (
                  <Chip key={i} label={c} onDelete={() => setCast(cast.filter((_, j) => j !== i))} sx={{ mr: 1 }} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large">
                {isEdit ? 'Update' : 'Add'} Movie
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEditMovie;
```

Create `frontend/src/pages/ManageMovies.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { movieService } from '../services';
import MovieCard from '../components/MovieCard';

const ManageMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await movieService.getMovies(1, 100);
    setMovies(data.movies);
  };

  const handleDelete = async () => {
    await movieService.deleteMovie(deleteId);
    setMovies(movies.filter((m) => m._id !== deleteId));
    setDeleteId(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Movies</Typography>
      <Button variant="contained" onClick={() => navigate('/admin/add')} sx={{ mb: 3 }}>
        + Add New Movie
      </Button>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard movie={movie} showActions
              onEdit={(m) => navigate(`/admin/edit/${m._id}`)}
              onDelete={(id) => setDeleteId(id)} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete this movie?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageMovies;
```

---

## Step 5: Main App

Replace `frontend/src/App.js`:

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditMovie from './pages/AddEditMovie';
import ManageMovies from './pages/ManageMovies';

const theme = createTheme({
  palette: { mode: 'dark' }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
            <Route path="/admin/add" element={<PrivateRoute adminOnly><AddEditMovie /></PrivateRoute>} />
            <Route path="/admin/edit/:id" element={<PrivateRoute adminOnly><AddEditMovie /></PrivateRoute>} />
            <Route path="/admin/manage" element={<PrivateRoute adminOnly><ManageMovies /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

Replace `frontend/src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## ✅ Frontend Complete!

Your pages:
- `/login` - Login page
- `/register` - Register page
- `/` - Home (all movies)
- `/search` - Search movies
- `/movie/:id` - Movie details
- `/admin/add` - Add movie (admin)
- `/admin/edit/:id` - Edit movie (admin)
- `/admin/manage` - Manage movies (admin)

---

**Next → [Module 4: Connect & Run](./Module-04-Connect.md)**
