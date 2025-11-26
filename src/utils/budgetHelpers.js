import { getDaysArray } from './dateHelpers';

export const calculateTotalBudget = (tripData, startDate, endDate) => {
  let total = { stay: 0, transport: 0, food: 0, activities: 0 };
  getDaysArray(startDate, endDate).forEach(date => {
    const day = tripData[date];
    if (day && day.timeline) {
      day.timeline.forEach(act => {
        if (act.type === 'transport') total.transport += act.cost || 0;
        else if (act.type === 'food') total.food += act.cost || 0;
        else if (act.type === 'activity') total.activities += act.cost || 0;
      });
    }
  });
  return total;
};

export const getTransportFromTimeline = (date, tripData, destination) => {
  const day = tripData[date];
  if (!day || !day.timeline) return null;
  const transportActivity = day.timeline.find(act => act.type === 'transport');
  if (!transportActivity) return null;
  
  // Extract transport details from activity
  return {
    type: transportActivity.title.includes('Train') ? 'Train' : 
          transportActivity.title.includes('Flight') ? 'Flight' :
          transportActivity.title.includes('Car') || transportActivity.title.includes('Taxi') ? 'Car' : 'Bus',
    name: transportActivity.title,
    time: transportActivity.time,
    from: transportActivity.location,
    to: destination,
    cost: transportActivity.cost || 0
  };
};

