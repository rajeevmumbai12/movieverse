const mongoose = require('mongoose');

// Set these BEFORE any connection attempts
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', false);

let cachedConnection = null;
let connectionPromise = null;

const connectDB = async () => {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1 && mongoose.connection.db) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  // If connection is in progress, wait for it
  if (connectionPromise) {
    console.log('Connection already in progress, waiting...');
    return connectionPromise;
  }

  // Create new connection
  connectionPromise = (async () => {
    try {
      console.log('Creating new database connection...');
      console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
      
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        minPoolSize: 2,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        bufferCommands: false,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
      // Wait for db object to be available
      let retries = 0;
      while (!conn.connection.db && retries < 10) {
        console.log('Waiting for db object to be ready...');
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }
      
      if (!conn.connection.db) {
        throw new Error('Database object not initialized after connection');
      }
      
      console.log('Database object ready');
      cachedConnection = conn.connection;
      
      return cachedConnection;
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
      console.error('Error name:', error.name);
      connectionPromise = null;
      throw error;
    }
  })();

  return connectionPromise;
};

module.exports = connectDB;
