const { movieQueue, isQueueAvailable } = require('../../../backend/queues/movieQueue');
const { protect, authorize } = require('../../../backend/middleware/auth');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  await protect(req, res, async () => {
    await authorize('admin')(req, res, async () => {
      if (!isQueueAvailable() || !movieQueue) {
        res.json({
          available: false,
          message: 'Queue system is not enabled'
        });
        return;
      }
      const [waiting, active, completed, failed, delayed] = await Promise.all([
        movieQueue.getWaiting(),
        movieQueue.getActive(),
        movieQueue.getCompleted(),
        movieQueue.getFailed(),
        movieQueue.getDelayed()
      ]);
      res.json({
        available: true,
        stats: {
          waiting: waiting.length,
          active: active.length,
          completed: completed.length,
          failed: failed.length,
          delayed: delayed.length
        }
      });
    });
  });
};