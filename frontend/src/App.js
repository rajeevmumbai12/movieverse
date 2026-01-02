import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditMovie from './pages/AddEditMovie';
import ManageMovies from './pages/ManageMovies';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            
            <Route path="/search" element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            } />
            
            <Route path="/movie/:id" element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            } />
            
            <Route path="/admin/add-movie" element={
              <PrivateRoute adminOnly={true}>
                <AddEditMovie />
              </PrivateRoute>
            } />
            
            <Route path="/admin/edit-movie/:id" element={
              <PrivateRoute adminOnly={true}>
                <AddEditMovie />
              </PrivateRoute>
            } />
            
            <Route path="/admin/movies" element={
              <PrivateRoute adminOnly={true}>
                <ManageMovies />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
