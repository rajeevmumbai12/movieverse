const Movie = require('../models/Movie');
const { cache, CACHE_KEYS, generateCacheKey, clearMovieCache } = require('../config/cache');
const { movieQueue, isQueueAvailable } = require('../queues/movieQueue');

// @desc    Get all movies with pagination, sorting, and search
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  try {
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

// @desc    Create new movie (with queue for lazy insertion)
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      createdBy: req.user._id
    };

    // Try to use queue if available
    console.log('Queue status - Available:', isQueueAvailable(), 'Queue exists:', !!movieQueue);
    if (isQueueAvailable() && movieQueue) {
      try {
        const job = await movieQueue.add('create-movie', { movieData }, {
          attempts: 3,
          timeout: 10000
        });

        console.log(`Movie queued for creation: Job ID ${job.id}`);

        // Don't wait for completion - true lazy insertion
        // Job will be processed in background
        clearMovieCache();

        return res.status(202).json({
          message: 'Movie creation queued successfully',
          jobId: job.id,
          queued: true,
          status: 'Job will be processed in background'
        });
      } catch (queueError) {
        console.log('Queue processing failed, using direct insertion');
      }
    }

    // Direct insertion (if queue unavailable or failed)
    console.log('Using direct database insertion');
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
