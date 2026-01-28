module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
  
  try {
    const connectDB = require('../../../api/utils/db');
    await connectDB();
    
    const { movieQueue, isQueueAvailable } = require('../../../backend/queues/movieQueue');
    const { protect, authorize } = require('../../../backend/middleware/auth');
    
    await protect(req, res, async () => {
      await authorize('admin')(req, res, async () => {
        if (!isQueueAvailable() || !movieQueue) {
          return res.json({
            available: false,
            message: 'Queue system is not enabled'
          });
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
  } catch (error) {
    console.error('Queue stats error:', error);
    res.status(500).json({ message: error.message });
  }
};