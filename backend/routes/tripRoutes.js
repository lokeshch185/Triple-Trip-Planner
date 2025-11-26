const express = require('express');
const router = express.Router();
const { getTrip, saveTrip, clearTrip } = require('../controllers/tripController');
const { apiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to all routes
router.use(apiLimiter);

// Get trip data
router.get('/', getTrip);

// Save/Update trip data
router.post('/save', saveTrip);

// Clear trip data
router.delete('/clear', clearTrip);

module.exports = router;

