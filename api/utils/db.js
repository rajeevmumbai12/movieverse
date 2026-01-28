const mongoose = require('mongoose');

// Set bufferCommands to false globally to prevent buffering issues
mongoose.set('bufferCommands', false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Check if we have a valid connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('Using cached connection, readyState:', mongoose.connection.readyState);
    return cached.conn;
  }

  // Reset if connection is not ready
  if (cached.conn && mongoose.connection.readyState !== 1) {
    console.log('Resetting stale connection, readyState was:', mongoose.connection.readyState);
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    console.log('Creating new connection...');
    cached.promise = mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    
    // Wait for connection to be fully ready
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for connection to be ready...');
      await new Promise((resolve) => {
        mongoose.connection.once('open', resolve);
      });
    }
    
    console.log('MongoDB connected, readyState:', mongoose.connection.readyState);
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e.message);
    cached.promise = null;
    cached.conn = null;
    throw e;
  }
}

module.exports = connectDB;
