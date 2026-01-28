const { getMovie, updateMovie, deleteMovie } = require('../../backend/controllers/movieController');

module.exports = async (req, res) => {
  const id = req.query.id;
  if (req.method === 'GET') {
    await getMovie(req, res);
  } else if (req.method === 'PUT') {
    await updateMovie(req, res);
  } else if (req.method === 'DELETE') {
    await deleteMovie(req, res);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};