const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 0,
    max: 10
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please add a release date']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  director: {
    type: String,
    required: [true, 'Please add a director']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre']
  },
  cast: {
    type: [String],
    default: []
  },
  posterUrl: {
    type: String,
    default: ''
  },
  imdbId: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { bufferCommands: false });

// Delete existing model to ensure clean state in serverless
delete mongoose.models.Movie;
delete mongoose.connection.models.Movie;

module.exports = mongoose.model('Movie', movieSchema);
