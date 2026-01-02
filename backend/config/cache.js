const NodeCache = require('node-cache');

// Create cache instance with TTL (Time To Live)
const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default TTL
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false // Better performance
});

// Cache keys
const CACHE_KEYS = {
  ALL_MOVIES: 'all_movies',
  MOVIE_BY_ID: 'movie_',
  SEARCH_RESULTS: 'search_',
  SORTED_MOVIES: 'sorted_'
};

// Helper function to generate cache key
const generateCacheKey = (prefix, params) => {
  return `${prefix}${JSON.stringify(params)}`;
};

// Clear specific cache patterns
const clearMovieCache = () => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.startsWith(CACHE_KEYS.ALL_MOVIES) || 
        key.startsWith(CACHE_KEYS.SEARCH_RESULTS) || 
        key.startsWith(CACHE_KEYS.SORTED_MOVIES)) {
      cache.del(key);
    }
  });
};

module.exports = {
  cache,
  CACHE_KEYS,
  generateCacheKey,
  clearMovieCache
};
