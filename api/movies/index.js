const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  try {
    await connectDB();

    const mongoose = require('mongoose');

    // Create model inline after connection
    if (!mongoose.models.Movie) {
      const movieSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 10 },
        releaseDate: { type: Date, required: true },
        duration: { type: Number, required: true },
        director: { type: String, required: true },
        genre: { type: [String], required: true },
        cast: { type: [String], default: [] },
        posterUrl: { type: String, default: '' },
        imdbId: { type: String, default: '' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
      }, { bufferCommands: false });

      mongoose.model('Movie', movieSchema);
    }

    const Movie = mongoose.models.Movie;

    if (req.method === 'GET') {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let query = {};
      if (req.query.search) {
        query.$or = [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } }
        ];
      }

      let sortOptions = {};
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      sortOptions[sortBy] = sortOrder;

      const movies = await Movie.find(query)
        .sort(sortOptions)
        .limit(limit)
        .skip(skip)
        .lean();

      const total = await Movie.countDocuments(query);

      res.json({
        movies,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMovies: total
      });

    } else if (req.method === 'POST') {
      const jwt = require('jsonwebtoken');

      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const movieData = {
        ...req.body,
        createdBy: decoded.id
      };

      const movie = await Movie.create(movieData);
      res.status(201).json(movie);

    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Movies error:', error);
    res.status(500).json({ message: error.message });
  }
};