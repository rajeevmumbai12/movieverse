const mongoose = require('mongoose');

// Set these BEFORE any connection attempts
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', false);

let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  if (mongoose.connection.readyState === 2) {
    console.log('Database connection in progress, waiting...');
    return new Promise((resolve) => {
      mongoose.connection.once('connected', () => {
        cachedConnection = mongoose.connection;
        resolve(cachedConnection);
      });
    });
  }

  try {
    console.log('Creating new database connection...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    cachedConnection = conn.connection;
    
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
