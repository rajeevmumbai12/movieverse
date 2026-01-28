const { login } = require('../../backend/controllers/authController');
const connectDB = require('../utils/db');
const User = require('../../backend/models/User');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    await connectDB();
    await login(req, res);
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};