import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const tripApi = axios.create({
  baseURL: `${API_BASE_URL}/api/trips`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get user ID (for now using a simple approach, can be enhanced with auth later)
const getUserId = () => {
  // Try to get from localStorage first
  let userId = localStorage.getItem('tripUserId');
  if (!userId) {
    // Generate a simple user ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('tripUserId', userId);
  }
  return userId;
};

export const tripApiService = {
  // Get trip data
  getTrip: async () => {
    try {
      const userId = getUserId();
      const response = await tripApi.get('/', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trip:', error);
      // Return default data on error
      return {
        success: false,
        data: {
          tripData: {},
          tripName: 'My Holiday Trip',
          destination: '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      };
    }
  },

  // Save trip data
  saveTrip: async (tripData, tripName, destination, startDate, endDate) => {
    try {
      const userId = getUserId();
      const response = await tripApi.post('/save', {
        userId,
        tripData,
        tripName,
        destination,
        startDate,
        endDate
      });
      return response.data;
    } catch (error) {
      console.error('Error saving trip:', error);
      throw error;
    }
  },

  // Clear trip data
  clearTrip: async () => {
    try {
      const userId = getUserId();
      const response = await tripApi.delete('/clear', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error clearing trip:', error);
      throw error;
    }
  }
};

export default tripApi;

