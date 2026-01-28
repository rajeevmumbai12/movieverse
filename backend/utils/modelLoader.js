const mongoose = require('mongoose');

const getModel = (modelName) => {
  // Return if already exists
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  
  // Load the model file
  if (modelName === 'User') {
    require('../models/User');
  } else if (modelName === 'Movie') {
    require('../models/Movie');
  }
  
  return mongoose.models[modelName];
};

module.exports = { getModel };
