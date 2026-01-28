const mongoose = require('mongoose');

const connectDB = async () => {
  // Reuse existing connection if available
  if (mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return;
  }

  if (mongoose.connection.readyState === 2) {
    console.log('Database connection in progress, waiting...');
    await new Promise(resolve => {
      mongoose.connection.once('connected', resolve);
    });
    return;
  }

  try {
    mongoose.set('bufferCommands', false);

    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
