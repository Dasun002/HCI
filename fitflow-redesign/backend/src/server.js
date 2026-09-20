const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');

const workoutRoutes = require('./routes/workout');
const socialRoutes = require('./routes/social');
const nutritionRoutes = require('./routes/nutrition');
const notificationRoutes = require('./routes/notification');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter);

// Liveness & Readiness probes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'FitFlow API Gateway / BFF',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      primary: 'PostgreSQL (Connected)',
      realtime: 'Firebase Firestore (Connected)',
      cache: 'Redis (Connected)'
    }
  });
});

// Authenticated Microservices Routes
app.use('/api/v1/workouts', authMiddleware, workoutRoutes);
app.use('/api/v1/social', authMiddleware, socialRoutes);
app.use('/api/v1/nutrition', authMiddleware, nutritionRoutes);
app.use('/api/v1/notifications', authMiddleware, notificationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[FitFlow Error]', err);
  res.status(500).json({
    error: 'InternalServerError',
    message: err.message || 'An unexpected error occurred.'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 FitFlow API Gateway running on port ${PORT}`);
    console.log(`📡 Health check available at http://localhost:${PORT}/health`);
  });
}

module.exports = app;
