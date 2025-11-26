const express = require('express');
const router = express.Router();
const { geocode, searchPlaces, getRoute } = require('../controllers/mapController');
const { apiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting
router.use(apiLimiter);

// Geocode an address
router.get('/geocode', geocode);

// Search for places
router.get('/places', searchPlaces);

// Get route between two points
router.get('/route', getRoute);

module.exports = router;

