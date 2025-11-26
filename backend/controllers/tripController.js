const Trip = require('../models/Trip');

// Get trip data (or create if doesn't exist)
const getTrip = async (req, res) => {
  try {
    const userId = 'user_1764112201181_dmhd1ldgh';
    
    let trip = await Trip.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!trip) {
      // Create default trip if none exists
      trip = new Trip({
        userId,
        tripName: 'My Holiday Trip',
        destination: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tripData: {}
      });
      await trip.save();
    }
    
    res.json({
      success: true,
      data: {
        tripData: trip.tripData,
        tripName: trip.tripName,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate
      }
    });
  } catch (error) {
    console.error('Error getting trip:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trip data',
      error: error.message
    });
  }
};

// Save/Update trip data
const saveTrip = async (req, res) => {
  try {
    const userId = req.body.userId || 'anonymous';
    const { tripData, tripName, destination, startDate, endDate } = req.body;
    
    let trip = await Trip.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!trip) {
      trip = new Trip({
        userId,
        tripData: tripData || {},
        tripName: tripName || 'My Holiday Trip',
        destination: destination || '',
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    } else {
      trip.tripData = tripData || trip.tripData;
      trip.tripName = tripName !== undefined ? tripName : trip.tripName;
      trip.destination = destination !== undefined ? destination : trip.destination;
      trip.startDate = startDate || trip.startDate;
      trip.endDate = endDate || trip.endDate;
    }
    
    await trip.save();
    console.log('Trip data saved successfully', trip);
    res.json({
      success: true,
      message: 'Trip data saved successfully',
      data: {
        tripData: trip.tripData,
        tripName: trip.tripName,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate
      }
    });
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving trip data',
      error: error.message
    });
  }
};

// Clear trip data
const clearTrip = async (req, res) => {
  try {
    const userId = req.query.userId || 'anonymous';
    
    const trip = await Trip.findOne({ userId }).sort({ createdAt: -1 });
    
    if (trip) {
      trip.tripData = {};
      trip.tripName = 'My Holiday Trip';
      trip.destination = '';
      await trip.save();
    }
    
    res.json({
      success: true,
      message: 'Trip data cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing trip:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing trip data',
      error: error.message
    });
  }
};

module.exports = {
  getTrip,
  saveTrip,
  clearTrip
};

