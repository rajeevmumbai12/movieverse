const connectDB = require('../utils/db');
const { getMovies, createMovie } = require('../../backend/controllers/movieController');

module.exports = async (req, res) => {
  try {
    await connectDB();
    require('../../backend/models/Movie');
    if (req.method === 'GET') {
      await getMovies(req, res);
    } else if (req.method === 'POST') {
      await createMovie(req, res);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    console.error('Movies index endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};