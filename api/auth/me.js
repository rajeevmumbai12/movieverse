const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const mongoose = require('mongoose');
    const jwt = require('jsonwebtoken');

    // Create model inline after connection
    if (!mongoose.models.User) {
      const userSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6, select: false },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        createdAt: { type: Date, default: Date.now }
      }, { bufferCommands: false });

      mongoose.model('User', userSchema);
    }

    const User = mongoose.models.User;
    const jwt = require('jsonwebtoken');

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
};