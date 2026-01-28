const { getMovies, createMovie } = require('../../backend/controllers/movieController');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    await getMovies(req, res);
  } else if (req.method === 'POST') {
    await createMovie(req, res);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};