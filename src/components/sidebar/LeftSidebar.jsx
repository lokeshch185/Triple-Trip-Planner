import React, { useState } from 'react';
import { Search, Map, Globe, Lightbulb } from 'lucide-react';
import ResearchTab from './tabs/ResearchTab';
import MapTab from './tabs/MapTab';
import GoogleTab from './tabs/GoogleTab';
import SuggestionsTab from './tabs/SuggestionsTab';

const LeftSidebar = ({ destination, tripName, tripData, startDate, endDate }) => {
  const [activeTab, setActiveTab] = useState('research');

  const tabs = [
    { id: 'research', label: 'Research', icon: Search },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'google', label: 'Google', icon: Globe },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon size={16} />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'research' && <ResearchTab destination={destination} tripName={tripName} />}
        {activeTab === 'map' && <MapTab destination={destination} tripData={tripData} startDate={startDate} endDate={endDate} />}
        {activeTab === 'google' && <GoogleTab destination={destination} tripName={tripName} />}
        {activeTab === 'suggestions' && <SuggestionsTab destination={destination} />}
      </div>
    </div>
  );
};

export default LeftSidebar;

