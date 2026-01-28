const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  try {
    await connectDB();

    const Movie = require('../models/Movie');
    const { id } = req.query;

    if (req.method === 'GET') {
      const movie = await Movie.findById(id).lean();

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.json(movie);

    } else if (req.method === 'PUT') {
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      res.json(updatedMovie);

    } else if (req.method === 'DELETE') {
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      await Movie.findByIdAndDelete(id);
      res.json({ message: 'Movie removed' });

    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Movie by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};