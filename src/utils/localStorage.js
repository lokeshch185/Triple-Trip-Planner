import { defaultTripData } from '../constants/defaultData';

export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('holidayPlannerData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old data structure if needed
      if (parsed.tripData && parsed.tripData['2024-12-14'] && parsed.tripData['2024-12-14'].activities) {
        // Old structure detected, migrate it
        const migrated = {};
        Object.keys(parsed.tripData).forEach(date => {
          const oldDay = parsed.tripData[date];
          migrated[date] = {
            placesToGo: oldDay.placesToGo || [],
            foodToEat: oldDay.foodToEat || [],
            thingsToDo: oldDay.thingsToDo || [],
            placesToStay: oldDay.placesToStay || (oldDay.stay ? [oldDay.stay] : []),
            timeline: oldDay.timeline || oldDay.activities || []
          };
        });
        parsed.tripData = migrated;
      }
      return {
        tripData: parsed.tripData || defaultTripData,
        tripName: parsed.tripName || 'My Goa Holiday',
        destination: parsed.destination || 'Goa, India',
        startDate: parsed.startDate || '2024-12-14',
        endDate: parsed.endDate || '2024-12-20'
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return {
    tripData: defaultTripData,
    tripName: 'My Goa Holiday',
    destination: 'Goa, India',
    startDate: '2024-12-14',
    endDate: '2024-12-20'
  };
};

export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('holidayPlannerData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem('holidayPlannerData');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

