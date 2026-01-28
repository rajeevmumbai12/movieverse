const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new connection to:', process.env.MONGODB_URI?.substring(0, 30) + '...');
    cached.promise = mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully:', cached.conn.connection.readyState);
    return cached.conn;
  } catch (e) {
    console.error('MongoDB connection error:', e.message);
    cached.promise = null;
    throw e;
  }
}

module.exports = connectDB;
