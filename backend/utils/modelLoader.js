const mongoose = require('mongoose');

// Model loader that ensures models are only created after connection
const getModel = (modelName) => {
  // Check if model already exists
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  
  // If not connected, throw error
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  
  // Load the model file which will register it
  if (modelName === 'User') {
    require('../models/User');
  } else if (modelName === 'Movie') {
    require('../models/Movie');
  }
  
  return mongoose.models[modelName];
};

module.exports = { getModel };
