const { getMe } = require('../../backend/controllers/authController');
const { protect } = require('../../backend/middleware/auth');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  await protect(req, res, async () => {
    await getMe(req, res);
  });
};