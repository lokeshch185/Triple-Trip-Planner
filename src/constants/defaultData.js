export const defaultTripData = {
  '2024-12-14': {
    placesToGo: ['Calangute Beach', 'Baga Beach'],
    foodToEat: [{ place: 'Sea Breeze Restaurant' }, { place: 'Beach Shack' }],
    thingsToDo: ['Beach Walk', 'Water Sports'],
    placesToStay: [{ 
      hotel: 'Grand Plaza Hotel', 
      checkIn: '14:00', 
      checkOut: null, 
      address: 'Calangute Beach Road', 
      phone: '+91 832 227 6301', 
      confirmationNo: 'CNF123456' 
    }],
    timeline: [
      { time: '08:00', title: 'Train Departure', location: 'Mumbai Central', type: 'transport', cost: 80 },
      { time: '14:00', title: 'Hotel Check-in', location: 'Grand Plaza', type: 'stay', cost: 0 },
      { time: '16:00', title: 'Beach Walk', location: 'Calangute Beach', type: 'activity', cost: 0 },
      { time: '19:00', title: 'Dinner', location: 'Sea Breeze Restaurant', type: 'food', cost: 45 }
    ]
  },
  '2024-12-15': {
    placesToGo: ['Baga Beach'],
    foodToEat: [{ place: 'Hotel Restaurant' }, { place: 'Beach Shack' }],
    thingsToDo: ['Water Sports'],
    placesToStay: [{ 
      hotel: 'Grand Plaza Hotel', 
      checkIn: null, 
      checkOut: null, 
      address: 'Calangute Beach Road', 
      phone: '+91 832 227 6301', 
      confirmationNo: 'CNF123456' 
    }],
    timeline: [
      { time: '09:00', title: 'Breakfast', location: 'Hotel', type: 'food', cost: 20 },
      { time: '11:00', title: 'Water Sports', location: 'Baga Beach', type: 'activity', cost: 100 },
      { time: '13:30', title: 'Lunch', location: 'Beach Shack', type: 'food', cost: 35 }
    ]
  }
};

