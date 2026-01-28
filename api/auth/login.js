const { login } = require('../../backend/controllers/authController');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  await login(req, res);
};