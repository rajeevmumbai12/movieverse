const { getMe } = require('../../backend/controllers/authController');
const { protect } = require('../../backend/middleware/auth');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    await connectDB();
    require('../../backend/models/User');
    await protect(req, res, async () => {
      await getMe(req, res);
    });
  } catch (error) {
    console.error('GetMe endpoint error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};