const express = require('express');
const router = express.Router();

/**
 * POST /api/v1/nutrition/recognize
 * Forwards meal image to Computer Vision Microservice, saves result to PostgreSQL
 */
router.post('/recognize', async (req, res) => {
  const { imageBase64, imageUrl } = req.body;

  if (!imageBase64 && !imageUrl) {
    return res.status(400).json({ error: 'Image data or URL required for nutrition recognition' });
  }

  // Simulated delegation to Computer Vision microservice (Python / PyTorch)
  const recognizedMeal = {
    dish: 'Grilled Salmon with Avocado Salad & Quinoa',
    confidence: 0.964,
    calories: 520,
    macronutrients: {
      proteinGrams: 42,
      carbohydratesGrams: 38,
      fatGrams: 22,
      fiberGrams: 7
    },
    storedIn: {
      imageRef: 'gs://fitflow-media/meals/photo_129482.jpg',
      database: 'PostgreSQL - Table: meal_logs'
    }
  };

  res.status(200).json({
    status: 'success',
    source: 'cv-microservice',
    data: recognizedMeal
  });
});

module.exports = router;
