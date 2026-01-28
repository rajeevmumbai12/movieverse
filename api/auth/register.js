const { register } = require('../../backend/controllers/authController');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('Connection ready, loading models...');
    
    // Ensure models are loaded after connection
    require('../../backend/models/User');
    console.log('User model loaded');
    
    await register(req, res);
  } catch (error) {
    console.error('Register endpoint error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false,
      message: 'Database connection failed', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};