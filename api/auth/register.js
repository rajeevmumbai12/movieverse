const { register } = require('../../backend/controllers/authController');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    await connectDB();
    require('../../backend/models/User');
    await register(req, res);
  } catch (error) {
    console.error('Register endpoint error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};