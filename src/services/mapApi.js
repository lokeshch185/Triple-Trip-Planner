import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const mapApi = axios.create({
  baseURL: `${API_BASE_URL}/api/maps`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mapApiService = {
  // Geocode an address to get coordinates
  geocode: async (address) => {
    try {
      const response = await mapApi.get('/geocode', {
        params: { address }
      });
      return response.data;
    } catch (error) {
      console.error('Error geocoding:', error);
      throw error;
    }
  },

  // Search for places
  searchPlaces: async (query, lat, lng, type) => {
    try {
      const response = await mapApi.get('/places', {
        params: { query, lat, lng, type }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  },

  // Get route between two points
  getRoute: async (fromLat, fromLng, toLat, toLng) => {
    try {
      const response = await mapApi.get('/route', {
        params: { fromLat, fromLng, toLat, toLng }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting route:', error);
      throw error;
    }
  }
};

export default mapApi;

