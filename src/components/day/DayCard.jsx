import React from 'react';
import { ChevronDown, ChevronUp, Hotel, Train, Car, Plane } from 'lucide-react';
import { formatDate } from '../../utils/dateHelpers';
import { getTransportFromTimeline } from '../../utils/budgetHelpers';
import DayTabs from './DayTabs';

const DayCard = ({
  date,
  index,
  day,
  isExpanded,
  activeTab,
  tripData,
  destination,
  onToggle,
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
  const transport = getTransportFromTimeline(date, tripData, destination);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div 
        onClick={() => onToggle(date)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-white rounded-lg px-3 py-1">
              <span className="text-sm font-semibold text-blue-600">Day {index + 1}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{formatDate(date)}</h2>
            
            {transport && (
              <div 
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                {transport.type === 'Train' && <Train size={16} className="text-white" />}
                {transport.type === 'Flight' && <Plane size={16} className="text-white" />}
                {transport.type === 'Car' && <Car size={16} className="text-white" />}
                <span className="text-sm text-white font-medium">{transport.name}</span>
                <span className="text-xs text-white/90">{transport.time}</span>
              </div>
            )}

            {day.placesToStay && day.placesToStay.length > 0 && (
              <div 
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Hotel size={16} className="text-white" />
                <span className="text-sm text-white font-medium">{day.placesToStay[0].hotel}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronUp size={24} className="text-white" /> : <ChevronDown size={24} className="text-white" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <DayTabs
          date={date}
          index={index}
          day={day}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onAddTimeline={onAddTimeline}
          onAddPlace={onAddPlace}
          onAddFood={onAddFood}
          onAddThing={onAddThing}
          onAddStay={onAddStay}
          onEditTimeline={onEditTimeline}
          onDeleteTimeline={onDeleteTimeline}
          onDeletePlace={onDeletePlace}
          onDeleteFood={onDeleteFood}
          onDeleteThing={onDeleteThing}
          onEditStay={onEditStay}
          onDeleteStay={onDeleteStay}
        />
      )}
    </div>
  );
};

export default DayCard;

