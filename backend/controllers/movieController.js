const { cache, CACHE_KEYS, generateCacheKey, clearMovieCache } = require('../config/cache');
const { getModel } = require('../utils/modelLoader');

// @desc    Get all movies with pagination, sorting, and search
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  try {
    const Movie = getModel('Movie');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Generate cache key based on query params
    const cacheKey = generateCacheKey(CACHE_KEYS.ALL_MOVIES, {
      page,
      limit,
      search: req.query.search,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder
    });

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached data');
      return res.json(cachedData);
    }

    // Search query
    let query = {};
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOptions = {};
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    sortOptions[sortBy] = sortOrder;

    // Use lean() for better performance - returns plain JS objects
    const movies = await Movie.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    const total = await Movie.countDocuments(query);

    const response = {
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    };

    // Store in cache
    cache.set(cacheKey, response);

    res.json(response);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = async (req, res) => {
  try {
    const Movie = getModel('Movie');
    const cacheKey = `${CACHE_KEYS.MOVIE_BY_ID}${req.params.id}`;

    // Check cache
    const cachedMovie = cache.get(cacheKey);
    if (cachedMovie) {
      console.log('Returning cached movie');
      return res.json(cachedMovie);
    }

    const movie = await Movie.findById(req.params.id).lean();
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Cache the movie
    cache.set(cacheKey, movie);

    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
  try {
    const Movie = getModel('Movie');
    const movieData = {
      ...req.body,
      createdBy: req.user._id
    };

    const movie = await Movie.create(movieData);
    clearMovieCache();
    res.status(201).json(movie);

  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
  try {
    const Movie = getModel('Movie');
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Clear cache after update
    clearMovieCache();
    cache.del(`${CACHE_KEYS.MOVIE_BY_ID}${req.params.id}`);

    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
  try {
    const Movie = getModel('Movie');
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await Movie.findByIdAndDelete(req.params.id);

    // Clear cache after deletion
    clearMovieCache();
    cache.del(`${CACHE_KEYS.MOVIE_BY_ID}${req.params.id}`);

    res.json({ message: 'Movie removed' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: error.message });
  }
};
