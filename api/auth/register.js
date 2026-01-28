const { register } = require('../../backend/controllers/authController');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    console.log('Attempting to connect to database...');
    const connection = await connectDB();
    console.log('Database connection ready state:', connection.readyState);
    console.log('Database name:', connection.db?.databaseName);
    
    // Ensure models are loaded after connection
    const User = require('../../backend/models/User');
    console.log('User model loaded, testing direct query...');
    
    // Test if we can actually query
    try {
      const testCount = await User.countDocuments().maxTimeMS(5000);
      console.log('Test query successful, user count:', testCount);
    } catch (testErr) {
      console.error('Test query failed:', testErr.message);
      throw testErr;
    }
    
    await register(req, res);
  } catch (error) {
    console.error('Register endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};