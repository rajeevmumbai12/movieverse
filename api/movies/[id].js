const { getMovie, updateMovie, deleteMovie } = require('../../backend/controllers/movieController');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    require('../../backend/models/Movie');
    if (req.method === 'GET') {
      await getMovie(req, res);
    } else if (req.method === 'PUT') {
      await updateMovie(req, res);
    } else if (req.method === 'DELETE') {
      await deleteMovie(req, res);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Movie by ID endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};