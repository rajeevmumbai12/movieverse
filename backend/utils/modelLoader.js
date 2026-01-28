const mongoose = require('mongoose');

// Clear all cached models to ensure fresh start
const clearModels = () => {
  Object.keys(mongoose.models).forEach(key => {
    delete mongoose.models[key];
  });
  Object.keys(mongoose.modelSchemas).forEach(key => {
    delete mongoose.modelSchemas[key];
  });
};

// Model loader that ensures models are only created after connection
const getModel = (modelName) => {
  // Ensure connection exists and is ready
  if (mongoose.connection.readyState !== 1) {
    throw new Error(`Database not connected (readyState: ${mongoose.connection.readyState}). Call connectDB() first.`);
  }
  
  // Check if model already exists
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  
  // Clear any stale cached models
  clearModels();
  
  // Load the model file which will register it
  if (modelName === 'User') {
    require('../models/User');
  } else if (modelName === 'Movie') {
    require('../models/Movie');
  }
  
  return mongoose.models[modelName];
};

module.exports = { getModel, clearModels };
