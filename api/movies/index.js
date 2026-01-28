const { getMovies, createMovie } = require('../../backend/controllers/movieController');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    if (req.method === 'GET') {
      await getMovies(req, res);
    } else if (req.method === 'POST') {
      await createMovie(req, res);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
};