import React from 'react';
import TimelineTab from './tabs/TimelineTab';
import PlacesTab from './tabs/PlacesTab';
import FoodTab from './tabs/FoodTab';
import ThingsTab from './tabs/ThingsTab';
import StayTab from './tabs/StayTab';

const DayTabs = ({
  date,
  index,
  day,
  activeTab,
  onTabChange,
  onAddTimeline,
  onAddPlace,
  onAddFood,
  onAddThing,
  onAddStay,
  onEditTimeline,
  onDeleteTimeline,
  onDeletePlace,
  onDeleteFood,
  onDeleteThing,
  onEditStay,
  onDeleteStay
}) => {
  const tabs = ['timeline', 'placesToGo', 'foodToEat', 'thingsToDo', 'placesToStay'];
  const tabLabels = {
    timeline: 'Timeline',
    placesToGo: 'Places to Go',
    foodToEat: 'Food to Eat',
    thingsToDo: 'Things to Do',
    placesToStay: 'Places to Stay'
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(date, tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'timeline' && (
          <TimelineTab
            day={day}
            date={date}
            onAdd={onAddTimeline}
            onEdit={onEditTimeline}
            onDelete={onDeleteTimeline}
          />
        )}
        {activeTab === 'placesToGo' && (
          <PlacesTab
            day={day}
            date={date}
            onAdd={onAddPlace}
            onDelete={onDeletePlace}
          />
        )}
        {activeTab === 'foodToEat' && (
          <FoodTab
            day={day}
            date={date}
            onAdd={onAddFood}
            onDelete={onDeleteFood}
          />
        )}
        {activeTab === 'thingsToDo' && (
          <ThingsTab
            day={day}
            date={date}
            onAdd={onAddThing}
            onDelete={onDeleteThing}
          />
        )}
        {activeTab === 'placesToStay' && (
          <StayTab
            day={day}
            date={date}
            index={index}
            onAdd={onAddStay}
            onEdit={onEditStay}
            onDelete={onDeleteStay}
          />
        )}
      </div>
    </div>
  );
};

export default DayTabs;

