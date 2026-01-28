const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => {
      console.log('MongoDB Connected:', mongoose.connection.host);
      return mongoose;
    }).catch((error) => {
      cached.promise = null; // Reset promise on error so next call can retry
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    throw error;
  }
};

module.exports = connectDB;
