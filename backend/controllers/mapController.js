const axios = require('axios');

// Geocode an address to get coordinates
const geocode = async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required'
      });
    }

    // Using a free geocoding service (Nominatim OpenStreetMap)
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'HolidayPlanner/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      res.json({
        success: true,
        data: {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          displayName: result.display_name,
          address: result.address
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }
  } catch (error) {
    console.error('Error geocoding:', error);
    res.status(500).json({
      success: false,
      message: 'Error geocoding address',
      error: error.message
    });
  }
};

// Search for places near a location
const searchPlaces = async (req, res) => {
  try {
    const { query, lat, lng, type } = req.query;
    
    if (!query && (!lat || !lng)) {
      return res.status(400).json({
        success: false,
        message: 'Query or coordinates are required'
      });
    }

    // Using Nominatim for place search
    const searchQuery = query || `${lat},${lng}`;
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: type ? `${query} ${type}` : query,
        format: 'json',
        limit: 10,
        ...(lat && lng && {
          lat: lat,
          lon: lng,
          radius: 5000 // 5km radius
        })
      },
      headers: {
        'User-Agent': 'HolidayPlanner/1.0'
      }
    });

    const places = response.data.map(place => ({
      name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      type: place.type,
      category: place.category
    }));

    res.json({
      success: true,
      data: places
    });
  } catch (error) {
    console.error('Error searching places:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching places',
      error: error.message
    });
  }
};

// Calculate route between two points
const getRoute = async (req, res) => {
  try {
    const { fromLat, fromLng, toLat, toLng } = req.query;
    
    if (!fromLat || !fromLng || !toLat || !toLng) {
      return res.status(400).json({
        success: false,
        message: 'All coordinates are required'
      });
    }

    // Using OpenRouteService for routing (free alternative to Google Directions)
    const ORS_API_KEY = process.env.ORS_API_KEY || '';
    
    if (!ORS_API_KEY) {
      // Fallback: return straight line distance
      const distance = calculateDistance(
        parseFloat(fromLat),
        parseFloat(fromLng),
        parseFloat(toLat),
        parseFloat(toLng)
      );
      
      return res.json({
        success: true,
        data: {
          distance: distance,
          duration: null,
          route: null,
          message: 'Route service not configured. Showing straight-line distance.'
        }
      });
    }

    const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
      params: {
        api_key: ORS_API_KEY,
        start: `${fromLng},${fromLat}`,
        end: `${toLng},${toLat}`
      }
    });

    const route = response.data.features[0];
    const distance = route.properties.segments[0].distance / 1000; // Convert to km
    const duration = route.properties.segments[0].duration / 60; // Convert to minutes

    res.json({
      success: true,
      data: {
        distance: distance.toFixed(2),
        duration: Math.round(duration),
        route: route.geometry.coordinates.map(coord => ({
          lng: coord[0],
          lat: coord[1]
        }))
      }
    });
  } catch (error) {
    console.error('Error getting route:', error);
    // Fallback to straight line distance
    const distance = calculateDistance(
      parseFloat(req.query.fromLat),
      parseFloat(req.query.fromLng),
      parseFloat(req.query.toLat),
      parseFloat(req.query.toLng)
    );
    
    res.json({
      success: true,
      data: {
        distance: distance,
        duration: null,
        route: null,
        message: 'Route calculation failed. Showing straight-line distance.'
      }
    });
  }
};

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance.toFixed(2);
}

module.exports = {
  geocode,
  searchPlaces,
  getRoute
};

