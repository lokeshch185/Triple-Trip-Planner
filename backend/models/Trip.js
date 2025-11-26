const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous', // For now, can be enhanced with authentication later
    index: true
  },
  tripName: {
    type: String,
    required: true,
    default: 'My Holiday Trip'
  },
  destination: {
    type: String,
    default: ''
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  tripData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for faster queries
TripSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Trip', TripSchema);

