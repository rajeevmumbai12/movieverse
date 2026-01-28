const mongoose = require('mongoose');

// Disable buffering globally for serverless
mongoose.set('bufferCommands', false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Check if we have a live connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('Using cached connection, readyState:', mongoose.connection.readyState);
    return cached.conn;
  }

  // Reset if stale
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    console.log('Resetting stale connection, readyState was:', mongoose.connection.readyState);
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('Creating new connection...');
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;

    // CRITICAL: Wait for connection to be fully ready
    let attempts = 0;
    while (mongoose.connection.readyState !== 1 && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (mongoose.connection.readyState !== 1) {
      throw new Error('Connection not ready after waiting');
    }

    console.log('MongoDB connected, readyState:', mongoose.connection.readyState);
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;
