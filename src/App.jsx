import React, { useState } from 'react';
import { useTripData } from './hooks/useTripData';
import { getDaysArray } from './utils/dateHelpers';
import { calculateTotalBudget } from './utils/budgetHelpers';
import TripHeader from './components/header/TripHeader';
import BudgetCards from './components/header/BudgetCards';
import DayCard from './components/day/DayCard';
import LeftSidebar from './components/sidebar/LeftSidebar';
import TimelineModal from './components/modals/TimelineModal';
import PlaceModal from './components/modals/PlaceModal';
import FoodModal from './components/modals/FoodModal';
import ThingModal from './components/modals/ThingModal';
import StayModal from './components/modals/StayModal';

const HolidayPlanner = () => {
  const {
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
  } = useTripData();

  const [expandedDays, setExpandedDays] = useState({});
  const [activeTab, setActiveTab] = useState({});
  const [editingTrip, setEditingTrip] = useState(false);
  
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showThingModal, setShowThingModal] = useState(false);
  const [showStayModal, setShowStayModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [timelineForm, setTimelineForm] = useState({
    time: '', title: '', location: '', type: 'activity', cost: 0, notes: ''
  });

  const [placeForm, setPlaceForm] = useState({ name: '' });
  const [foodForm, setFoodForm] = useState({ place: '' });
  const [thingForm, setThingForm] = useState({ name: '' });
  const [stayForm, setStayForm] = useState({
    hotel: '', checkIn: '', checkOut: '', address: '', phone: '', confirmationNo: ''
  });

  const toggleDay = (date) => {
    setExpandedDays(prev => ({ ...prev, [date]: !prev[date] }));
    if (!expandedDays[date]) {
      setActiveTab(prev => ({ ...prev, [date]: 'timeline' }));
    }
  };

  const resetTimelineForm = () => {
    setTimelineForm({ time: '', title: '', location: '', type: 'activity', cost: 0, notes: '' });
  };

  const resetStayForm = () => {
    setStayForm({ hotel: '', checkIn: '', checkOut: '', address: '', phone: '', confirmationNo: '' });
  };

  // Timeline functions
  const addTimelineItem = () => {
    if (!selectedDate) return;
    const newItem = { ...timelineForm, cost: parseFloat(timelineForm.cost) || 0 };
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        timeline: [...(prev[selectedDate]?.timeline || []), newItem].sort((a, b) => a.time.localeCompare(b.time))
      }
    }));
    resetTimelineForm();
    setShowTimelineModal(false);
    setEditingItem(null);
  };

  const updateTimelineItem = () => {
    if (!selectedDate || editingItem === null) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        timeline: prev[selectedDate].timeline.map((act, idx) => 
          idx === editingItem ? { ...timelineForm, cost: parseFloat(timelineForm.cost) || 0 } : act
        ).sort((a, b) => a.time.localeCompare(b.time))
      }
    }));
    resetTimelineForm();
    setShowTimelineModal(false);
    setEditingItem(null);
  };

  const deleteTimelineItem = (date, index) => {
    setTripData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        timeline: prev[date].timeline.filter((_, idx) => idx !== index)
      }
    }));
  };

  const openEditTimeline = (date, index) => {
    setSelectedDate(date);
    setEditingItem(index);
    setTimelineForm(tripData[date].timeline[index]);
    setShowTimelineModal(true);
  };

  // Places to Go functions
  const addPlace = () => {
    if (!selectedDate || !placeForm.name.trim()) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        placesToGo: [...(prev[selectedDate]?.placesToGo || []), placeForm.name.trim()]
      }
    }));
    setPlaceForm({ name: '' });
    setShowPlaceModal(false);
  };

  const deletePlace = (date, index) => {
    setTripData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        placesToGo: prev[date].placesToGo.filter((_, idx) => idx !== index)
      }
    }));
  };

  // Food to Eat functions
  const addFood = () => {
    if (!selectedDate || !foodForm.place.trim()) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        foodToEat: [...(prev[selectedDate]?.foodToEat || []), { place: foodForm.place.trim() }]
      }
    }));
    setFoodForm({ place: '' });
    setShowFoodModal(false);
  };

  const deleteFood = (date, index) => {
    setTripData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        foodToEat: prev[date].foodToEat.filter((_, idx) => idx !== index)
      }
    }));
  };

  // Things to Do functions
  const addThing = () => {
    if (!selectedDate || !thingForm.name.trim()) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        thingsToDo: [...(prev[selectedDate]?.thingsToDo || []), thingForm.name.trim()]
      }
    }));
    setThingForm({ name: '' });
    setShowThingModal(false);
  };

  const deleteThing = (date, index) => {
    setTripData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        thingsToDo: prev[date].thingsToDo.filter((_, idx) => idx !== index)
      }
    }));
  };

  // Places to Stay functions
  const addStay = () => {
    if (!selectedDate) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        placesToStay: [...(prev[selectedDate]?.placesToStay || []), stayForm]
      }
    }));
    resetStayForm();
    setShowStayModal(false);
    setEditingItem(null);
  };

  const updateStay = () => {
    if (!selectedDate || editingItem === null) return;
    setTripData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        placesToStay: prev[selectedDate].placesToStay.map((stay, idx) => 
          idx === editingItem ? stayForm : stay
        )
      }
    }));
    resetStayForm();
    setShowStayModal(false);
    setEditingItem(null);
  };

  const deleteStay = (date, index) => {
    setTripData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        placesToStay: prev[date].placesToStay.filter((_, idx) => idx !== index)
      }
    }));
  };

  const openEditStay = (date, index) => {
    setSelectedDate(date);
    setEditingItem(index);
    setStayForm(tripData[date].placesToStay[index]);
    setShowStayModal(true);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ tripData, startDate, endDate, tripName, destination }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tripName.replace(/\s+/g, '_')}_itinerary.json`;
    link.click();
  };

  const budget = calculateTotalBudget(tripData, startDate, endDate);
  const totalBudget = budget.stay + budget.transport + budget.food + budget.activities;
  const tripDays = getDaysArray(startDate, endDate).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your trip...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Modals */}
      <TimelineModal
        show={showTimelineModal}
        onClose={() => {
          setShowTimelineModal(false);
          setEditingItem(null);
          resetTimelineForm();
        }}
        timelineForm={timelineForm}
        setTimelineForm={setTimelineForm}
        editingItem={editingItem}
        onSave={editingItem !== null ? updateTimelineItem : addTimelineItem}
        onCancel={() => {
          setShowTimelineModal(false);
          setEditingItem(null);
          resetTimelineForm();
        }}
      />

      <PlaceModal
        show={showPlaceModal}
        onClose={() => {
          setShowPlaceModal(false);
          setPlaceForm({ name: '' });
        }}
        placeForm={placeForm}
        setPlaceForm={setPlaceForm}
        onSave={addPlace}
      />

      <FoodModal
        show={showFoodModal}
        onClose={() => {
          setShowFoodModal(false);
          setFoodForm({ place: '' });
        }}
        foodForm={foodForm}
        setFoodForm={setFoodForm}
        onSave={addFood}
      />

      <ThingModal
        show={showThingModal}
        onClose={() => {
          setShowThingModal(false);
          setThingForm({ name: '' });
        }}
        thingForm={thingForm}
        setThingForm={setThingForm}
        onSave={addThing}
      />

      <StayModal
        show={showStayModal}
        onClose={() => {
          setShowStayModal(false);
          resetStayForm();
          setEditingItem(null);
        }}
        stayForm={stayForm}
        setStayForm={setStayForm}
        editingItem={editingItem}
        onSave={editingItem !== null ? updateStay : addStay}
        onDelete={() => {
          deleteStay(selectedDate, editingItem);
          setShowStayModal(false);
          resetStayForm();
          setEditingItem(null);
        }}
      />

      <div className="max-w-[1600px] mx-auto">
        {/* Two Column Layout on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Sidebar - Only visible on large screens */}
          <div className="hidden lg:block">
            <LeftSidebar 
              destination={destination} 
              tripName={tripName}
              tripData={tripData}
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          {/* Right Column - Main Content */}
          <div>
            <TripHeader
              tripName={tripName}
              destination={destination}
              startDate={startDate}
              endDate={endDate}
              tripDays={tripDays}
              editingTrip={editingTrip}
              setEditingTrip={setEditingTrip}
              setTripName={setTripName}
              setDestination={setDestination}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onExport={exportData}
              onClear={clearAllData}
            />

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <BudgetCards budget={budget} totalBudget={totalBudget} tripDays={tripDays} />
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-4">
              {getDaysArray(startDate, endDate).map((date, index) => {
                const day = tripData[date] || { placesToGo: [], foodToEat: [], thingsToDo: [], placesToStay: [], timeline: [] };
                const isExpanded = expandedDays[date];
                const currentTab = activeTab[date] || 'timeline';

                return (
                  <DayCard
                    key={date}
                    date={date}
                    index={index}
                    day={day}
                    isExpanded={isExpanded}
                    activeTab={currentTab}
                    tripData={tripData}
                    destination={destination}
                    onToggle={toggleDay}
                    onTabChange={(date, tab) => setActiveTab(prev => ({ ...prev, [date]: tab }))}
                    onAddTimeline={(date) => {
                      setSelectedDate(date);
                      setShowTimelineModal(true);
                    }}
                    onAddPlace={(date) => {
                      setSelectedDate(date);
                      setShowPlaceModal(true);
                    }}
                    onAddFood={(date) => {
                      setSelectedDate(date);
                      setShowFoodModal(true);
                    }}
                    onAddThing={(date) => {
                      setSelectedDate(date);
                      setShowThingModal(true);
                    }}
                    onAddStay={(date) => {
                      setSelectedDate(date);
                      setShowStayModal(true);
                    }}
                    onEditTimeline={openEditTimeline}
                    onDeleteTimeline={deleteTimelineItem}
                    onDeletePlace={deletePlace}
                    onDeleteFood={deleteFood}
                    onDeleteThing={deleteThing}
                    onEditStay={openEditStay}
                    onDeleteStay={deleteStay}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPlanner;
