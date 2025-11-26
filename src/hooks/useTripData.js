import { useState, useEffect, useRef } from 'react';
import { tripApiService } from '../services/tripApi';
import { defaultTripData } from '../constants/defaultData';

export const useTripData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripName, setTripName] = useState('My Holiday Trip');
  const [destination, setDestination] = useState('');
  const [tripData, setTripData] = useState({});
  const saveTimeoutRef = useRef(null);

  // Load trip data on mount
  useEffect(() => {
    const loadTripData = async () => {
      try {
        setIsLoading(true);
        const response = await tripApiService.getTrip();
        
        if (response.success && response.data) {
          const data = response.data;
          setTripData(data.tripData || defaultTripData);
          setTripName(data.tripName || 'My Holiday Trip');
          setDestination(data.destination || '');
          setStartDate(data.startDate || new Date().toISOString().split('T')[0]);
          setEndDate(data.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        } else {
          // Fallback to default data
          setTripData(defaultTripData);
          setTripName('My Holiday Trip');
          setDestination('');
          setStartDate(new Date().toISOString().split('T')[0]);
          setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        }
      } catch (error) {
        console.error('Error loading trip data:', error);
        // Fallback to default data
        setTripData(defaultTripData);
        setTripName('My Holiday Trip');
        setDestination('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTripData();
  }, []);

  // Debounced save function - saves after 1 second of no changes
  const saveTripData = async (tripDataToSave, tripNameToSave, destinationToSave, startDateToSave, endDateToSave) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await tripApiService.saveTrip(
          tripDataToSave,
          tripNameToSave,
          destinationToSave,
          startDateToSave,
          endDateToSave
        );
      } catch (error) {
        console.error('Error saving trip data:', error);
        // Optionally show error notification to user
      }
    }, 1000); // Wait 1 second after last change
  };

  // Save to API whenever relevant state changes (with debouncing)
  useEffect(() => {
    if (!isLoading) {
      saveTripData(tripData, tripName, destination, startDate, endDate);
    }

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [tripData, tripName, destination, startDate, endDate, isLoading]);

  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all trip data?')) {
      try {
        await tripApiService.clearTrip();
        setTripData({});
        setTripName('My Holiday Trip');
        setDestination('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error clearing trip data:', error);
        // Still clear local state even if API call fails
        setTripData({});
        setTripName('My Holiday Trip');
        setDestination('');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      }
    }
  };

  return {
    tripData,
    setTripData,
    tripName,
    setTripName,
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearAllData,
    isLoading
  };
};
