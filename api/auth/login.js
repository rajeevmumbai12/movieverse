const connectDB = require('../utils/db');
const { login } = require('../../backend/controllers/authController');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    await connectDB();
    require('../../backend/models/User');
    await login(req, res);
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};