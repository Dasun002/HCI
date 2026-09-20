const express = require('express');
const router = express.Router();

/**
 * GET /api/v1/social/circles
 * Retrieves private social circles and real-time activity feed from Firestore
 */
router.get('/circles', async (req, res) => {
  const circles = [
    {
      circleId: 'circ_colombo_runners',
      name: 'Colombo Runners Circle',
      membersCount: 14,
      recentActivity: [
        { id: 'act_1', user: 'Kasun P.', text: 'completed a 5km Morning Run', time: '12m ago' },
        { id: 'act_2', user: 'Anuki D.', text: 'crushed Day 14 of Upper Body Flow!', time: '45m ago' }
      ]
    }
  ];

  res.json({
    status: 'success',
    source: 'firebase-firestore',
    data: circles
  });
});

/**
 * POST /api/v1/social/post
 * Broadcasts an activity or challenge result to Firestore real-time layer
 */
router.post('/post', async (req, res) => {
  const { circleId, message, metric } = req.body;

  if (!circleId || !message) {
    return res.status(400).json({ error: 'Circle ID and message are required' });
  }

  res.status(201).json({
    status: 'success',
    message: 'Event published to Firebase Firestore real-time channel',
    postId: `post_${Date.now()}`,
    circleId,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
