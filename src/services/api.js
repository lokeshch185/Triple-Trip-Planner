import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL + '/api/mgnrega' || 'http://localhost:5000/api/mgnrega';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mgnregaApi = {
  // Get district performance data
  getDistrictPerformance: async (district, state = 'Uttar Pradesh', year, month) => {
    const params = { district, state };
    if (year) params.year = year;
    if (month) params.month = month;
    const response = await api.get('/district', { params });
    return response.data;
  },

  // Get historical data
  getDistrictHistory: async (district, state = 'Uttar Pradesh', limit = 12) => {
    const response = await api.get('/history', {
      params: { district, state, limit },
    });
    return response.data;
  },

  // Get comparative data
  getDistrictComparison: async (district, state = 'Uttar Pradesh', year, month) => {
    const response = await api.get('/compare', {
      params: { district, state, year, month },
    });
    return response.data;
  },

  // Detect district from location
  detectDistrict: async (latitude, longitude) => {
    const response = await api.get('/detect', {
      params: { latitude, longitude },
    });
    return response.data;
  },

  // Get list of districts
  getDistricts: async (state = 'Uttar Pradesh') => {
    const response = await api.get('/districts', {
      params: { state },
    });
    return response.data;
  },

  // Get summary statistics
  getSummaryStats: async (state = 'Uttar Pradesh', year) => {
    const params = { state };
    if (year) params.year = year;
    const response = await api.get('/stats', { params });
    return response.data;
  },
};

export default api;

